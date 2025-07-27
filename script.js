// Inicjalizacja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCyj5pbNgUHaV-_g__sTQmsUtYOhegYoSI",
  authDomain: "slowny-oszust.firebaseapp.com",
  databaseURL: "https://slowny-oszust-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slowny-oszust",
  storageBucket: "slowny-oszust.firebasestorage.app",
  messagingSenderId: "679726628348",
  appId: "1:679726628348:web:83f9c43fee9cf514784679"
};

try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase zainicjalizowany");
} catch (error) {
  console.error("Błąd inicjalizacji Firebase:", error);
  alert("Błąd połączenia z bazą danych!");
}

const db = firebase.database();
let currentRoomId = null;
let currentPlayerId = null;
let playersRef = null;

// Generowanie ID
const generateRoomCode = () => Math.random().toString(36).substring(2, 6).toUpperCase();
const generatePlayerId = () => 'p_' + Math.random().toString(36).substring(2, 9);

// UI Helpers
function setStatus(message, isError = false) {
  const statusEl = document.getElementById('statusMessage');
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.style.color = isError ? 'red' : '#666';
  }
}

function setLoading(isLoading) {
  const createBtn = document.getElementById('createRoom');
  const joinBtn = document.getElementById('joinRoom');
  if (createBtn) createBtn.disabled = isLoading;
  if (joinBtn) joinBtn.disabled = isLoading;
}

function showGameScreen(roomId) {
  const loginScreen = document.getElementById('loginScreen');
  const gameScreen = document.getElementById('gameScreen');
  const roomCodeDisplay = document.getElementById('roomCodeDisplay');
  
  if (loginScreen) loginScreen.style.display = 'none';
  if (gameScreen) gameScreen.style.display = 'block';
  if (roomCodeDisplay) roomCodeDisplay.textContent = roomId;
}

function updatePlayersList(players) {
  const playersList = document.getElementById('playersList');
  if (!playersList) {
    console.error("Element playersList nie istnieje!");
    return;
  }
  
  playersList.innerHTML = '';
  
  if (players) {
    console.log("Aktualizacja listy graczy:", players);
    Object.values(players).forEach(player => {
      const li = document.createElement('li');
      li.textContent = player.name;
      if (player.isHost) {
        li.innerHTML += ' <span style="color:#4285f4">(host)</span>';
      }
      playersList.appendChild(li);
    });
  }
}

function initPlayersListener(roomId) {
  if (playersRef) {
    playersRef.off();
  }

  playersRef = db.ref(`rooms/${roomId}/players`);
  
  playersRef.on('value', (snapshot) => {
    console.log(`[${roomId}] Odebrano aktualizację graczy:`, snapshot.val());
    updatePlayersList(snapshot.val());
  });
  
  // Ręczne pobranie początkowego stanu
  playersRef.once('value').then(snapshot => {
    console.log(`[${roomId}] Początkowy stan graczy:`, snapshot.val());
    updatePlayersList(snapshot.val());
  });
}

// Tworzenie pokoju
document.getElementById('createRoom').addEventListener('click', async function() {
  try {
    setLoading(true);
    const playerName = document.getElementById('playerName').value.trim();
    
    if (playerName.length < 3) {
      setStatus("Nick musi mieć minimum 3 znaki!", true);
      return;
    }
    
    const roomId = generateRoomCode();
    const playerId = generatePlayerId();
    
    await db.ref(`rooms/${roomId}`).set({
      players: {
        [playerId]: {
          name: playerName,
          isImpostor: false,
          joinedAt: firebase.database.ServerValue.TIMESTAMP,
          isHost: true
        }
      },
      status: "waiting",
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });

    currentRoomId = roomId;
    currentPlayerId = playerId;
    showGameScreen(roomId);
    initPlayersListener(roomId);
    
  } catch (error) {
    console.error("Błąd tworzenia pokoju:", error);
    setStatus("Błąd: " + error.message, true);
  } finally {
    setLoading(false);
  }
});

// Dołączanie do pokoju
document.getElementById('joinRoom').addEventListener('click', async function() {
  try {
    setLoading(true);
    setStatus("Łączenie...");
    
    const roomId = document.getElementById('roomCodeInput').value.trim().toUpperCase();
    const playerName = document.getElementById('playerName').value.trim();

    if (!roomId || roomId.length !== 4) {
      throw new Error("Podaj poprawny 4-znakowy kod pokoju");
    }
    if (!playerName || playerName.length < 3) {
      throw new Error("Nick musi mieć minimum 3 znaki");
    }

    const roomSnapshot = await db.ref(`rooms/${roomId}`).once('value');
    if (!roomSnapshot.exists()) {
      throw new Error("Pokój nie istnieje!");
    }

    const players = roomSnapshot.val().players || {};
    const nickExists = Object.values(players).some(p => p.name === playerName);
    if (nickExists) {
      throw new Error("Ten nick jest już zajęty!");
    }

    const playerId = generatePlayerId();
    await db.ref(`rooms/${roomId}/players/${playerId}`).set({
      name: playerName,
      isImpostor: false,
      joinedAt: firebase.database.ServerValue.TIMESTAMP,
      isHost: false
    });

    currentRoomId = roomId;
    currentPlayerId = playerId;
    showGameScreen(roomId);
    setStatus("");
    initPlayersListener(roomId);
    
  } catch (error) {
    console.error("Błąd dołączania:", error);
    setStatus(error.message, true);
  } finally {
    setLoading(false);
  }
});

// Czyszczenie danych przy zamknięciu
window.addEventListener('beforeunload', () => {
  if (currentRoomId && currentPlayerId) {
    db.ref(`rooms/${currentRoomId}/players/${currentPlayerId}`).remove();
  }
  if (playersRef) {
    playersRef.off();
  }
});

// Automatyczne ukrywanie komunikatów
const playerNameInput = document.getElementById('playerName');
const roomCodeInput = document.getElementById('roomCodeInput');

if (playerNameInput) {
  playerNameInput.addEventListener('input', () => setStatus(""));
}
if (roomCodeInput) {
  roomCodeInput.addEventListener('input', () => setStatus(""));
}

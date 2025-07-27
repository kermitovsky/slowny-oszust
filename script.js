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

// Generowanie ID
const generateRoomCode = () => Math.random().toString(36).substring(2, 6).toUpperCase();
const generatePlayerId = () => 'p_' + Math.random().toString(36).substring(2, 9);

// UI Helpers
function setStatus(message, isError = false) {
  const statusEl = document.getElementById('statusMessage');
  statusEl.textContent = message;
  statusEl.style.color = isError ? 'red' : '#666';
}

function setLoading(isLoading) {
  document.getElementById('createRoom').disabled = isLoading;
  document.getElementById('joinRoom').disabled = isLoading;
}

function showGameScreen(roomId) {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';
  document.getElementById('roomCodeDisplay').textContent = roomId;
}

function updatePlayersList(players) {
  const playersList = document.getElementById('playersList');
  playersList.innerHTML = '';
  
  if (players) {
    Object.entries(players).forEach(([id, player]) => {
      const li = document.createElement('li');
      li.textContent = player.name;
      if (player.isHost) {
        li.innerHTML += ' <span style="color:#4285f4">(host)</span>';
      }
      playersList.appendChild(li);
    });
  }
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
    
    db.ref(`rooms/${roomId}/players`).on('value', (snapshot) => {
      updatePlayersList(snapshot.val());
    });
    
  } catch (error) {
    console.error("Błąd tworzenia pokoju:", error);
    setStatus("Błąd: " + error.message, true);
  } finally {
    setLoading(false);
  }
});

// Funkcja dołączania do pokoju - ZAKTUALIZOWANA
document.getElementById('joinRoom').addEventListener('click', async function() {
  try {
    setLoading(true);
    setStatus("Łączenie...");
    
    const roomId = document.getElementById('roomCodeInput').value.trim().toUpperCase();
    const playerName = document.getElementById('playerName').value.trim();

    // Walidacja danych
    if (!roomId || roomId.length !== 4) {
      throw new Error("Podaj poprawny 4-znakowy kod pokoju");
    }
    if (!playerName || playerName.length < 3) {
      throw new Error("Nick musi mieć minimum 3 znaki");
    }

    // Sprawdzenie czy pokój istnieje
    const roomSnapshot = await db.ref(`rooms/${roomId}`).once('value');
    if (!roomSnapshot.exists()) {
      throw new Error("Pokój nie istnieje!");
    }

    // Sprawdzenie unikalności nicku
    const players = roomSnapshot.val().players || {};
    const nickExists = Object.values(players).some(p => p.name === playerName);
    if (nickExists) {
      throw new Error("Ten nick jest już zajęty!");
    }

    // Dołączanie gracza
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
    
    // NIEZBĘDNA ZMIANA - inicjalizacja nasłuchiwania PRZED aktualizacją UI
    const playersRef = db.ref(`rooms/${roomId}/players`);
    
    // Nasłuchiwanie zmian - ZAKTUALIZOWANE
    playersRef.on('value', (snapshot) => {
      const playersData = snapshot.val() || {};
      console.log("Odebrano dane graczy:", playersData);
      updatePlayersList(playersData);
    });

    // Ręczne pobranie aktualnego stanu
    const initialPlayers = (await playersRef.once('value')).val() || {};
    updatePlayersList(initialPlayers);

  } catch (error) {
    console.error("Błąd dołączania:", error);
    setStatus(error.message, true);
  } finally {
    setLoading(false);
  }
});

// Funkcja aktualizacji listy graczy - ZAKTUALIZOWANA
function updatePlayersList(players) {
  const playersList = document.getElementById('playersList');
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
  } else {
    console.log("Brak danych graczy do wyświetlenia");
  }
}
    
    // Nasłuchiwanie zmian
    db.ref(`rooms/${roomId}/players`).on('value', (snapshot) => {
      updatePlayersList(snapshot.val());
    });

  } catch (error) {
    console.error("Błąd dołączania:", error);
    setStatus(error.message, true);
    
    // Dodatkowe logowanie błędu
    if (error.message.includes('PERMISSION_DENIED')) {
      console.error("Błąd dostępu - sprawdź reguły bezpieczeństwa Firebase");
      setStatus("Błąd dostępu do bazy danych. Spróbuj ponownie za chwilę.", true);
    }
  } finally {
    setLoading(false);
  }
});

// Czyszczenie danych przy zamknięciu
window.addEventListener('beforeunload', () => {
  if (currentRoomId && currentPlayerId) {
    db.ref(`rooms/${currentRoomId}/players/${currentPlayerId}`).remove();
  }
});

// Automatyczne ukrywanie komunikatów
document.getElementById('playerName').addEventListener('input', () => setStatus(""));
document.getElementById('roomCodeInput').addEventListener('input', () => setStatus(""));

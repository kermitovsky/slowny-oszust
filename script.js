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
  console.log("✅ Firebase zainicjalizowany");
} catch (error) {
  console.error("❌ Błąd inicjalizacji Firebase:", error);
  alert("Błąd połączenia z bazą danych!");
}

const db = firebase.database();
let currentRoomId = null;
let currentPlayerId = null;
let playersRef = null;

const generateRoomCode = () => Math.random().toString(36).substring(2, 6).toUpperCase();
const generatePlayerId = () => 'p_' + Math.random().toString(36).substring(2, 9);

function setStatus(message, isError = false) {
  const el = document.getElementById('statusMessage');
  if (el) {
    el.textContent = message;
    el.style.color = isError ? 'red' : '#666';
  }
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
  const list = document.getElementById('playersList');
  list.innerHTML = '';
  if (players) {
    Object.values(players).forEach(player => {
      const li = document.createElement('li');
      li.textContent = player.name;
      if (player.isHost) {
        li.innerHTML += ' <span style="color:#4285f4">(host)</span>';
      }
      list.appendChild(li);
    });
  }
}

function listenForPlayers(roomId) {
  if (playersRef) playersRef.off();
  playersRef = db.ref(`rooms/${roomId}/players`);
  playersRef.on('value', (snapshot) => {
    const players = snapshot.val();
    updatePlayersList(players);
  });
}

// 🔵 TWORZENIE POKOJU
document.getElementById('createRoom').addEventListener('click', async () => {
  try {
    setLoading(true);
    const name = document.getElementById('playerName').value.trim();
    if (name.length < 3) return setStatus("Nick musi mieć min. 3 znaki", true);

    const roomId = generateRoomCode();
    const playerId = generatePlayerId();

    await db.ref(`rooms/${roomId}`).set({
      players: {
        [playerId]: {
          name: name,
          isImpostor: false,
          isHost: true,
          joinedAt: firebase.database.ServerValue.TIMESTAMP
        }
      },
      status: "waiting",
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });

    currentRoomId = roomId;
    currentPlayerId = playerId;

    showGameScreen(roomId);
    listenForPlayers(roomId);

  } catch (e) {
    console.error("Błąd tworzenia pokoju:", e);
    setStatus("Błąd tworzenia pokoju", true);
  } finally {
    setLoading(false);
  }
});

// 🟢 DOŁĄCZANIE DO POKOJU
document.getElementById('joinRoom').addEventListener('click', async () => {
  try {
    setLoading(true);
    setStatus("Łączenie...");

    const name = document.getElementById('playerName').value.trim();
    const roomId = document.getElementById('roomCodeInput').value.trim().toUpperCase();

    if (name.length < 3) throw new Error("Nick musi mieć min. 3 znaki");
    if (roomId.length !== 4) throw new Error("Kod pokoju musi mieć 4 znaki");

    const roomRef = db.ref(`rooms/${roomId}`);
    const snapshot = await roomRef.once('value');
    if (!snapshot.exists()) throw new Error("Pokój nie istnieje");

    const players = snapshot.val().players || {};
    const nameTaken = Object.values(players).some(p => p.name === name);
    if (nameTaken) throw new Error("Ten nick jest już zajęty");

    const playerId = generatePlayerId();
    await db.ref(`rooms/${roomId}/players/${playerId}`).set({
      name: name,
      isImpostor: false,
      isHost: false,
      joinedAt: firebase.database.ServerValue.TIMESTAMP
    });

    currentRoomId = roomId;
    currentPlayerId = playerId;

    showGameScreen(roomId);

    // 📥 Ręczne pobranie przed nasłuchiwaniem
    const playersSnap = await db.ref(`rooms/${roomId}/players`).once('value');
    updatePlayersList(playersSnap.val());

    listenForPlayers(roomId);
    setStatus("");

  } catch (e) {
    console.error("Błąd dołączenia:", e);
    setStatus(e.message, true);
  } finally {
    setLoading(false);
  }
});

// 🔁 CZYSZCZENIE PRZY WYJŚCIU
window.addEventListener('beforeunload', () => {
  if (currentRoomId && currentPlayerId) {
    db.ref(`rooms/${currentRoomId}/players/${currentPlayerId}`).remove();
  }
  if (playersRef) playersRef.off();
});

// 🧼 Czyść status na inputach
document.getElementById('playerName').addEventListener('input', () => setStatus(""));
document.getElementById('roomCodeInput').addEventListener('input', () => setStatus(""));

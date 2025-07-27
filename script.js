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
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Test połączenia (możesz później usunąć)
db.ref('connectionTest').set({
  status: "active",
  lastTest: new Date().toISOString()
}).then(() => {
  console.log("Połączenie z Firebase działa!");
});

// Zmienne globalne
let currentRoomId = null;
let currentPlayerId = null;

// Elementy DOM
const createRoomBtn = document.getElementById('createRoom');
const joinRoomBtn = document.getElementById('joinRoom');
const playerNameInput = document.getElementById('playerName');
const roomCodeInput = document.getElementById('roomCodeInput');
const gameScreen = document.getElementById('gameScreen');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const playersList = document.getElementById('playersList');

// Aktualizacja listy graczy
function updatePlayersList(players) {
  playersList.innerHTML = '';
  
  Object.entries(players).forEach(([id, player]) => {
    const li = document.createElement('li');
    li.textContent = player.name;
    if (player.isImpostor) li.classList.add('impostor');
    playersList.appendChild(li);
  });
}

// Tworzenie pokoju
createRoomBtn.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();
  if (!playerName) return alert("Podaj nick!");

  currentRoomId = Math.random().toString(36).substring(2, 6).toUpperCase();
  currentPlayerId = Date.now().toString();

  db.ref(`rooms/${currentRoomId}`).set({
    players: {
      [currentPlayerId]: {
        name: playerName,
        isImpostor: false
      }
    },
    status: "waiting",
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });

  // Nasłuchiwanie zmian w pokoju
  db.ref(`rooms/${currentRoomId}`).on('value', (snapshot) => {
    const room = snapshot.val();
    if (!room) return;
    
    roomCodeDisplay.textContent = currentRoomId;
    updatePlayersList(room.players);
    gameScreen.style.display = 'block';
  });
});

// Dołączanie do pokoju
joinRoomBtn.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();
  const roomId = roomCodeInput.value.trim().toUpperCase();
  
  if (!playerName || !roomId) return alert("Podaj nick i kod pokoju!");

  currentRoomId = roomId;
  currentPlayerId = Date.now().toString();

  db.ref(`rooms/${roomId}/players/${currentPlayerId}`).set({
    name: playerName,
    isImpostor: false
  });

  // Nasłuchiwanie zmian w pokoju
  db.ref(`rooms/${roomId}`).on('value', (snapshot) => {
    if (!snapshot.exists()) return alert("Pokój nie istnieje!");
    const room = snapshot.val();
    
    roomCodeDisplay.textContent = roomId;
    updatePlayersList(room.players);
    gameScreen.style.display = 'block';
  });
});

// Czyszczenie danych przy zamknięciu strony
window.addEventListener('beforeunload', () => {
  if (currentRoomId && currentPlayerId) {
    db.ref(`rooms/${currentRoomId}/players/${currentPlayerId}`).remove();
  }
});

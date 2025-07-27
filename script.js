// Użyj istniejącej inicjalizacji Firebase
const db = firebase.database();

// Test połączenia
db.ref('.info/connected').on('value', (snapshot) => {
    if (snapshot.val() === true) {
        console.log("Połączenie z Firebase działa!");
    } else {
        console.log("Brak połączenia z Firebase");
    }
});

// Zmienne gry
let currentRoomId = null;
let currentPlayerId = null;

// Referencje do elementów DOM
const playerNameInput = document.getElementById('playerName');
const createRoomBtn = document.getElementById('createRoom');
const joinRoomBtn = document.getElementById('joinRoom');
const roomCodeInput = document.getElementById('roomCodeInput');
const gameScreen = document.getElementById('gameScreen');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const playersList = document.getElementById('playersList');

// Tworzenie pokoju
createRoomBtn.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    if (!playerName) return alert("Podaj nick!");
    
    currentRoomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    currentPlayerId = 'player_' + Date.now();
    
    db.ref(`rooms/${currentRoomId}`).set({
        players: {
            [currentPlayerId]: {
                name: playerName,
                isImpostor: false
            }
        },
        status: "waiting",
        createdAt: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
        setupRoomListeners();
        gameScreen.style.display = 'block';
        roomCodeDisplay.textContent = currentRoomId;
    }).catch(error => {
        console.error("Błąd tworzenia pokoju:", error);
    });
});

// Dołączanie do pokoju
joinRoomBtn.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();
    const roomId = roomCodeInput.value.trim().toUpperCase();
    
    if (!playerName || !roomId) return alert("Podaj nick i kod pokoju!");
    
    currentRoomId = roomId;
    currentPlayerId = 'player_' + Date.now();
    
    db.ref(`rooms/${roomId}/players/${currentPlayerId}`).set({
        name: playerName,
        isImpostor: false
    }).then(() => {
        setupRoomListeners();
        gameScreen.style.display = 'block';
        roomCodeDisplay.textContent = roomId;
    }).catch(error => {
        console.error("Błąd dołączania:", error);
    });
});

// Nasłuchiwanie zmian w pokoju
function setupRoomListeners() {
    db.ref(`rooms/${currentRoomId}`).on('value', (snapshot) => {
        const room = snapshot.val();
        if (!room) {
            alert("Pokój został zamknięty!");
            return;
        }
        updatePlayersList(room.players);
    });
}

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

// Czyszczenie przy zamknięciu
window.addEventListener('beforeunload', () => {
    if (currentRoomId && currentPlayerId) {
        db.ref(`rooms/${currentRoomId}/players/${currentPlayerId}`).remove();
    }
});

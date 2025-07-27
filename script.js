const db = firebase.database();

// Elementy DOM
const elements = {
    playerName: document.getElementById('playerName'),
    createRoom: document.getElementById('createRoom'),
    joinRoom: document.getElementById('joinRoom'),
    roomCodeInput: document.getElementById('roomCodeInput'),
    gameScreen: document.getElementById('gameScreen'),
    loginScreen: document.getElementById('loginScreen'),
    roomCodeDisplay: document.getElementById('roomCodeDisplay'),
    playersList: document.getElementById('playersList'),
    startGame: document.getElementById('startGame')
};

// Zmienne stanu gry
let gameState = {
    roomId: null,
    playerId: null,
    isHost: false
};

// Generatory
const generateId = () => Date.now().toString();
const generateRoomCode = () => Math.random().toString(36).substring(2, 6).toUpperCase();

// Aktualizacja UI
function updateUI() {
    if (gameState.roomId) {
        elements.loginScreen.style.display = 'none';
        elements.gameScreen.style.display = 'block';
        elements.roomCodeDisplay.textContent = gameState.roomId;
        elements.startGame.style.display = gameState.isHost ? 'block' : 'none';
    }
}

// Obsługa pokoju
function setupRoom() {
    db.ref(`rooms/${gameState.roomId}`).on('value', (snapshot) => {
        const room = snapshot.val();
        
        if (!room) {
            alert("Pokój został zamknięty!");
            window.location.reload();
            return;
        }
        
        updatePlayersList(room.players);
        updateUI();
    });
}

// Lista graczy
function updatePlayersList(players) {
    elements.playersList.innerHTML = '';
    
    if (!players) return;
    
    Object.entries(players).forEach(([id, player]) => {
        const li = document.createElement('li');
        li.textContent = player.name + (player.isImpostor ? " 👿" : "");
        if (player.isImpostor) li.classList.add('impostor');
        elements.playersList.appendChild(li);
    });
}

// Event listeners
elements.createRoom.addEventListener('click', () => {
    const playerName = elements.playerName.value.trim();
    if (!playerName) return alert("Podaj nick!");
    
    gameState = {
        roomId: generateRoomCode(),
        playerId: generateId(),
        isHost: true
    };
    
    db.ref(`rooms/${gameState.roomId}`).set({
        players: {
            [gameState.playerId]: {
                name: playerName,
                isImpostor: false
            }
        },
        status: "waiting",
        createdAt: firebase.database.ServerValue.TIMESTAMP
    });
    
    setupRoom();
});

elements.joinRoom.addEventListener('click', () => {
    const playerName = elements.playerName.value.trim();
    const roomId = elements.roomCodeInput.value.trim().toUpperCase();
    
    if (!playerName || !roomId) return alert("Podaj nick i kod pokoju!");
    
    gameState = {
        roomId: roomId,
        playerId: generateId(),
        isHost: false
    };
    
    db.ref(`rooms/${roomId}/players/${gameState.playerId}`).set({
        name: playerName,
        isImpostor: false
    });
    
    setupRoom();
});

elements.startGame.addEventListener('click', () => {
    // Tu dodamy logikę rozpoczęcia gry w następnym kroku
    alert("Rozpoczynamy grę! (Ta funkcja będzie działać w następnej wersji)");
});

// Czyszczenie danych
window.addEventListener('beforeunload', () => {
    if (gameState.roomId && gameState.playerId) {
        db.ref(`rooms/${gameState.roomId}/players/${gameState.playerId}`).remove();
    }
});

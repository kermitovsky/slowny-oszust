// Inicjalizacja Firebase
const db = firebase.database();

// Stan gry
const gameState = {
    currentRoomId: null,
    currentPlayerId: null,
    currentPlayerName: '',
    isHost: false,
    usedNamesInRooms: {} // Śledzenie zajętych nicków
};

// Referencje do elementów DOM
const elements = {
    playerName: document.getElementById('playerName'),
    createRoom: document.getElementById('createRoom'),
    joinRoom: document.getElementById('joinRoom'),
    roomCodeInput: document.getElementById('roomCodeInput'),
    gameScreen: document.getElementById('gameScreen'),
    loginScreen: document.getElementById('loginScreen'),
    roomCodeDisplay: document.getElementById('roomCodeDisplay'),
    playersList: document.getElementById('playersList')
};

// Generatory ID
const generateId = () => 'player_' + Date.now() + Math.random().toString(36).substr(2, 5);
const generateRoomCode = () => Math.random().toString(36).substring(2, 6).toUpperCase();

// Blokada interfejsu
function setUIState(loading) {
    elements.joinRoom.disabled = loading;
    elements.createRoom.disabled = loading;
    elements.joinRoom.textContent = loading ? "Ładowanie..." : "Dołącz";
    elements.createRoom.textContent = loading ? "Tworzenie..." : "Stwórz pokój";
}

// Aktualizacja listy graczy
function updatePlayersList(players) {
    elements.playersList.innerHTML = '';
    if (!players) return;

    Object.entries(players).forEach(([id, player]) => {
        const li = document.createElement('li');
        li.textContent = player.name;
        if (player.isImpostor) li.classList.add('impostor');
        elements.playersList.appendChild(li);
    });
}

// Nasłuchiwanie zmian w pokoju
function setupRoomListeners() {
    const roomRef = db.ref(`rooms/${gameState.currentRoomId}`);
    
    roomRef.on('value', (snapshot) => {
        const room = snapshot.val();
        if (!room) {
            alert("Pokój został zamknięty!");
            window.location.reload();
            return;
        }
        updatePlayersList(room.players);
    });

    // Zabezpieczenie na wypadek rozłączenia
    db.ref(`rooms/${gameState.currentRoomId}/players/${gameState.currentPlayerId}`).onDisconnect().remove();
}

// Tworzenie pokoju
elements.createRoom.addEventListener('click', async () => {
    const playerName = elements.playerName.value.trim();
    if (!playerName) return alert("Podaj nick!");

    setUIState(true);
    gameState.currentRoomId = generateRoomCode();
    gameState.currentPlayerId = generateId();
    gameState.currentPlayerName = playerName;
    gameState.isHost = true;

    try {
        await db.ref(`rooms/${gameState.currentRoomId}`).set({
            players: {
                [gameState.currentPlayerId]: {
                    name: playerName,
                    isImpostor: false,
                    joinedAt: firebase.database.ServerValue.TIMESTAMP
                }
            },
            status: "waiting",
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            hostId: gameState.currentPlayerId
        });

        // Zarezerwuj nick
        gameState.usedNamesInRooms[gameState.currentRoomId] = [playerName];
        
        setupRoomListeners();
        elements.loginScreen.style.display = 'none';
        elements.gameScreen.style.display = 'block';
        elements.roomCodeDisplay.textContent = gameState.currentRoomId;
    } catch (error) {
        console.error("Błąd tworzenia pokoju:", error);
        alert("Wystąpił błąd podczas tworzenia pokoju!");
    } finally {
        setUIState(false);
    }
});

// Dołączanie do pokoju
elements.joinRoom.addEventListener('click', async () => {
    const playerName = elements.playerName.value.trim();
    const roomId = elements.roomCodeInput.value.trim().toUpperCase();
    
    if (!playerName || !roomId) return alert("Podaj nick i kod pokoju!");

    setUIState(true);
    
    try {
        // Sprawdź czy pokój istnieje
        const snapshot = await db.ref(`rooms/${roomId}`).once('value');
        if (!snapshot.exists()) {
            throw new Error("Pokój nie istnieje!");
        }

        const room = snapshot.val();
        
        // Sprawdź unikalność nicku
        const players = room.players || {};
        const nickExists = Object.values(players).some(p => p.name === playerName);
        
        if (nickExists) {
            throw new Error("Ten nick jest już zajęty w tym pokoju!");
        }

        // Zarezerwuj miejsce
        gameState.currentRoomId = roomId;
        gameState.currentPlayerId = generateId();
        gameState.currentPlayerName = playerName;
        gameState.isHost = false;

        if (!gameState.usedNamesInRooms[roomId]) {
            gameState.usedNamesInRooms[roomId] = [];
        }
        gameState.usedNamesInRooms[roomId].push(playerName);

        // Dołącz gracza
        await db.ref(`rooms/${roomId}/players/${gameState.currentPlayerId}`).set({
            name: playerName,
            isImpostor: false,
            joinedAt: firebase.database.ServerValue.TIMESTAMP
        });

        setupRoomListeners();
        elements.loginScreen.style.display = 'none';
        elements.gameScreen.style.display = 'block';
        elements.roomCodeDisplay.textContent = roomId;
    } catch (error) {
        console.error("Błąd dołączania:", error);
        alert(error.message || "Wystąpił błąd podczas dołączania!");
    } finally {
        setUIState(false);
    }
});

// Czyszczenie danych przy zamknięciu
window.addEventListener('beforeunload', () => {
    if (!gameState.currentRoomId || !gameState.currentPlayerId) return;
    
    // Zwolnij nick
    if (gameState.usedNamesInRooms[gameState.currentRoomId]) {
        gameState.usedNamesInRooms[gameState.currentRoomId] = 
            gameState.usedNamesInRooms[gameState.currentRoomId].filter(
                name => name !== gameState.currentPlayerName
            );
    }
    
    // Usuń gracza z bazy
    db.ref(`rooms/${gameState.currentRoomId}/players/${gameState.currentPlayerId}`).remove();
});

// Test połączenia (opcjonalne)
db.ref('.info/connected').on('value', (snapshot) => {
    if (snapshot.val() === true) {
        console.log("Połączenie z Firebase aktywne");
    }
});

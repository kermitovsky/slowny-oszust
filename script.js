// Inicjalizacja Firebase
const db = firebase.database();

// Stan gry
const gameState = {
    currentRoomId: null,
    currentPlayerId: null,
    currentPlayerName: '',
    isHost: false
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
const generateId = () => 'player_' + Date.now();
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
        li.textContent = player.name + (player.isImpostor ? " 👿" : "");
        if (player.isImpostor) li.classList.add('impostor');
        elements.playersList.appendChild(li);
    });
}

// Nasłuchiwanie zmian w pokoju
function setupRoomListeners() {
    db.ref(`rooms/${gameState.currentRoomId}/players`).on('value', (snapshot) => {
        const players = snapshot.val();
        updatePlayersList(players);
    });
}

// Tworzenie pokoju
elements.createRoom.addEventListener('click', async () => {
    const playerName = elements.playerName.value.trim();
    if (playerName.length < 3) return alert("Nick musi mieć minimum 3 znaki!");

    setUIState(true);
    
    try {
        gameState.currentRoomId = generateRoomCode();
        gameState.currentPlayerId = generateId();
        gameState.currentPlayerName = playerName;
        gameState.isHost = true;

        await db.ref(`rooms/${gameState.currentRoomId}`).set({
            players: {
                [gameState.currentPlayerId]: {
                    name: playerName,
                    isImpostor: false,
                    joinedAt: firebase.database.ServerValue.TIMESTAMP
                }
            },
            status: "waiting",
            createdAt: firebase.database.ServerValue.TIMESTAMP
        });

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
    
    if (playerName.length < 3) return alert("Nick musi mieć minimum 3 znaki!");
    if (!roomId) return alert("Podaj kod pokoju!");

    setUIState(true);
    
    try {
        // Sprawdź czy pokój istnieje
        const snapshot = await db.ref(`rooms/${roomId}`).once('value');
        if (!snapshot.exists()) throw new Error("Pokój nie istnieje!");

        gameState.currentRoomId = roomId;
        gameState.currentPlayerId = generateId();
        gameState.currentPlayerName = playerName;

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
        alert(error.message);
    } finally {
        setUIState(false);
    }
});

// Czyszczenie przy zamknięciu
window.addEventListener('beforeunload', () => {
    if (gameState.currentRoomId && gameState.currentPlayerId) {
        db.ref(`rooms/${gameState.currentRoomId}/players/${gameState.currentPlayerId}`).remove();
    }
});

// Test połączenia
db.ref('.info/connected').on('value', (snapshot) => {
    console.log("Status połączenia Firebase:", snapshot.val() ? "Aktywne" : "Nieaktywne");
});

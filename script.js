// Inicjalizacja Firebase
const db = firebase.database();

// Stan gry
const gameState = {
    currentRoomId: null,
    currentPlayerId: null,
    currentPlayerName: '',
    isHost: false,
    isConnected: false
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

// Blokada interfejsu
function setUIState(loading) {
    elements.joinRoom.disabled = loading;
    elements.createRoom.disabled = loading;
    elements.joinRoom.textContent = loading ? "Ładowanie..." : "Dołącz";
    elements.createRoom.textContent = loading ? "Tworzenie..." : "Stwórz pokój";
}

// Sprawdź unikalność nicku w pokoju (zapis w Firebase)
async function isNameAvailable(roomId, playerName) {
    const snapshot = await db.ref(`rooms/${roomId}/players`)
        .orderByChild('name')
        .equalTo(playerName)
        .once('value');
    
    return !snapshot.exists();
}

// Dołączanie do pokoju (pełna wersja z zabezpieczeniami)
elements.joinRoom.addEventListener('click', async () => {
    const playerName = elements.playerName.value.trim();
    const roomId = elements.roomCodeInput.value.trim().toUpperCase();
    
    if (!playerName || !roomId) {
        return alert("Podaj nick i kod pokoju!");
    }

    setUIState(true);
    
    try {
        // Sprawdź czy pokój istnieje
        const roomSnapshot = await db.ref(`rooms/${roomId}`).once('value');
        if (!roomSnapshot.exists()) {
            throw new Error("Pokój nie istnieje!");
        }

        // Sprawdź czy nick jest wolny (zapytanie do bazy)
        const nameAvailable = await isNameAvailable(roomId, playerName);
        if (!nameAvailable) {
            throw new Error("Ten nick jest już zajęty!");
        }

        // Sprawdź czy gracz już próbował dołączyć (local storage)
        const joinAttemptKey = `joinAttempt_${roomId}_${playerName}`;
        const lastAttempt = localStorage.getItem(joinAttemptKey);
        
        if (lastAttempt && Date.now() - lastAttempt < 30000) {
            throw new Error("Musisz poczekać 30 sekund przed ponownym dołączeniem!");
        }

        // Zarejestruj próbę dołączenia
        localStorage.setItem(joinAttemptKey, Date.now());

        // Dołącz gracza
        gameState.currentRoomId = roomId;
        gameState.currentPlayerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
        gameState.currentPlayerName = playerName;
        
        await db.ref(`rooms/${roomId}/players/${gameState.currentPlayerId}`).set({
            name: playerName,
            isImpostor: false,
            joinedAt: firebase.database.ServerValue.TIMESTAMP,
            connectionId: gameState.currentPlayerId
        });

        // Ustaw nasłuchiwanie
        setupRoomListeners();
        
        // Aktualizuj UI
        elements.loginScreen.style.display = 'none';
        elements.gameScreen.style.display = 'block';
        elements.roomCodeDisplay.textContent = roomId;
        
        // Oznacz jako połączonego
        gameState.isConnected = true;
        
    } catch (error) {
        console.error("Błąd dołączania:", error);
        alert(error.message);
    } finally {
        setUIState(false);
    }
});

// Automatyczne czyszczenie
window.addEventListener('beforeunload', async () => {
    if (!gameState.currentRoomId || !gameState.currentPlayerId) return;
    
    try {
        // Usuń gracza z bazy
        await db.ref(`rooms/${gameState.currentRoomId}/players/${gameState.currentPlayerId}`).remove();
        
        // Wyczyść local storage po poprawnym rozłączeniu
        if (gameState.isConnected) {
            const joinAttemptKey = `joinAttempt_${gameState.currentRoomId}_${gameState.currentPlayerName}`;
            localStorage.removeItem(joinAttemptKey);
        }
    } catch (error) {
        console.error("Błąd czyszczenia:", error);
    }
});


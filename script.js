// Inicjalizacja
console.log("Inicjalizacja Firebase...");
const db = firebase.database();

// Test połączenia
function testConnection() {
    console.log("Testowanie połączenia...");
    db.ref('test').set({
        timestamp: Date.now(),
        message: "Test połączenia"
    })
    .then(() => console.log("Połączenie działa!"))
    .catch(error => console.error("Błąd połączenia:", error));
}

// Funkcja tworzenia pokoju
document.getElementById('createRoom').addEventListener('click', async function() {
    try {
        console.log("Rozpoczynanie tworzenia pokoju...");
        
        const playerName = document.getElementById('playerName').value.trim();
        if (!playerName) throw new Error("Podaj nick!");

        const roomId = 'room_' + Date.now();
        const playerId = 'player_' + Date.now();

        console.log("Próba zapisu danych...");
        await db.ref(`rooms/${roomId}`).set({
            players: {
                [playerId]: {
                    name: playerName,
                    isImpostor: false,
                    joinedAt: firebase.database.ServerValue.TIMESTAMP
                }
            },
            createdAt: firebase.database.ServerValue.TIMESTAMP
        });

        console.log("Pokój utworzony!");
        alert(`Pokój ${roomId} stworzony pomyślnie!`);
        
    } catch (error) {
        console.error("Błąd:", error);
        alert("Błąd: " + error.message);
    }
});

// Automatyczny test po załadowaniu
window.addEventListener('load', () => {
    testConnection();
});
// Funkcja dołączania do pokoju z pełną obsługą błędów
document.getElementById('joinRoom').addEventListener('click', async function() {
    try {
        setLoading(true);
        const roomId = document.getElementById('roomCodeInput').value.trim().toUpperCase();
        const playerName = document.getElementById('playerName').value.trim();

        // Walidacja danych wejściowych
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

        // Dołączanie do pokoju
        const playerId = generatePlayerId();
        await db.ref(`rooms/${roomId}/players/${playerId}`).set({
            name: playerName,
            isImpostor: false,
            joinedAt: firebase.database.ServerValue.TIMESTAMP,
            isHost: false
        });

        // Aktualizacja UI
        currentRoomId = roomId;
        currentPlayerId = playerId;
        showGameScreen(roomId);

    } catch (error) {
        console.error("Błąd dołączania:", error);
        setStatus(error.message, true);
    } finally {
        setLoading(false);
    }
});

// Funkcja pokazująca ekran gry
function showGameScreen(roomId) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('roomCodeDisplay').textContent = roomId;
    
    // Nasłuchiwanie zmian w pokoju
    db.ref(`rooms/${roomId}/players`).on('value', (snapshot) => {
        const players = snapshot.val() || {};
        updatePlayersList(players);
    });
}

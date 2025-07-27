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

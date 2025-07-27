// DEBUG: Test inicjalizacji Firebase
console.log("Inicjalizacja skryptu...");

try {
    // Inicjalizacja Firebase
    console.log("Sprawdzam Firebase...");
    if (!firebase.apps.length) {
        throw new Error("Firebase nie został zainicjalizowany!");
    }
    const db = firebase.database();
    console.log("Firebase działa. Baza:", db);
} catch (error) {
    console.error("BŁAD FIREBASE:", error);
    alert("Błąd połączenia z Firebase: " + error.message);
    throw error;
}

// Funkcja tworzenia pokoju z pełnym logowaniem
document.getElementById('createRoom').addEventListener('click', async function() {
    console.log("Kliknięto 'Stwórz pokój'");
    
    try {
        // Walidacja nicku
        const playerName = document.getElementById('playerName').value.trim();
        console.log("Wprowadzony nick:", playerName);
        
        if (playerName.length < 3) {
            throw new Error("Nick musi mieć minimum 3 znaki!");
        }

        // Generowanie ID
        const roomId = Math.random().toString(36).substring(2, 6).toUpperCase();
        const playerId = 'player_' + Date.now();
        console.log("Generowanie ID:", {roomId, playerId});

        // Przygotowanie danych
        const roomData = {
            players: {
                [playerId]: {
                    name: playerName,
                    isImpostor: false,
                    joinedAt: firebase.database.ServerValue.TIMESTAMP
                }
            },
            status: "waiting",
            createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        console.log("Dane pokoju:", roomData);

        // Zapisz do Firebase
        console.log("Zapisuję do Firebase...");
        const ref = firebase.database().ref(`rooms/${roomId}`);
        await ref.set(roomData);
        console.log("Pokój stworzony!");

        // Aktualizacja UI
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        document.getElementById('roomCodeDisplay').textContent = roomId;
        
        // Nasłuchuj zmian
        ref.child('players').on('value', (snapshot) => {
            const players = snapshot.val();
            console.log("Aktualizacja graczy:", players);
            updatePlayersList(players);
        });

    } catch (error) {
        console.error("Błąd tworzenia pokoju:", error);
        alert("Błąd: " + error.message);
    }
});

// Pomocnicza funkcja do aktualizacji listy
function updatePlayersList(players) {
    console.log("Aktualizuję listę graczy:", players);
    const list = document.getElementById('playersList');
    list.innerHTML = '';
    
    if (!players) return;
    
    Object.values(players).forEach(player => {
        const li = document.createElement('li');
        li.textContent = player.name;
        list.appendChild(li);
    });
}

// Test połączenia Firebase
firebase.database().ref('.info/connected').on('value', (snapshot) => {
    console.log("Połączenie Firebase:", snapshot.val() ? "AKTYWNE" : "BRAK");
});

// Tworzenie pokoju
document.getElementById('createRoom').addEventListener('click', function() {
    const roomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    // Zapisz pokój w Firebase
    db.ref('rooms/' + roomId).set({
        players: {},
        status: "oczekiwanie",
        word: null,
        impostor: null
    }).then(() => {
        alert("Pokój " + roomId + " został stworzony! Podziel się kodem.");
    });
});

// Dołączanie do pokoju
document.getElementById('joinRoom').addEventListener('click', function() {
    const roomId = document.getElementById('roomCodeInput').value.trim().toUpperCase();
    
    if (!roomId) {
        alert("Podaj kod pokoju!");
        return;
    }

    // Sprawdź, czy pokój istnieje
    db.ref('rooms/' + roomId).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            alert("Dołączono do pokoju: " + roomId);
        } else {
            alert("Pokój nie istnieje!");
        }
    });
});

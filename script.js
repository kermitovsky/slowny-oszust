document.getElementById('createRoom').addEventListener('click', function() {
    const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    alert("Twój kod pokoju: " + roomCode + "\n(Na razie to tylko symulacja)");
});

document.getElementById('joinRoom').addEventListener('click', function() {
    const roomCode = document.getElementById('roomCodeInput').value;
    if (roomCode) {
        alert("Dołączono do pokoju: " + roomCode + "\n(To tylko symulacja)");
    } else {
        alert("Wpisz kod pokoju!");
    }
});
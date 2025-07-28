const firebaseConfig = {
  apiKey: "AIzaSyCyj5pbNgUHaV-_g__sTQmsUtYOhegYoSI",
  authDomain: "slowny-oszust.firebaseapp.com",
  databaseURL: "https://slowny-oszust-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slowny-oszust",
  storageBucket: "slowny-oszust.appspot.com",
  messagingSenderId: "679726628348",
  appId: "1:679726628348:web:83f9c43fee9cf514784679"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const playerNameInput = document.getElementById('playerName');
const createRoomBtn = document.getElementById('createRoom');
const joinRoomBtn = document.getElementById('joinRoom');
const roomCodeInput = document.getElementById('roomCodeInput');
const statusMessage = document.getElementById('statusMessage');
const loginScreen = document.getElementById('loginScreen');
const gameScreen = document.getElementById('gameScreen');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const playersList = document.getElementById('playersList');
const startGameBtn = document.getElementById('startGame');
const endRoundBtn = document.getElementById('endRound');
const leaveRoomBtn = document.getElementById('leaveRoom');
const messageBox = document.getElementById('messageBox');
const roleMessageBox = document.getElementById('roleMessageBox');

let currentRoomCode = null;
let currentPlayerId = null;
let currentPlayerName = null;
let isHost = false;
let words = [];

// Załaduj słowa z words.json
fetch('words.json')
  .then(response => response.json())
  .then(data => {
    words = data;
    console.log('Załadowano słowa:', words.length);
  })
  .catch(error => {
    console.error('Błąd ładowania words.json:', error);
  });

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 4).toUpperCase();
}

function updatePlayersList(players) {
  playersList.innerHTML = '';
  for (const [id, player] of Object.entries(players)) {
    const li = document.createElement('li');
    li.textContent = player.name;
    if (player.isHost) {
      li.classList.add('host');
      li.textContent += ' (host)';
    }
    if (id === currentPlayerId) {
      li.classList.add('self');
    }

    // Dodaj przycisk wyrzucania tylko dla hosta i innych graczy niż siebie
    if (isHost && id !== currentPlayerId) {
      const kickBtn = document.createElement('button');
      kickBtn.textContent = '×';
      kickBtn.title = 'Wyrzuć gracza';
      kickBtn.classList.add('kickBtn');
      kickBtn.addEventListener('click', () => {
        kickPlayer(id);
      });
      li.appendChild(kickBtn);
    }

    playersList.appendChild(li);
  }
}

function showMessage(text, duration = 3500) {
  messageBox.textContent = text;
  messageBox.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, duration);
}

function showRoleMessage(text, duration = 7000) {
  roleMessageBox.textContent = text;
  roleMessageBox.style.display = 'block';
  setTimeout(() => {
    roleMessageBox.style.display = 'none';
  }, duration);
}

function resetToLobby() {
  startGameBtn.style.display = isHost ? 'block' : 'none';
  endRoundBtn.style.display = 'none';
  roleMessageBox.style.display = 'none';
}

createRoomBtn.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    showMessage('Wpisz nick!');
    return;
  }
  currentPlayerName = name;
  isHost = true;
  currentRoomCode = generateRoomCode();
  currentPlayerId = db.ref().push().key;

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.set({
    players: {
      [currentPlayerId]: { name: currentPlayerName, isHost: true, role: null }
    },
    gameStarted: false,
    currentWord: null,
    resetMessage: null,
    startingPlayer: null
  }).then(() => {
    loginScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    roomCodeDisplay.textContent = currentRoomCode;
    listenToRoom(currentRoomCode);
  });
});

joinRoomBtn.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  const code = roomCodeInput.value.trim().toUpperCase();
  if (!name) {
    showMessage('Wpisz nick!');
    return;
  }
  if (!code || code.length !== 4) {
    showMessage('Wpisz poprawny kod pokoju!');
    return;
  }
  currentPlayerName = name;
  currentRoomCode = code;
  currentPlayerId = db.ref().push().key;
  isHost = false;

  const roomRef = db.ref(`rooms/${currentRoomCode}`);

  roomRef.once('value').then(snapshot => {
    if (!snapshot.exists()) {
      showMessage('Pokój nie istnieje!');
      return;
    }
    const roomData = snapshot.val();
    if (roomData.gameStarted) {
      showMessage('Gra już trwa!');
      return;
    }
    // Dodaj gracza
    const players = roomData.players || {};
    for (const p of Object.values(players)) {
      if (p.name === currentPlayerName) {
        showMessage('Ten nick jest już zajęty w pokoju!');
        return;
      }
    }
    roomRef.child('players').child(currentPlayerId).set({ name: currentPlayerName, isHost: false, role: null }).then(() => {
      loginScreen.style.display = 'none';
      gameScreen.style.display = 'block';
      roomCodeDisplay.textContent = currentRoomCode;
      listenToRoom(currentRoomCode);
    });
  });
});

function listenToRoom(roomCode) {
  const roomRef = db.ref(`rooms/${roomCode}`);

  roomRef.on('value', snapshot => {
    const roomData = snapshot.val();
    if (!roomData) {
      // Pokój usunięty lub zakończony
      showMessage('Pokój został zamknięty.');
      location.reload();
      return;
    }
    const players = roomData.players || {};

    updatePlayersList(players);

    startGameBtn.style.display = (isHost && !roomData.gameStarted && Object.keys(players).length >= 2) ? 'block' : 'none';

    if (roomData.gameStarted) {
      endRoundBtn.style.display = 'block';
      startGameBtn.style.display = 'none';

      if (roomData.currentWord) {
        showMessage(`Słowo: ${roomData.currentWord}`, 6000);
      }
      if (roomData.startingPlayer && players[roomData.startingPlayer]) {
        showMessage(`Pierwszy mówi: ${players[roomData.startingPlayer].name}`, 4000);
      }
      if (players[currentPlayerId] && players[currentPlayerId].role) {
        showRoleMessage(`Twoja rola: ${players[currentPlayerId].role}`, 7000);
      }
    } else {
      resetToLobby();
    }
  });
}

startGameBtn.addEventListener('click', () => {
  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.once('value').then(snapshot => {
    const roomData = snapshot.val();
    if (!roomData) return;

    const players = roomData.players || {};
    const playerIds = Object.keys(players);

    if (playerIds.length < 2) {
      showMessage('Za mało graczy, aby zacząć grę!');
      return;
    }

    // Wylosuj impostora z prawdopodobieństwem ok. 20% (1 z 5)
    // Implementacja: spośród graczy jeden jest impostorem, ale z ~20% szansą faktycznie ktoś jest impostorem
    // Znaczy w 80% może być brak impostora? Albo zawsze jest impostor, ale przy losowaniu faworyzujemy aby nie był pierwszy?

    // Propozycja: zawsze jest impostor, ale prawdopodobieństwo bycia impostorem ma 20% dla pierwszego mówiącego,
    // reszta ma normalne prawdopodobieństwo (równo podzielone).

    // Czyli pierwszy mówi ma 20% szans być impostorem,
    // reszta graczy ma 80% szans podzielone równo na siebie.

    // Najpierw losujemy pierwszy mówiącego - losowo spośród graczy.

    // Następnie przypisujemy impostora z uwzględnieniem obniżonego prawdopodobieństwa dla pierwszego mówiącego.

    // Wylosuj pierwszego mówiącego:
    const firstSpeakerId = playerIds[Math.floor(Math.random() * playerIds.length)];

    // Oblicz prawdopodobieństwa impostora dla każdego gracza:
    // Dla pierwszego mówiącego: 20%
    // Dla reszty: 80% / (liczba graczy - 1)

    const impostorProbabilities = {};
    const numPlayers = playerIds.length;
    const firstSpeakerProb = 0.20;
    const othersProb = (1 - firstSpeakerProb) / (numPlayers - 1);

    for (const id of playerIds) {
      impostorProbabilities[id] = (id === firstSpeakerId) ? firstSpeakerProb : othersProb;
    }

    // Losuj impostora według tych prawdopodobieństw:
    const rand = Math.random();
    let acc = 0;
    let impostorId = null;
    for (const id of playerIds) {
      acc += impostorProbabilities[id];
      if (rand <= acc) {
        impostorId = id;
        break;
      }
    }
    if (!impostorId) impostorId = playerIds[playerIds.length - 1]; // zabezpieczenie

    // Wylosuj słowo z words.json (zakładamy, że już załadowane)
    const chosenWord = words.length > 0 ? words[Math.floor(Math.random() * words.length)] : 'SŁOWO';

    // Przypisz role graczom
    const updatedPlayers = {};
    for (const id of playerIds) {
      updatedPlayers[id] = {
        ...players[id],
        role: (id === impostorId) ? 'Impostor' : 'Członek załogi'
      };
    }

    roomRef.update({
      players: updatedPlayers,
      gameStarted: true,
      currentWord: chosenWord,
      startingPlayer: firstSpeakerId,
      resetMessage: null
    });
  });
});

endRoundBtn.addEventListener('click', () => {
  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.once('value').then(snapshot => {
    const roomData = snapshot.val();
    if (!roomData) return;

    const players = roomData.players || {};

    // Wyzeruj role i słowo, zakończ rundę
    const resetPlayers = {};
    for (const id in players) {
      resetPlayers[id] = { ...players[id], role: null };
    }

    roomRef.update({
      players: resetPlayers,
      gameStarted: false,
      currentWord: null,
      startingPlayer: null,
      resetMessage: 'Runda zakończona. Możesz rozpocząć nową grę.'
    });
    showMessage('Runda zakończona!');
  });
});

leaveRoomBtn.addEventListener('click', () => {
  if (!currentRoomCode || !currentPlayerId) return;
  const playerRef = db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`);

  playerRef.remove().then(() => {
    const roomRef = db.ref(`rooms/${currentRoomCode}/players`);
    roomRef.once('value').then(snapshot => {
      const players = snapshot.val() || {};
      if (Object.keys(players).length === 0) {
        // Usuń pokój jeśli pusty
        db.ref(`rooms/${currentRoomCode}`).remove();
      } else if (isHost) {
        // Przekaż hostowanie nowemu graczowi (pierwszemu na liście)
        const newHostId = Object.keys(players)[0];
        db.ref(`rooms/${currentRoomCode}/players/${newHostId}`).update({ isHost: true });
      }
    });
  });
  location.reload();
});

function kickPlayer(playerId) {
  if (!currentRoomCode || !isHost) return;
  db.ref(`rooms/${currentRoomCode}/players/${playerId}`).remove();
}

window.addEventListener('beforeunload', () => {
  if (currentRoomCode && currentPlayerId) {
    db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).remove();
  }
});

// Elementy DOM
const playerNameInput = document.getElementById('playerName');
const createRoomBtn = document.getElementById('createRoom');
const joinRoomBtn = document.getElementById('joinRoom');
const roomCodeInput = document.getElementById('roomCodeInput');
const statusMessage = document.getElementById('statusMessage');
const loginScreen = document.getElementById('loginScreen');
const gameScreen = document.getElementById('gameScreen');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const copyRoomCodeBtn = document.getElementById('copyRoomCode');
const impostorCountDisplay = document.getElementById('impostorCountDisplay');
const playerCountDisplay = document.getElementById('playerCountDisplay');
const roundCounter = document.getElementById('roundCounter');
const wordDisplay = document.getElementById('wordDisplay');
const playersList = document.getElementById('playersList');
const startGameBtn = document.getElementById('startGame');
const endRoundBtn = document.getElementById('endRound');
const leaveRoomBtn = document.getElementById('leaveRoom');
const messageBox = document.getElementById('messageBox');
const roleMessageBox = document.getElementById('roleMessageBox');
const categorySelectionBox = document.getElementById('categorySelectionBox');
const allCategoriesBtn = document.getElementById('allCategoriesBtn');
const categoryGrid = document.querySelector('#categorySelectionBox .category-grid');
const confirmCategories = document.getElementById('confirmCategories');
const impostorSelectionBox = document.getElementById('impostorSelectionBox');
const minusImpostor = document.getElementById('minusImpostor');
const plusImpostor = document.getElementById('plusImpostor');
const impostorCountDisplaySelector = document.getElementById('impostorCount');
const confirmImpostors = document.getElementById('confirmImpostors');
const rulesBtn = document.getElementById('rulesBtn');
const themeToggle = document.getElementById('themeToggle');
const rulesBox = document.getElementById('rulesBox');
const closeRulesBtn = document.getElementById('closeRules');
const closeRulesTopBtn = document.getElementById('closeRulesTop');
const recommendedPlayers = document.getElementById('recommendedPlayers');
const emojiSelection = document.getElementById('emojiSelection');

// Zmienne stanu gry
let currentRoomCode = null;
let currentPlayerId = null;
let currentPlayerName = null;
let isHost = false;
let words = [];
let impostorCount = 1;
let selectedCategories = [];
let hasShownStartMessage = false;
let selectedEmoji = null;

// Kategorie
const categories = [
  { name: 'Zwierzęta', file: 'animals.json' },
  { name: 'Jedzenie', file: 'food.json' },
  { name: 'Przedmioty', file: 'objects.json' },
  { name: 'Miejsca', file: 'places.json' },
  { name: 'Zawody', file: 'jobs.json' },
  { name: 'Sport', file: 'sports.json' },
  { name: 'Motoryzacja', file: 'automotive.json' },
  { name: 'Rośliny', file: 'plants.json' },
  { name: 'Geografia', file: 'geography.json' },
  { name: 'Filmy i seriale', file: 'movies_series.json' },
  { name: 'Człowiek', file: 'people.json' },
  { name: 'Muzyka', file: 'music.json' }
];
const wordsBaseUrl = 'https://raw.githubusercontent.com/kermitovsky/slowny-oszust/main/words/';

// Awatary
const emojiList = ['🐱', '🦁', '🐭', '🐶', '🐻', '🦊', '🐨', '🐰', '🐼', '🐹'];
const avatarColors = ['#8e44ad', '#e67e22', '#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#d35400'];

// Fallback słów
const fallbackWords = [
  "kot", "pies", "słoń", "lew", "pizza", "hamburger", "krzesło", "lampa", "park", "szkoła",
  "lekarz", "nauczyciel", "piłka nożna", "koszykówka", "samochód", "motocykl", "drzewo", "kwiat",
  "rzeka", "góra", "film", "serial", "człowiek", "muzyka"
];

// Inicjalizacja wyboru emotek
function initializeEmojiSelection() {
  console.log('Inicjalizacja wyboru emotek');
  emojiSelection.innerHTML = '';
  emojiList.forEach(emoji => {
    const btn = document.createElement('button');
    btn.classList.add('emoji-btn');
    btn.textContent = emoji;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedEmoji = emoji;
      console.log('Wybrano emotkę:', selectedEmoji);
    });
    emojiSelection.appendChild(btn);
  });
}
initializeEmojiSelection();

// Wykrywanie zamknięcia przeglądarki lub odświeżenia
window.addEventListener('beforeunload', () => {
  if (currentRoomCode && currentPlayerId) {
    console.log('Wykryto zamknięcie/odświeżenie, usuwanie gracza:', currentPlayerId);
    db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).remove();
  }
});

// Funkcja zamykania zasad
function closeRules() {
  console.log('Kliknięto Zamknij zasady');
  rulesBox.style.display = 'none';
  rulesBtn.classList.remove('hidden');
  themeToggle.classList.remove('hidden');
}

// Funkcja przełączania trybu
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  console.log('Przełączono na tryb:', isDark ? 'ciemny' : 'jasny');
}

// Inicjalizacja trybu
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}

// Inicjalizacja wyboru kategorii
function initializeCategorySelection() {
  console.log('Inicjalizacja wyboru kategorii');
  categoryGrid.innerHTML = '';
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.classList.add('category-btn');
    btn.textContent = category.name;
    btn.dataset.file = category.file;
    btn.addEventListener('click', () => {
      toggleCategory(category.file);
    });
    categoryGrid.appendChild(btn);
  });
  updateCategoryButtons();
  updateAllCategoriesCheckbox();
  updateConfirmCategoriesButton();
}

function toggleCategory(file) {
  if (selectedCategories.includes('all')) {
    selectedCategories = [];
  }
  if (selectedCategories.includes(file)) {
    selectedCategories = selectedCategories.filter(c => c !== file);
  } else {
    selectedCategories.push(file);
  }
  updateCategoryButtons();
  updateAllCategoriesCheckbox();
  updateConfirmCategoriesButton();
  console.log('Wybrano kategorie:', selectedCategories);
}

function updateCategoryButtons() {
  document.querySelectorAll('.category-btn').forEach(btn => {
    if (selectedCategories.includes('all') || selectedCategories.includes(btn.dataset.file)) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

function updateAllCategoriesCheckbox() {
  const allSelected = categories.every(c => selectedCategories.includes(c.file)) || selectedCategories.includes('all');
  allCategoriesBtn.querySelector('.checkbox').textContent = allSelected ? '✔' : '';
}

function updateConfirmCategoriesButton() {
  confirmCategories.disabled = selectedCategories.length === 0;
  confirmCategories.style.opacity = selectedCategories.length === 0 ? '0.5' : '1';
  confirmCategories.style.cursor = selectedCategories.length === 0 ? 'not-allowed' : 'pointer';
  console.log('Zaktualizowano przycisk Dalej, disabled:', confirmCategories.disabled);
}

allCategoriesBtn.querySelector('.checkbox').addEventListener('click', () => {
  if (selectedCategories.includes('all')) {
    selectedCategories = [];
  } else {
    selectedCategories = ['all'];
  }
  updateCategoryButtons();
  updateAllCategoriesCheckbox();
  updateConfirmCategoriesButton();
  console.log('Kliknięto Wszystkie, kategorie:', selectedCategories);
});

confirmCategories.addEventListener('click', () => {
  if (selectedCategories.length === 0) {
    showMessage('❌ Wybierz przynajmniej jedną kategorię!');
    console.log('Brak wybranych kategorii');
    return;
  }
  console.log('Potwierdzono kategorie:', selectedCategories);
  categorySelectionBox.style.display = 'none';
  impostorSelectionBox.style.display = 'block';
  document.getElementById('loadingMessage').style.display = 'block';
  confirmImpostors.disabled = true;
  loadWords().then(() => {
    document.getElementById('loadingMessage').style.display = 'none';
    confirmImpostors.disabled = false;
    impostorCount = 1;
    impostorCountDisplaySelector.textContent = impostorCount;
    updateImpostorButtons();
    updateRecommendedPlayers();
    console.log('Przełączono na wybór impostorów');
  }).catch(error => {
    document.getElementById('loadingMessage').style.display = 'none';
    confirmImpostors.disabled = false;
    showMessage('❌ Błąd ładowania kategorii! Używam domyślnych słów.');
    console.error('Błąd w confirmCategories:', error);
  });
});

async function loadWords() {
  words = [];
  const filesToLoad = selectedCategories.includes('all') ? categories.map(c => c.file) : selectedCategories;
  let loadedAnyFile = false;

  const fetchWithTimeout = async (url, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      if (!response.ok) throw new Error(`Błąd ładowania ${url}: ${response.status}`);
      return await response.json();
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  };

  try {
    const fetchPromises = filesToLoad.map(file =>
      fetchWithTimeout(`${wordsBaseUrl}${file}`)
        .then(categoryWords => {
          words = [...words, ...categoryWords];
          loadedAnyFile = true;
          console.log(`Załadowano ${categoryWords.length} słów z ${file}`);
        })
        .catch(error => {
          console.error(`Błąd ładowania pliku ${file}:`, error);
          showMessage(`❌ Błąd ładowania kategorii ${file}! Pomijam.`);
        })
    );

    await Promise.all(fetchPromises);

    if (!loadedAnyFile) {
      throw new Error('Nie udało się załadować żadnego pliku kategorii.');
    }

    console.log('Łącznie załadowano słów:', words.length);
  } catch (error) {
    console.error('Błąd ładowania słów:', error);
    try {
      const response = await fetchWithTimeout('words.json');
      words = response;
      console.log('Załadowano domyślne słowa:', words.length);
    } catch (err) {
      console.error('Błąd ładowania domyślnych słów:', err);
      showMessage('❌ Błąd ładowania słów gry! Używam wbudowanej listy.');
      words = fallbackWords;
      console.log('Użyto wbudowanej listy słów:', words.length);
    }
  }
}

fetch('words.json')
  .then(response => {
    if (!response.ok) throw new Error('Błąd ładowania words.json: ' + response.status);
    return response.json();
  })
  .then(data => {
    words = data;
    console.log('Załadowano domyślne słowa:', words.length);
  })
  .catch(error => {
    console.error('Błąd ładowania words.json:', error);
    showMessage('❌ Błąd ładowania słów gry! Używam wbudowanej listy.');
    words = fallbackWords;
    console.log('Użyto wbudowanej listy słów:', words.length);
  });

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 4).toUpperCase();
}

function assignUniqueEmoji(players) {
  const usedEmojis = Object.values(players || {}).map(p => p.emoji).filter(e => e);
  const availableEmojis = emojiList.filter(e => !usedEmojis.includes(e));
  if (selectedEmoji && !usedEmojis.includes(selectedEmoji)) {
    console.log('Użyto wybranej emotki:', selectedEmoji);
    return selectedEmoji;
  }
  if (availableEmojis.length === 0) {
    console.warn('Brak dostępnych emoji, przypisuję losowe');
    return emojiList[Math.floor(Math.random() * emojiList.length)];
  }
  const randomEmoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
  console.log('Przypisano losową emotkę:', randomEmoji);
  return randomEmoji;
}

function assignUniqueColor(players) {
  const usedColors = Object.values(players || {}).map(p => p.avatarColor).filter(c => c);
  const availableColors = avatarColors.filter(c => !usedColors.includes(c));
  if (availableColors.length === 0) {
    console.warn('Brak dostępnych kolorów, przypisuję losowy');
    return avatarColors[Math.floor(Math.random() * avatarColors.length)];
  }
  const selectedColor = availableColors[Math.floor(Math.random() * availableColors.length)];
  console.log('Przypisano kolor:', selectedColor);
  return selectedColor;
}

function updatePlayersList(players) {
  console.log('Dane players:', players);
  if (!players || !Object.keys(players).length) {
    playersList.innerHTML = '<li>Brak graczy</li>';
    return;
  }
  playersList.innerHTML = '';
  for (const [id, player] of Object.entries(players)) {
    const li = document.createElement('li');
    const avatar = document.createElement('span');
    avatar.classList.add('avatar');
    avatar.textContent = player.emoji || '❓';
    avatar.style.backgroundColor = player.avatarColor || avatarColors[0];
    li.appendChild(avatar);
    li.appendChild(document.createTextNode(` ${player.name || 'Nieznany gracz'}`));
    if (player.isHost) {
      li.classList.add('host');
      li.appendChild(document.createTextNode(' (host)'));
    }
    if (id === currentPlayerId) {
      li.classList.add('self');
    }

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
  console.log('showMessage:', text);
  messageBox.innerHTML = text;
  messageBox.style.display = 'block';
  if (text === '✅ Kod skopiowany!' || text === '❌ Nie udało się skopiować kodu') {
    messageBox.classList.add('copy-message');
    duration = 1500;
  } else {
    messageBox.classList.remove('copy-message');
  }
  setTimeout(() => {
    messageBox.style.display = 'none';
    messageBox.classList.remove('copy-message');
  }, duration);
}

function showRoleMessage(text, duration = 5000) {
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
  categorySelectionBox.style.display = 'none';
  impostorSelectionBox.style.display = 'none';
  rulesBox.style.display = 'none';
  rulesBtn.classList.remove('hidden');
  themeToggle.classList.remove('hidden');
  impostorCountDisplay.innerHTML = '';
  playerCountDisplay.innerHTML = '';
  roundCounter.innerHTML = '';
  wordDisplay.innerHTML = '';
  impostorCount = 1;
  impostorCountDisplaySelector.textContent = impostorCount;
  selectedCategories = [];
  hasShownStartMessage = false;
  selectedEmoji = null;
  document.querySelectorAll('.emoji-btn').forEach(btn => btn.classList.remove('selected'));
  updateImpostorButtons();
  updateRecommendedPlayers();
}

function updateImpostorButtons() {
  minusImpostor.disabled = impostorCount <= 1;
  plusImpostor.disabled = impostorCount >= 5;
  minusImpostor.style.opacity = impostorCount <= 1 ? '0.5' : '1';
  plusImpostor.style.opacity = impostorCount >= 5 ? '0.5' : '1';
  console.log('Zaktualizowano przyciski impostorów:', { impostorCount });
}

function updateRecommendedPlayers() {
  const minPlayers = impostorCount + 2;
  const maxPlayers = Math.min(impostorCount + 4, 10);
  recommendedPlayers.textContent = `Zalecana liczba graczy: ${minPlayers}–${maxPlayers}`;
  console.log('Zaktualizowano zalecaną liczbę graczy:', recommendedPlayers.textContent);
}

closeRulesBtn.addEventListener('click', closeRules);
closeRulesTopBtn.addEventListener('click', closeRules);

rulesBtn.addEventListener('click', () => {
  console.log('Kliknięto Zasady gry');
  rulesBox.style.display = 'block';
  rulesBtn.classList.add('hidden');
  themeToggle.classList.add('hidden');
});

themeToggle.addEventListener('click', () => {
  toggleTheme();
});

createRoomBtn.addEventListener('click', () => {
  console.log('Kliknięto Stwórz pokój');
  const name = playerNameInput.value.trim();
  if (!name) {
    showMessage('❌ Wpisz nick!');
    console.log('Brak nicku');
    return;
  }
  if (!selectedEmoji) {
    showMessage('❌ Wybierz awatar!');
    console.log('Brak wybranej emotki');
    return;
  }
  currentPlayerName = name;
  isHost = true;
  console.log('Ustawiono hosta, imię:', currentPlayerName);
  categorySelectionBox.style.display = 'block';
  console.log('Wyświetlono categorySelectionBox');
  initializeCategorySelection();
  rulesBtn.classList.add('hidden');
  themeToggle.classList.add('hidden');
});

minusImpostor.addEventListener('click', () => {
  if (impostorCount > 1) {
    impostorCount--;
    impostorCountDisplaySelector.textContent = impostorCount;
    updateImpostorButtons();
    updateRecommendedPlayers();
    console.log('Zmniejszono liczbę impostorów:', impostorCount);
  }
});

plusImpostor.addEventListener('click', () => {
  if (impostorCount < 5) {
    impostorCount++;
    impostorCountDisplaySelector.textContent = impostorCount;
    updateImpostorButtons();
    updateRecommendedPlayers();
    console.log('Zwiększono liczbę impostorów:', impostorCount);
  }
});

confirmImpostors.addEventListener('click', () => {
  console.log('Potwierdzono liczbę impostorów:', impostorCount);
  createRoom(impostorCount);
});

function createRoom(numImpostors) {
  console.log('Tworzenie pokoju z', numImpostors, 'impostorami, kategorie:', selectedCategories);
  currentRoomCode = generateRoomCode();
  currentPlayerId = db.ref().push().key;
  const emoji = assignUniqueEmoji({});
  const avatarColor = assignUniqueColor({});

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  const playerData = { name: currentPlayerName, isHost: true, role: null, emoji: emoji, avatarColor: avatarColor };
  roomRef.set({
    players: {
      [currentPlayerId]: playerData
    },
    gameStarted: false,
    currentWord: null,
    resetMessage: null,
    starterId: null,
    numImpostors: numImpostors,
    categories: selectedCategories,
    currentRound: 0
  }).then(() => {
    console.log('Pokój utworzony:', currentRoomCode, 'Gracz:', playerData, 'Kategorie:', selectedCategories);
    loginScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    roomCodeDisplay.textContent = currentRoomCode;
    impostorSelectionBox.style.display = 'none';
    rulesBtn.classList.remove('hidden');
    themeToggle.classList.remove('hidden');
    db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).onDisconnect().remove();
    listenToRoom(currentRoomCode);
  }).catch(error => {
    console.error('Błąd tworzenia pokoju:', error);
    showMessage('❌ Błąd tworzenia pokoju!');
    rulesBtn.classList.remove('hidden');
    themeToggle.classList.remove('hidden');
  });
}

joinRoomBtn.addEventListener('click', () => {
  console.log('Kliknięto Dołącz do pokoju');
  const name = playerNameInput.value.trim();
  const roomCode = roomCodeInput.value.trim().toUpperCase();

  if (!name || !roomCode) {
    showMessage('❌ Wpisz nick i kod pokoju!');
    console.log('Brak nicku lub kodu pokoju');
    roomCodeInput.value = '';
    return;
  }
  if (!selectedEmoji) {
    showMessage('❌ Wybierz awatar!');
    console.log('Brak wybranej emotki');
    return;
  }

  currentPlayerName = name;
  currentRoomCode = roomCode;
  currentPlayerId = db.ref().push().key;
  console.log('Dołączanie do pokoju:', roomCode, 'Nick:', name);

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.once('value').then(snapshot => {
    if (!snapshot.exists()) {
      showMessage('❌ Pokój nie istnieje!');
      console.log('Pokój nie istnieje:', roomCode);
      roomCodeInput.value = '';
      return;
    }

    const room = snapshot.val();
    const players = room.players || {};
    if (Object.keys(players).length >= 10) {
      showMessage('❌ Pokój jest pełny! Maksymalnie 10 graczy.');
      console.log('Pokój pełny:', roomCode);
      roomCodeInput.value = '';
      return;
    }

    const emoji = assignUniqueEmoji(players);
    const avatarColor = assignUniqueColor(players);
    const playerData = { name: currentPlayerName, isHost: false, role: null, emoji: emoji, avatarColor: avatarColor };
    roomRef.child('players').update({
      [currentPlayerId]: playerData
    }).then(() => {
      console.log('Dołączono do pokoju:', roomCode, 'Gracz:', playerData);
      loginScreen.style.display = 'none';
      gameScreen.style.display = 'block';
      roomCodeDisplay.textContent = currentRoomCode;
      selectedCategories = room.categories || ['all'];
      loadWords();
      db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).onDisconnect().remove();
      listenToRoom(currentRoomCode);
    }).catch(error => {
      console.error('Błąd dołączania do pokoju:', error);
      showMessage('❌ Błąd dołączania do pokoju!');
      roomCodeInput.value = '';
    });
  }).catch(error => {
    console.error('Błąd sprawdzania pokoju:', error);
    showMessage('❌ Błąd sprawdzania pokoju!');
    roomCodeInput.value = '';
  });
});

copyRoomCodeBtn.addEventListener('click', () => {
  console.log('Kliknięto Kopiuj kod');
  const roomCode = roomCodeDisplay.textContent;
  navigator.clipboard.writeText(roomCode).then(() => {
    showMessage('✅ Kod skopiowany!');
  }).catch(() => {
    showMessage('❌ Nie udało się skopiować kodu');
  });
});

function kickPlayer(playerId) {
  if (!isHost || playerId === currentPlayerId) return;
  console.log('Wyrzucanie gracza:', playerId);
  db.ref(`rooms/${currentRoomCode}/players/${playerId}`).remove().then(() => {
    console.log('Gracz wyrzucony:', playerId);
  }).catch(error => {
    console.error('Błąd wyrzucania gracza:', error);
    showMessage('❌ Błąd wyrzucania gracza!');
  });
}

leaveRoomBtn.addEventListener('click', () => {
  console.log('Kliknięto Opuść pokój');
  if (currentRoomCode && currentPlayerId) {
    const roomRef = db.ref(`rooms/${currentRoomCode}`);
    roomRef.child(`players/${currentPlayerId}`).remove().then(() => {
      console.log('Gracz opuścił pokój:', currentPlayerId);
      if (isHost) {
        roomRef.remove().then(() => {
          console.log('Pokój usunięty przez hosta:', currentRoomCode);
        }).catch(error => {
          console.error('Błąd usuwania pokoju:', error);
          showMessage('❌ Błąd usuwania pokoju!');
        });
      }
      resetToLobby();
      loginScreen.style.display = 'block';
      gameScreen.style.display = 'none';
      currentRoomCode = null;
      currentPlayerId = null;
      isHost = false;
      roomCodeInput.value = '';
      playerNameInput.value = '';
    }).catch(error => {
      console.error('Błąd opuszczania pokoju:', error);
      showMessage('❌ Błąd opuszczania pokoju!');
    });
  }
});

function listenToRoom(roomCode) {
  const roomRef = db.ref(`rooms/${roomCode}`);
  roomRef.on('value', snapshot => {
    const room = snapshot.val();
    if (!room) {
      console.log('Pokój usunięty:', roomCode);
      showMessage('❌ Pokój został usunięty!');
      resetToLobby();
      loginScreen.style.display = 'block';
      gameScreen.style.display = 'none';
      currentRoomCode = null;
      currentPlayerId = null;
      isHost = false;
      return;
    }

    const players = room.players || {};
    updatePlayersList(players);
    playerCountDisplay.innerHTML = `Gracze: <span class="bold">${Object.keys(players).length}</span>`;
    impostorCountDisplay.innerHTML = `Impostorzy: <span class="bold">${room.numImpostors || 0}</span>`;
    roundCounter.innerHTML = room.currentRound > 0 ? `Runda: <strong>${room.currentRound}</strong>` : '';
    wordDisplay.innerHTML = room.gameStarted && room.currentWord && players[currentPlayerId]
      ? (players[currentPlayerId].role === 'impostor'
        ? `Twoje słowo: <span class="word-impostor">OSZUST!</span>`
        : `Twoje słowo: <span class="word-normal">${room.currentWord}</span>`)
      : '';

    isHost = players[currentPlayerId]?.isHost || false;
    startGameBtn.style.display = isHost && !room.gameStarted ? 'block' : 'none';
    endRoundBtn.style.display = isHost && room.gameStarted ? 'block' : 'none';

    if (room.gameStarted && room.currentWord && players[currentPlayerId]) {
      const isImpostor = players[currentPlayerId].role === 'impostor';
      const message = isImpostor ? 'Jesteś oszustem!' : `Słowo: ${room.currentWord}`;
      showRoleMessage(message, 5000);
      if (room.starterId && !hasShownStartMessage && players[room.starterId]) {
        setTimeout(() => {
          showMessage(`Zaczyna mówić: <strong>${players[room.starterId].name}</strong>`, 5000);
          hasShownStartMessage = true;
        }, 5000);
      }
    } else {
      hasShownStartMessage = false;
    }

    if (room.resetMessage) {
      showMessage(room.resetMessage);
      if (isHost) {
        db.ref(`rooms/${currentRoomCode}/resetMessage`).remove();
      }
    }
  });
}

startGameBtn.addEventListener('click', () => {
  console.log('Kliknięto Start gry');
  if (!isHost) {
    console.log('Tylko host może rozpocząć grę');
    return;
  }

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.once('value').then(snapshot => {
    const room = snapshot.val();
    const players = room.players || {};
    const numPlayers = Object.keys(players).length;
    const minPlayers = room.numImpostors + 2;

    if (numPlayers < minPlayers) {
      showMessage(`❌ Za mało graczy! Minimum ${minPlayers}.`);
      console.log('Za mało graczy:', numPlayers, 'Minimum:', minPlayers);
      return;
    }

    if (words.length === 0) {
      showMessage('❌ Brak słów do gry!');
      console.log('Brak słów do gry');
      return;
    }

    const word = words[Math.floor(Math.random() * words.length)];
    const playerIds = Object.keys(players);
    const impostorIds = [];
    const shuffledIds = playerIds.sort(() => Math.random() - 0.5);
    for (let i = 0; i < room.numImpostors; i++) {
      if (shuffledIds[i]) impostorIds.push(shuffledIds[i]);
    }

    const updates = {};
    playerIds.forEach(id => {
      updates[`players/${id}/role`] = impostorIds.includes(id) ? 'impostor' : 'normal';
    });

    const nonImpostorIds = playerIds.filter(id => !impostorIds.includes(id));
    let starterId;
    if (nonImpostorIds.length > 0) {
      starterId = nonImpostorIds[Math.floor(Math.random() * nonImpostorIds.length)];
    } else {
      starterId = playerIds[Math.floor(Math.random() * playerIds.length)];
    }

    updates.gameStarted = true;
    updates.currentWord = word;
    updates.starterId = starterId;
    updates.currentRound = (room.currentRound || 0) + 1;

    roomRef.update(updates).then(() => {
      console.log('Gra rozpoczęta:', { word, impostorIds, starterId });
      showMessage('Gra rozpoczęta!', 3000);
    }).catch(error => {
      console.error('Błąd rozpoczynania gry:', error);
      showMessage('❌ Błąd rozpoczynania gry!');
    });
  }).catch(error => {
    console.error('Błąd pobierania danych pokoju:', error);
    showMessage('❌ Błąd pobierania danych pokoju!');
  });
});

endRoundBtn.addEventListener('click', () => {
  console.log('Kliknięto Zakończ rundę');
  if (!isHost) {
    console.log('Tylko host może zakończyć rundę');
    return;
  }

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.once('value').then(snapshot => {
    const room = snapshot.val();
    const players = room.players || {};
    const currentWord = room.currentWord;
    const impostorIds = Object.keys(players).filter(id => players[id].role === 'impostor');
    const impostorNames = impostorIds.map(id => players[id].name).join(', ');

    const updates = {
      gameStarted: false,
      currentWord: null,
      starterId: null,
      resetMessage: `Runda zakończona! Słowo: <strong>${currentWord}</strong><br>Impostorzy: <strong>${impostorNames || 'Brak'}</strong>`
    };
    Object.keys(players).forEach(id => {
      updates[`players/${id}/role`] = null;
    });

    roomRef.update(updates).then(() => {
      console.log('Runda zakończona:', { word: currentWord, impostorIds });
      hasShownStartMessage = false;
    }).catch(error => {
      console.error('Błąd kończenia rundy:', error);
      showMessage('❌ Błąd kończenia rundy!');
    });
  }).catch(error => {
    console.error('Błąd pobierania danych pokoju:', error);
    showMessage('❌ Błąd pobierania danych pokoju!');
  });
});

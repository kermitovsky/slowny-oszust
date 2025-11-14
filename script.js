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

// Elementy Głosowania
const startVoteBtn = document.getElementById('startVoteBtn');
const confirmVoteBtn = document.getElementById('confirmVoteBtn');
const voteResultDisplay = document.getElementById('voteResultDisplay');

// Elementy Podpowiedzi
const impostorHintBox = document.getElementById('impostorHintBox');
const hintChanceSlider = document.getElementById('hintChanceSlider');
const hintOnStartCheckbox = document.getElementById('hintOnStartCheckbox');
const confirmHintSettingsBtn = document.getElementById('confirmHintSettingsBtn');
const hintChanceInfoDisplay = document.getElementById('hintChanceInfoDisplay');
const hintCheckboxContainer = document.querySelector('#impostorHintBox .checkbox-container');

// NOWE ELEMENTY DOM DLA WŁASNYCH KATEGORII
const createCustomCategoryBtn = document.getElementById('createCustomCategoryBtn');
const customCategoryBox = document.getElementById('customCategoryBox');
const closeCustomCategoryBtn = document.getElementById('closeCustomCategoryBtn');
const customCategoryNameInput = document.getElementById('customCategoryNameInput');
const customWordInput = document.getElementById('customWordInput');
const addCustomWordBtn = document.getElementById('addCustomWordBtn');
const customWordsList = document.getElementById('customWordsList');
const saveCustomCategoryBtn = document.getElementById('saveCustomCategoryBtn');


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
let selectedPlayerId = null; 

let hintChance = 0; 
let hintOnStart = false; 
const hintChanceValues = ['0%', '25%', '50%', '75%', '100%'];
const hintChanceNumeric = [0, 0.25, 0.5, 0.75, 1];

// NOWE ZMIENNE DLA WŁASNYCH KATEGORII
let tempCustomWords = []; // Tymczasowa lista słów przy tworzeniu
let customCategories = []; // Lokalna kopia własnych kategorii { name, file, words, isCustom }

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
  { word: "kot", category: "Zwierzęta" },
  { word: "pies", category: "Zwierzęta" },
  { word: "pizza", category: "Jedzenie" },
  { word: "krzesło", category: "Przedmioty" },
  { word: "park", category: "Miejsca" },
  { word: "lekarz", category: "Zawody" },
  { word: "piłka nożna", category: "Sport" },
  { word: "samochód", category: "Motoryzacja" },
  { word: "drzewo", category: "Rośliny" },
  { word: "rzeka", category: "Geografia" },
  { word: "film", category: "Filmy i seriale" },
  { word: "muzyka", category: "Muzyka" }
];

// --- Funkcja do pobierania z limitem czasu ---
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

// *** NOWA FUNKCJA: "Zapamiętaj Mnie" ***
function loadFromLocalStorage() {
  const savedNick = localStorage.getItem('slownyOszustNick');
  const savedEmoji = localStorage.getItem('slownyOszustEmoji');
  
  if (savedNick) {
    playerNameInput.value = savedNick;
    console.log('Wczytano nick z localStorage:', savedNick);
  }
  
  if (savedEmoji) {
    selectedEmoji = savedEmoji;
    console.log('Wczytano emoji z localStorage:', savedEmoji);
    // Znajdź i zaznacz przycisk emoji
    document.querySelectorAll('.emoji-btn').forEach(btn => {
      if (btn.textContent === savedEmoji) {
        btn.classList.add('selected');
      }
    });
  }
}

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
  
  // Po stworzeniu przycisków, wczytaj zapisane dane
  loadFromLocalStorage();
}
initializeEmojiSelection(); // Odpalenie

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
  // Usuń tylko standardowe kategorie, nie przycisk "Stwórz"
  categoryGrid.querySelectorAll('.category-btn:not(.custom-new-btn)').forEach(btn => btn.remove());
  
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.classList.add('category-btn');
    btn.textContent = category.name;
    btn.dataset.file = category.file;
    btn.dataset.categoryName = category.name; 
    btn.addEventListener('click', () => {
      toggleCategory(category); 
    });
    // Wstaw przed przyciskiem "Stwórz własną"
    categoryGrid.insertBefore(btn, createCustomCategoryBtn);
  });
  
  updateCategoryButtons();
  updateAllCategoriesCheckbox();
  updateConfirmCategoriesButton();
}

function toggleCategory(category) {
  if (selectedCategories.some(c => c.file === 'all')) {
    selectedCategories = [];
  }
  
  const index = selectedCategories.findIndex(c => c.file === category.file);
  
  if (index > -1) {
    selectedCategories.splice(index, 1);
  } else {
    selectedCategories.push(category);
  }
  
  updateCategoryButtons();
  updateAllCategoriesCheckbox();
  updateConfirmCategoriesButton();
  console.log('Wybrano kategorie:', selectedCategories.map(c => c.name));
}

function updateCategoryButtons() {
  document.querySelectorAll('.category-btn:not(.custom-new-btn)').forEach(btn => {
    if (selectedCategories.some(c => c.file === 'all') || selectedCategories.some(c => c.file === btn.dataset.file)) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

function updateAllCategoriesCheckbox() {
  const allSelected = categories.every(c => selectedCategories.some(sc => sc.file === c.file)) || selectedCategories.some(c => c.file === 'all');
  allCategoriesBtn.querySelector('.checkbox').textContent = allSelected ? '✔' : '';
}

function updateConfirmCategoriesButton() {
  confirmCategories.disabled = selectedCategories.length === 0;
  confirmCategories.style.opacity = selectedCategories.length === 0 ? '0.5' : '1';
  confirmCategories.style.cursor = selectedCategories.length === 0 ? 'not-allowed' : 'pointer';
  console.log('Zaktualizowano przycisk Dalej, disabled:', confirmCategories.disabled);
}

allCategoriesBtn.querySelector('.checkbox').addEventListener('click', () => {
  if (selectedCategories.some(c => c.file === 'all')) {
    selectedCategories = [];
  } else {
    selectedCategories = [{ name: 'Wszystkie', file: 'all' }];
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
  console.log('Potwierdzono kategorie:', selectedCategories.map(c => c.name));
  categorySelectionBox.style.display = 'none';
  impostorSelectionBox.style.display = 'block';
  document.getElementById('loadingMessage').style.display = 'block';
  confirmImpostors.disabled = true;
  
  // ZMIANA: Przekaż wybrane kategorie do loadWords
  loadWords(selectedCategories).then(() => {
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

// *** ZMIANA: Ta funkcja teraz ładuje TYLKO to, co jej każesz ***
async function loadWords(categoriesToLoad) {
  words = []; // Zawsze zaczynaj z czystą listą
  
  const categoriesToFetch = categoriesToLoad.filter(c => !c.isCustom && c.file !== 'all');
  const localCategories = categoriesToLoad.filter(c => c.isCustom);
  
  if (categoriesToLoad.some(c => c.file === 'all')) {
    categoriesToFetch.push(...categories); // Dodaj wszystkie standardowe kategorie
  }
  
  let loadedAnyFile = false;

  try {
    const fetchPromises = categoriesToFetch.map(category =>
      fetchWithTimeout(`${wordsBaseUrl}${category.file}`)
        .then(categoryWords => {
          const mappedWords = categoryWords.map(word => ({
            word: word,
            category: category.name 
          }));
          words = [...words, ...mappedWords];
          loadedAnyFile = true;
          console.log(`Załadowano ${categoryWords.length} słów z ${category.name}`);
        })
        .catch(error => {
          console.error(`Błąd ładowania pliku ${category.file}:`, error);
          if (category.file !== 'all') {
             showMessage(`❌ Błąd ładowania kategorii ${category.name}! Pomijam.`);
          }
        })
    );
    await Promise.all(fetchPromises);

    // Dodaj słowa z własnych kategorii
    for (const category of localCategories) {
      const mappedWords = category.words.map(word => ({
        word: word,
        category: category.name
      }));
      words = [...words, ...mappedWords];
      loadedAnyFile = true;
      console.log(`Załadowano ${mappedWords.length} słów z własnej kategorii: ${category.name}`);
    }

    if (!loadedAnyFile && localCategories.length === 0) { // Jeśli nie załadowano nic I nie ma własnych
      throw new Error('Nie udało się załadować żadnego pliku kategorii.');
    }

    console.log('Łącznie załadowano słów:', words.length);
  } catch (error) {
    console.error('Błąd ładowania słów:', error);
    // Zawsze miej fallback
    words = fallbackWords; 
    console.log('Użyto wbudowanej listy słów:', words.length);
  }
}

// Początkowe ładowanie słów (teraz ładuje tylko fallback)
words = fallbackWords;
console.log('Załadowano domyślne słowa (fallback):', words.length);


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

function updatePlayersList(players, localIsHost) {
  playersList.innerHTML = '';
  if (!players || !Object.keys(players).length) {
    playersList.innerHTML = '<li>Brak graczy</li>';
    return;
  }
  
  for (const [id, player] of Object.entries(players)) {
    const li = document.createElement('li');
    li.dataset.playerId = id;
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

    if (localIsHost && id !== currentPlayerId) {
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
  roleMessageBox.innerHTML = text.replace('\n', '<br>');
  roleMessageBox.style.display = 'block';
  setTimeout(() => {
    roleMessageBox.style.display = 'none';
  }, duration);
}

function resetToLobby() {
  startGameBtn.style.display = isHost ? 'block' : 'none';
  startVoteBtn.style.display = 'none';
  confirmVoteBtn.style.display = 'none';
  endRoundBtn.style.display = 'none';
  roleMessageBox.style.display = 'none';
  categorySelectionBox.style.display = 'none';
  impostorSelectionBox.style.display = 'none';
  impostorHintBox.style.display = 'none';
  rulesBox.style.display = 'none';
  rulesBtn.classList.remove('hidden');
  themeToggle.classList.remove('hidden');
  impostorCountDisplay.innerHTML = '';
  playerCountDisplay.innerHTML = '';
  hintChanceInfoDisplay.innerHTML = '';
  roundCounter.innerHTML = '';
  wordDisplay.innerHTML = '';
  impostorCount = 1;
  impostorCountDisplaySelector.textContent = impostorCount;
  selectedCategories = [];
  customCategories = []; // Wyczyść własne kategorie
  // Usuń przyciski własnych kategorii z siatki
  document.querySelectorAll('.custom-category-btn').forEach(btn => btn.remove());
  
  hasShownStartMessage = false;
  selectedEmoji = null;
  selectedPlayerId = null; 
  
  hintChance = 0;
  hintOnStart = false;
  hintChanceSlider.value = 0;
  document.querySelectorAll('.slider-labels .slider-label').forEach((label, index) => {
    if (index === 0) {
      label.classList.add('label-active');
    } else {
      label.classList.remove('label-active');
    }
  });
  hintOnStartCheckbox.checked = false;
  hintCheckboxContainer.classList.remove('disabled');
  hintOnStartCheckbox.disabled = false;
  
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
  
  // ZAPISZ DANE ("Zapamiętaj Mnie")
  localStorage.setItem('slownyOszustNick', name);
  localStorage.setItem('slownyOszustEmoji', selectedEmoji);
  
  currentPlayerName = name;
  isHost = true;
  console.log('Ustawiono hosta, imię:', currentPlayerName);
  categorySelectionBox.style.display = 'block';
  console.log('Wyświetlono categorySelectionBox');
  initializeCategorySelection(); // Zbuduj listę kategorii
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
  impostorSelectionBox.style.display = 'none';
  impostorHintBox.style.display = 'block';
});

hintChanceSlider.addEventListener('input', (e) => {
  hintChance = parseInt(e.target.value, 10);
  console.log('Szansa na podpowiedź:', hintChanceValues[hintChance]);
  
  const labels = document.querySelectorAll('.slider-labels .slider-label');
  labels.forEach((label, index) => {
    if (index === hintChance) {
      label.classList.add('label-active');
    } else {
      label.classList.remove('label-active');
    }
  });

  if (hintChance === 4) { // 100%
    hintOnStartCheckbox.disabled = true;
    hintOnStartCheckbox.checked = false; 
    hintOnStart = false; 
    hintCheckboxContainer.classList.add('disabled');
  } else {
    hintOnStartCheckbox.disabled = false;
    hintCheckboxContainer.classList.remove('disabled');
  }
});

hintOnStartCheckbox.addEventListener('change', (e) => {
  hintOnStart = e.target.checked;
  console.log('Podpowiedź przy starcie impostora:', hintOnStart);
});

confirmHintSettingsBtn.addEventListener('click', () => {
  console.log('Potwierdzono ustawienia podpowiedzi, tworzenie pokoju...');
  createRoom(impostorCount, hintChance, hintOnStart);
});

// *** ZMIANA: createRoom() zapisuje teraz WŁASNE kategorie ***
function createRoom(numImpostors, chanceIndex, onStart) {
  // Przygotuj własne kategorie do zapisu
  const customCategoriesToSave = selectedCategories
    .filter(c => c.isCustom)
    .map(c => ({ name: c.name, words: c.words })); // Zapisz tylko nazwę i słowa

  console.log('Tworzenie pokoju z', numImpostors, 'impostorami, kategorie:', selectedCategories.map(c => c.name));
  console.log('Ustawienia podpowiedzi:', hintChanceValues[chanceIndex], 'na starcie:', onStart);
  
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
    votingActive: false,
    currentWord: null,
    currentCategory: null, 
    impostorHint: null, 
    resetMessage: null,
    starterId: null,
    numImpostors: numImpostors,
    categories: selectedCategories.map(c => c.name), // Zapisz nazwy wszystkich
    customCategories: customCategoriesToSave || [], // Zapisz pełne dane własnych
    hintChance: chanceIndex,
    hintOnStart: onStart
  }).then(() => {
    console.log('Pokój utworzony:', currentRoomCode);
    loginScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    roomCodeDisplay.textContent = currentRoomCode;
    impostorHintBox.style.display = 'none';
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

// *** ZMIANA: joinRoom() wczytuje WŁASNE kategorie ***
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

  // ZAPISZ DANE ("Zapamiętaj Mnie")
  localStorage.setItem('slownyOszustNick', name);
  localStorage.setItem('slownyOszustEmoji', selectedEmoji);
  
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

    if (room.gameStarted) {
      showMessage('❌ Gra już się rozpoczęła! Poczekaj na koniec rundy.');
      console.log('Próba dołączenia do trwającej gry:', roomCode);
      roomCodeInput.value = '';
      return;
    }

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
      
      // *** NOWA LOGIKA TWORZENIA LISTY KATEGORII ***
      const categoryNames = room.categories || ['Wszystkie'];
      // Odtwórz listę standardowych kategorii
      let standardCategories = [];
      if (categoryNames.includes('Wszystkie')) {
        standardCategories = [{ name: 'Wszystkie', file: 'all' }];
      } else {
        standardCategories = categories.filter(c => categoryNames.includes(c.name));
      }
      // Odtwórz listę własnych kategorii z Firebase
      const customCategoriesData = room.customCategories || [];
      customCategories = customCategoriesData.map(c => ({ 
        ...c, 
        file: `custom_${c.name}`, 
        isCustom: true 
      }));
      
      // Połącz obie listy, aby załadować słowa
      selectedCategories = [...standardCategories, ...customCategories];
      
      loadWords(selectedCategories); 
      
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

function updatePlayersListForVoting(players) {
  playersList.innerHTML = '';
  if (!players || !Object.keys(players).length) {
    playersList.innerHTML = '<li>Brak graczy</li>';
    return;
  }

  const myVote = players[currentPlayerId]?.votedFor;

  for (const [id, player] of Object.entries(players)) {
    const li = document.createElement('li');
    li.dataset.playerId = id;
    const avatar = document.createElement('span');
    avatar.classList.add('avatar');
    avatar.textContent = player.emoji || '❓';
    avatar.style.backgroundColor = player.avatarColor || avatarColors[0];
    li.appendChild(avatar);
    li.appendChild(document.createTextNode(` ${player.name || 'Nieznany gracz'}`));
    
    if (player.isHost) {
      li.classList.add('host');
    }

    if (player.votedFor) {
      li.classList.add('has-voted');
    }

    if (myVote) {
      li.classList.add('disabled');
      if (myVote === id) {
        li.classList.add('player-selected');
      }
    } else {
      if (id === currentPlayerId) {
        li.classList.add('self', 'disabled');
      } else {
        li.classList.add('vote-target');
        if (selectedPlayerId === id) {
          li.classList.add('player-selected');
        }
        li.addEventListener('click', () => {
          selectedPlayerId = id;
          updatePlayersListForVoting(players); 
        });
      }
    }
    playersList.appendChild(li);
  }
}

function voteForPlayer(targetId) {
  console.log(`Głosuję na: ${targetId}`);
  db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).update({
    votedFor: targetId
  });
  selectedPlayerId = null;
}

function tallyVotes(room) {
  console.log('Podliczanie głosów...');
  const players = room.players;
  const playerIds = Object.keys(players);
  const votes = {};
  let totalVotes = 0;

  for (const playerId of playerIds) {
    const votedFor = players[playerId].votedFor;
    if (votedFor) {
      totalVotes++;
      votes[votedFor] = (votes[votedFor] || 0) + 1;
    }
  }

  if (totalVotes < playerIds.length) {
    console.log('Jeszcze nie wszyscy zagłosowali.');
    return;
  }

  let maxVotes = 0;
  let ejectedPlayerId = null;
  let isTie = false;

  for (const [playerId, count] of Object.entries(votes)) {
    if (count > maxVotes) {
      maxVotes = count;
      ejectedPlayerId = playerId;
      isTie = false;
    } else if (count === maxVotes && maxVotes > 0) {
      isTie = true;
    }
  }
  
  console.log('Wyniki głosowania:', votes, 'Wyrzucony:', ejectedPlayerId, 'Remis:', isTie);

  const updates = {
    votingActive: false,
    resetMessage: null,
    impostorHint: null, 
    currentCategory: null, 
  };

  playerIds.forEach(id => {
    updates[`players/${id}/votedFor`] = null;
  });

  if (isTie || !ejectedPlayerId) {
    updates.resetMessage = `REMIS! Nikt nie odpada.<br>Kontynuujcie dyskusję!`;
  } else {
    const ejectedPlayer = players[ejectedPlayerId];
    
    updates.gameStarted = false;
    updates.currentWord = null;
    updates.starterId = null;
    
    playerIds.forEach(id => {
      updates[`players/${id}/role`] = null;
    });

    if (ejectedPlayer.role === 'impostor') {
      updates.resetMessage = `Impostor został wykryty!<br>(Oszust: <strong>${ejectedPlayer.name}</strong>)<br>Słowo: <strong>${room.currentWord}</strong>`;
    } else {
      updates.resetMessage = `Impostor wygrał rundę!<br>(Wygłosowano <strong>${ejectedPlayer.name}</strong>)<br>Słowo: <strong>${room.currentWord}</strong>`;
    }
  }

  db.ref(`rooms/${currentRoomCode}`).update(updates);
}


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
    const playerIds = Object.keys(players);
    const hostExists = Object.values(players).some(p => p.isHost);
    const iAmInRoom = players[currentPlayerId];
    const votingActive = room.votingActive || false;
    const myVote = iAmInRoom ? iAmInRoom.votedFor : null;

    if (!hostExists && iAmInRoom && playerIds.length > 0) {
      console.warn('Brak hosta! Wybieranie nowego...');
      const sortedPlayerIds = playerIds.sort();
      const newHostId = sortedPlayerIds[0];
      
      if (newHostId === currentPlayerId) {
        console.log('To ja! Promuję się na nowego hosta. Czekam na odświeżenie...');
        db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).update({ isHost: true });
        return; 
      }
    }

    isHost = iAmInRoom ? iAmInRoom.isHost : false; 

    if (votingActive) {
      document.body.classList.add('voting-active');
      wordDisplay.innerHTML = "<strong>Czas na głosowanie! Kto jest oszustem?</strong>";
      updatePlayersListForVoting(players);
    } else {
      document.body.classList.remove('voting-active');
      selectedPlayerId = null;
      updatePlayersList(players, isHost); 
    }

    document.querySelectorAll('.kickBtn').forEach(btn => {
      btn.disabled = room.gameStarted || votingActive;
      btn.style.opacity = (room.gameStarted || votingActive) ? '0.5' : '1';
      btn.style.cursor = (room.gameStarted || votingActive) ? 'not-allowed' : 'pointer';
    });

    playerCountDisplay.innerHTML = `Gracze: <span class="bold">${playerIds.length}</span>`;
    impostorCountDisplay.innerHTML = `Impostorzy: <span class="bold">${room.numImpostors || 0}</span>`;
    roundCounter.innerHTML = room.currentRound > 0 ? `Runda: <strong>${room.currentRound}</strong>` : '';
    
    const hintChanceText = hintChanceValues[room.hintChance || 0];
    const hintOnStartText = room.hintOnStart ? " (Start)" : "";
    hintChanceInfoDisplay.innerHTML = `Podpowiedź: <span class="bold">${hintChanceText}${hintOnStartText}</span>`;

    if (!votingActive) {
      wordDisplay.innerHTML = room.gameStarted && room.currentWord && iAmInRoom
        ? (iAmInRoom.role === 'impostor'
          ? `Twoje słowo: <span class="word-impostor">OSZUST!</span>`
          : `Twoje słowo: <span class="word-normal">${room.currentWord}</span>`)
        : '';
    }

    startGameBtn.style.display = isHost && !room.gameStarted && !votingActive ? 'block' : 'none';
    startVoteBtn.style.display = isHost && room.gameStarted && !votingActive ? 'block' : 'none';
    confirmVoteBtn.style.display = votingActive && !myVote ? 'block' : 'none';
    endRoundBtn.style.display = 'none';

    if (room.gameStarted && !votingActive && room.currentWord && iAmInRoom) {
      const isImpostor = iAmInRoom.role === 'impostor';
      const hint = room.impostorHint; 
      
      let message;
      if (isImpostor) {
        const hintText = hint ? `\n(Podpowiedź: ${hint})` : '';
        message = `Jesteś oszustem!${hintText}`;
      } else {
        message = `Słowo: ${room.currentWord}`;
      }

      if (!hasShownStartMessage) {
        showRoleMessage(message, 5000);
      }
      
      if (room.starterId && !hasShownStartMessage && players[room.starterId]) {
        hasShownStartMessage = true; 
        setTimeout(() => {
          showMessage(`Zaczyna mówić: <strong>${players[room.starterId].name}</strong>`, 5000);
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
    
    if (votingActive) {
      const totalPlayers = playerIds.length;
      const votes = playerIds.map(id => players[id].votedFor).filter(Boolean);
      
      if (votes.length === totalPlayers) {
        if (isHost) {
          tallyVotes(room);
        }
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

    // WAŻNE: 'words' teraz zawiera TYLKO słowa z wybranych kategorii
    // (załadowane, gdy host klikał "Dalej" w 'confirmCategories')
    if (words.length === 0) {
      showMessage('❌ Brak słów! Spróbuj ponownie utworzyć pokój i wybrać kategorie.');
      console.log('Host próbował wystartować grę, ale "words" było puste.');
      return;
    }

    const wordObject = words[Math.floor(Math.random() * words.length)];
    const word = wordObject.word;
    const category = wordObject.category;
    console.log(`Wylosowano słowo: ${word} (Kategoria: ${category})`);

    const playerIds = Object.keys(players);
    const impostorIds = [];
    const shuffledIds = playerIds.sort(() => Math.random() - 0.5);
    for (let i = 0; i < room.numImpostors; i++) {
      if (shuffledIds[i]) impostorIds.push(shuffledIds[i]);
    }

    const updates = {};
    playerIds.forEach(id => {
      updates[`players/${id}/role`] = impostorIds.includes(id) ? 'impostor' : 'normal';
      updates[`players/${id}/votedFor`] = null;
    });

    const nonImpostorIds = playerIds.filter(id => !impostorIds.includes(id));
    let selectionPool = [...playerIds];
    selectionPool = selectionPool.concat(nonImpostorIds);
    let starterId = selectionPool[Math.floor(Math.random() * selectionPool.length)];

    let hint = null;
    const hintChanceValue = hintChanceNumeric[room.hintChance || 0];
    const impostorStarted = impostorIds.includes(starterId);

    if (room.hintOnStart && impostorStarted) {
      hint = category;
      console.log('Przyznano podpowiedź (Impostor zaczyna)');
    } else if (Math.random() < hintChanceValue) {
      hint = category;
      console.log('Przyznano podpowiedź (Rzut procentowy)');
    } else {
      console.log('Nie przyznano podpowiedzi');
    }

    updates.gameStarted = true;
    updates.votingActive = false; 
    updates.currentWord = word;
    updates.currentCategory = category;
    updates.impostorHint = hint; 
    updates.starterId = starterId;
    updates.currentRound = (room.currentRound || 0) + 1;

    roomRef.update(updates).then(() => {
      console.log('Gra rozpoczęta:', { word, impostorIds, starterId, hint });
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

startVoteBtn.addEventListener('click', () => {
  console.log('Kliknięto Rozpocznij głosowanie');
  if (!isHost) {
    console.log('Tylko host może rozpocząć głosowanie');
    return;
  }
  db.ref(`rooms/${currentRoomCode}`).update({ 
    votingActive: true 
  });
});

confirmVoteBtn.addEventListener('click', () => {
  if (!selectedPlayerId) {
    showMessage('❌ Najpierw wybierz gracza, na którego chcesz zagłosować!', 2500);
    return;
  }
  voteForPlayer(selectedPlayerId);
});

// Przycisk "Zakończ rundę" (DEBUG)
endRoundBtn.addEventListener('click', () => {
  console.log('Kliknięto Zakończ rundę (PRZYCISK PANIKI)');
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
      votingActive: false, 
      currentWord: null,
      currentCategory: null,
      impostorHint: null, 
      starterId: null,
      resetMessage: `Runda zakończona! Słowo: <strong>${currentWord}</strong><br>Impostorzy: <strong>${impostorNames || 'Brak'}</strong>`
    };
    Object.keys(players).forEach(id => {
      updates[`players/${id}/role`] = null;
      updates[`players/${id}/votedFor`] = null;
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

// *** NOWE FUNKCJE DLA WŁASNYCH KATEGORII ***

function showCustomCategoryModal() {
  console.log('Otwieranie modala własnej kategorii...');
  // Wyczyść stan
  tempCustomWords = [];
  customCategoryNameInput.value = '';
  customWordInput.value = '';
  updateTempWordsList(); // Wyczyść listę UI
  saveCustomCategoryBtn.disabled = true; // Zablokuj przycisk zapisu
  
  customCategoryBox.style.display = 'block';
  categorySelectionBox.style.display = 'none'; // Ukryj poprzedni modal
}

function hideCustomCategoryModal() {
  console.log('Zamykanie modala własnej kategorii...');
  customCategoryBox.style.display = 'none';
  categorySelectionBox.style.display = 'block'; // Pokaż z powrotem wybór kategorii
}

function addTempWord() {
  const word = customWordInput.value.trim();
  if (word.length < 3) {
    showMessage('❌ Słowo musi mieć przynajmniej 3 znaki!', 2500);
    return;
  }
  tempCustomWords.push(word);
  console.log('Dodano tymczasowe słowo:', word);
  customWordInput.value = ''; // Wyczyść input
  customWordInput.focus(); // Ustaw focus z powrotem
  updateTempWordsList();
}

function deleteTempWord(index) {
  const deletedWord = tempCustomWords.splice(index, 1);
  console.log('Usunięto tymczasowe słowo:', deletedWord);
  updateTempWordsList();
}

function updateTempWordsList() {
  customWordsList.innerHTML = ''; // Wyczyść listę
  if (tempCustomWords.length === 0) {
    customWordsList.innerHTML = '<li>Dodaj przynajmniej 3 słowa...</li>';
  }
  
  tempCustomWords.forEach((word, index) => {
    const li = document.createElement('li');
    li.textContent = word;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('delete-word-btn');
    deleteBtn.dataset.index = index; // Zapisz indeks do usunięcia
    
    li.appendChild(deleteBtn);
    customWordsList.appendChild(li);
  });
  
  // Odblokuj zapis, jeśli jest wystarczająco słów
  saveCustomCategoryBtn.disabled = tempCustomWords.length < 3;
}

function saveCustomCategory() {
  const categoryName = customCategoryNameInput.value.trim();
  if (categoryName.length < 3) {
    showMessage('❌ Nazwa kategorii musi mieć przynajmniej 3 znaki!', 2500);
    return;
  }
  
  const newCategory = {
    name: categoryName,
    file: `custom_${Date.now()}`, // Unikalne ID
    words: [...tempCustomWords], // Skopiuj tablicę
    isCustom: true
  };
  
  customCategories.push(newCategory); // Dodaj do globalnej listy (tylko dla hosta)
  selectedCategories.push(newCategory); // Automatycznie wybierz nową kategorię
  
  addCustomCategoryToGrid(newCategory); // Dodaj przycisk do UI
  
  console.log('Zapisano własną kategorię:', newCategory.name);
  hideCustomCategoryModal();
}

function addCustomCategoryToGrid(category) {
  const btn = document.createElement('button');
  btn.classList.add('category-btn', 'custom-category-btn'); // Dwie klasy
  btn.textContent = category.name;
  btn.dataset.file = category.file;
  btn.dataset.categoryName = category.name;
  
  btn.addEventListener('click', () => {
    toggleCategory(category); 
  });
  
  categoryGrid.insertBefore(btn, createCustomCategoryBtn); // Wstaw przed przyciskiem "+"
  
  // Zaktualizuj UI, żeby pokazać, że jest wybrana
  updateCategoryButtons();
  updateConfirmCategoriesButton();
}

// *** NOWE LISTENERY DLA MODALA WŁASNYCH KATEGORII ***
createCustomCategoryBtn.addEventListener('click', showCustomCategoryModal);
closeCustomCategoryBtn.addEventListener('click', hideCustomCategoryModal);
addCustomWordBtn.addEventListener('click', addTempWord);
saveCustomCategoryBtn.addEventListener('click', saveCustomCategory);

// Użyj delegacji eventów dla przycisków usuwania
customWordsList.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('delete-word-btn')) {
    const index = parseInt(e.target.dataset.index, 10);
    deleteTempWord(index);
  }
});

// Pozwól na dodawanie słowa Enterem
customWordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTempWord();
  }
});

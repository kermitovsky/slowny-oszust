// Elementy DOM
const playerNameInput = document.getElementById('playerName');
const createRoomBtn = document.getElementById('createRoom');
const joinRoomBtn = document.getElementById('joinRoom');
const roomCodeInput = document.getElementById('roomCodeInput');
const statusMessage = document.getElementById('statusMessage');
const emojiSelection = document.getElementById('emojiSelection');
const playersList = document.getElementById('playersList');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const copyRoomCodeBtn = document.getElementById('copyRoomCode');
const impostorCountDisplay = document.getElementById('impostorCountDisplay');
const playerCountDisplay = document.getElementById('playerCountDisplay');
const roundCounter = document.getElementById('roundCounter');
const wordDisplay = document.getElementById('wordDisplay');
const startGameBtn = document.getElementById('startGame');
const endRoundBtn = document.getElementById('endRound');
const leaveRoomBtn = document.getElementById('leaveRoom');
const rulesBtn = document.getElementById('rulesBtn');
const themeToggle = document.getElementById('themeToggle');
const recommendedPlayers = document.getElementById('recommendedPlayers');

// Ekrany i Modale
const loginScreen = document.getElementById('loginScreen');
const gameScreen = document.getElementById('gameScreen');
const messageBox = document.getElementById('messageBox');
const roleMessageBox = document.getElementById('roleMessageBox');
const categorySelectionBox = document.getElementById('categorySelectionBox');
const impostorSelectionBox = document.getElementById('impostorSelectionBox');
const impostorHintBox = document.getElementById('impostorHintBox');
const impostorTeamBox = document.getElementById('impostorTeamBox');
const customCategoryBox = document.getElementById('customCategoryBox');
const rulesBox = document.getElementById('rulesBox');

// Elementy animacji
const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const countdownDisplay = document.getElementById('countdown-display');
const fullscreenMessage = document.getElementById('fullscreen-message');
const fsMessagePrimary = document.getElementById('fullscreen-message-primary');
const fsMessageSecondary = document.getElementById('fullscreen-message-secondary');


const closeRulesBtn = document.getElementById('closeRules');
const closeRulesTopBtn = document.getElementById('closeRulesTop');

// Elementy Wyboru Kategorii
const allCategoriesBtn = document.getElementById('allCategoriesBtn');
const categoryGrid = document.querySelector('#categorySelectionBox .category-grid');
const confirmCategories = document.getElementById('confirmCategories');

// Elementy Wyboru Impostora
const minusImpostor = document.getElementById('minusImpostor');
const plusImpostor = document.getElementById('plusImpostor');
const impostorCountDisplaySelector = document.getElementById('impostorCount');
const confirmImpostors = document.getElementById('confirmImpostors');

// Elementy Podpowiedzi
const hintChanceSlider = document.getElementById('hintChanceSlider');
const hintOnStartCheckbox = document.getElementById('hintOnStartCheckbox');
const confirmHintSettingsBtn = document.getElementById('confirmHintSettingsBtn');
const hintChanceInfoDisplay = document.getElementById('hintChanceInfoDisplay');
const hintCheckboxContainer = document.querySelector('#impostorHintBox .checkbox-container');

// Elementy Drużyny
const teamKnowsBtn = document.getElementById('teamKnowsBtn');
const teamNotKnowsBtn = document.getElementById('teamNotKnowsBtn');
const confirmTeamSettingsBtn = document.getElementById('confirmTeamSettingsBtn');

// Elementy Głosowania
const startVoteBtn = document.getElementById('startVoteBtn');
const confirmVoteBtn = document.getElementById('confirmVoteBtn');
const voteResultDisplay = document.getElementById('voteResultDisplay');
const lastRoundSummary = document.getElementById('lastRoundSummary'); 

// Elementy Własnych Kategorii
const createCustomCategoryBtn = document.getElementById('createCustomCategoryBtn');
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
let hasShownEndMessage = false; // *** POPRAWKA: Nowa flaga do animacji końca rundy
let selectedEmoji = null;
let selectedPlayerId = null; 
let isAnimating = false; // *** POPRAWKA: BRAKUJĄCA ZMIENNA ***

let hintChance = 0; 
let hintOnStart = false; 
const hintChanceValues = ['0%', '25%', '50%', '75%', '100%'];
const hintChanceNumeric = [0, 0.25, 0.5, 0.75, 1];

let tempCustomWords = [];
let customCategories = [];
let editingCategoryFile = null; 

let impostorsKnowEachOther = false; 
let currentModal = null; 

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

// --- FUNKCJE ZARZĄDZANIA UI (POPRAWIONE) ---
function showScreen(screenToShow) {
  const screens = [loginScreen, gameScreen];
  screens.forEach(screen => {
    if (screen === screenToShow) {
      screen.style.display = 'flex';
      if (screen === gameScreen) {
        screen.style.animation = 'slideInRight 0.4s ease forwards';
      }
    } else {
      if (screen.style.display !== 'none') {
        if (screen === loginScreen) {
          screen.style.animation = 'slideOutLeft 0.4s ease forwards';
          setTimeout(() => screen.style.display = 'none', 400);
        } else {
          screen.style.display = 'none';
        }
      }
    }
  });
  hideModal(currentModal, true);
}

function showModal(modalToShow) {
  if (currentModal && currentModal !== modalToShow) {
    hideModal(currentModal);
  }
  
  modalToShow.style.display = 'block'; 
  
  modalToShow.classList.remove('is-hiding');
  modalToShow.classList.add('is-visible');
  currentModal = modalToShow;
  
  rulesBtn.classList.add('hidden');
  themeToggle.classList.add('hidden');
}

function hideModal(modalToHide, force = false) {
  if (!modalToHide) return;
  
  if (force) {
    modalToHide.style.display = 'none';
    modalToHide.classList.remove('is-visible', 'is-hiding');
    if (modalToHide === currentModal) currentModal = null;
    return;
  }
  
  modalToHide.classList.add('is-hiding');
  modalToHide.classList.remove('is-visible');
  
  setTimeout(() => {
    modalToHide.style.display = 'none'; 
    modalToHide.classList.remove('is-hiding');
    if (modalToHide === currentModal) {
      currentModal = null;
      if (!document.querySelector('.modal-box.is-visible')) {
        rulesBtn.classList.remove('hidden');
        themeToggle.classList.remove('hidden');
      }
    }
  }, 300); 
}


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

// Funkcja "Zapamiętaj Mnie"
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
  
  loadFromLocalStorage();
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
  hideModal(rulesBox);
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
  hideModal(categorySelectionBox);
  showModal(impostorSelectionBox);
  document.getElementById('loadingMessage').style.display = 'block';
  confirmImpostors.disabled = true;
  
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

async function loadWords(categoriesToLoad) {
  words = []; 
  
  const categoriesToFetch = categoriesToLoad.filter(c => !c.isCustom && c.file !== 'all');
  const localCategories = categoriesToLoad.filter(c => c.isCustom);
  
  if (categoriesToLoad.some(c => c.file === 'all')) {
    categoriesToFetch.push(...categories); 
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

    for (const category of localCategories) {
      const mappedWords = category.words.map(word => ({
        word: word,
        category: category.name
      }));
      words = [...words, ...mappedWords];
      loadedAnyFile = true;
      console.log(`Załadowano ${mappedWords.length} słów z własnej kategorii: ${category.name}`);
    }

    if (!loadedAnyFile && localCategories.length === 0) { 
      throw new Error('Nie udało się załadować żadnego pliku kategorii.');
    }

    console.log('Łącznie załadowano słów:', words.length);
  } catch (error) {
    console.error('Błąd ładowania słów:', error);
    words = fallbackWords; 
    console.log('Użyto wbudowanej listy słów:', words.length);
  }
}

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
  messageBox.innerHTML = text;
  showModal(messageBox); 
  
  if (text === '✅ Kod skopiowany!' || text === '❌ Nie udało się skopiować kodu') {
    messageBox.classList.add('copy-message');
    duration = 1500;
  } else {
    messageBox.classList.remove('copy-message');
  }
  setTimeout(() => {
    hideModal(messageBox); 
    messageBox.classList.remove('copy-message');
  }, duration);
}

// Ta funkcja nie jest już używana do pokazywania ról
function showRoleMessage(text, duration = 5000) {
  roleMessageBox.innerHTML = text.replace(/\n/g, '<br>');
  showModal(roleMessageBox); 
  setTimeout(() => {
    hideModal(roleMessageBox); 
  }, duration);
}

function resetToLobby() {
  showScreen(loginScreen); 
  
  startVoteBtn.style.display = 'none';
  confirmVoteBtn.style.display = 'none';
  endRoundBtn.style.display = 'none';
  impostorCountDisplay.innerHTML = '';
  playerCountDisplay.innerHTML = '';
  hintChanceInfoDisplay.innerHTML = '';
  roundCounter.innerHTML = '';
  wordDisplay.innerHTML = '';
  lastRoundSummary.innerHTML = ''; 
  lastRoundSummary.style.display = 'none'; 
  
  impostorCount = 1;
  impostorCountDisplaySelector.textContent = impostorCount;
  selectedCategories = [];
  customCategories = []; 
  document.querySelectorAll('.custom-category-btn').forEach(btn => btn.remove());
  
  hasShownStartMessage = false;
  hasShownEndMessage = false; // Zresetuj flagę końca rundy
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
  
  impostorsKnowEachOther = false;
  teamKnowsBtn.classList.remove('selected');
  teamNotKnowsBtn.classList.add('selected');

  document.querySelectorAll('.emoji-btn').forEach(btn => btn.classList.remove('selected'));
  updateImpostorButtons();
  updateRecommendedPlayers();
  
  loadFromLocalStorage();
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
  showModal(rulesBox);
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
  
  localStorage.setItem('slownyOszustNick', name);
  localStorage.setItem('slownyOszustEmoji', selectedEmoji);
  
  currentPlayerName = name;
  isHost = true;
  console.log('Ustawiono hosta, imię:', currentPlayerName);
  
  showModal(categorySelectionBox); 
  
  initializeCategorySelection();
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
  hideModal(impostorSelectionBox);
  showModal(impostorHintBox);
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
  console.log('Potwierdzono ustawienia podpowiedzi.');
  hideModal(impostorHintBox);
  
  if (impostorCount > 1) {
    showModal(impostorTeamBox);
  } else {
    impostorsKnowEachOther = false; 
    createRoom(impostorCount, hintChance, hintOnStart, impostorsKnowEachOther);
  }
});

teamKnowsBtn.addEventListener('click', () => {
  impostorsKnowEachOther = true;
  teamKnowsBtn.classList.add('selected');
  teamNotKnowsBtn.classList.remove('selected');
  console.log('Impostorzy będą wiedzieć');
});

teamNotKnowsBtn.addEventListener('click', () => {
  impostorsKnowEachOther = false;
  teamNotKnowsBtn.classList.add('selected');
  teamKnowsBtn.classList.remove('selected');
  console.log('Impostorzy NIE będą wiedzieć');
});

confirmTeamSettingsBtn.addEventListener('click', () => {
  console.log('Potwierdzono ustawienia drużyny, tworzenie pokoju...');
  createRoom(impostorCount, hintChance, hintOnStart, impostorsKnowEachOther);
});

function createRoom(numImpostors, chanceIndex, onStart, knows) {
  const customCategoriesToSave = customCategories 
    .filter(c => c.isCustom)
    .map(c => ({ name: c.name, words: c.words })); 

  console.log('Tworzenie pokoju z', numImpostors, 'impostorami, kategorie:', selectedCategories.map(c => c.name));
  console.log('Ustawienia podpowiedzi:', hintChanceValues[chanceIndex], 'na starcie:', onStart);
  console.log('Impostorzy wiedzą o sobie:', knows);
  
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
    lastRoundSummary: null,
    resetMessage: null,
    starterId: null,
    numImpostors: numImpostors,
    categories: selectedCategories.map(c => c.name), 
    customCategories: customCategoriesToSave || [],
    hintChance: chanceIndex,
    hintOnStart: onStart,
    impostorsKnow: knows
  }).then(() => {
    console.log('Pokój utworzony:', currentRoomCode);
    showScreen(gameScreen); 
    hideModal(impostorTeamBox, true); 
    roomCodeDisplay.textContent = currentRoomCode;
    db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).onDisconnect().remove();
    listenToRoom(currentRoomCode);
  }).catch(error => {
    console.error('Błąd tworzenia pokoju:', error);
    showMessage('❌ Błąd tworzenia pokoju!');
    showScreen(loginScreen);
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
      showScreen(gameScreen); 
      
      const categoryNames = room.categories || ['Wszystkie'];
      let standardCategories = [];
      if (categoryNames.includes('Wszystkie')) {
        standardCategories = [{ name: 'Wszystkie', file: 'all' }];
      } else {
        standardCategories = categories.filter(c => categoryNames.includes(c.name));
      }
      const customCategoriesData = room.customCategories || [];
      customCategories = customCategoriesData.map(c => ({ 
        ...c, 
        file: `custom_${c.name}`, 
        isCustom: true 
      }));
      
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
      currentRoomCode = null;
      currentPlayerId = null;
      isHost = false;
      roomCodeInput.value = '';
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
    lastRoundSummary: null, 
  };

  playerIds.forEach(id => {
    updates[`players/${id}/votedFor`] = null;
  });

  if (isTie || !ejectedPlayerId) {
    updates.lastRoundSummary = `REMIS! Nikt nie odpada.<br>Kontynuujcie dyskusję!`;
  } else {
    const ejectedPlayer = players[ejectedPlayerId];
    
    updates.gameStarted = false;
    updates.currentWord = null;
    updates.starterId = null;
    
    playerIds.forEach(id => {
      updates[`players/${id}/role`] = null;
    });

    if (ejectedPlayer.role === 'impostor') {
      updates.lastRoundSummary = `Impostor został wykryty!<br>(Oszust: <strong>${ejectedPlayer.name}</strong>)<br>Słowo: <strong>${room.currentWord}</strong>`;
    } else {
      updates.lastRoundSummary = `Impostor wygrał rundę!<br>(Wygłosowano <strong>${ejectedPlayer.name}</strong>)<br>Słowo: <strong>${room.currentWord}</strong>`;
    }
  }

  db.ref(`rooms/${currentRoomCode}`).update(updates);
}


// *** NOWA FUNKCJA DO POKAZYWANIA SEKWENCJI KOŃCA RUNDY ***
function runRoundEndSequence(summaryMessage) {
  if (isAnimating) return;
  isAnimating = true;
  
  console.log("Pokazuję sekwencję końca rundy");
  
  fsMessagePrimary.innerHTML = summaryMessage; 
  fsMessageSecondary.textContent = "Przygotujcie się na nową rundę...";
  
  fullscreenMessage.className = ''; 
  
  // Ustalanie koloru
  if (summaryMessage.includes('Impostor wygrał')) {
    fullscreenMessage.classList.add('impostor-role');
  } else {
    fullscreenMessage.classList.add('crewmate-role');
  }
  
  countdownDisplay.style.display = 'none';
  fullscreenMessage.style.animation = 'none';
  fullscreenMessage.offsetHeight;
  fullscreenMessage.style.display = 'flex';
  fullscreenMessage.style.animation = 'slideInUp 0.5s ease forwards';
  
  fullscreenOverlay.classList.add('is-visible');

  // Schowaj po 5 sekundach
  setTimeout(() => {
    fullscreenOverlay.classList.add('is-hiding'); // Użyj animacji wygaszania
    isAnimating = false;
    setTimeout(() => {
      fullscreenOverlay.style.display = 'none'; // Ukryj po animacji
      fullscreenOverlay.classList.remove('is-visible', 'is-hiding');
      fsMessagePrimary.innerHTML = '';
      fsMessageSecondary.textContent = '';
      fullscreenMessage.style.display = 'none';
    }, 500); // Czas trwania animacji .is-hiding
  }, 5000);
}


// *** NOWA FUNKCJA DO POKAZYWANIA SEKWENCJI STARTU ***
function runGameStartSequence(roleMessage, starterName) {
  if (isAnimating) return;
  isAnimating = true;
  
  console.log("Pokazuję sekwencję startu gry");
  
  // 1. Pokaż czarny ekran
  fullscreenOverlay.classList.remove('is-hiding');
  fullscreenMessage.style.display = 'none';
  fullscreenMessage.classList.remove('show-message');
  fullscreenOverlay.classList.add('is-visible');
  
  // 2. Przygotuj odliczanie
  countdownDisplay.textContent = '3';
  countdownDisplay.style.display = 'block';
  countdownDisplay.style.animation = 'none';
  countdownDisplay.offsetHeight; // Trik triggerujący reflow
  countdownDisplay.style.animation = 'countdown-pulse 1s ease-in-out';
  
  // 3. Odliczanie 2
  setTimeout(() => {
    countdownDisplay.textContent = '2';
    countdownDisplay.style.animation = 'none';
    countdownDisplay.offsetHeight;
    countdownDisplay.style.animation = 'countdown-pulse 1s ease-in-out';
  }, 1000);
  
  // 4. Odliczanie 1
  setTimeout(() => {
    countdownDisplay.textContent = '1';
    countdownDisplay.style.animation = 'none';
    countdownDisplay.offsetHeight;
    countdownDisplay.style.animation = 'countdown-pulse 1s ease-in-out';
  }, 2000);
  
  // 5. Pokaż rolę
  setTimeout(() => {
    countdownDisplay.style.display = 'none';
    
    // Ustaw tekst i styl
    const parts = roleMessage.split('\n');
    fsMessagePrimary.innerHTML = parts[0]; // "Jesteś oszustem!" lub "Twoje słowo: Banan"
    fsMessageSecondary.innerHTML = parts.slice(1).join('<br>'); // Podpowiedź i/lub drużyna
    
    fullscreenMessage.className = ''; // Resetuj klasy
    if (roleMessage.includes('oszustem')) {
      fullscreenMessage.classList.add('impostor-role');
    } else {
      fullscreenMessage.classList.add('crewmate-role');
    }
    
    fullscreenMessage.style.animation = 'none';
    fullscreenMessage.offsetHeight;
    fullscreenMessage.style.display = 'flex';
    fullscreenMessage.style.animation = 'slideInUp 0.5s ease forwards';

  }, 3000);
  
  // 6. Pokaż kto zaczyna (przejście horyzontalne)
  setTimeout(() => {
    fullscreenMessage.style.animation = 'horizontalSlideOut 0.4s ease forwards';
  }, 6000); // Pokaż rolę przez 3 sekundy
  
  setTimeout(() => {
    fsMessagePrimary.textContent = "Zaczyna mówić:";
    fsMessageSecondary.textContent = starterName;
    fullscreenMessage.className = 'starter-role'; 
    
    fullscreenMessage.style.animation = 'horizontalSlideIn 0.4s ease forwards';
  }, 6400); 

  // 7. Schowaj wszystko
  setTimeout(() => {
    fullscreenOverlay.classList.add('is-hiding'); // Użyj animacji wygaszania
    isAnimating = false;
    setTimeout(() => {
      fullscreenOverlay.style.display = 'none'; // Ukryj po animacji
      fullscreenOverlay.classList.remove('is-visible', 'is-hiding');
      fsMessagePrimary.textContent = '';
      fsMessageSecondary.textContent = '';
      fullscreenMessage.style.display = 'none';
    }, 500); // Czas trwania animacji .is-hiding
  }, 8400); // Pokaż startera przez 2 sekundy
}


function listenToRoom(roomCode) {
  const roomRef = db.ref(`rooms/${roomCode}`);
  roomRef.on('value', snapshot => {
    if (isAnimating) return; 
    
    const room = snapshot.val();
    if (!room) {
      console.log('Pokój usunięty:', roomCode);
      showMessage('❌ Pokój został usunięty!');
      resetToLobby();
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

    if (room.lastRoundSummary && !room.gameStarted) {
      lastRoundSummary.innerHTML = room.lastRoundSummary;
      lastRoundSummary.style.display = 'block';
    } else {
      lastRoundSummary.style.display = 'none';
    }

    startGameBtn.style.display = isHost && !room.gameStarted && !votingActive ? 'block' : 'none';
    startVoteBtn.style.display = isHost && room.gameStarted && !votingActive ? 'block' : 'none';
    confirmVoteBtn.style.display = votingActive && !myVote ? 'block' : 'none';
    endRoundBtn.style.display = 'none';

    // *** ZMIENIONA LOGIKA POKAZYWANIA ROLI (Z DRUŻYNĄ) ***
    if (room.gameStarted && !votingActive && room.currentWord && iAmInRoom) {
      
      if (!hasShownStartMessage) {
        hasShownStartMessage = true; // Zablokuj natychmiast
        
        const isImpostor = iAmInRoom.role === 'impostor';
        const hint = room.impostorHint; 
        
        let message;
        if (isImpostor) {
          const hintText = hint ? `\n(Podpowiedź: ${hint})` : '';
          let teamText = '';
          
          if (room.impostorsKnow && room.numImpostors > 1) {
            const teammateNames = Object.keys(players)
              .filter(id => players[id].role === 'impostor' && id !== currentPlayerId)
              .map(id => players[id].name)
              .join(', ');
              
            if (teammateNames) {
              teamText = `\nTwoi partnerzy: ${teammateNames}`;
            }
          }
          
          message = `Jesteś oszustem!${teamText}${hintText}`;
        } else {
          message = `Słowo: ${room.currentWord}`;
        }
        
        const starterName = players[room.starterId]?.name || '...';
        
        runGameStartSequence(message, starterName);
      }
    } else {
      hasShownStartMessage = false; // Zresetuj flagę, gdy gra się nie toczy
    }

    // *** POPRAWKA: POKAZYWANIE EKRANU KOŃCA RUNDY ***
    if (room.lastRoundSummary && !room.gameStarted && !hasShownEndMessage) {
      hasShownEndMessage = true; // Zablokuj
      runRoundEndSequence(room.lastRoundSummary);
    } else if (room.gameStarted) {
      hasShownEndMessage = false; // Zresetuj, gdy gra się zacznie
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
  if (isAnimating) return;
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
    updates.lastRoundSummary = null; 
    updates.currentRound = (room.currentRound || 0) + 1;

    roomRef.update(updates).then(() => {
      console.log('Gra rozpoczęta:', { word, impostorIds, starterId, hint });
      // Usunięto 'showMessage', bo teraz jest sekwencja
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
  if (isAnimating) return;
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
  if (isAnimating) return;
  if (!selectedPlayerId) {
    showMessage('❌ Najpierw wybierz gracza, na którego chcesz zagłosować!', 2500);
    return;
  }
  voteForPlayer(selectedPlayerId);
});

// Przycisk "Zakończ rundę" (DEBUG)
endRoundBtn.addEventListener('click', () => {
  if (isAnimating) return;
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
      impostorsKnow: null,
      lastRoundSummary: `Runda zakończona! Słowo: <strong>${currentWord}</strong><br>Impostorzy: <strong>${impostorNames || 'Brak'}</strong>`
    };
    Object.keys(players).forEach(id => {
      updates[`players/${id}/role`] = null;
      updates[`players/${id}/votedFor`] = null;
    });

    roomRef.update(updates).then(() => {
      console.log('Runda zakończona:', { word: currentWord, impostorIds });
      hasShownStartMessage = false;
      hasShownEndMessage = false; // Zresetuj flagę
    }).catch(error => {
      console.error('Błąd kończenia rundy:', error);
      showMessage('❌ Błąd kończenia rundy!');
    });
  }).catch(error => {
    console.error('Błąd pobierania danych pokoju:', error);
    showMessage('❌ Błąd pobierania danych pokoju!');
  });
});

// *** FUNKCJE WŁASNYCH KATEGORII ***

function showCustomCategoryModal(editFileId = null) {
  console.log('Otwieranie modala własnej kategorii...');
  editingCategoryFile = editFileId; 
  
  if (editFileId) {
    const category = customCategories.find(c => c.file === editFileId);
    if (!category) {
      console.error('Nie znaleziono kategorii do edycji!');
      return;
    }
    customCategoryNameInput.value = category.name;
    tempCustomWords = [...category.words]; 
    saveCustomCategoryBtn.textContent = 'Zapisz zmiany';
  } else {
    tempCustomWords = [];
    customCategoryNameInput.value = '';
    customWordInput.value = '';
    saveCustomCategoryBtn.textContent = 'Zapisz i użyj';
  }
  
  updateTempWordsList(); 
  hideModal(categorySelectionBox); 
  showModal(customCategoryBox); 
}

function hideCustomCategoryModal() {
  hideModal(customCategoryBox); 
  showModal(categorySelectionBox);
  editingCategoryFile = null; 
}

function addTempWord() {
  const word = customWordInput.value.trim();
  if (word.length < 3) {
    showMessage('❌ Słowo musi mieć przynajmniej 3 znaki!', 2500);
    return;
  }
  tempCustomWords.push(word);
  console.log('Dodano tymczasowe słowo:', word);
  customWordInput.value = ''; 
  customWordInput.focus(); 
  updateTempWordsList();
}

function deleteTempWord(index) {
  const deletedWord = tempCustomWords.splice(index, 1);
  console.log('Usunięto tymczasowe słowo:', deletedWord);
  updateTempWordsList();
}

function updateTempWordsList() {
  customWordsList.innerHTML = ''; 
  if (tempCustomWords.length === 0) {
    customWordsList.innerHTML = '<li>Dodaj przynajmniej 3 słowa...</li>';
  }
  
  tempCustomWords.forEach((word, index) => {
    const li = document.createElement('li');
    li.textContent = word;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('delete-word-btn');
    deleteBtn.dataset.index = index; 
    
    li.appendChild(deleteBtn);
    customWordsList.appendChild(li);
  });
  
  saveCustomCategoryBtn.disabled = tempCustomWords.length < 3;
}

function saveCustomCategory() {
  const categoryName = customCategoryNameInput.value.trim();
  if (categoryName.length < 3) {
    showMessage('❌ Nazwa kategorii musi mieć przynajmniej 3 znaki!', 2500);
    return;
  }
  
  if (editingCategoryFile) {
    console.log('Zapisywanie zmian w kategorii:', categoryName);
    const categoryIndex = customCategories.findIndex(c => c.file === editingCategoryFile);
    if (categoryIndex > -1) {
      customCategories[categoryIndex].name = categoryName;
      customCategories[categoryIndex].words = [...tempCustomWords];
    }
    const selectedIndex = selectedCategories.findIndex(c => c.file === editingCategoryFile);
    if (selectedIndex > -1) {
      selectedCategories[selectedIndex].name = categoryName;
      selectedCategories[selectedIndex].words = [...tempCustomWords];
    }
    const btn = categoryGrid.querySelector(`.category-btn[data-file="${editingCategoryFile}"]`);
    if (btn) {
      const oldActions = btn.querySelector('.category-actions');
      if (oldActions) oldActions.remove();
      
      btn.textContent = categoryName; 
      btn.dataset.categoryName = categoryName;
      addCategoryActions(btn, editingCategoryFile); 
    }
    editingCategoryFile = null; 
    
  } else {
    console.log('Zapisywanie nowej kategorii:', categoryName);
    const newCategory = {
      name: categoryName,
      file: `custom_${Date.now()}`, 
      words: [...tempCustomWords], 
      isCustom: true
    };
    
    customCategories.push(newCategory); 
    selectedCategories.push(newCategory); 
    
    addCustomCategoryToGrid(newCategory); 
  }

  hideCustomCategoryModal();
  updateCategoryButtons(); 
  updateConfirmCategoriesButton();
}

function addCustomCategoryToGrid(category) {
  const btn = document.createElement('button');
  btn.classList.add('category-btn', 'custom-category-btn'); 
  btn.textContent = category.name;
  btn.dataset.file = category.file;
  btn.dataset.categoryName = category.name;
  
  btn.addEventListener('click', (e) => {
    if (e.target.closest('.category-actions')) {
      return;
    }
    toggleCategory(category); 
  });
  
  addCategoryActions(btn, category.file); 
  
  categoryGrid.insertBefore(btn, createCustomCategoryBtn); 
}

function addCategoryActions(btn, fileId) {
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('category-actions');
  
  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.classList.add('edit-btn');
  editBtn.dataset.file = fileId;
  editBtn.title = 'Edytuj';
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.dataset.file = fileId;
  deleteBtn.title = 'Usuń';
  
  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);
  btn.appendChild(actionsDiv);
}

function deleteCustomCategory(fileId) {
  console.log('Usuwanie kategorii:', fileId);
  customCategories = customCategories.filter(c => c.file !== fileId);
  selectedCategories = selectedCategories.filter(c => c.file !== fileId);
  
  const btn = categoryGrid.querySelector(`.category-btn[data-file="${fileId}"]`);
  if (btn) {
    btn.remove();
  }
  
  updateCategoryButtons();
  updateConfirmCategoriesButton();
}

function editCustomCategory(fileId) {
  console.log('Edycja kategorii:', fileId);
  const category = customCategories.find(c => c.file === fileId);
  if (category) {
    showCustomCategoryModal(fileId); 
  }
}

createCustomCategoryBtn.addEventListener('click', () => showCustomCategoryModal());
closeCustomCategoryBtn.addEventListener('click', hideCustomCategoryModal);
addCustomWordBtn.addEventListener('click', addTempWord);
saveCustomCategoryBtn.addEventListener('click', saveCustomCategory);

categoryGrid.addEventListener('click', (e) => {
  const target = e.target.closest('button'); 
  if (!target) return;

  if (target.classList.contains('delete-btn')) {
    e.stopPropagation(); 
    deleteCustomCategory(target.dataset.file);
  } else if (target.classList.contains('edit-btn')) {
    e.stopPropagation(); 
    editCustomCategory(target.dataset.file);
  }
});

customWordsList.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('delete-word-btn')) {
    const index = parseInt(e.target.dataset.index, 10);
    deleteTempWord(index);
  }
});

customWordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); 
    addTempWord();
  }
});

// ===================================================================
// 1. KONFIGURACJA FIREBASE (PODMIEŃ NA SWOJE DANE!)
// ===================================================================
const firebaseConfig = {
  apiKey: "TUTAJ_WKLEJ_SWOJ_KLUCZ",
  authDomain: "TUTAJ_WKLEJ_SWOJA_DOMENE",
  databaseURL: "TUTAJ_WKLEJ_SWOJ_URL_BAZY",
  projectId: "TUTAJ_WKLEJ_ID_PROJEKTU",
  storageBucket: "TUTAJ_WKLEJ_BUCKET",
  messagingSenderId: "TUTAJ_WKLEJ_SENDER_ID",
  appId: "TUTAJ_WKLEJ_APP_ID"
};

// Inicjalizacja Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// ===================================================================
// 2. ELEMENTY DOM (Zmienne chwytające elementy na stronie)
// ===================================================================
const playerNameInput = document.getElementById('playerName');
const createRoomBtn = document.getElementById('createRoom');
const joinRoomBtn = document.getElementById('joinRoom');
const roomCodeInput = document.getElementById('roomCodeInput');
const emojiSelection = document.getElementById('emojiSelection');
const playersList = document.getElementById('playersList');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const copyRoomCodeBtn = document.getElementById('copyRoomCode');
const roomSettingsBtn = document.getElementById('roomSettingsBtn'); 
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
const roomSettingsBox = document.getElementById('roomSettingsBox'); 
const rulesBox = document.getElementById('rulesBox');
const modalBackdrop = document.getElementById('modalBackdrop'); 
const countdownDisplay = document.getElementById('countdownDisplay'); 

// Faza wpisywania własnych podpowiedzi
const hintInputBox = document.getElementById('hintInputBox');
const hintInputTitle = document.getElementById('hintInputTitle');
const hintInputDesc = document.getElementById('hintInputDesc');
const customHintInput = document.getElementById('customHintInput');
const submitCustomHintBtn = document.getElementById('submitCustomHintBtn');
const hintWaitingMessage = document.getElementById('hintWaitingMessage');
const customHintCheckbox = document.getElementById('customHintCheckbox');
const autoHintSettingsWrapper = document.getElementById('autoHintSettingsWrapper');

const setCustomHintCheckbox = document.getElementById('setCustomHintCheckbox');
const setAutoHintSettingsWrapper = document.getElementById('setAutoHintSettingsWrapper');

// Kinowe Nakładki
const votingOverlay = document.getElementById('votingOverlay'); 
const starterOverlay = document.getElementById('starterOverlay'); 
const starterOverlayName = document.getElementById('starterOverlayName');
const summaryOverlay = document.getElementById('summaryOverlay');
const summaryOverlayTitle = document.getElementById('summaryOverlayTitle');
const summaryOverlaySubtitle = document.getElementById('summaryOverlaySubtitle');

let roleCardInner = document.getElementById('roleCardInner');

const closeRulesBtn = document.getElementById('closeRules');
const closeRulesTopBtn = document.getElementById('closeRulesTop');
const closeRoomSettingsBtn = document.getElementById('closeRoomSettingsBtn'); 

// Elementy Wyboru Kategorii
const allCategoriesCheckbox = document.getElementById('allCategoriesCheckbox');
const categoryGrid = document.querySelector('#categorySelectionBox .category-grid');
const confirmCategories = document.getElementById('confirmCategories');
const createCustomCategoryBtn = document.getElementById('createCustomCategoryBtn'); 

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

// Elementy Drużyny
const teamKnowsBtn = document.getElementById('teamKnowsBtn');
const teamNotKnowsBtn = document.getElementById('teamNotKnowsBtn');
const confirmTeamSettingsBtn = document.getElementById('confirmTeamSettingsBtn');

// Elementy ZMIANY Ustawień
const setMinusImpostor = document.getElementById('setMinusImpostor');
const setPlusImpostor = document.getElementById('setPlusImpostor');
const setImpostorCount = document.getElementById('setImpostorCount');
const setHintChanceSlider = document.getElementById('setHintChanceSlider');
const setHintOnStartCheckbox = document.getElementById('setHintOnStartCheckbox');
const setTeamKnowsBtn = document.getElementById('setTeamKnowsBtn');
const setTeamNotKnowsBtn = document.getElementById('setTeamNotKnowsBtn');
const saveRoomSettingsBtn = document.getElementById('saveRoomSettingsBtn');

// Elementy Głosowania
const startVoteBtn = document.getElementById('startVoteBtn');
const confirmVoteBtn = document.getElementById('confirmVoteBtn');
const voteResultDisplay = document.getElementById('voteResultDisplay');
const lastRoundSummaryTitle = document.getElementById('lastRoundSummaryTitle'); 
const lastRoundSummary = document.getElementById('lastRoundSummary'); 
const lobbyCategories = document.getElementById('lobbyCategories'); 

// Elementy Własnych Kategorii 
const closeCustomCategoryBtn = document.getElementById('closeCustomCategoryBtn');
const customCategoryNameInput = document.getElementById('customCategoryNameInput');
const customWordInput = document.getElementById('customWordInput');
const addCustomWordBtn = document.getElementById('addCustomWordBtn');
const customWordsList = document.getElementById('customWordsList');
const saveCustomCategoryBtn = document.getElementById('saveCustomCategoryBtn');


// ===================================================================
// 3. ZMIENNE STANU GRY
// ===================================================================
let currentRoomCode = null;
let currentPlayerId = null;
let currentPlayerName = null;
let isHost = false; 
let currentRoomData = null; 

let words = []; 
let impostorCount = 1;
let selectedCategories = [];
let selectedEmoji = null;
let selectedPlayerId = null; 
let isAnimating = false; 
let lastSeenStarterId = null; 
let lastSeenSummary = null; 
let lastSeenRoundWinner = null; 
let lastSeenVotingState = false; 

let customHintsEnabled = false; 
let hintChance = 0; 
let hintOnStart = false; 
let impostorsKnowEachOther = false; 

let tempSetImpostors = 1;
let tempSetCustomHints = false;
let tempSetHintChance = 0;
let tempSetHintOnStart = false;
let tempSetImpostorsKnow = false;

const hintChanceValues = ['0%', '25%', '50%', '75%', '100%'];
const hintChanceNumeric = [0, 0.25, 0.5, 0.75, 1];
let tempCustomWords = [];
let customCategories = [];
let editingCategoryFile = null; 
let currentModal = null; 

const categories = [
  { name: 'Zwierzęta', file: 'animals.json' }, { name: 'Jedzenie', file: 'food.json' },
  { name: 'Przedmioty', file: 'objects.json' }, { name: 'Miejsca', file: 'places.json' },
  { name: 'Zawody', file: 'jobs.json' }, { name: 'Sport', file: 'sports.json' },
  { name: 'Motoryzacja', file: 'automotive.json' }, { name: 'Rośliny', file: 'plants.json' },
  { name: 'Geografia', file: 'geography.json' }, { name: 'Filmy i seriale', file: 'movies_series.json' },
  { name: 'Człowiek', file: 'people.json' }, { name: 'Muzyka', file: 'music.json' }
];
const wordsBaseUrl = 'https://raw.githubusercontent.com/kermitovsky/slowny-oszust/main/words/';
const emojiList = ['🐱', '🦁', '🐭', '🐶', '🐻', '🦊', '🐨', '🐰', '🐼', '🐹'];
const avatarColors = ['#8e44ad', '#e67e22', '#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#d35400'];
const fallbackWords = [{ word: "kot", category: "Zwierzęta" }, { word: "pies", category: "Zwierzęta" }];


// ===================================================================
// 4. FUNKCJE ZARZĄDZANIA OKNAMI (UI)
// ===================================================================
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
  if (isAnimating && modalToShow !== roleMessageBox && modalToShow !== messageBox && modalToShow !== hintInputBox) return;

  if (currentModal && currentModal !== modalToShow) {
    if ((modalToShow === roleMessageBox && currentModal === messageBox) || 
        (modalToShow === messageBox && currentModal === roleMessageBox) ||
        (modalToShow === roleMessageBox && currentModal === roleMessageBox)) { 
      hideModal(currentModal, true); 
    } else {
      hideModal(currentModal); 
    }
  }
  
  modalToShow.style.display = 'block'; 
  modalToShow.classList.remove('is-hiding');
  modalToShow.classList.add('is-visible');
  
  if (modalBackdrop) {
    modalBackdrop.classList.add('is-visible');
  }
  
  currentModal = modalToShow;
  
  if (modalToShow !== messageBox) {
    rulesBtn.classList.add('hidden');
    themeToggle.classList.add('hidden');
  }
}

function hideModal(modalToHide, force = false) {
  if (!modalToHide) return;
  if (force) {
    modalToHide.style.display = 'none';
    modalToHide.classList.remove('is-visible', 'is-hiding');
    if (modalToHide === currentModal) {
        currentModal = null;
        if (modalBackdrop) modalBackdrop.classList.remove('is-visible');
    }
    return;
  }
  
  modalToHide.classList.add('is-hiding');
  modalToHide.classList.remove('is-visible');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('is-visible');
  }
  
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

function showMessage(text, duration = 3500) {
  messageBox.innerHTML = text; 
  showModal(messageBox); 
  setTimeout(() => { 
    if (currentModal === messageBox) {
      hideModal(messageBox); 
    }
  }, duration);
}


// ===================================================================
// 5. ZAPISYWANIE DANYCH GRACZA I MOTYWU
// ===================================================================
function loadFromLocalStorage() {
  const savedNick = localStorage.getItem('slownyOszustNick');
  const savedEmoji = localStorage.getItem('slownyOszustEmoji');
  if (savedNick) playerNameInput.value = savedNick;
  if (savedEmoji) {
    selectedEmoji = savedEmoji;
    document.querySelectorAll('.emoji-btn').forEach(btn => {
      if (btn.textContent === savedEmoji) btn.classList.add('selected');
    });
  }
}

function initializeEmojiSelection() {
  emojiSelection.innerHTML = '';
  emojiList.forEach(emoji => {
    const btn = document.createElement('button');
    btn.classList.add('emoji-btn');
    btn.textContent = emoji;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedEmoji = emoji;
    });
    emojiSelection.appendChild(btn);
  });
  loadFromLocalStorage();
}
initializeEmojiSelection();

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

if (localStorage.getItem('theme') === 'dark') { 
  document.body.classList.add('dark-mode'); 
  themeToggle.textContent = '☀️'; 
} else {
  themeToggle.textContent = '🌙';
}


// ===================================================================
// 6. SYSTEM WYBORU KATEGORII
// ===================================================================
function initializeCategorySelection() {
  categoryGrid.querySelectorAll('.category-btn:not(.custom-new-btn)').forEach(btn => btn.remove());
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.classList.add('category-btn');
    btn.textContent = category.name;
    btn.dataset.file = category.file;
    btn.addEventListener('click', () => toggleCategory(category));
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
  allCategoriesCheckbox.checked = allSelected;
}

function updateConfirmCategoriesButton() {
  if (selectedCategories.length === 0) {
    confirmCategories.disabled = true;
    confirmCategories.style.opacity = '0.5';
    confirmCategories.style.cursor = 'not-allowed';
  } else {
    confirmCategories.disabled = false;
    confirmCategories.style.opacity = '1';
    confirmCategories.style.cursor = 'pointer';
  }
}

allCategoriesCheckbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    selectedCategories = [{ name: 'Wszystkie', file: 'all' }];
  } else {
    selectedCategories = [];
  }
  updateCategoryButtons(); 
  updateConfirmCategoriesButton();
});

const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error(`Błąd: ${response.status}`);
    return await response.json();
  } catch (error) {
    clearTimeout(id); 
    throw error;
  }
};

async function loadWords(categoriesToLoad) {
  words = []; 
  const categoriesToFetch = categoriesToLoad.filter(c => !c.isCustom && c.file !== 'all');
  const localCategories = categoriesToLoad.filter(c => c.isCustom);
  
  if (categoriesToLoad.some(c => c.file === 'all')) {
    categoriesToFetch.push(...categories); 
  }
  
  let loadedAny = false;
  try {
    const fetchPromises = categoriesToFetch.map(category =>
      fetchWithTimeout(`${wordsBaseUrl}${category.file}`)
        .then(categoryWords => {
          words = [...words, ...categoryWords.map(word => ({ word: word, category: category.name }))];
          loadedAny = true;
        })
        .catch(() => {})
    );
    await Promise.all(fetchPromises);
    
    for (const category of localCategories) {
      words = [...words, ...category.words.map(word => ({ word: word, category: category.name }))];
      loadedAny = true;
    }
    
    if (!loadedAny && localCategories.length === 0) throw new Error();
  } catch (error) { 
    words = fallbackWords; 
  }
}


// ===================================================================
// 7. PRZYCISKI TWORZENIA POKOJU
// ===================================================================
createRoomBtn.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  if (!name) { showMessage('❌ Wpisz nick!'); return; }
  if (!selectedEmoji) { showMessage('❌ Wybierz awatar!'); return; }
  
  localStorage.setItem('slownyOszustNick', name); 
  localStorage.setItem('slownyOszustEmoji', selectedEmoji);
  
  currentPlayerName = name; 
  isHost = true;
  showModal(categorySelectionBox); 
  initializeCategorySelection();
});

confirmCategories.addEventListener('click', () => {
  if (selectedCategories.length === 0) { showMessage('❌ Wybierz przynajmniej jedną kategorię!'); return; }
  
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
  }).catch(() => {
    document.getElementById('loadingMessage').style.display = 'none';
    confirmImpostors.disabled = false;
    showMessage('❌ Błąd ładowania! Używam domyślnych słów.');
  });
});

function updateImpostorButtons() {
  minusImpostor.disabled = impostorCount <= 1; 
  plusImpostor.disabled = impostorCount >= 5;
  minusImpostor.style.opacity = impostorCount <= 1 ? '0.5' : '1'; 
  plusImpostor.style.opacity = impostorCount >= 5 ? '0.5' : '1';
}

function updateRecommendedPlayers() {
  recommendedPlayers.textContent = `Zalecana liczba graczy: ${impostorCount + 2}–${Math.min(impostorCount + 4, 10)}`;
}

minusImpostor.addEventListener('click', () => { 
  if (impostorCount > 1) { 
    impostorCount--; 
    impostorCountDisplaySelector.textContent = impostorCount; 
    updateImpostorButtons(); 
    updateRecommendedPlayers(); 
  } 
});

plusImpostor.addEventListener('click', () => { 
  if (impostorCount < 5) { 
    impostorCount++; 
    impostorCountDisplaySelector.textContent = impostorCount; 
    updateImpostorButtons(); 
    updateRecommendedPlayers(); 
  } 
});

confirmImpostors.addEventListener('click', () => { 
  hideModal(impostorSelectionBox); 
  showModal(impostorHintBox); 
});

customHintCheckbox.addEventListener('change', (e) => {
  customHintsEnabled = e.target.checked;
  if (customHintsEnabled) {
    autoHintSettingsWrapper.style.opacity = '0.3';
    autoHintSettingsWrapper.style.pointerEvents = 'none';
  } else {
    autoHintSettingsWrapper.style.opacity = '1';
    autoHintSettingsWrapper.style.pointerEvents = 'auto';
  }
});

hintChanceSlider.addEventListener('input', (e) => {
  hintChance = parseInt(e.target.value, 10);
  document.querySelectorAll('#impostorHintBox .slider-label').forEach((l, i) => {
    if (i === hintChance) l.classList.add('label-active'); 
    else l.classList.remove('label-active');
  });
});

hintOnStartCheckbox.addEventListener('change', (e) => hintOnStart = e.target.checked);

confirmHintSettingsBtn.addEventListener('click', () => {
  hideModal(impostorHintBox);
  if (impostorCount > 1) {
    showModal(impostorTeamBox);
  } else { 
    impostorsKnowEachOther = false; 
    createRoom(impostorCount, customHintsEnabled, hintChance, hintOnStart, impostorsKnowEachOther); 
  }
});

teamKnowsBtn.addEventListener('click', () => { 
  impostorsKnowEachOther = true; 
  teamKnowsBtn.classList.add('selected'); 
  teamNotKnowsBtn.classList.remove('selected'); 
});

teamNotKnowsBtn.addEventListener('click', () => { 
  impostorsKnowEachOther = false; 
  teamNotKnowsBtn.classList.add('selected'); 
  teamKnowsBtn.classList.remove('selected'); 
});

confirmTeamSettingsBtn.addEventListener('click', () => { 
  createRoom(impostorCount, customHintsEnabled, hintChance, hintOnStart, impostorsKnowEachOther); 
});


// ===================================================================
// 8. TWORZENIE POKOJU W FIREBASE
// ===================================================================
function generateRoomCode() { 
  return Math.random().toString(36).substr(2, 4).toUpperCase(); 
}

function assignUniqueEmoji(players) {
  const used = Object.values(players || {}).map(p => p.emoji).filter(e => e);
  const avail = emojiList.filter(e => !used.includes(e));
  if (selectedEmoji && !used.includes(selectedEmoji)) return selectedEmoji;
  if (avail.length === 0) return emojiList[Math.floor(Math.random() * emojiList.length)];
  return avail[Math.floor(Math.random() * avail.length)];
}

function assignUniqueColor(players) {
  const used = Object.values(players || {}).map(p => p.avatarColor).filter(c => c);
  const avail = avatarColors.filter(c => !used.includes(c));
  if (avail.length === 0) return avatarColors[Math.floor(Math.random() * avatarColors.length)];
  return avail[Math.floor(Math.random() * avail.length)];
}

function createRoom(numImpostors, customHints, chanceIndex, onStart, knows) {
  
  // Zabezpieczenie przed pustą tablicą dla Firebase (pusta tablica powoduje błąd zapisu)
  const customCategoriesToSave = customCategories.filter(c => c.isCustom).map(c => ({ name: c.name, words: c.words })); 
  
  currentRoomCode = generateRoomCode(); 
  currentPlayerId = db.ref().push().key;
  
  const emoji = assignUniqueEmoji({}); 
  const avatarColor = assignUniqueColor({});
  
  const roomData = {
    players: { 
      [currentPlayerId]: { 
        name: currentPlayerName, 
        isHost: true, 
        role: null,
        emoji: emoji, 
        avatarColor: avatarColor 
      } 
    },
    gameStarted: false, 
    votingActive: false, 
    showStarter: false, 
    numImpostors: numImpostors, 
    categories: selectedCategories.length > 0 ? selectedCategories.map(c => c.name) : ['Wszystkie'], 
    customHintsEnabled: customHints, 
    hintChance: chanceIndex, 
    hintOnStart: onStart, 
    impostorsKnow: knows, 
    currentRound: 0, 
    hintPhase: false
  };

  // Dodajemy własne kategorie tylko, jeśli jakieś są, by nie wysłać błędu do Firebase
  if (customCategoriesToSave && customCategoriesToSave.length > 0) {
    roomData.customCategories = customCategoriesToSave;
  }
  
  db.ref(`rooms/${currentRoomCode}`).set(roomData).then(() => {
    showScreen(gameScreen); 
    hideModal(impostorTeamBox, true); 
    hideModal(impostorSelectionBox, true); 
    hideModal(categorySelectionBox, true);
    roomCodeDisplay.textContent = currentRoomCode;
    db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).onDisconnect().remove();
    listenToRoom(currentRoomCode);
  }).catch((error) => { 
    console.error("Błąd zapisu bazy:", error);
    showMessage('❌ Błąd tworzenia pokoju!'); 
    showScreen(loginScreen); 
  });
}


// ===================================================================
// 9. DOŁĄCZANIE I WYCHODZENIE Z POKOJU
// ===================================================================
joinRoomBtn.addEventListener('click', () => {
  const name = playerNameInput.value.trim(); 
  const roomCode = roomCodeInput.value.trim().toUpperCase();
  
  if (!name || !roomCode) { showMessage('❌ Wpisz nick i kod!'); return; }
  if (!selectedEmoji) { showMessage('❌ Wybierz awatar!'); return; }
  
  localStorage.setItem('slownyOszustNick', name); 
  localStorage.setItem('slownyOszustEmoji', selectedEmoji);
  
  currentPlayerName = name; 
  currentRoomCode = roomCode; 
  currentPlayerId = db.ref().push().key;

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.once('value').then(snapshot => {
    if (!snapshot.exists()) { showMessage('❌ Pokój nie istnieje!'); return; }
    
    const room = snapshot.val();
    if (room.gameStarted) { showMessage('❌ Gra już trwa!'); return; }
    if (Object.keys(room.players || {}).length >= 10) { showMessage('❌ Pokój pełny!'); return; }

    const playerData = { 
      name: currentPlayerName, 
      isHost: false, 
      role: null,
      emoji: assignUniqueEmoji(room.players), 
      avatarColor: assignUniqueColor(room.players) 
    };

    roomRef.child('players').update({ [currentPlayerId]: playerData }).then(() => {
      showScreen(gameScreen); 
      
      const cats = room.categories || ['Wszystkie'];
      let standard = cats.includes('Wszystkie') ? [{ name: 'Wszystkie', file: 'all' }] : categories.filter(c => cats.includes(c.name));
      customCategories = (room.customCategories || []).map(c => ({ ...c, file: `custom_${c.name}`, isCustom: true }));
      selectedCategories = [...standard, ...customCategories];
      
      loadWords(selectedCategories); 
      
      db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).onDisconnect().remove();
      listenToRoom(currentRoomCode);
    }).catch(() => showMessage('❌ Błąd dołączania!'));
  }).catch(() => showMessage('❌ Błąd sprawdzania pokoju!'));
});

leaveRoomBtn.addEventListener('click', () => {
  if (currentRoomCode && currentPlayerId) {
    db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).remove().then(() => {
      resetToLobby(); 
      currentRoomCode = null; 
      currentPlayerId = null; 
      isHost = false; 
      roomCodeInput.value = '';
    });
  }
});

function kickPlayer(playerId) { 
  if (!isHost || playerId === currentPlayerId) return; 
  db.ref(`rooms/${currentRoomCode}/players/${playerId}`).remove(); 
}


// ===================================================================
// 10. LISTA GRACZY I GŁOSOWANIE
// ===================================================================
function updatePlayersList(players, localIsHost, starterId = null) {
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
    
    if (player.isHost) li.classList.add('host');
    if (id === currentPlayerId) li.classList.add('self');
    if (id === starterId) li.classList.add('is-starter');

    if (localIsHost && id !== currentPlayerId) {
      const kickBtn = document.createElement('button');
      kickBtn.textContent = '×';
      kickBtn.classList.add('kickBtn');
      kickBtn.addEventListener('click', () => kickPlayer(id));
      li.appendChild(kickBtn);
    }
    playersList.appendChild(li);
  }
}

function updatePlayersListForVoting(players) {
  playersList.innerHTML = '';
  if (!players || !Object.keys(players).length) return;
  const myVote = players[currentPlayerId]?.votedFor;

  for (const [id, player] of Object.entries(players)) {
    const li = document.createElement('li'); 
    li.dataset.playerId = id;
    
    const avatar = document.createElement('span'); 
    avatar.classList.add('avatar'); 
    avatar.textContent = player.emoji || '❓'; 
    avatar.style.backgroundColor = player.avatarColor || avatarColors[0];
    
    li.appendChild(avatar); 
    li.appendChild(document.createTextNode(` ${player.name || 'Nieznany'}`));
    
    if (player.isHost) li.classList.add('host');
    if (player.votedFor) li.classList.add('has-voted');

    if (myVote) {
      li.classList.add('disabled'); 
      if (myVote === id) li.classList.add('player-selected');
    } else {
      if (id === currentPlayerId) {
        li.classList.add('self', 'disabled');
      } else {
        li.classList.add('vote-target'); 
        if (selectedPlayerId === id) li.classList.add('player-selected');
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
  db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).update({ votedFor: targetId }); 
  selectedPlayerId = null; 
}

function tallyVotes(room) {
  const players = room.players; 
  const playerIds = Object.keys(players);
  const votes = {}; 
  let totalVotes = 0;
  
  for (const playerId of playerIds) {
    if (players[playerId].votedFor) { 
      totalVotes++; 
      votes[players[playerId].votedFor] = (votes[players[playerId].votedFor] || 0) + 1; 
    }
  }
  
  if (totalVotes < playerIds.length) return;

  let maxVotes = 0, ejectedId = null, isTie = false;
  for (const [playerId, count] of Object.entries(votes)) {
    if (count > maxVotes) { 
      maxVotes = count; 
      ejectedId = playerId; 
      isTie = false; 
    } else if (count === maxVotes && maxVotes > 0) {
      isTie = true;
    }
  }
  
  const updates = { votingActive: false, impostorHint: null, resetMessage: null };
  playerIds.forEach(id => { updates[`players/${id}/votedFor`] = null; });

  if (isTie || !ejectedId) {
    updates.lastRoundSummary = `Brak ostatecznej decyzji!<br>Impostor przetrwał.`; 
    updates.roundWinner = 'draw';
  } else {
    updates.gameStarted = false; 
    updates.currentWord = null; 
    updates.starterId = null; 
    updates.currentCategory = null; 
    updates.showStarter = false;
    
    playerIds.forEach(id => { 
      updates[`players/${id}/role`] = null; 
      updates[`players/${id}/seenRole`] = null; 
    });
    
    if (players[ejectedId].role === 'impostor') {
      updates.lastRoundSummary = `Oszustem był(a) <strong>${players[ejectedId].name}</strong>!<br>Słowo: <strong>${room.currentWord}</strong>`; 
      updates.roundWinner = 'innocent';
    } else {
      updates.lastRoundSummary = `Wygłosowano niewinną osobę (<strong>${players[ejectedId].name}</strong>).<br>Słowo: <strong>${room.currentWord}</strong>`; 
      updates.roundWinner = 'impostor';
    }
  }
  db.ref(`rooms/${currentRoomCode}`).update(updates);
}


// ===================================================================
// 11. ODCZYTYWANIE DANYCH Z POKOJU W CZASIE RZECZYWISTYM
// ===================================================================
function listenToRoom(roomCode) {
  db.ref(`rooms/${roomCode}`).on('value', snapshot => {
    const room = snapshot.val();
    if (!room) { 
      if (!isAnimating) { showMessage('❌ Pokój usunięty!'); resetToLobby(); } 
      return; 
    }
    currentRoomData = room; 
    
    const players = room.players || {}; 
    const playerIds = Object.keys(players);
    const iAmInRoom = players[currentPlayerId];
    
    if (!iAmInRoom && !isAnimating) { showMessage('❌ Rozłączono!'); resetToLobby(); return; }
    
    if (!Object.values(players).some(p => p.isHost) && iAmInRoom && playerIds.length > 0) {
      if (playerIds.sort()[0] === currentPlayerId) { 
        db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).update({ isHost: true }); 
        return; 
      }
    }
    
    isHost = iAmInRoom ? iAmInRoom.isHost : false; 
    roomSettingsBtn.style.display = isHost && !room.gameStarted ? 'inline-block' : 'none';

    // --- FAZA PODPOWIEDZI ---
    if (room.hintPhase) {
      if (!isAnimating && !document.getElementById('hintInputBox').classList.contains('is-visible') && !(room.submittedHints && room.submittedHints[currentPlayerId])) {
        customHintInput.value = ''; 
        customHintInput.style.display = 'block'; 
        submitCustomHintBtn.style.display = 'block'; 
        hintWaitingMessage.style.display = 'none';
        
        if (iAmInRoom.role === 'impostor') {
          hintInputTitle.textContent = "Udawaj!"; 
          hintInputTitle.style.color = "var(--c-danger)";
          hintInputDesc.innerHTML = "Jesteś oszustem! Wpisz szybko byle co (np. banan), żeby nikt się nie zorientował!";
        } else {
          hintInputTitle.textContent = "Wymyśl podpowiedź"; 
          hintInputTitle.style.color = "var(--c-success)";
          hintInputDesc.innerHTML = `Słowo to: <strong style="color:var(--c-success); font-size:2.5rem;">${room.currentWord}</strong><br>Napisz jedno słowo jako podpowiedź dla oszusta (ale nie za łatwą!).`;
        }
        showModal(hintInputBox);
        setTimeout(() => customHintInput.focus(), 300);
      }

      if (isHost && !window.tallyingHints) {
        const submittedCount = room.submittedHints ? Object.keys(room.submittedHints).length : 0;
        if (submittedCount >= playerIds.length && playerIds.length > 0) {
          window.tallyingHints = true;
          const innocentHints = [];
          
          for (const [pId, text] of Object.entries(room.submittedHints)) {
            if (players[pId] && players[pId].role !== 'impostor' && text.trim() !== '') innocentHints.push(text);
          }
          
          let finalHint = "Brak podpowiedzi";
          if (innocentHints.length > 0) finalHint = innocentHints[Math.floor(Math.random() * innocentHints.length)];
          
          db.ref(`rooms/${currentRoomCode}`).update({ 
            hintPhase: false, 
            impostorHint: finalHint 
          }).then(() => { window.tallyingHints = false; });
        }
      }
    } else {
      if (currentModal === hintInputBox) hideModal(hintInputBox);
    }

    const votingActive = room.votingActive || false;
    if (votingActive && !lastSeenVotingState) { 
      votingOverlay.classList.add('is-active'); 
      setTimeout(() => votingOverlay.classList.remove('is-active'), 3500); 
    }
    lastSeenVotingState = votingActive;

    if (votingActive) { 
      document.body.classList.add('voting-active'); 
      wordDisplay.innerHTML = "<strong>Czas na głosowanie!</strong>"; 
      updatePlayersListForVoting(players); 
    } else { 
      document.body.classList.remove('voting-active'); 
      selectedPlayerId = null; 
      updatePlayersList(players, isHost, room.starterId); 
    }

    document.querySelectorAll('.kickBtn').forEach(btn => { 
      btn.disabled = room.gameStarted || votingActive; 
      btn.style.opacity = (room.gameStarted || votingActive) ? '0.5' : '1'; 
      btn.style.cursor = (room.gameStarted || votingActive) ? 'not-allowed' : 'pointer'; 
    });

    playerCountDisplay.innerHTML = `Gracze: <span class="bold">${playerIds.length}</span>`;
    let hintText = room.customHintsEnabled ? 'Własne (Gracze)' : hintChanceValues[room.hintChance || 0];
    if (room.hintOnStart && !room.customHintsEnabled) hintText += ' (Start)';
    impostorCountDisplay.innerHTML = `Oszuści: <span class="bold">${room.numImpostors || 0}</span>`;
    hintChanceInfoDisplay.innerHTML = `Podpowiedź: <span class="bold">${hintText}</span>`;
    
    if (!room.gameStarted && !votingActive) { 
      lobbyCategories.style.display = 'block'; 
      lobbyCategories.textContent = 'Kategorie: ' + ((room.categories && room.categories.join(', ')) || 'Brak'); 
    } else {
      lobbyCategories.style.display = 'none';
    }

    if (!votingActive && room.gameStarted && room.currentWord && !isAnimating && !room.hintPhase) { 
      wordDisplay.innerHTML = (iAmInRoom.role === 'impostor')
        ? `Twoje słowo: <span class="word-impostor">OSZUST! ${room.impostorHint ? `<span class="impostor-hint-span">(Podpowiedź: ${room.impostorHint})</span>` : ''}</span>`
        : `Twoje słowo: <span class="word-normal">${room.currentWord}</span>`;
    } else if (!room.gameStarted) {
      wordDisplay.innerHTML = ''; 
    }

    if (room.lastRoundSummary && !room.gameStarted && !isAnimating) { 
      lastRoundSummaryTitle.style.display = 'block'; 
      lastRoundSummary.innerHTML = room.lastRoundSummary; 
      lastRoundSummary.style.display = 'block';
    } else if (!room.lastRoundSummary || !room.gameStarted) { 
      lastRoundSummaryTitle.style.display = 'none'; 
      lastRoundSummary.style.display = 'none'; 
    }
    
    startGameBtn.style.display = isHost && !room.gameStarted && !votingActive ? 'block' : 'none';
    startVoteBtn.style.display = isHost && room.gameStarted && !votingActive ? 'block' : 'none';
    confirmVoteBtn.style.display = votingActive && !(iAmInRoom && iAmInRoom.votedFor) ? 'block' : 'none';
    endRoundBtn.style.display = 'none';

    // --- START RUNDY I KARTA ROLI ---
    const newStarterId = room.starterId;
    if (room.gameStarted && !room.hintPhase && newStarterId && newStarterId !== lastSeenStarterId) {
      lastSeenStarterId = newStarterId; 
      lastSeenSummary = null; 
      lastSeenRoundWinner = null; 
      
      let roleHTML = (iAmInRoom.role === 'impostor') 
        ? `<div style="color: #e74c3c;">JESTEŚ<br>OSZUSTEM!</div>${room.impostorHint ? `<div class="impostor-hint-span" style="margin-top:1rem; font-size:1.5rem;">Podpowiedź:<br>${room.impostorHint}</div>` : ''}`
        : `<div style="font-size: 1.5rem; opacity: 0.8;">TWOJE SŁOWO:</div><div style="color: #2ecc71; font-size: 3.5rem; margin-top: 0.5rem;">${room.currentWord}</div>`;
      
      wordDisplay.innerHTML = ''; 
      isAnimating = true; 
      
      runCountdown(() => {
          const newCard = roleCardInner.cloneNode(true); 
          newCard.classList.remove('is-flipped'); 
          const frontFace = newCard.querySelector('.role-card-front');
          
          if (iAmInRoom.role === 'impostor') { 
            frontFace.classList.add('is-impostor'); 
            frontFace.classList.remove('is-innocent'); 
          } else { 
            frontFace.classList.add('is-innocent'); 
            frontFace.classList.remove('is-impostor'); 
          }
          
          roleCardInner.parentNode.replaceChild(newCard, roleCardInner); 
          roleCardInner = newCard; 
          
          const content = roleCardInner.querySelector('#roleContent'); 
          if (content) content.innerHTML = roleHTML;
          
          showModal(roleMessageBox); 
          
          roleCardInner.addEventListener('click', function() {
              if (!this.classList.contains('is-flipped')) {
                  this.classList.add('is-flipped');
                  db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).update({seenRole: true});
              }
          });
      });
    }
    
    if (isHost && room.gameStarted && !room.hintPhase && !room.showStarter) {
        if (Object.values(players).every(p => p.seenRole === true) && playerIds.length > 0) {
            if (!window.hostTimerRunning) { 
              window.hostTimerRunning = true; 
              setTimeout(() => { 
                db.ref(`rooms/${currentRoomCode}`).update({showStarter: true}); 
                window.hostTimerRunning = false; 
              }, 5000); 
            }
        }
    }
    
    // --- KINOWY STARTER ---
    if (room.gameStarted && !room.hintPhase && room.showStarter && isAnimating) {
        hideModal(roleMessageBox); 
        starterOverlayName.textContent = players[newStarterId]?.name || '...'; 
        starterOverlay.classList.add('is-active');
        
        setTimeout(() => {
            starterOverlay.classList.remove('is-active'); 
            isAnimating = false;
            if (room.gameStarted && room.currentWord && iAmInRoom) {
              wordDisplay.innerHTML = (iAmInRoom.role === 'impostor')
                ? `Twoje słowo: <span class="word-impostor">OSZUST! ${room.impostorHint ? `<span class="impostor-hint-span">(Podpowiedź: ${room.impostorHint})</span>` : ''}</span>`
                : `Twoje słowo: <span class="word-normal">${room.currentWord}</span>`;
            }
        }, 4000);
    }
    
    // --- WYNIKI Z KONFETTI ---
    const newSummary = room.lastRoundSummary;
    if (newSummary && newSummary !== lastSeenSummary) {
      lastSeenSummary = newSummary; 
      if (!room.gameStarted) lastSeenStarterId = null; 
      
      summaryOverlaySubtitle.innerHTML = newSummary;
      summaryOverlay.classList.remove('innocent-win', 'impostor-win', 'draw-win');
      
      if (room.roundWinner === 'innocent') { 
        summaryOverlayTitle.textContent = "WYGRYWAJĄ NIEWINNI!"; 
        summaryOverlay.classList.add('innocent-win'); 
      } else if (room.roundWinner === 'impostor') { 
        summaryOverlayTitle.textContent = "WYGRYWA OSZUST!"; 
        summaryOverlay.classList.add('impostor-win'); 
      } else { 
        summaryOverlayTitle.textContent = "REMIS!"; 
        summaryOverlay.classList.add('draw-win'); 
      }

      summaryOverlay.classList.add('is-active');
      
      setTimeout(() => {
          if (room.roundWinner && room.roundWinner !== lastSeenRoundWinner) {
            lastSeenRoundWinner = room.roundWinner;
            if (room.roundWinner === 'innocent') {
              confetti({ particleCount: 400, spread: 120, scalar: 1.8, origin: { y: 0.6 }, zIndex: 3000, colors: ['#2ecc71', '#27ae60', '#f1c40f', '#ffffff'] });
            } else if (room.roundWinner === 'impostor') {
              confetti({ particleCount: 400, spread: 120, scalar: 1.8, origin: { y: 0.6 }, zIndex: 3000, colors: ['#e74c3c', '#c0392b', '#000000', '#ffffff'] });
            }
          }
      }, 400); 
      
      setTimeout(() => summaryOverlay.classList.remove('is-active'), 6000); 
    }
    if (!room.gameStarted) lastSeenStarterId = null; 
    
    if (room.resetMessage && room.resetMessage !== lastSeenSummary) { 
      showMessage(room.resetMessage, 4000); 
      if (isHost) db.ref(`rooms/${currentRoomCode}/resetMessage`).remove(); 
    }
    
    if (votingActive) { 
      if (playerIds.map(id => players[id].votedFor).filter(Boolean).length === playerIds.length && isHost) tallyVotes(room); 
    }
  });
}


// ===================================================================
// 12. ROZPOCZYNANIE I KOŃCZENIE RUNDY
// ===================================================================
startGameBtn.addEventListener('click', () => {
  if (isAnimating || !isHost) return;
  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  
  roomRef.once('value').then(snapshot => {
    const room = snapshot.val(); 
    const players = room.players || {}; 
    const playerIds = Object.keys(players);
    
    if (playerIds.length < room.numImpostors + 2) { showMessage(`❌ Za mało graczy! Minimum ${room.numImpostors + 2}.`); return; }
    if (words.length === 0) { showMessage('❌ Brak słów!'); return; }

    const wordObj = words[Math.floor(Math.random() * words.length)];
    const impostorIds = playerIds.sort(() => Math.random() - 0.5).slice(0, room.numImpostors);
    
    const updates = {};
    playerIds.forEach(id => { 
      updates[`players/${id}/role`] = impostorIds.includes(id) ? 'impostor' : 'normal'; 
      updates[`players/${id}/votedFor`] = null; 
      updates[`players/${id}/seenRole`] = false; 
    });

    let selectionPool = [...playerIds].concat(playerIds.filter(id => !impostorIds.includes(id)));
    const starterId = selectionPool[Math.floor(Math.random() * selectionPool.length)];

    if (room.customHintsEnabled) {
      updates.hintPhase = true; 
      updates.submittedHints = null;
    } else {
      updates.hintPhase = false;
      let hint = null;
      if ((room.hintOnStart && impostorIds.includes(starterId)) || Math.random() < hintChanceNumeric[room.hintChance || 0]) {
        hint = wordObj.category;
      }
      updates.impostorHint = hint;
    }

    updates.gameStarted = true; 
    updates.votingActive = false; 
    updates.currentWord = wordObj.word; 
    updates.currentCategory = wordObj.category;
    updates.starterId = starterId; 
    updates.showStarter = false; 
    updates.lastRoundSummary = null; 
    updates.roundEndMessage = null; 
    updates.roundWinner = null; 
    updates.currentRound = (room.currentRound || 0) + 1;
    
    roomRef.update(updates);
  });
});

startVoteBtn.addEventListener('click', () => { 
  if (!isAnimating && isHost) db.ref(`rooms/${currentRoomCode}`).update({ votingActive: true }); 
});

confirmVoteBtn.addEventListener('click', () => { 
  if (!selectedPlayerId) showMessage('❌ Najpierw wybierz gracza!', 2500); 
  else voteForPlayer(selectedPlayerId); 
});

endRoundBtn.addEventListener('click', () => {
  if (!isAnimating && isHost) {
    db.ref(`rooms/${currentRoomCode}`).once('value').then(snap => {
      const room = snap.val(); 
      const players = room.players || {};
      const impostorNames = Object.keys(players).filter(id => players[id].role === 'impostor').map(id => players[id].name).join(', ');
      
      const updates = { 
        gameStarted: false, 
        votingActive: false, 
        currentWord: null, 
        currentCategory: null, 
        impostorHint: null, 
        starterId: null, 
        impostorsKnow: null, 
        lastRoundSummary: `Zakończono rundę.<br>Słowo: <strong>${room.currentWord}</strong><br>Oszuści: <strong>${impostorNames || 'Brak'}</strong>`, 
        resetMessage: `Zakończono rundę.<br>Słowo: <strong>${room.currentWord}</strong>`, 
        roundWinner: 'draw', 
        showStarter: false, 
        submittedHints: null 
      };
      
      Object.keys(players).forEach(id => { 
        updates[`players/${id}/role`] = null; 
        updates[`players/${id}/votedFor`] = null; 
        updates[`players/${id}/seenRole`] = null; 
      });
      
      db.ref(`rooms/${currentRoomCode}`).update(updates);
    });
  }
});

function runCountdown(callback) {
  if (modalBackdrop) modalBackdrop.classList.add('is-visible');
  if (roleCardInner) roleCardInner.classList.remove('is-flipped');
  
  let count = 3; 
  countdownDisplay.textContent = count; 
  countdownDisplay.classList.add('active');
  
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownDisplay.textContent = count;
    } else { 
      clearInterval(interval); 
      countdownDisplay.classList.remove('active'); 
      countdownDisplay.textContent = ''; 
      if (callback) callback(); 
    }
  }, 1000); 
}


// ===================================================================
// 13. WYSYŁANIE WŁASNEJ PODPOWIEDZI
// ===================================================================
submitCustomHintBtn.addEventListener('click', () => {
  const text = customHintInput.value.trim();
  if (!text) { showMessage("❌ Musisz coś wpisać!"); return; }
  
  db.ref(`rooms/${currentRoomCode}/submittedHints/${currentPlayerId}`).set(text).then(() => {
    customHintInput.style.display = 'none'; 
    submitCustomHintBtn.style.display = 'none'; 
    hintWaitingMessage.style.display = 'block';
  });
});


// ===================================================================
// 14. WŁASNE KATEGORIE
// ===================================================================
function showCustomCategoryModal(editFileId = null) {
  editingCategoryFile = editFileId; 
  if (editFileId) {
    const cat = customCategories.find(c => c.file === editFileId);
    if (!cat) return;
    customCategoryNameInput.value = cat.name; 
    tempCustomWords = [...cat.words]; 
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
  if (word.length < 3) { showMessage('❌ Słowo musi mieć przynajmniej 3 znaki!', 2500); return; }
  tempCustomWords.push(word); 
  customWordInput.value = ''; 
  customWordInput.focus(); 
  updateTempWordsList();
}

function deleteTempWord(index) { 
  tempCustomWords.splice(index, 1); 
  updateTempWordsList(); 
}

function updateTempWordsList() {
  customWordsList.innerHTML = ''; 
  if (tempCustomWords.length === 0) customWordsList.innerHTML = '<li>Dodaj przynajmniej 3 słowa...</li>';
  
  tempCustomWords.forEach((word, index) => {
    const li = document.createElement('li'); 
    li.textContent = word;
    const btn = document.createElement('button'); 
    btn.textContent = '×'; 
    btn.classList.add('delete-word-btn'); 
    btn.dataset.index = index; 
    li.appendChild(btn); 
    customWordsList.appendChild(li);
  });
  
  saveCustomCategoryBtn.disabled = tempCustomWords.length < 3;
}

function saveCustomCategory() {
  const catName = customCategoryNameInput.value.trim();
  if (catName.length < 3) { showMessage('❌ Nazwa musi mieć przynajmniej 3 znaki!', 2500); return; }
  
  if (editingCategoryFile) {
    const catIdx = customCategories.findIndex(c => c.file === editingCategoryFile);
    if (catIdx > -1) { 
      customCategories[catIdx].name = catName; 
      customCategories[catIdx].words = [...tempCustomWords]; 
    }
    
    const selIdx = selectedCategories.findIndex(c => c.file === editingCategoryFile);
    if (selIdx > -1) { 
      selectedCategories[selIdx].name = catName; 
      selectedCategories[selIdx].words = [...tempCustomWords]; 
    }
    
    const btn = categoryGrid.querySelector(`.category-btn[data-file="${editingCategoryFile}"]`);
    if (btn) { 
      const old = btn.querySelector('.category-actions'); 
      if (old) old.remove(); 
      btn.textContent = catName; 
      addCategoryActions(btn, editingCategoryFile); 
    }
    editingCategoryFile = null; 
  } else {
    const newCat = { name: catName, file: `custom_${Date.now()}`, words: [...tempCustomWords], isCustom: true };
    customCategories.push(newCat); 
    selectedCategories.push(newCat); 
    addCustomCategoryToGrid(newCat); 
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
  
  btn.addEventListener('click', (e) => { 
    if (!e.target.closest('.category-actions')) toggleCategory(category); 
  });
  
  addCategoryActions(btn, category.file); 
  categoryGrid.insertBefore(btn, createCustomCategoryBtn); 
}

function addCategoryActions(btn, fileId) {
  const div = document.createElement('div'); 
  div.classList.add('category-actions');
  
  const edit = document.createElement('button'); 
  edit.textContent = '✏️'; 
  edit.classList.add('edit-btn'); 
  edit.dataset.file = fileId;
  
  const del = document.createElement('button'); 
  del.textContent = '🗑️'; 
  del.classList.add('delete-btn'); 
  del.dataset.file = fileId;
  
  div.appendChild(edit); 
  div.appendChild(del); 
  btn.appendChild(div);
}

function deleteCustomCategory(fileId) {
  customCategories = customCategories.filter(c => c.file !== fileId); 
  selectedCategories = selectedCategories.filter(c => c.file !== fileId);
  const btn = categoryGrid.querySelector(`.category-btn[data-file="${fileId}"]`); 
  if (btn) btn.remove();
  
  updateCategoryButtons(); 
  updateConfirmCategoriesButton();
}

createCustomCategoryBtn.addEventListener('click', () => showCustomCategoryModal());
closeCustomCategoryBtn.addEventListener('click', hideCustomCategoryModal);
addCustomWordBtn.addEventListener('click', addTempWord);
saveCustomCategoryBtn.addEventListener('click', saveCustomCategory);

categoryGrid.addEventListener('click', (e) => {
  const t = e.target.closest('button'); 
  if (!t) return;
  if (t.classList.contains('delete-btn')) { 
    e.stopPropagation(); 
    deleteCustomCategory(t.dataset.file); 
  } else if (t.classList.contains('edit-btn')) { 
    e.stopPropagation(); 
    showCustomCategoryModal(t.dataset.file); 
  }
});

customWordsList.addEventListener('click', (e) => { 
  if (e.target && e.target.classList.contains('delete-word-btn')) {
    deleteTempWord(parseInt(e.target.dataset.index, 10)); 
  }
});

customWordInput.addEventListener('keypress', (e) => { 
  if (e.key === 'Enter') { 
    e.preventDefault(); 
    addTempWord(); 
  } 
});


// ===================================================================
// 15. OBSŁUGA ZMIANY USTAWIEŃ W TRAKCIE GRY
// ===================================================================
roomSettingsBtn.addEventListener('click', () => {
  if (!currentRoomData) return;
  tempSetImpostors = currentRoomData.numImpostors || 1;
  tempSetCustomHints = currentRoomData.customHintsEnabled || false;
  tempSetHintChance = currentRoomData.hintChance || 0;
  tempSetHintOnStart = currentRoomData.hintOnStart || false;
  tempSetImpostorsKnow = currentRoomData.impostorsKnow || false;
  updateSettingsModalUI();
  showModal(roomSettingsBox);
});

closeRoomSettingsBtn.addEventListener('click', () => hideModal(roomSettingsBox));

function updateSettingsModalUI() {
  setImpostorCount.textContent = tempSetImpostors;
  setMinusImpostor.disabled = tempSetImpostors <= 1; 
  setPlusImpostor.disabled = tempSetImpostors >= 5;
  setMinusImpostor.style.opacity = tempSetImpostors <= 1 ? '0.5' : '1'; 
  setPlusImpostor.style.opacity = tempSetImpostors >= 5 ? '0.5' : '1';

  setCustomHintCheckbox.checked = tempSetCustomHints;
  if (tempSetCustomHints) {
    setAutoHintSettingsWrapper.style.opacity = '0.3';
    setAutoHintSettingsWrapper.style.pointerEvents = 'none';
  } else {
    setAutoHintSettingsWrapper.style.opacity = '1';
    setAutoHintSettingsWrapper.style.pointerEvents = 'auto';
  }

  setHintChanceSlider.value = tempSetHintChance;
  document.querySelectorAll('#setSliderLabels .slider-label').forEach((l, i) => {
    if (i === tempSetHintChance) l.classList.add('label-active'); 
    else l.classList.remove('label-active');
  });

  setHintOnStartCheckbox.checked = tempSetHintOnStart;
  if (tempSetImpostorsKnow) { 
    setTeamKnowsBtn.classList.add('selected'); 
    setTeamNotKnowsBtn.classList.remove('selected'); 
  } else { 
    setTeamNotKnowsBtn.classList.add('selected'); 
    setTeamKnowsBtn.classList.remove('selected'); 
  }
}

setMinusImpostor.addEventListener('click', () => { if (tempSetImpostors > 1) { tempSetImpostors--; updateSettingsModalUI(); } });
setPlusImpostor.addEventListener('click', () => { if (tempSetImpostors < 5) { tempSetImpostors++; updateSettingsModalUI(); } });
setCustomHintCheckbox.addEventListener('change', (e) => { tempSetCustomHints = e.target.checked; updateSettingsModalUI(); });
setHintChanceSlider.addEventListener('input', (e) => { tempSetHintChance = parseInt(e.target.value, 10); updateSettingsModalUI(); });
setHintOnStartCheckbox.addEventListener('change', (e) => { tempSetHintOnStart = e.target.checked; });
setTeamKnowsBtn.addEventListener('click', () => { tempSetImpostorsKnow = true; updateSettingsModalUI(); });
setTeamNotKnowsBtn.addEventListener('click', () => { tempSetImpostorsKnow = false; updateSettingsModalUI(); });

saveRoomSettingsBtn.addEventListener('click', () => {
  const playersCount = Object.keys(currentRoomData.players || {}).length;
  const minRequired = tempSetImpostors + 2;
  if (playersCount < minRequired) { showMessage(`❌ Za mało graczy na ${tempSetImpostors} oszustów!`); return; }

  db.ref(`rooms/${currentRoomCode}`).update({
    numImpostors: tempSetImpostors, 
    customHintsEnabled: tempSetCustomHints, 
    hintChance: tempSetHintChance,
    hintOnStart: tempSetHintOnStart, 
    impostorsKnow: tempSetImpostorsKnow
  }).then(() => { 
    hideModal(roomSettingsBox); 
    showMessage('✅ Ustawienia zapisane!', 3000); 
  });
});

copyRoomCodeBtn.addEventListener('click', () => { 
  navigator.clipboard.writeText(roomCodeDisplay.textContent)
    .then(() => showMessage('✅ Kod skopiowany!'))
    .catch(() => showMessage('❌ Nie udało się skopiować kodu')); 
});

// ===================================================================
// 16. BOT SPRZĄTAJĄCY BAZĘ (Uruchamiany przy wejściu)
// ===================================================================
setTimeout(() => {
  db.ref('rooms').once('value').then(snap => {
    const rooms = snap.val(); 
    if (!rooms) return;
    for (const [code, data] of Object.entries(rooms)) {
      if (!data.players || Object.keys(data.players).length === 0) {
        db.ref(`rooms/${code}`).remove();
      }
    }
  });
}, 2000);

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

// Kinowe Nakładki
const votingOverlay = document.getElementById('votingOverlay'); 
const starterOverlay = document.getElementById('starterOverlay'); 
const starterOverlayName = document.getElementById('starterOverlayName');
// NOWE: Elementy nakładki podsumowania
const summaryOverlay = document.getElementById('summaryOverlay');
const summaryOverlayTitle = document.getElementById('summaryOverlayTitle');
const summaryOverlaySubtitle = document.getElementById('summaryOverlaySubtitle');

// Nowe elementy karty 3D (Zmienna globalna dla podmiany w locie)
let roleCardInner = document.getElementById('roleCardInner');

const closeRulesBtn = document.getElementById('closeRules');
const closeRulesTopBtn = document.getElementById('closeRulesTop');
const closeRoomSettingsBtn = document.getElementById('closeRoomSettingsBtn'); 

// Elementy Wyboru Kategorii
const allCategoriesBtn = document.getElementById('allCategoriesBtn');
const categoryGrid = document.querySelector('#categorySelectionBox .category-grid');
const confirmCategories = document.getElementById('confirmCategories');
const createCustomCategoryBtn = document.getElementById('createCustomCategoryBtn'); 

// Elementy Wyboru Impostora (Podczas tworzenia)
const minusImpostor = document.getElementById('minusImpostor');
const plusImpostor = document.getElementById('plusImpostor');
const impostorCountDisplaySelector = document.getElementById('impostorCount');
const confirmImpostors = document.getElementById('confirmImpostors');

// Elementy Podpowiedzi (Podczas tworzenia)
const hintChanceSlider = document.getElementById('hintChanceSlider');
const hintOnStartCheckbox = document.getElementById('hintOnStartCheckbox');
const confirmHintSettingsBtn = document.getElementById('confirmHintSettingsBtn');
const hintChanceInfoDisplay = document.getElementById('hintChanceInfoDisplay');
const hintCheckboxContainer = document.querySelector('#impostorHintBox .checkbox-container');

// Elementy Drużyny (Podczas tworzenia)
const teamKnowsBtn = document.getElementById('teamKnowsBtn');
const teamNotKnowsBtn = document.getElementById('teamNotKnowsBtn');
const confirmTeamSettingsBtn = document.getElementById('confirmTeamSettingsBtn');

// Elementy ZMIANY Ustawień Pokoju (Wewnątrz gry)
const setMinusImpostor = document.getElementById('setMinusImpostor');
const setPlusImpostor = document.getElementById('setPlusImpostor');
const setImpostorCount = document.getElementById('setImpostorCount');
const setHintChanceSlider = document.getElementById('setHintChanceSlider');
const setHintOnStartCheckbox = document.getElementById('setHintOnStartCheckbox');
const setTeamKnowsBtn = document.getElementById('setTeamKnowsBtn');
const setTeamNotKnowsBtn = document.getElementById('setTeamNotKnowsBtn');
const saveRoomSettingsBtn = document.getElementById('saveRoomSettingsBtn');
const setHintCheckboxContainer = document.getElementById('setHintCheckboxContainer');

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

// Zmienne stanu gry
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

// Zmienne do tworzenia
let hintChance = 0; 
let hintOnStart = false; 
let impostorsKnowEachOther = false; 

// Tymczasowe zmienne do panelu ustawień
let tempSetImpostors = 1;
let tempSetHintChance = 0;
let tempSetHintOnStart = false;
let tempSetImpostorsKnow = false;

const hintChanceValues = ['0%', '25%', '50%', '75%', '100%'];
const hintChanceNumeric = [0, 0.25, 0.5, 0.75, 1];
let tempCustomWords = [];
let customCategories = [];
let editingCategoryFile = null; 
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
  { word: "kot", category: "Zwierzęta" }, { word: "pies", category: "Zwierzęta" },
  { word: "pizza", category: "Jedzenie" }, { word: "krzesło", category: "Przedmioty" },
  { word: "park", category: "Miejsca" }, { word: "lekarz", category: "Zawody" }
];

// --- FUNKCJE ZARZĄDZANIA UI ---
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
  if (isAnimating && modalToShow !== roleMessageBox && modalToShow !== messageBox) return;

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
  if (modalBackdrop) modalBackdrop.classList.remove('is-visible');
  
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

window.addEventListener('beforeunload', () => {
  if (currentRoomCode && currentPlayerId) {
    db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).remove();
  }
});

function closeRules() { hideModal(rulesBox); }

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

function initializeCategorySelection() {
  categoryGrid.querySelectorAll('.category-btn:not(.custom-new-btn)').forEach(btn => btn.remove());
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.classList.add('category-btn');
    btn.textContent = category.name;
    btn.dataset.file = category.file;
    btn.dataset.categoryName = category.name; 
    btn.addEventListener('click', () => toggleCategory(category));
    categoryGrid.insertBefore(btn, createCustomCategoryBtn);
  });
  updateCategoryButtons();
  updateAllCategoriesCheckbox();
  updateConfirmCategoriesButton();
}

function toggleCategory(category) {
  if (selectedCategories.some(c => c.file === 'all')) selectedCategories = [];
  const index = selectedCategories.findIndex(c => c.file === category.file);
  if (index > -1) selectedCategories.splice(index, 1);
  else selectedCategories.push(category);
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
  allCategoriesBtn.querySelector('.checkbox').textContent = allSelected ? '✔' : '';
}

function updateConfirmCategoriesButton() {
  confirmCategories.disabled = selectedCategories.length === 0;
  confirmCategories.style.opacity = selectedCategories.length === 0 ? '0.5' : '1';
  confirmCategories.style.cursor = selectedCategories.length === 0 ? 'not-allowed' : 'pointer';
}

allCategoriesBtn.querySelector('.checkbox').addEventListener('click', () => {
  if (selectedCategories.some(c => c.file === 'all')) selectedCategories = [];
  else selectedCategories = [{ name: 'Wszystkie', file: 'all' }];
  updateCategoryButtons();
  updateAllCategoriesCheckbox();
  updateConfirmCategoriesButton();
});

confirmCategories.addEventListener('click', () => {
  if (selectedCategories.length === 0) {
    showMessage('❌ Wybierz przynajmniej jedną kategorię!');
    return;
  }
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
  }).catch(error => {
    document.getElementById('loadingMessage').style.display = 'none';
    confirmImpostors.disabled = false;
    showMessage('❌ Błąd ładowania kategorii! Używam domyślnych słów.');
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
          const mappedWords = categoryWords.map(word => ({ word: word, category: category.name }));
          words = [...words, ...mappedWords];
          loadedAnyFile = true;
        })
        .catch(error => {
          if (category.file !== 'all') showMessage(`❌ Błąd ładowania kategorii ${category.name}! Pomijam.`);
        })
    );
    await Promise.all(fetchPromises);

    for (const category of localCategories) {
      const mappedWords = category.words.map(word => ({ word: word, category: category.name }));
      words = [...words, ...mappedWords];
      loadedAnyFile = true;
    }
    if (!loadedAnyFile && localCategories.length === 0) throw new Error('Nie udało się załadować żadnego pliku.');
  } catch (error) {
    words = fallbackWords; 
  }
}
words = fallbackWords;

function generateRoomCode() {
  return Math.random().toString(36).substr(2, 4).toUpperCase();
}

function assignUniqueEmoji(players) {
  const usedEmojis = Object.values(players || {}).map(p => p.emoji).filter(e => e);
  const availableEmojis = emojiList.filter(e => !usedEmojis.includes(e));
  if (selectedEmoji && !usedEmojis.includes(selectedEmoji)) return selectedEmoji;
  if (availableEmojis.length === 0) return emojiList[Math.floor(Math.random() * emojiList.length)];
  return availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
}

function assignUniqueColor(players) {
  const usedColors = Object.values(players || {}).map(p => p.avatarColor).filter(c => c);
  const availableColors = avatarColors.filter(c => !usedColors.includes(c));
  if (availableColors.length === 0) return avatarColors[Math.floor(Math.random() * avatarColors.length)];
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}

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
      kickBtn.title = 'Wyrzuć gracza';
      kickBtn.classList.add('kickBtn');
      kickBtn.addEventListener('click', () => kickPlayer(id));
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
    if (currentModal === messageBox) {
      hideModal(messageBox); 
      messageBox.classList.remove('copy-message');
    }
  }, duration);
}

function showRoleMessage(text) {
  roleMessageBox.innerHTML = text; 
  roleMessageBox.classList.remove('is-fading-out'); 
  showModal(roleMessageBox); 
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
  lastRoundSummaryTitle.style.display = 'none';
  lobbyCategories.style.display = 'none'; 
  
  impostorCount = 1;
  impostorCountDisplaySelector.textContent = impostorCount;
  selectedCategories = [];
  customCategories = []; 
  document.querySelectorAll('.custom-category-btn').forEach(btn => btn.remove());
  
  selectedEmoji = null;
  selectedPlayerId = null; 
  lastSeenStarterId = null; 
  lastSeenSummary = null;
  lastSeenRoundWinner = null; 
  lastSeenVotingState = false; 
  currentRoomData = null;
  
  hintChance = 0;
  hintOnStart = false;
  hintChanceSlider.value = 0;
  document.querySelectorAll('.slider-labels .slider-label').forEach((label, index) => {
    if (index === 0) label.classList.add('label-active');
    else label.classList.remove('label-active');
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
  
  if (votingOverlay) votingOverlay.classList.remove('is-active');
  if (starterOverlay) starterOverlay.classList.remove('is-active');
  if (summaryOverlay) summaryOverlay.classList.remove('is-active');
  
  if (roleCardInner) {
    roleCardInner.classList.remove('is-flipped');
    const content = roleCardInner.querySelector('#roleContent');
    if (content) content.innerHTML = '';
    const front = roleCardInner.querySelector('.role-card-front');
    if (front) {
      front.classList.remove('is-impostor');
      front.classList.remove('is-innocent');
    }
  }
  
  loadFromLocalStorage();
}

// -------------------------------------------------------------
// OBSŁUGA USTAWIEŃ HOSTA W GRZE
// -------------------------------------------------------------
roomSettingsBtn.addEventListener('click', () => {
  if (!currentRoomData) return;
  tempSetImpostors = currentRoomData.numImpostors || 1;
  tempSetHintChance = currentRoomData.hintChance || 0;
  tempSetHintOnStart = currentRoomData.hintOnStart || false;
  tempSetImpostorsKnow = currentRoomData.impostorsKnow || false;

  updateSettingsModalUI();
  showModal(roomSettingsBox);
});

closeRoomSettingsBtn.addEventListener('click', () => {
  hideModal(roomSettingsBox);
});

function updateSettingsModalUI() {
  setImpostorCount.textContent = tempSetImpostors;
  setMinusImpostor.disabled = tempSetImpostors <= 1;
  setPlusImpostor.disabled = tempSetImpostors >= 5;
  setMinusImpostor.style.opacity = tempSetImpostors <= 1 ? '0.5' : '1';
  setPlusImpostor.style.opacity = tempSetImpostors >= 5 ? '0.5' : '1';

  setHintChanceSlider.value = tempSetHintChance;
  const labels = document.querySelectorAll('#setSliderLabels .slider-label');
  labels.forEach((label, index) => {
    if (index === tempSetHintChance) label.classList.add('label-active');
    else label.classList.remove('label-active');
  });

  if (tempSetHintChance === 4) { 
    setHintOnStartCheckbox.disabled = true;
    setHintOnStartCheckbox.checked = false;
    tempSetHintOnStart = false;
    setHintCheckboxContainer.classList.add('disabled');
  } else {
    setHintOnStartCheckbox.disabled = false;
    setHintOnStartCheckbox.checked = tempSetHintOnStart;
    setHintCheckboxContainer.classList.remove('disabled');
  }

  if (tempSetImpostorsKnow) {
    setTeamKnowsBtn.classList.add('selected');
    setTeamNotKnowsBtn.classList.remove('selected');
  } else {
    setTeamNotKnowsBtn.classList.add('selected');
    setTeamKnowsBtn.classList.remove('selected');
  }
}

setMinusImpostor.addEventListener('click', () => {
  if (tempSetImpostors > 1) { tempSetImpostors--; updateSettingsModalUI(); }
});
setPlusImpostor.addEventListener('click', () => {
  if (tempSetImpostors < 5) { tempSetImpostors++; updateSettingsModalUI(); }
});
setHintChanceSlider.addEventListener('input', (e) => {
  tempSetHintChance = parseInt(e.target.value, 10);
  updateSettingsModalUI();
});
setHintOnStartCheckbox.addEventListener('change', (e) => {
  tempSetHintOnStart = e.target.checked;
});
setTeamKnowsBtn.addEventListener('click', () => {
  tempSetImpostorsKnow = true; updateSettingsModalUI();
});
setTeamNotKnowsBtn.addEventListener('click', () => {
  tempSetImpostorsKnow = false; updateSettingsModalUI();
});

saveRoomSettingsBtn.addEventListener('click', () => {
  const playersCount = Object.keys(currentRoomData.players || {}).length;
  const minRequired = tempSetImpostors + 2;
  
  if (playersCount < minRequired) {
    showMessage(`❌ Aby ustawić ${tempSetImpostors} impostorów, potrzebujesz minimum ${minRequired} graczy w pokoju. Zmniejsz liczbę oszustów lub poczekaj na więcej osób.`, 4500);
    return;
  }

  db.ref(`rooms/${currentRoomCode}`).update({
    numImpostors: tempSetImpostors,
    hintChance: tempSetHintChance,
    hintOnStart: tempSetHintOnStart,
    impostorsKnow: tempSetImpostorsKnow
  }).then(() => {
    hideModal(roomSettingsBox);
    showMessage('✅ Ustawienia zapisane! Zmiany wejdą od nowej rundy.', 3000);
  });
});
// -------------------------------------------------------------

function updateImpostorButtons() {
  minusImpostor.disabled = impostorCount <= 1;
  plusImpostor.disabled = impostorCount >= 5;
  minusImpostor.style.opacity = impostorCount <= 1 ? '0.5' : '1';
  plusImpostor.style.opacity = impostorCount >= 5 ? '0.5' : '1';
}

function updateRecommendedPlayers() {
  const minPlayers = impostorCount + 2;
  const maxPlayers = Math.min(impostorCount + 4, 10);
  recommendedPlayers.textContent = `Zalecana liczba graczy: ${minPlayers}–${maxPlayers}`;
}

closeRulesBtn.addEventListener('click', closeRules);
closeRulesTopBtn.addEventListener('click', closeRules);
rulesBtn.addEventListener('click', () => showModal(rulesBox));
themeToggle.addEventListener('click', () => toggleTheme());

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

hintChanceSlider.addEventListener('input', (e) => {
  hintChance = parseInt(e.target.value, 10);
  const labels = document.querySelectorAll('.slider-labels .slider-label');
  labels.forEach((label, index) => {
    if (index === hintChance) label.classList.add('label-active');
    else label.classList.remove('label-active');
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

hintOnStartCheckbox.addEventListener('change', (e) => hintOnStart = e.target.checked);

confirmHintSettingsBtn.addEventListener('click', () => {
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
});

teamNotKnowsBtn.addEventListener('click', () => {
  impostorsKnowEachOther = false;
  teamNotKnowsBtn.classList.add('selected');
  teamKnowsBtn.classList.remove('selected');
});

confirmTeamSettingsBtn.addEventListener('click', () => {
  createRoom(impostorCount, hintChance, hintOnStart, impostorsKnowEachOther);
});

function createRoom(numImpostors, chanceIndex, onStart, knows) {
  const customCategoriesToSave = customCategories.filter(c => c.isCustom).map(c => ({ name: c.name, words: c.words })); 
  currentRoomCode = generateRoomCode();
  currentPlayerId = db.ref().push().key;
  const emoji = assignUniqueEmoji({});
  const avatarColor = assignUniqueColor({});

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  const playerData = { name: currentPlayerName, isHost: true, role: null, emoji: emoji, avatarColor: avatarColor };
  roomRef.set({
    players: { [currentPlayerId]: playerData },
    gameStarted: false,
    votingActive: false,
    currentWord: null,
    currentCategory: null, 
    impostorHint: null, 
    lastRoundSummary: null,
    roundEndMessage: null, 
    resetMessage: null,
    starterId: null,
    showStarter: false,
    roundWinner: null, 
    numImpostors: numImpostors,
    categories: selectedCategories.map(c => c.name), 
    customCategories: customCategoriesToSave || [],
    hintChance: chanceIndex,
    hintOnStart: onStart,
    impostorsKnow: knows,
    currentRound: 0
  }).then(() => {
    showScreen(gameScreen); 
    hideModal(impostorTeamBox, true); 
    hideModal(impostorSelectionBox, true);
    hideModal(categorySelectionBox, true);
    roomCodeDisplay.textContent = currentRoomCode;
    db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).onDisconnect().remove();
    listenToRoom(currentRoomCode);
  }).catch(error => {
    showMessage('❌ Błąd tworzenia pokoju!');
    showScreen(loginScreen);
  });
}

joinRoomBtn.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  const roomCode = roomCodeInput.value.trim().toUpperCase();

  if (!name || !roomCode) { showMessage('❌ Wpisz nick i kod pokoju!'); roomCodeInput.value = ''; return; }
  if (!selectedEmoji) { showMessage('❌ Wybierz awatar!'); return; }

  localStorage.setItem('slownyOszustNick', name);
  localStorage.setItem('slownyOszustEmoji', selectedEmoji);
  
  currentPlayerName = name;
  currentRoomCode = roomCode;
  currentPlayerId = db.ref().push().key;

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.once('value').then(snapshot => {
    if (!snapshot.exists()) { showMessage('❌ Pokój nie istnieje!'); roomCodeInput.value = ''; return; }
    const room = snapshot.val();
    if (room.gameStarted) { showMessage('❌ Gra już się rozpoczęła! Poczekaj na koniec rundy.'); roomCodeInput.value = ''; return; }

    const players = room.players || {};
    if (Object.keys(players).length >= 10) { showMessage('❌ Pokój jest pełny! Maksymalnie 10 graczy.'); roomCodeInput.value = ''; return; }

    const emoji = assignUniqueEmoji(players);
    const avatarColor = assignUniqueColor(players);
    const playerData = { name: currentPlayerName, isHost: false, role: null, emoji: emoji, avatarColor: avatarColor };
    roomRef.child('players').update({ [currentPlayerId]: playerData }).then(() => {
      showScreen(gameScreen); 
      
      const categoryNames = room.categories || ['Wszystkie'];
      let standardCategories = [];
      if (categoryNames.includes('Wszystkie')) {
        standardCategories = [{ name: 'Wszystkie', file: 'all' }];
      } else {
        standardCategories = categories.filter(c => categoryNames.includes(c.name));
      }
      const customCategoriesData = room.customCategories || [];
      customCategories = customCategoriesData.map(c => ({ ...c, file: `custom_${c.name}`, isCustom: true }));
      
      selectedCategories = [...standardCategories, ...customCategories];
      loadWords(selectedCategories); 
      
      db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).onDisconnect().remove();
      listenToRoom(currentRoomCode);
    }).catch(error => {
      showMessage('❌ Błąd dołączania do pokoju!');
      roomCodeInput.value = '';
    });
  }).catch(error => {
    showMessage('❌ Błąd sprawdzania pokoju!');
    roomCodeInput.value = '';
  });
});

copyRoomCodeBtn.addEventListener('click', () => {
  const roomCode = roomCodeDisplay.textContent;
  navigator.clipboard.writeText(roomCode).then(() => {
    showMessage('✅ Kod skopiowany!');
  }).catch(() => {
    showMessage('❌ Nie udało się skopiować kodu');
  });
});

function kickPlayer(playerId) {
  if (!isHost || playerId === currentPlayerId) return;
  db.ref(`rooms/${currentRoomCode}/players/${playerId}`).remove().catch(() => showMessage('❌ Błąd wyrzucania gracza!'));
}

leaveRoomBtn.addEventListener('click', () => {
  if (currentRoomCode && currentPlayerId) {
    const roomRef = db.ref(`rooms/${currentRoomCode}`);
    roomRef.child(`players/${currentPlayerId}`).remove().then(() => {
      resetToLobby();
      currentRoomCode = null;
      currentPlayerId = null;
      isHost = false;
      roomCodeInput.value = '';
    }).catch(() => showMessage('❌ Błąd opuszczania pokoju!'));
  }
});

function updatePlayersListForVoting(players) {
  playersList.innerHTML = '';
  if (!players || !Object.keys(players).length) { playersList.innerHTML = '<li>Brak graczy</li>'; return; }
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
        li.addEventListener('click', () => { selectedPlayerId = id; updatePlayersListForVoting(players); });
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
    const votedFor = players[playerId].votedFor;
    if (votedFor) { totalVotes++; votes[votedFor] = (votes[votedFor] || 0) + 1; }
  }

  if (totalVotes < playerIds.length) return;

  let maxVotes = 0;
  let ejectedPlayerId = null;
  let isTie = false;

  for (const [playerId, count] of Object.entries(votes)) {
    if (count > maxVotes) { maxVotes = count; ejectedPlayerId = playerId; isTie = false; } 
    else if (count === maxVotes && maxVotes > 0) { isTie = true; }
  }
  
  const updates = { votingActive: false, impostorHint: null, resetMessage: null };
  playerIds.forEach(id => { updates[`players/${id}/votedFor`] = null; });

  if (isTie || !ejectedPlayerId) {
    updates.lastRoundSummary = `Brak ostatecznej decyzji!<br>Impostor przetrwał.`;
    updates.roundWinner = 'draw';
  } else {
    const ejectedPlayer = players[ejectedPlayerId];
    updates.gameStarted = false;
    updates.currentWord = null;
    updates.starterId = null;
    updates.currentCategory = null;
    updates.showStarter = false;
    
    playerIds.forEach(id => {
      updates[`players/${id}/role`] = null;
      updates[`players/${id}/seenRole`] = null; 
    });

    // NOWE CZYSTE TEKSTY DLA NAKŁADKI
    let summaryMessage = '';
    if (ejectedPlayer.role === 'impostor') {
      summaryMessage = `Oszustem był(a) <strong>${ejectedPlayer.name}</strong>!<br>Słowo: <strong>${room.currentWord}</strong>`;
      updates.roundWinner = 'innocent';
    } else {
      summaryMessage = `Wygłosowano niewinną osobę (<strong>${ejectedPlayer.name}</strong>).<br>Słowo: <strong>${room.currentWord}</strong>`;
      updates.roundWinner = 'impostor';
    }
    updates.lastRoundSummary = summaryMessage; 
  }

  db.ref(`rooms/${currentRoomCode}`).update(updates);
}

function runCountdown(callback) {
  if (modalBackdrop) {
    modalBackdrop.classList.add('is-visible');
    countdownDisplay.classList.add('active');
  }

  if (roleCardInner) roleCardInner.classList.remove('is-flipped');

  let count = 3;
  countdownDisplay.textContent = count;

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

function listenToRoom(roomCode) {
  const roomRef = db.ref(`rooms/${roomCode}`);
  roomRef.on('value', snapshot => {
    
    const room = snapshot.val();
    if (!room) {
      if (!isAnimating) { showMessage('❌ Pokój został usunięty!'); resetToLobby(); }
      return;
    }

    currentRoomData = room; 
    
    const players = room.players || {};
    const playerIds = Object.keys(players);
    const hostExists = Object.values(players).some(p => p.isHost);
    const iAmInRoom = players[currentPlayerId];
    
    if (!iAmInRoom && !isAnimating) { 
        showMessage('❌ Zostałeś rozłączony z pokojem.');
        resetToLobby();
        return;
    }
    
    const votingActive = room.votingActive || false;
    const myVote = iAmInRoom ? iAmInRoom.votedFor : null;

    if (!hostExists && iAmInRoom && playerIds.length > 0) {
      const sortedPlayerIds = playerIds.sort();
      const newHostId = sortedPlayerIds[0];
      if (newHostId === currentPlayerId) {
        db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).update({ isHost: true });
        return; 
      }
    }

    isHost = iAmInRoom ? iAmInRoom.isHost : false; 
    roomSettingsBtn.style.display = isHost && !room.gameStarted ? 'inline-block' : 'none';

    if (votingActive && !lastSeenVotingState) {
      votingOverlay.classList.add('is-active');
      setTimeout(() => { votingOverlay.classList.remove('is-active'); }, 3500); 
    }
    lastSeenVotingState = votingActive;

    if (votingActive) {
      document.body.classList.add('voting-active');
      wordDisplay.innerHTML = "<strong>Czas na głosowanie! Kto jest oszustem?</strong>";
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
    const hintChanceText = hintChanceValues[room.hintChance || 0];
    const hintOnStartText = room.hintOnStart ? " (Start)" : "";
    impostorCountDisplay.innerHTML = `Impostorzy: <span class="bold">${room.numImpostors || 0}</span>`;
    hintChanceInfoDisplay.innerHTML = `Podpowiedź: <span class="bold">${hintChanceText}${hintOnStartText}</span>`;
    
    if (!room.gameStarted && !votingActive) { 
      lobbyCategories.style.display = 'block';
      lobbyCategories.textContent = 'Kategorie: ' + (room.categories.join(', ') || 'Brak');
    } else {
      lobbyCategories.style.display = 'none';
    }

    const iAmImpostor = iAmInRoom && iAmInRoom.role === 'impostor';
    const hint = room.impostorHint;
    
    if (!votingActive) {
      if (room.gameStarted && room.currentWord && iAmInRoom && !isAnimating) { 
        wordDisplay.innerHTML = iAmImpostor
          ? `Twoje słowo: <span class="word-impostor">OSZUST! ${hint ? `<span class="impostor-hint-span">(Podpowiedź: ${hint})</span>` : ''}</span>`
          : `Twoje słowo: <span class="word-normal">${room.currentWord}</span>`;
      } else if (!room.gameStarted) {
        wordDisplay.innerHTML = ''; 
      }
    }

    if (room.lastRoundSummary && !room.gameStarted && !isAnimating) { 
      lastRoundSummaryTitle.style.display = 'block';
      lastRoundSummary.innerHTML = room.lastRoundSummary;
      lastRoundSummary.style.display = 'block';
    } else {
      if (!room.lastRoundSummary || !room.gameStarted) {
          lastRoundSummaryTitle.style.display = 'none';
          lastRoundSummary.style.display = 'none';
      }
    }
    
    startGameBtn.style.display = isHost && !room.gameStarted && !votingActive ? 'block' : 'none';
    startVoteBtn.style.display = isHost && room.gameStarted && !votingActive ? 'block' : 'none';
    confirmVoteBtn.style.display = votingActive && !myVote ? 'block' : 'none';
    endRoundBtn.style.display = 'none';

    const newStarterId = room.starterId;
    const starterDuration = 4000;

    // 1. START RUNDY 
    if (room.gameStarted && newStarterId && newStarterId !== lastSeenStarterId) {
      lastSeenStarterId = newStarterId; 
      lastSeenSummary = null; 
      lastSeenRoundWinner = null; 
      
      const myHint = room.impostorHint;
      const amIImpostor = iAmInRoom.role === 'impostor';
      
      let roleHTML;
      if (amIImpostor) {
        roleHTML = '<div style="color: #e74c3c;">JESTEŚ<br>OSZUSTEM!</div>';
        if (myHint) { 
            roleHTML += `<div class="impostor-hint-span" style="margin-top:1rem; font-size:1.5rem;">Podpowiedź:<br>${myHint}</div>`;
        }
      } else {
        roleHTML = `<div style="font-size: 1.5rem; opacity: 0.8;">TWOJE SŁOWO:</div><div style="color: #2ecc71; font-size: 3.5rem; margin-top: 0.5rem;">${room.currentWord}</div>`;
      }
      
      wordDisplay.innerHTML = ''; 
      isAnimating = true; 
      
      runCountdown(() => {
          const newCard = roleCardInner.cloneNode(true);
          newCard.classList.remove('is-flipped'); 
          
          const frontFace = newCard.querySelector('.role-card-front');
          if (amIImpostor) {
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
          
          roleCardInner.addEventListener('click', function flipHandler() {
              if (!this.classList.contains('is-flipped')) {
                  this.classList.add('is-flipped');
                  db.ref(`rooms/${currentRoomCode}/players/${currentPlayerId}`).update({seenRole: true});
              }
          });
      });
    }
    
    // LOGIKA HOSTA: Sprawdzanie czy wszyscy odkryli
    if (isHost && room.gameStarted && !room.showStarter) {
        const allSeen = Object.values(players).every(p => p.seenRole === true);
        const totalPlayers = Object.keys(players).length;
        if (totalPlayers > 0 && allSeen) {
            if (!window.hostTimerRunning) { 
                window.hostTimerRunning = true;
                setTimeout(() => {
                    db.ref(`rooms/${currentRoomCode}`).update({showStarter: true});
                    window.hostTimerRunning = false;
                }, 5000); 
            }
        }
    }
    
    // 2. KINOWY STARTER 
    if (room.gameStarted && room.showStarter && isAnimating) {
        const starterName = players[newStarterId]?.name || '...';
        
        hideModal(roleMessageBox);
        
        starterOverlayName.textContent = starterName;
        starterOverlay.classList.add('is-active');
        
        setTimeout(() => {
            starterOverlay.classList.remove('is-active');
            isAnimating = false;
            
            const myHint = room.impostorHint;
            const amIImpostor = iAmInRoom.role === 'impostor';
            if (room.gameStarted && room.currentWord && iAmInRoom) {
              wordDisplay.innerHTML = amIImpostor
                ? `Twoje słowo: <span class="word-impostor">OSZUST! ${myHint ? `<span class="impostor-hint-span">(Podpowiedź: ${myHint})</span>` : ''}</span>`
                : `Twoje słowo: <span class="word-normal">${room.currentWord}</span>`;
            }
        }, starterDuration);
    }
    
    // 3. NOWA NAKŁADKA KOŃCA RUNDY Z KONFETTI
    const newSummary = room.lastRoundSummary;
    if (newSummary && newSummary !== lastSeenSummary) {
      lastSeenSummary = newSummary; 
      if (!room.gameStarted) { lastSeenStarterId = null; }
      
      // Podmiana tekstu
      summaryOverlaySubtitle.innerHTML = newSummary;
      
      // Reset klas
      summaryOverlay.classList.remove('innocent-win', 'impostor-win', 'draw-win');
      
      // Nadawanie barw
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
      }, 400); // 0.4 sekundy opóźnienia, żeby napis zdążył wyjechać na środek
      
      setTimeout(() => {
          summaryOverlay.classList.remove('is-active');
      }, 6000); // Znika samoistnie po 6 sekundach
    }
    
    if (!room.gameStarted) { lastSeenStarterId = null; }
    
    if (room.resetMessage && room.resetMessage !== lastSeenSummary) {
      showMessage(room.resetMessage, 4000); 
      if (isHost) { db.ref(`rooms/${currentRoomCode}/resetMessage`).remove(); }
    }
    
    if (votingActive) {
      const totalPlayers = playerIds.length;
      const votes = playerIds.map(id => players[id].votedFor).filter(Boolean);
      if (votes.length === totalPlayers) {
        if (isHost) tallyVotes(room);
      }
    }
    
  });
}

startGameBtn.addEventListener('click', () => {
  if (isAnimating) return;
  if (!isHost) return;

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.once('value').then(snapshot => {
    const room = snapshot.val();
    const players = room.players || {};
    const numPlayers = Object.keys(players).length;
    const minPlayers = room.numImpostors + 2;

    if (numPlayers < minPlayers) {
      showMessage(`❌ Za mało graczy! Minimum ${minPlayers}. Wejdź w ⚙️ Ustawienia, by zmniejszyć liczbę oszustów.`);
      return;
    }

    if (words.length === 0) {
      showMessage('❌ Brak słów! Spróbuj ponownie utworzyć pokój.');
      return;
    }

    const wordObject = words[Math.floor(Math.random() * words.length)];
    const word = wordObject.word;
    const category = wordObject.category;

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
      updates[`players/${id}/seenRole`] = false; 
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
    } else if (Math.random() < hintChanceValue) {
      hint = category;
    }

    updates.gameStarted = true;
    updates.votingActive = false; 
    updates.currentWord = word;
    updates.currentCategory = category; 
    updates.impostorHint = hint; 
    updates.starterId = starterId;
    updates.showStarter = false; 
    updates.lastRoundSummary = null; 
    updates.roundEndMessage = null; 
    updates.roundWinner = null;
    updates.currentRound = (room.currentRound || 0) + 1;
    
    roomRef.update(updates).catch(() => showMessage('❌ Błąd rozpoczynania gry!'));
  }).catch(() => showMessage('❌ Błąd pobierania danych pokoju!'));
});

startVoteBtn.addEventListener('click', () => {
  if (isAnimating) return;
  if (!isHost) return;
  db.ref(`rooms/${currentRoomCode}`).update({ votingActive: true });
});

confirmVoteBtn.addEventListener('click', () => {
  if (isAnimating) return;
  if (!selectedPlayerId) { showMessage('❌ Najpierw wybierz gracza, na którego chcesz zagłosować!', 2500); return; }
  voteForPlayer(selectedPlayerId);
});

endRoundBtn.addEventListener('click', () => {
  if (isAnimating) return;
  if (!isHost) return;

  const roomRef = db.ref(`rooms/${currentRoomCode}`);
  roomRef.once('value').then(snapshot => {
    const room = snapshot.val();
    const players = room.players || {};
    const currentWord = room.currentWord;
    const impostorIds = Object.keys(players).filter(id => players[id].role === 'impostor');
    const impostorNames = impostorIds.map(id => players[id].name).join(', ');
    
    const summary = `Zakończono rundę.<br>Słowo: <strong>${currentWord}</strong><br>Oszuści: <strong>${impostorNames || 'Brak'}</strong>`;

    const updates = {
      gameStarted: false,
      votingActive: false, 
      currentWord: null,
      currentCategory: null,
      impostorHint: null, 
      starterId: null,
      impostorsKnow: null,
      lastRoundSummary: summary, 
      resetMessage: summary, 
      roundWinner: 'draw',
      showStarter: false, 
    };
    Object.keys(players).forEach(id => {
      updates[`players/${id}/role`] = null;
      updates[`players/${id}/votedFor`] = null;
      updates[`players/${id}/seenRole`] = null;
    });

    roomRef.update(updates);
  });
});

// *** FUNKCJE WŁASNYCH KATEGORII (BEZ ZMIAN) ***
function showCustomCategoryModal(editFileId = null) {
  editingCategoryFile = editFileId; 
  if (editFileId) {
    const category = customCategories.find(c => c.file === editFileId);
    if (!category) return;
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
  if (word.length < 3) { showMessage('❌ Słowo musi mieć przynajmniej 3 znaki!', 2500); return; }
  tempCustomWords.push(word);
  customWordInput.value = ''; 
  customWordInput.focus(); 
  updateTempWordsList();
}

function deleteTempWord(index) { tempCustomWords.splice(index, 1); updateTempWordsList(); }

function updateTempWordsList() {
  customWordsList.innerHTML = ''; 
  if (tempCustomWords.length === 0) customWordsList.innerHTML = '<li>Dodaj przynajmniej 3 słowa...</li>';
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
  if (categoryName.length < 3) { showMessage('❌ Nazwa kategorii musi mieć przynajmniej 3 znaki!', 2500); return; }
  if (editingCategoryFile) {
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
    const newCategory = { name: categoryName, file: `custom_${Date.now()}`, words: [...tempCustomWords], isCustom: true };
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
    if (e.target.closest('.category-actions')) return;
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
  customCategories = customCategories.filter(c => c.file !== fileId);
  selectedCategories = selectedCategories.filter(c => c.file !== fileId);
  const btn = categoryGrid.querySelector(`.category-btn[data-file="${fileId}"]`);
  if (btn) btn.remove();
  updateCategoryButtons();
  updateConfirmCategoriesButton();
}

function editCustomCategory(fileId) {
  const category = customCategories.find(c => c.file === fileId);
  if (category) showCustomCategoryModal(fileId); 
}

createCustomCategoryBtn.addEventListener('click', () => showCustomCategoryModal());
closeCustomCategoryBtn.addEventListener('click', hideCustomCategoryModal);
addCustomWordBtn.addEventListener('click', addTempWord);
saveCustomCategoryBtn.addEventListener('click', saveCustomCategory);

categoryGrid.addEventListener('click', (e) => {
  const target = e.target.closest('button'); 
  if (!target) return;
  if (target.classList.contains('delete-btn')) { e.stopPropagation(); deleteCustomCategory(target.dataset.file); }
  else if (target.classList.contains('edit-btn')) { e.stopPropagation(); editCustomCategory(target.dataset.file); }
});

customWordsList.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('delete-word-btn')) {
    const index = parseInt(e.target.dataset.index, 10);
    deleteTempWord(index);
  }
});

customWordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); addTempWord(); }
});

// ===================================================================
// DARMOWY BOT SPRZĄTAJĄCY (Automatyczne usuwanie pustych pokojów)
// ===================================================================
function cleanupEmptyRooms() {
  db.ref('rooms').once('value').then(snapshot => {
    const rooms = snapshot.val();
    if (!rooms) return;
    
    // Przeszukujemy wszystkie pokoje
    for (const [roomCode, roomData] of Object.entries(rooms)) {
      // Jeśli pokój nie ma graczy (wszyscy wyszli lub rozłączyło ich)
      if (!roomData.players || Object.keys(roomData.players).length === 0) {
        db.ref(`rooms/${roomCode}`).remove().then(() => {
          console.log(`🧹 Usunięto stary/pusty pokój: ${roomCode}`);
        }).catch(err => console.error("Błąd usuwania pokoju:", err));
      }
    }
  });
}

// Wywołaj sprzątanie po cichu 2 sekundy po wejściu na stronę główną
setTimeout(cleanupEmptyRooms, 2000);

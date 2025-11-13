// WAŻNE: TEN PLIK MUSI BYĆ W .gitignore !!!
const firebaseConfig = {
  apiKey: "AIzaSyCyj5pbNgUHaV-_g__sTQmsUtYOhegYoSI", // PAMIĘTAJ O ZABEZPIECZENIU TEGO!
  authDomain: "slowny-oszust.firebaseapp.com",
  databaseURL: "https://slowny-oszust-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "slowny-oszust",
  storageBucket: "slowny-oszust.appspot.com",
  messagingSenderId: "679726628348",
  appId: "1:679726628348:web:83f9c43fee9cf514784679"
};

// Inicjalizuj Firebase i stwórz globalną zmienną 'db'
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Test połączenia (możesz go zostawić lub usunąć)
db.ref('test').set({ test: 'hello' }).then(() => console.log('Firebase działa')).catch(err => console.error('Błąd Firebase:', err));

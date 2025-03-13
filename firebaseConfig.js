import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (copiala desde Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAMFXmdouj6Rd0T9rlFg6ikJdvi747XatI",
  authDomain: "trabajofm-26066.firebaseapp.com",
  projectId: "trabajofm-26066",
  storageBucket: "trabajofm-26066.firebasestorage.app",
  messagingSenderId: "184661229400",
  appId: "1:184661229400:android:5c80d680e8c3c93e97ef2d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
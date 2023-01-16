import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnyqQZf0nBI6tbzDunmAqLJDKose9M1yI",
  authDomain: "ionic-react-phaser-multiplayer.firebaseapp.com",
  projectId: "ionic-react-phaser-multiplayer",
  storageBucket: "ionic-react-phaser-multiplayer.appspot.com",
  messagingSenderId: "93869890048",
  appId: "1:93869890048:web:f1b70b47a141592c0c56e5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);
export const firebase = {
  app,
  auth,
  realtimeDb,
};

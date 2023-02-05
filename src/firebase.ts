import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ionic-react-phaser-multiplayer.firebaseapp.com",
  databaseURL: "https://ionic-react-phaser-multiplayer-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ionic-react-phaser-multiplayer",
  storageBucket: "ionic-react-phaser-multiplayer.appspot.com",
  messagingSenderId: "93869890048",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);
export const firebase = {
  app,
  auth,
  realtimeDb,
};

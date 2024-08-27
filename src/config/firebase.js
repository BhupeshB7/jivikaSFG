import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQeUfS7f1cvAuUFyLolnk41zBXBj9aaSQ",
  authDomain: "react-http-e696c.firebaseapp.com",
  databaseURL: "https://react-http-e696c-default-rtdb.firebaseio.com",
  projectId: "react-http-e696c",
  storageBucket: "react-http-e696c.appspot.com",
  messagingSenderId: "820166016821",
  appId: "1:820166016821:web:30f89a5714ff76f36d967c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database and Storage instances
export const db = getDatabase(app);
export const storage = getStorage(app);

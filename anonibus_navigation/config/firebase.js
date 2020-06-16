import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKEJg0jdpqcA9EiN7Vh6ZPI0_vLafYVxI",
  authDomain: "anonibus-3t.firebaseapp.com",
  databaseURL: "https://anonibus-3t.firebaseio.com",
  projectId: "anonibus-3t",
  storageBucket: "anonibus-3t.appspot.com",
  messagingSenderId: "464888241180",
  appId: "1:464888241180:web:f4f277c42b5217e4ff13d9",
  measurementId: "G-09T19D5D28"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
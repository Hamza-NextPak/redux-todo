import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCNkws5eH8adhX1E-KAZaI7oyvMZ93N2wU",
  authDomain: "todo-list-71fc1.firebaseapp.com",
  projectId: "todo-list-71fc1",
  storageBucket: "todo-list-71fc1.appspot.com",
  messagingSenderId: "729237733514",
  appId: "1:729237733514:web:e9c542be4d1a58bc25ad73",
  measurementId: "G-4MPRS20FXE",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

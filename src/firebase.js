import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBhXqi3fQB9DD4g6EjNs0YfXDxfC8r6XM4",
    authDomain: "healtuapp-fit.firebaseapp.com",
    projectId: "healtuapp-fit",
    storageBucket: "healtuapp-fit.appspot.com",
    messagingSenderId: "604406776218",
    appId: "1:604406776218:web:dd41c0e1adce2094b57a23",
    measurementId: "G-FZWWJJKR22",
    databaseURL: "https://healtuapp-fit-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export  const database = getDatabase(app);

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBK5nt8qzbpfI5-Nj4P-rZYGPlj2TNhGM4",
    authDomain: "rocket-league-fantasy.firebaseapp.com",
    projectId: "rocket-league-fantasy",
    storageBucket: "rocket-league-fantasy.appspot.com",
    messagingSenderId: "226855615427",
    appId: "1:226855615427:web:5f4935c1d3a647a9f51b76",
    measurementId: "G-YR06HKB165"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
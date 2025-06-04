const firebaseConfig = {
    apiKey: "AIzaSyA4ek9mJ3RomY25W4uTq4M7AHy2Q3a24iU",
    authDomain: "projeto-ec888.firebaseapp.com",
    projectId: "projeto-ec888",
    storageBucket: "projeto-ec888.firebasestorage.app",
    messagingSenderId: "818995568430",
    appId: "1:818995568430:web:7b3b1c3465e1c815e324bf"
}

firebase.initializeApp(firebaseConfig)
const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
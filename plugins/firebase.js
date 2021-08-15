import firebase from 'firebase'

if (!firebase.apps.length) {
    firebase.initializeApp(
        {
            apiKey: "AIzaSyCQvA5I2j5lwigiD6a0Y8H9_sC5fDp72Og",
            authDomain: "portfolio-6b7fe.firebaseapp.com",
            projectId: "portfolio-6b7fe",
            storageBucket: "portfolio-6b7fe.appspot.com",
            messagingSenderId: "836024920443",
            appId: "1:836024920443:web:7536e51febf7aa4dcc35de",
            measurementId: "G-1JFTFSQ8KH"
        }
    )
}

export default firebase
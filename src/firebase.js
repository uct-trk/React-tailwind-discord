import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB8WNgi8GNJD9bCjCxWhBHcEyeSiDpqmq0",
    authDomain: "discord-a67f1.firebaseapp.com",
    projectId: "discord-a67f1",
    storageBucket: "discord-a67f1.appspot.com",
    messagingSenderId: "179455197186",
    appId: "1:179455197186:web:353d58e014413d252ba71b"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = app.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider, db};

import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCaXg9Y8_mvTUwadHTptXZdUfy1NqZwJe8",
    authDomain: "webecommerceproject.firebaseapp.com",
    projectId: "webecommerceproject",
    storageBucket: "webecommerceproject.appspot.com",
    messagingSenderId: "617598868179",
    appId: "1:617598868179:web:f827ae96f1be4825441226",
    measurementId: "G-7KVZNWX3YS"
  };
  

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCnjcuEZDS-9FJ9ngdVlj4bII9eNMY4-V4',
  authDomain: 'facebook-clone-a2297.firebaseapp.com',
  projectId: 'facebook-clone-a2297',
  storageBucket: 'facebook-clone-a2297.appspot.com',
  messagingSenderId: '329869953607',
  appId: '1:329869953607:web:acd44c3983367f1174bf62',
  measurementId: 'G-3SDBMQBD1E',
};

const app = !firebase.apps.length
  ? initializeApp(firebaseConfig)
  : firebase.app();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

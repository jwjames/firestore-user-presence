import firebase from 'firebase'
require('firebase/firestore')

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

firebase.initializeApp(config);
const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);
export const rtdb = firebase.database();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
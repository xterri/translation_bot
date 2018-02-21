import firebase from 'firebase';

//apiKey: AIzaSyAT5xA_EgcEk6UjQYjdF4ABChuTLbEnFh8
//senderId: 595532854665
var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "tranbot-1.firebaseapp.com",
    databaseURL: "https://tranbot-1.firebaseio.com",
    projectId: "tranbot-1",
    storageBucket: "tranbot-1.appspot.com",
    messagingSenderId: process.env.FIREBASE_SENDER_ID
  };
var fire = firebase.initializeApp(config);

export default fire;
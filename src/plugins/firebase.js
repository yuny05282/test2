// This is a JavaScript file
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDs10ZFk_pCVVpUCVoiSyura99TaRYr518",
  authDomain: "ncounter-887ad.firebaseapp.com",
  databaseURL: "https://ncounter-887ad.firebaseio.com",
  projectId: "ncounter-887ad",
  storageBucket: "ncounter-887ad.appspot.com",
  messagingSenderId: "948197827816"
};
firebase.initializeApp(config);
export const functions = firebase.functions();
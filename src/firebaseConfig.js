import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
import { FIREBASE_CONFIG } from "../.env.js";

firebase.initializeApp(FIREBASE_CONFIG);

firebase
  .auth()
  .signInAnonymously()
  .catch((error) => {
    // Handle Errors here.
    window.alert(
      "No estas conectado a internet, asi no podras compartir tu ubiación."
    );
    console.log(error);
  });

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const storageRef = firebase.storage();
const functions = firebase.functions();

db.useEmulator("192.168.12.18", 8083);
functions.useEmulator("192.168.12.18", 5002);

firebase.firestore().enablePersistence();

export { db, auth, storageRef, functions };

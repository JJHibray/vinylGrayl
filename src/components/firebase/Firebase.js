import firebase from "firebase/app"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyB103KB9srKI0n5byqZI5pI4ywy4eJhGos",
    authDomain: "vinyl-grayl.firebaseapp.com",
    databaseURL: "https://vinyl-grayl.firebaseio.com",
    projectId: "vinyl-grayl",
    storageBucket: "vinyl-grayl.appspot.com",
    messagingSenderId: "660271984333",
    appId: "1:660271984333:web:a5d75ced1dc61992"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()
  export {
      storage, firebase as default
    }

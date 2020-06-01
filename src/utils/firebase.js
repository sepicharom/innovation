// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import 'firebase/firestore';

// TODO: Make sure the api key is kept private
// @see https://javebratt.com/hide-firebase-api/
const firebaseConfig = require(process.env.REACT_APP_FIREBASE_CONFIG);

// create Firebase singleton so we don't reinitilize app
const Firebase = (function () {
  let initialized;
  let utils;
  return {
    init: function () {
      if (!initialized) {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        initialized = true;
        utils = {
          db: firebase.firestore(),
          processDoc: (doc) => ({
            id: doc.id,
            ...doc.data(),
          }),
          // ...add more utils here, as needed
        };
      }
      return utils;
    }
  };
})();

export default Firebase.init();

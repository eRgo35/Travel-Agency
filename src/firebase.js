import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB9iZ88x4qEft8eBEyJMtOiB2WUoV7V-ho",
  authDomain: "travel-agency-example-react.firebaseapp.com",
  projectId: "travel-agency-example-react",
  storageBucket: "travel-agency-example-react.appspot.com",
  messagingSenderId: "774849804156",
  appId: "1:774849804156:web:4ffa78d1bc93a5addf96f9"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
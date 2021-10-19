import * as firebase from "firebase";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzeb8UoKY0a8qiL459sVZ8I4bYfzJO_S8",
  authDomain: "react-native-firebase-3ec17.firebaseapp.com",
  projectId: "react-native-firebase-3ec17",
  storageBucket: "react-native-firebase-3ec17.appspot.com",
  messagingSenderId: "10191052714",
  appId: "1:10191052714:web:f45f84314e17aa071b95d3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default { firebase, db };

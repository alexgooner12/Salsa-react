import firebase from "firebase/app";
import 'firebase/firestore';

export var firebaseConfig = {
  apiKey: "AIzaSyDxVYW4cXJqGtwr_M_zH-1NQZjKI8bFVts",
  authDomain: "salsa-react.firebaseapp.com",
  databaseURL: "https://salsa-react.firebaseio.com",
  projectId: "salsa-react",
  storageBucket: "",
  messagingSenderId: "173610295926",
  appId: "1:173610295926:web:25c86e54b3cd9842"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();


export default firebase;
import  firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYD_hyxdz-4yrZqtjDALCy40anplMDzGg",
  authDomain: "learning-32082.firebaseapp.com",
  projectId: "learning-32082",
  storageBucket: "learning-32082.appspot.com",
  messagingSenderId: "832343973154",
  appId: "1:832343973154:web:ab3adbfa1e096e70aa997b",
  measurementId: "G-12D3NM54FB"
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()


export default firebase;
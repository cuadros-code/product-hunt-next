import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

export const firebaseConfig = {
    apiKey: "AIzaSyAQ8tJTaeAoorg5EJDZQSLnymcIGkZIZjk",
    authDomain: "product-hunt-958f4.firebaseapp.com",
    projectId: "product-hunt-958f4",
    storageBucket: "product-hunt-958f4.appspot.com",
    messagingSenderId: "246830079128",
    appId: "1:246830079128:web:24e591d3ca49be5fd584ed"
};
// Initialize Firebase
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const storage = firebase.storage()

export {
    db,
    storage,
    firebase
}


// Import the functions you need from the SDKs you need
var firebase_app = require('firebase/app')
var firebase_database = require('firebase/database')
var lite = require('firebase/firestore/lite')
var store = require('firebase/firestore')
const functions = require('firebase-functions');

const firebaseConfig = {
    apiKey: "AIzaSyCxlVNxxn6Y7GPCLNBTrKxKHU4mmU_Lj10",
    authDomain: "canine-shelter-1a7e9.firebaseapp.com",
    projectId: "canine-shelter-1a7e9",
    storageBucket: "canine-shelter-1a7e9.appspot.com",
    messagingSenderId: "1046717172969",
    appId: "1:1046717172969:web:ccb0ba1e1ae7acabd63478",
    measurementId: "G-XZDQ3Y1H00"
};

// Initialize Firebase
const app = firebase_app.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase_database.getDatabase(app);
const db = store.getFirestore(app);

async function getDocsByName(collection, docName) {
    const docRef = store.doc(db, collection, docName);
    const docSnap = await store.getDoc(docRef).then((res) => {
        if (res.exists()) {
            console.log(res.data())
            return `${res.data()}`
        } else {
            return "nothing"
        }
    })
}

async function getAllDocs(collection) {
    const result = []
    const querySnapshot = await store.getDocs(store.collection(db, collection));
    querySnapshot.forEach((doc) => {
      result.push(doc.data())
    });

    return result
}

async function getDoc(collection, docName) {
    const docRef = store.doc(db, collection, docName);
    const docSnap = await store.getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}

async function getDocWithCondition(collection, docName, conditinos) {
    const docRef = store.doc(db, collection, docName);
    const docSnap = await store.getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}

function isDocExist(collection, docName) {
    const result = getDoc(collection, docName)
    return result === null ? false : true
}

async function addDoc(collection, docName, data) {
    await store.setDoc(store.doc(db, collection, docName), data);
}

async function removeDoc(collection, docName) {
    await store.deleteDoc(store.doc(db, collection, docName));
}


module.exports = {
    database, getDocsByName, getAllDocs, getDoc, addDoc, removeDoc, isDocExist
};

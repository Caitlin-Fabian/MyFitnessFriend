import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';


const firebaseConfig = {
    apiKey: "AIzaSyDwkPNUYaaLFqOFT8WrCVHkZPBpeGr7M4A",
    authDomain: "fitnessdb-3cfc6.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://fitnessdb-3cfc6.firebaseio.com",
    projectId: "fitnessdb-3cfc6",
    storageBucket: "fitnessdb-3cfc6.appspot.com",
    messagingSenderId: "1043626820438",
    appId: "1:1043626820438:ios:1d09b2ac9e703934614cf7",
}


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(app.name);  // "[DEFAULT]"




export { db, app };
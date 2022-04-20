import { db, app } from './firebaseConfig';
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, getDoc, arrayUnion, updateDoc, arrayRemove } from 'firebase/firestore/lite';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import ErrorHandle from './errorHandle'

//Class to handle most of the firebase interactions with the user

class User {
    constructor(username = null, email = null, password = null) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    validateParams() {
        return this.username && this.password && this.email;
    }

    async addUser() {
        //Ensures that a username, password, and email were filled in
        if (this.validateParams()) {
            try {
                const auth = getAuth();     //Sets auth as the current user
                createUserWithEmailAndPassword(auth, this.email, this.password)     //Creates a new user with the email and password
                    .then((userCredential) => {
                        const user = userCredential.user;
                        updateProfile(user, { displayName: this.username })     //Sets the user to have a displayName with the username that was passed in
                        //Adds a new document to the database that stores all the info that we should(?) need for the user.  The title of the doc is the uid for easy finding
                        setDoc(doc(db, 'users', user.uid), {
                            uid: user.uid,
                            gender: "",
                            age: 0,
                            height: 0,
                            weightData: [],
                            workOuts: [],
                            calories: [],
                            friends: [],
                            calorieGoal: 0,
                            displayName: this.username,
                            userImg: 'null',
                        })
                        return user;
                    })
                    .catch((e) => {
                        console.log(e);
                        alert(ErrorHandle.parseError(e.code));   //Will alert is email is already in use or w/ever else happens
                        return null;
                    })
            } catch (e) {
                console.error("Error adding User: ", e);
                return null;
            }
        }
    }

    static async getUserInfo(uid) {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);   //Attempts to find the document in the database that has the uid associated with it
      if(docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("Unable to find doc");
        return null;
      }
    }

    //This function takes in WeightData in the form {Weight: xxx, Day: x, Month: x}
    //If it finds another weight with the same date it will overwrite that weight
    static async addWeightInfo(data, uid) {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const userData = docSnap.data();
        for(let weights of userData.weightData) {
          if(weights.Day === data.Day) {
            await updateDoc(docRef, {weightData: arrayRemove(weights)});
          }
        }
        await updateDoc(docRef, {weightData: arrayUnion(data)});
        const docData = await getDoc(docRef);
        return docData.data();
      } else {
        console.log("Cannot find doc with that UID: ", uid);
      }

    }

    //This function will take in the routines in the form {RoutineName: xxx, Workouts: [{workout_name: xxx, sets: xx, reps: xx}]}
    static async addRoutines(data, uid) {

    }

    static async updateInfo(name,gender, age, uid){
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const userData = docSnap.data();
        await updateDoc(docRef, userData.displayName = name);
        await updateDoc(docRef, userData.gender = gender);
        await updateDoc(docRef, userData.age = age);

        const docData = await getDoc(docRef);
        return docData.data();
    }
    }
}


export default User;

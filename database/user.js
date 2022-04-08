import { db, app } from './firebaseConfig';
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';


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
                        console.log(user);
                        setDoc(doc(db, 'users', user.uid), {
                            uid: user.uid,
                            weightData: [],
                            workOuts: [],
                            calories: [],
                            friends: [],
                            calorieGoal: 0,
                            displayName: this.username
                        })
                        return user;
                    })
                    .catch((e) => {
                        console.log(e);
                        alert(e);   //Will alert is email is already in use or w/ever else happens
                        return null;
                    })
            } catch (e) {
                console.error("Error adding User: ", e);
                return null;
            }
        }
    }
    async getUserInfo(uid) {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        console.log("Here is the user data: ", docSnap.data());
        return docSnap.data();
      } else {
        console.log("Unable to find doc");
        return null;
      }
    }
}

export default User;

import { db, app } from './firebaseConfig';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
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
                    })
                    .catch((e) => {
                        console.log(e);
                        alert(e);   //Will alert is email is already in use or w/ever else happens
                    })
            } catch (e) {
                console.error("Error adding User: ", e);
            }
        }
    }
}

export default User;
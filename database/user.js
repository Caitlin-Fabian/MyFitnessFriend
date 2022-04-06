import { db, app } from './firebaseConfig';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';


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
        if (this.validateParams()) {
            try {
                const docRef = await addDoc(collection(db, 'users'), {
                    username: this.username,
                    password: this.password,
                    email: this.email

                });
                return docRef;
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
}

export default User;
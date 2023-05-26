import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAJdQKyN-Th40xHrl92Wkf-07JyyGoBcf4",
    authDomain: "olx-clone-46d6a.firebaseapp.com",
    projectId: "olx-clone-46d6a",
    storageBucket: "olx-clone-46d6a.appspot.com",
    messagingSenderId: "179688792996",
    appId: "1:179688792996:web:76ebc58db3e798e950d731",
    measurementId: "G-8YHKLSVL0L"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db,auth,storage}
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/config";
import { db } from '../firebase/config'


export const firebaseContext = createContext(null);

export const FirebaseContextProvider = ({children}) => {

    const [username, setUsername ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState(0)
    const [user, setUser] = useState(false)
    const [productDetails , setProductDetails] = useState(null);
    

    const signUp = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            setDoc(doc(db, 'users', email),{
                id:cred.user.uid,
                username:username,
                phone:number,
                email:email,
            })
            updateProfile(auth.currentUser, {
                displayName: username,
            })
        }) 
    }

   

    return (
        <firebaseContext.Provider value={{ productDetails, setProductDetails, user, setUser, signUp, username, setUsername, email, setEmail, password, setPassword, number, setNumber  }} >
            {children}
        </firebaseContext.Provider>
    )
}

export function UserAuth() {
    return useContext(firebaseContext)
}
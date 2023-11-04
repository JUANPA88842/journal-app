import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        /* const credentials = GoogleAuthProvider.credentialFromResult(result )
        console.log({credentials}) */

        const {displayName, email, photoURL, uid} = result.user

        return{
            ok: true,
            displayName, email, photoURL, uid
        }

        
    } catch(error){
        const errorCode = error.errorCode
        const errorMessage = error.message

        return{
            ok: false,
            errorMessage,
        }

    }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL} = resp.user 
        
        await updateProfile(FirebaseAuth.currentUser, {displayName})

        return{
            ok:true,
            uid,photoURL, email, displayName
        }
    } catch (error) {
        console.log(error)
        return{ok:false, errorMessage: error.message}
    }
}

export const loginWithEmailPassword = async({email, password}) =>{
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL, displayName} = result.user

        return {
            ok: true,
            uid, photoURL, displayName
        }
    } catch (error) {
        console.log(error)
        return{ok:false, errorMessage: error.message}
        
    }

}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut()
}
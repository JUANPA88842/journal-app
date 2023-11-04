import { deleteDoc, doc } from "firebase/firestore/lite"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout, deleteNoteById } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"
import { FirebaseDB } from "../../firebase/config"

export const checkingAuthentication = ( email, password) =>{
    return async(dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        
        const result = await signInWithGoogle()

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result))
    }
}

export const stratCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})

        if( !ok ) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}))

        
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())

        const result = await loginWithEmailPassword({email, password})
        console.log(result)

        if( !result.ok ) return dispatch(logout(result))
        dispatch(login(result))
    }

}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase()
        dispatch(clearNotesLogout())
        dispatch(logout({}))
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth
        const { active:note } = getState().journal

        const docRef = doc(FirebaseDB, `${uid}-1/journal/notas/${note.id}`)
        await deleteDoc(docRef)

        dispatch(deleteNoteById(note.id))
        

    }
}
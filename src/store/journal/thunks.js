import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptyNote, noteUpdated, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from "./journalSlice"
import { fileUpload, loadNotes } from "../../helpers"

export const startNewNote = () => {
    return async(dispatch, getState) => {

        /* console.log('startNewNote') */

        dispatch(savingNewNote())

        const {uid} = getState().auth
        
        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `/${uid}-1/journal/notas`))

        const setDocResp = await setDoc(newDoc, newNote)

        //console.log({newDoc, setDocResp})

        newNote.id = newDoc.id

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))


    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth
        console.log({uid})
        if (!uid) throw new Error('El UID DEL USUARIO NO EXISTE')

        const notes = await loadNotes(uid)

        dispatch( setNotes( notes ))
    }

}

export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving())
        const { uid } = getState().auth
        const { active:note } = getState().journal

        const noteToFireStore = {...note}
        delete noteToFireStore.id

        /* console.log(noteToFireStore) */

        const docRef = doc( FirebaseDB, `${uid}-1/journal/notas/${note.id}` )
        await setDoc(docRef, noteToFireStore, {merge: true})
        dispatch(noteUpdated(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch, getState) => {
        dispatch( setSaving())
        /* console.log(files) */
        /* await fileUpload(files[0]) */
        const fileUploadPromises = []
        for (const file of files){
            fileUploadPromises.push(fileUpload(file))
        }
        const photosUrls = await Promise.all(fileUploadPromises)
        
        dispatch(setPhotosToActiveNote(photosUrls))

    }

}
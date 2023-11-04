import { AddOutlined, MailOutline } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { NoteView } from "../views"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"



export const JournalPage = () => {

  const dispatch = useDispatch()
  const { isSaving, active } = useSelector(state => state.journal)

  const onClickNewNote = () =>{
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {/* <Typography>Holaaaaaaa dsfksafksa dsfdsfoksdf sdfojksd sdoods</Typography> */}
      
      {
        (!!active)
        ? <NoteView />
        : <NothingSelectedView />
      }

      <IconButton 
        disabled={isSaving}
        onClick={onClickNewNote}
        size='large'
        sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover':{backgroundColor:'error.main', opacity:0.9},
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
        >
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>
    </JournalLayout>
    
  )
}

import React, {useState} from 'react'
import MyNotesForm from './MyNotesForm'
import axios from 'axios'

function AddMyNotes(props){
    const {addItem} = props
    const[isSaved, setIsSaved] = useState(false)

    function formSubmit(note){
        console.log('new form', note)
        axios.post('http://localhost:3005/api/notes',note, {
                    headers : {
                         'x-auth' : localStorage.getItem('token')
                     }
                  })
                  .then((response)=>{
                     const result = response.data
                     console.log(result)
                     addItem(result)
                     setIsSaved(true)
                  })
                  .catch((err)=>{
                    alert(err.message)
                  })
    }

    function toggle(){
        setIsSaved(!isSaved)
    }
    return(
        <div>
           <MyNotesForm formSubmit={formSubmit} isSaved={isSaved} toggle={toggle} />
        </div>
    )
}

export default AddMyNotes
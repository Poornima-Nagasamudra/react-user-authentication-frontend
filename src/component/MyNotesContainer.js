import React, { useState, useEffect } from 'react'
import MyNotesList from './MyNotesList'
import axios from 'axios'
import AddMyNotes from './AddMyNotes'

function MyNotesContainer(props){
    const[notes, setNotes] = useState([])
    
    useEffect(()=>{
        axios.get('http://localhost:3005/api/notes', {
                    headers : {
                        'x-auth' : localStorage.getItem('token')
                    }
                })
                .then((response)=>{
                     const result = response.data
                     console.log(result)
                     setNotes(result)
                })
                .catch((err)=>{
                    alert(err.message)
                })        
    },[])

    function addItem(note){
        setNotes( [...notes, note] )   
    }
    function removeItem(obj){
        const result = notes.filter(function(ele){
           return ele._id !== obj._id
        })
        setNotes(result)
    }

    return(
        <div>          
            <MyNotesList notes={notes} removeItem={removeItem} />  
            <AddMyNotes addItem={addItem} />                 
        </div>
    )
}
export default MyNotesContainer
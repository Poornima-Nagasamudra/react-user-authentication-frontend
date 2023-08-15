import React from 'react'
import axios from 'axios'


function MyNotesItem(props){
    const{_id, title, body, removeItem } = props

    function handleRemove(id){
         const confirmation = window.confirm("Are you sure")
         if(confirmation){
             axios.delete(`http://localhost:3005/api/notes/${_id}`, {
                          headers : {
                            'x-auth' : localStorage.getItem('token')
                          }
                         })
                         .then((response)=>{
                            const result = response.data
                            removeItem(result._id)
                            console.log(result._id)
                         })
                         .catch((err)=>{
                            alert(err.message)
                         })
         }
    }
    return(
        <div>
            <h3> {title}  </h3>
            <p> {body} </p>
            <button onClick={()=>{handleRemove(_id)}}>cancel</button>
    
        </div>
    )
}
export default MyNotesItem
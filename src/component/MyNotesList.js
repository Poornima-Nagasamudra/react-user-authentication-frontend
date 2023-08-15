import React from 'react'
import MyNotesItem from './MyNotesItem'

function MyNotesList(props){
    const {notes, removeItem } = props 

    return(
        <div className='success'>
             { notes.length === 0 ? (<div> <h2> No notes found </h2> <h3> Add your first note</h3> </div>
                                  ) : (<div>
                                       <h2> My Notes - {notes.length} </h2>
                                       
                                       { notes.map(function(ele,i){
                                          return <MyNotesItem key={i} {...ele} removeItem={removeItem} />
                                       })}
                                    </div>
                                  ) 
            } 
        </div>
    )
}
export default MyNotesList
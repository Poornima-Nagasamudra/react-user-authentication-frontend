import React,{ useState , useEffect } from 'react'

function MyNotesForm(props){
    const[title, setTitle] = useState('')
    const[body, setBody] = useState('')

    const {formSubmit, isSaved, toggle} = props

    function handleNotes(e){
       if(e.target.name === "title"){
          setTitle(e.target.value)
       } else if (e.target.name === "body"){
          setBody(e.target.value)
       }
    }

    useEffect(()=>{
        console.log('is save', isSaved)
        if(isSaved){
            setTitle('')
            setBody('')
            toggle()
        }
    }, [isSaved])

    function handleSubmit(e){
        e.preventDefault()
          const details = {
          //  id : id,
            title : title,
            body : body
          }
          formSubmit(details)
          
    }
    return(
        <div>
            <h2> Add Note </h2>
            <form onSubmit={handleSubmit}>
               <input type="text" value={title} placeholder="Title" name="title" onChange={handleNotes} /> <br/>
               <textarea type="text" value={body} placeholder="Body" name="body" onChange={handleNotes} ></textarea> <br/>
               <input type="submit" />
            </form>
        </div>
    )
}
export default MyNotesForm
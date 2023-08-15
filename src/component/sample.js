import { useState, useEffect } from "react"
import axios from "axios"
import swal from 'sweetalert2'

const MyNotes = (props) => {
    const [ notes, setNotes ] = useState([])
    const [ title, setTitle ] = useState('')
    const [ body, setBody ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}

    useEffect(() => {
        axios.get('http://localhost:3005/api/notes', {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((response) => {
                setNotes(response.data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }, [notes])

    const handleChange = (e) => {
        if(e.target.name === 'title'){
            setTitle(e.target.value)
        }else if(e.target.name === 'body'){
            setBody(e.target.value)
        }
    }

    const runValidations = () => {
        if(title.trim().length === 0){
            errors.title = 'Title can not be blanked'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                title : title,
                body : body
            }
            axios.post('http://localhost:3005/api/notes', formData, {
                headers : {
                    'x-auth' : localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty('errors')){
                       alert(result.message)
                    }else{
                        setNotes([...notes, result])
                        setTitle('')
                        setBody('')
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }else{
            setFormErrors(errors)
        }
        
    }

    const handleRemove = (id) => {
        const confirmDelete = window.confirm('Are you sure?')
        if(confirmDelete){
            axios.delete(`http://localhost:3005/api/notes/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.message)
                }else{
                    const deleteNote = notes.filter((note) => {
                        return note._id !== result._id
                    })
                    setNotes(deleteNote)
                }
            })
            .catch((err) => {
                alert(err.message)
            })
        }
    }

    const handleTitle = (id) => {
        axios.get(`http://localhost:3005/api/notes/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    alert(result.message)
                }else{
                    swal.fire({
                        title: result.title,
                        text: result.body,
                        showCloseButton: true,
                        showConfirmButton: false,
                        padding : "10px",
                        heightAuto : true
                      })
                }   
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
        <div className="row mt-5 d-flex justify-content-between">
            <div className="col-7">
            <h3>My Notes</h3>
                {
                    notes.length === 0 
                    ? 
                    (
                        <div>
                        <p>Notes not found. Add your first note.</p>
                        </div>
                    )
                    :
                    (
                        <div>
                            {
                                notes.map((note) => {
                                    return (
                                        <div key={note._id} className='border p-3 mb-3'>
                                            <p onClick={() => {
                                                handleTitle(note._id)
                                            }} className="m-0">{note.title}</p>
                                            <div className="d-flex justify-content-end">
                                                <button onClick={() => {
                                                    handleRemove(note._id)
                                                }} className="fw-bolder" >X</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
                
            </div>
            <div className="col-3 ms-3">
                <h3>Add Note</h3>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder="Title" name='title' value={title} onChange={handleChange} className="form-control"/>
                    { formErrors.title && <span style={{color:'red', fontSize:'12px'}}>{formErrors.title}</span>}
                    <textarea placeholder="Body" name='body' value={body} onChange={handleChange} className="form-control my-4"></textarea>
                    <input type="submit" value='Save' className="btn btn-success"/>
                </form>
            </div>
        </div>
    )
}

export default MyNotes
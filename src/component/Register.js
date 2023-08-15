import React,{useState} from 'react'
import axios from 'axios'

const Register=(props)=>{
    const[username,setUserName] = useState('')
    const[email,setEmail]   = useState('')
    const[password,setPassword]  = useState('')
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData = {
            username:username,
            email:email,
            password:password
        }
       // console.log(formData)       
        axios.post('http://localhost:3005/users/register',formData)
        .then((res)=>{
            const result=res.data
            if(result.hasOwnProperty('errors')){
                alert(result.message)
            }else{
                alert("successfly created user")
               // console.log(res.data)
                props.history.push("/login")
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
    const handleChange=(e)=>{
        if(e.target.name==="username"){
            setUserName(e.target.value)
        }else if(e.target.name==="email"){
            setEmail(e.target.value)
        }else if(e.target.name==="password"){
            setPassword(e.target.value)
        }
    }
 return (
    <div>
        <h1>Register With Us</h1>
        <form onSubmit={handleSubmit}>
            <input type="text"  placeholder='enter username'  value={username}  onChange={handleChange}  name="username"/><br/>
            <input type="text"  placeholder='enter email'   value={email}   onChange={handleChange}  name="email" /><br/>
            <input type="password"  placeholder='enter password'  value={password}  onChange={handleChange} name="password" /><br/>
            <input type="submit" />
        </form>
    </div>
 )
}
export default Register
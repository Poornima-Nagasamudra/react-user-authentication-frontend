import React,{useState} from 'react'
import axios from 'axios'

const Login=(props)=>{
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:email,
            password:password
        }
        console.log(formData)
      
        axios.post('http://localhost:3005/users/login',formData)
        .then((res)=>{
            const result=res.data
            if(result.hasOwnProperty('errors')){ //object.keys((result).includes("errors"))
                alert(result.errors)
            }else{
                alert("successfly logedin")
                console.log(result) 
                localStorage.setItem("token",result.token) 
                props.history.push("/") 
                props.handleAuth()
            }
        })
        .catch((err)=>{
            alert(err.message)
        })

    }
    const handleChange=(e)=>{
        if(e.target.name==="email"){
            setEmail(e.target.value)
        }else if(e.target.name==="password"){
            setPassword(e.target.value)
        }
    }
 return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text"  placeholder='enter email'   value={email}   onChange={handleChange}  name="email"  /><br/>
            <input type="password" placeholder='enter password'   value={password}  onChange={handleChange}  name="password" /><br/>
            <input type="submit" />
        </form>
    </div>
 )
}
export default Login
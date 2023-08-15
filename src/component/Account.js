import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Account=(props)=>{
    const[user,setUser] = useState({})

    useEffect(()=>{
        axios.get('http://localhost:3005/users/account',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then((res)=>{
           setUser(res.data)
        })
        .catch((err)=>{
            alert(err.message)
        })
    },[])
    return (
        <div>
           <h1>User Account</h1>
           <p>email-{user.email}</p>
           <p>username-{user.username}</p>
        </div>
    )
}
export default Account
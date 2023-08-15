import { Component } from 'react'
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute=({component:component,...rest})=>{
    return (
        <Route
            {...rest}
            render={(props)=>{
                return localStorage.getItem('token')?(
                    <Component {...props}/>
                ):(
                    <Redirect 
                        to={{
                            pathname:'/login'
                        }}
                    />
                )
            }}
        />
    )
}
export default PrivateRoute
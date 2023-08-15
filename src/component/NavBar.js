import React from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import PrivateRoute from '../helpers/PrivateRoute'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'
import MyNotesContainer from './MyNotesContainer'


const NavBar = (props) =>{
    const {userLoggedIn, handleAuth} = props

    return (
        <div className='container'>
            <ul>
                <li> <Link to="/"> Home   </Link></li>
                { !userLoggedIn ? (
                    <>
                        <li><Link to='/account'>Account </Link></li>
                        <li><Link to="/mynotes"> My Notes  </Link></li>
                        <li><Link onClick={() => {
                            localStorage.removeItem('token')
                            alert("Successfully loggedout")
                            handleAuth()
                            props.history.push('/')
                            }}>Logout</Link></li>
                    </>
                    ) : (
                    <>
                        <li> <Link to="/register"> Register  </Link></li>
                        <li> <Link to="/login"> Login   </Link></li>
                    </>
                    )
                }
    
            </ul>

            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/login" render={(props)=> {
                return (
                    <Login {...props} handleAuth={handleAuth} />
                )
            }} exact={true} />  {/*convert route component to render  */}
            <PrivateRoute path="/account" component={Account} exact={true} />
            <PrivateRoute path="/mynotes" component={MyNotesContainer} exact={true} />
        </div>
    )
}

//This is Higer order function -- a function which takes  another function as argument
//In react Higher order component -- a component takes another component as component
// const WrappedComponent = withRouter(NavBar) 

// export default WrappedComponent

export default withRouter(NavBar)
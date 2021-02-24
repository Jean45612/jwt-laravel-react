import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import token from '../services/token.js'

const AfterLogin = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (token.loggedIn()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/login" />
                }
            }
        } />
    )
}

export default AfterLogin 

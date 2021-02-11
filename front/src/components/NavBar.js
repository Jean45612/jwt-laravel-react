import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    Home</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Registrarse</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar

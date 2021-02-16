import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import token from '../services/token'
import api from '../services/api'
import { useHistory } from 'react-router-dom';

const noLogueado = <React.Fragment>
    <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to="/register">Registrarse</Link>
    </li>
</React.Fragment>;

const logueado = <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownPerfil" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        NAME USUARIO
    </a>

    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownPerfil">
        <a className="dropdown-item" href="#">Mi Perfil</a>
        <a className="dropdown-item" href="#" onClick={() => Logout()}>Cerrar sesión</a>
    </div>
</li>;

const Logout = () => {
    const history = useHistory();////EL ERROR ESTÁ AQUI REVISARLO

    api.post("logout", "").then(
        (data) => {
            // token.remove();
            history.push('/login');
        },
        (error) => {
            // token.remove();
            history.push('/login');
        }
    );
}

export class NavBar extends Component {
    
    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    Home</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        {
                            token.isValid() ? logueado : noLogueado
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar

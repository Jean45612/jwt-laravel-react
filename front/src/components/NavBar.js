import React, { Component, useCallback } from 'react'
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

const Logueado = () => {
    const logout = useLogout()

    return (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownPerfil" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {token.getUser().email}
          </a>

            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownPerfil">
                <a className="dropdown-item" href="#">Mi Perfil</a>
                <a className="dropdown-item" href="#" onClick={logout}>Cerrar sesión</a>
            </div>
        </li>
    )
}

const useLogout = () => {
    let history = useHistory();

    return useCallback(() => api.post("logout", "").then( //USECALLBACK ES UN HOOK DE REACT
        (data) => {
            token.remove();
            history.push('/login');
        },
        (error) => {
            token.remove();
            history.push('/login');
        }
    ), [history]); //ESTO LO PASAMOS COMO PARAMETRO PARA QUE EN EL CALLBACK SE PUEDA UTILIZAR
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
                            token.isValid() ? <Logueado /> : noLogueado
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar


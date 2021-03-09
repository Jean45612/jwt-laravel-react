import React, { useState, useEffect } from 'react'
import Home from './views/Home.js'
import NavBar from './components/NavBar.js'
import Login from './views/Login.js'
import Register from './views/Register.js'
import token from './services/token'
import api from './services/api'
import PageNotFound from './views/PageNotFound.js'
import AfterLogin from './route/afterLogin.route'
import BeforeLogin from './route/beforeLogin.route'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  const [usuario, setUsuario] = useState(null) //ESTO SON HOOKS DE ESTADO

  useEffect(() => { //ESTO ES HOOK DE EFECTO, SIRVE PARA EJECUTAR LO QUE HAYA DENTRO DESPUES DE QUE EL COMPONENTE SE HAYA RENDERIZADO O SI ES QUE SE HA ACTUALIZADO
    if (token.loggedIn()) {
      api.post("me", "").then(
        (data) => {
          setUsuario(data);
        },
        (error) => {
          setUsuario(null);
        });
    }
  }, []) //AGREGAMOS ESTE ARRAY VACIO PARA QUE EL USE EFECT SOLO SE EJECUTE AL CREARSE EL COMPONENTE

  //DENTRO DEL SWITCH SE PONEN TODAS LAS RUTAS DINAMICAS
  return (
    <Router>
      <NavBar usuario={usuario} setUsuario={setUsuario} />
      <Switch> 
        <AfterLogin path="/" exact component={Home} />

        <BeforeLogin path="/login" component={(props) => (
          <Login {...props} setUsuario={setUsuario} /> //A LA RUTA LOGIN LE MANDO EL SET USUARIO PARA LO ACTUALICE CUANDO EL USUARIO SE LOGUEE
        )}></BeforeLogin>

        <BeforeLogin path="/register" component={Register} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;

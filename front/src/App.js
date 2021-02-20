import Home from './views/Home.js'
import NavBar from './components/NavBar.js'
import Login from './views/Login.js'
import Register from './views/Register.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import MainContainer from './MainContainer';
import Register from './Register';
import Login from './Login';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Logout from './Logout';



function App() {
  return (
    <div className="App">
       <Logout />

      
      <main>
      <div className="ui menu inverted segment">
        <div className=" right floated ui inverted secondary menu">
            <div>
            <img src="./public/Logo.png" alt="logo"/>
            </div>
        </div>
      </div>
      <Switch>
          <Route exact path='/' component={ Login }/>
          <Route exact path='/register' component={ Register }/>
          <Route exact path='/home' component={ MainContainer }/>
      </Switch>
      </main> 

    </div>
  );
}

export default App;

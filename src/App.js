import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import ItemList from './components/itemlist.component'
import Login from './components/login.component'
import AuthService from './services/auth.service'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser : undefined
    }
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
    console.info('Updating User '+ user);
    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

    

  render() {
    return (
      <div>
      {this.state.currentUser ? (
          <ItemList/>
        ):(
            <Login
            onLogin = {this.handleSuccesfulLogin}/> 
        )}
        </div>
    );
  }
}

export default App;
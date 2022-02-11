import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ItemView from "./components/itemview.component";
import Login from "./components/login.component";
import AuthService from "./services/auth.service";
import Navbar from "./components/navbar.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.showItemList = this.showItemList.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logout() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
    window.location.reload();
  }

  showItemList(query) {
    this.setState({
      query: query
    });
  }

  render() {
    return (
      <div>
        <Navbar currentuser={this.state.currentUser} showItemList={this.showItemList} logout={this.logout} />
        {this.state.currentUser ? (
          <div>
            <ItemView logout={this.logout} query={this.state.query} user={this.state.currentUser} />
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ItemList from "./components/itemlist.component";
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
    console.info(user);
    if (user) {
      this.setState({
        currentUser: user.user,
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

  showItemList(query){
      this.setState({
        showItem: true,
        query: query
      });
  }

  render() {
    return (
      <div>
        <Navbar currentuser={this.state.currentUser} showItemList={this.showItemList} logout={this.logout} />
        {this.state.currentUser ? (
          this.state.showItem ? (
            <div>
              <ItemList logout={this.logout} query={this.state.query} />
            </div>
            ):(<div className="text-center" >Search For List</div>)
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;

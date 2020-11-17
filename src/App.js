import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import './App.css';

import Item from './components/item.component'
import ItemList from './components/itemlist.component'
import AddItem from './components/addItem.component'


class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-brand">
            Items
          </div>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/items"} className="nav-link">
                Items
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/items/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={"/items"} component={ItemList} />
            <Route exact path="/items/add" component={AddItem} />
            <Route path="/items/:id" component={Item} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
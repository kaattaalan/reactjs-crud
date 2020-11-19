import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import ItemList from './components/itemlist.component'


class App extends Component {
  render() {
    return (
        <ItemList/>
    );
  }
}

export default App;
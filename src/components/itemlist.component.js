import React, { Component } from "react";
import ItemService from "../services/item.service";

import ItemDialogue from './item.component'

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.getItemList = this.getItemList.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
    this.showEditItemDialogue = this.showEditItemDialogue.bind(this);
    this.handleAPIError = this.handleAPIError.bind(this);
    this.state = {
      items: []
    };
  }

  //will fetch the list of items after the component has been loaded
  componentDidMount() {
    this.getItemList();
  }

  //checks for 401 error and perform logout
  handleAPIError(error) {
    if (401 === error.response.status) {
      this.props.logout();
    }
  }

  //fetch list from API
  getItemList() {
    ItemService.getAll()
      .then(response => {
        this.setState({
          items: response.data
        });
        console.info(response.data);
      }, error => { this.handleAPIError(error) })
  }
  //remove All items
  removeAllItems() {
    ItemService.deleteAll()
      .then(
        response => {
          console.info(response.data);
          this.getItemList();
        },
        error => { this.handleAPIError(error) }
      )
  }

  showNewItemDialogue = () => {
    this.setState({ showItem: true, activeItemId: undefined });
  };

  showEditItemDialogue = (itemID) => {
    this.setState({ showItem: true, activeItemId: itemID })
  };

  hideItemDialogue = () => {
    this.setState({ showItem: false });
  };


  render() {
    const { items } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Item List</h4>

          <ul className="list-group">
            {items &&
              items.map((item, index) => (
                <li
                  className="list-group-item "
                  key={index}
                  onClick={() => { this.showEditItemDialogue(item.id); }}
                >
                  {item.title}
                </li>
              ))}
          </ul>
          <ItemDialogue show={this.state.showItem}
            handleClose={this.hideItemDialogue}
            itemId={this.state.activeItemId}
            loadList={this.getItemList}
            logout={this.handleAPIError} />
          <button
            className="m-3 btn btn-sm btn-outline-success"
            onClick={() => { this.showNewItemDialogue(); }}
          >
            Add
          </button>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllItems}
          >
            Remove All
          </button>
        </div>
      </div>
    );
  }
}
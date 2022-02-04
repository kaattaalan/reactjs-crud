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
    this.populateList = this.populateList.bind(this);
    this.state = {
      items: [],
      query: this.props.query
    };
  }

  //will fetch the list of items after the component has been loaded
  componentDidMount() {
    this.getItemList(this.props.query);
  }

  //refresh list when query is changed
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
     this.getItemList(this.props.query);
    }
  }

  //populates the list
  populateList(response){
    this.setState({
      items: response.data
    });
  
  }

  //checks for 401 error and perform logout
  handleAPIError(error) {
    if (401 === error.response.status) {
      this.props.logout();
    }
  }

  //fetch list from API
  getItemList(query) {
    if(query === undefined){
      query = this.props.query;
    }
    if(query === '' ){
      ItemService.getAll().then(this.populateList, this.handleAPIError);
    }else{
      ItemService.findByTitle(query).then(this.populateList, this.handleAPIError);
    }
  }
  //remove All items
  removeAllItems() {
    ItemService.deleteAll()
      .then(
        response => {
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
      <div className="">
      <div className="list row">
        <div className="col-md-12">
          <div className="row">
            <h4 className="col-md-6">Item List</h4>
            <button
              className="ml-auto m-3 btn btn-sm btn-outline-success"
              onClick={() => { this.showNewItemDialogue(); }}
            >
              New Item
            </button>
          </div>
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
          <div className="row">  
            <button
              className="ml-auto m-3 btn btn-sm btn-danger"
              onClick={this.removeAllItems}
            >
              Remove All
            </button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
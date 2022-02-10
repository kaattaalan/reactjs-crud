import React, { Component } from "react";
import ItemService from "../services/item.service";

//import ItemDialogue from './item.component'

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.getItemList = this.getItemList.bind(this);
    this.removeAllItems = this.removeAllItems.bind(this);
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

  //fetch list from API
  getItemList(query) {
    if (query === '' || query === undefined) {
      ItemService.getAll().then(this.populateList, this.handleAPIError);
    } else {
      ItemService.findByTitle(query).then(this.populateList, this.handleAPIError);
    }
  }

  //populates the list
  populateList(response) {
    this.setState({
      items: response === undefined ? "" : response.data
    });

  }

  //checks for 401 error and perform logout
  //Also checks for 404 and render the list as empty
  handleAPIError(error) {
    if (401 === error.response.status) {
      this.props.logout();
    } else if (404 === error.response.status) {
      this.populateList(undefined);
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

  render() {
    const { items } = this.state;

    return (
      <div className="">
        <div className="row">
          <h4 className="col-md-6">Item List</h4>
          <button
            className="ml-auto m-3 btn btn-sm btn-outline-success"
            onClick={() => { this.props.newItem(); }}
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
                onClick={() => { this.props.showItem(item.id); }}
              >
                {item.title}
              </li>
            ))}
        </ul>
        <div className="row">
          <button
            className="ml-auto m-3 btn btn-sm btn-danger"
            onClick={this.removeAllItems}
          >
            Remove All
          </button>
        </div>
      </div>
    );
  }
}
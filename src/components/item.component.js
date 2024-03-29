import { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import ItemService from '../services/item.service'

export default class ItemDialogue extends Component {
  constructor(props) {
    super(props);
    this.getItem = this.getItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.populateForm = this.populateForm.bind(this);
    this.state = {
      activeItem: undefined,
      title: "",
      description: "",
      itemId: ""
    }
  }

  //single method to enable both set and reset functions.
  fillState(response) {
    this.setState({ 
      activeItem: response && response.data ? response.data : undefined,
      itemId: response && response.data && response.data.id ? response.data.id : "",
      title: response && response.data && response.data.title ? response.data.title : "",
      description: response && response.data && response.data.description ? response.data.description : ""
    })
  }

  populateForm() {
    this.props.itemId ? this.getItem(this.props.itemId) : this.fillState(undefined)
  }

  getItem(id) {
    ItemService.get(id)
      .then(response => {
        this.fillState(response)
      }, error => {
        this.props.logout(error)
      })
  }

  //single handler for all onChange of input fields
  handleChange(evt) {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  saveItem() {
    ItemService.create({
      title: this.state.title,
      description: this.state.description
    }).then(
      response => {
        this.props.loadList();
      },
      error => {
        this.props.logout(error)
      })
  }

  deleteItem() {
    ItemService.delete(this.props.itemId).then(
      response => {
        this.props.loadList();
      },
      error => {
        this.props.logout(error)
      })
  }

  updateItem() {
    ItemService.update({
      id: this.state.itemId,
      title: this.state.title,
      description: this.state.description
    }).then(
      response => {
        this.props.loadList();
      },
      error => {
        this.props.logout(error)
      })
  }

  render() {
    //item dialogue goes here
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleClose}
        onEnter={this.populateForm}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="submit-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.handleChange}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={this.state.description}
                onChange={this.handleChange}
                name="description"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => { this.props.handleClose(); }} className="m-3 btn btn-sm btn-light">
            Close
          </button>
          {
            !this.props.itemId ? (
              <div>
                <button onClick={() => { this.saveItem(); this.props.handleClose(); }} className="m-3 btn btn-sm btn-outline-primary">
                  Save
          </button>
              </div>) : (
                <div>
                  <button onClick={() => { this.updateItem(); this.props.handleClose(); }} className="m-3 btn btn-sm btn-outline-secondary">
                    Update
            </button>
                  <button onClick={() => { this.deleteItem(); this.props.handleClose(); }} className="m-3 btn btn-sm btn-outline-danger">
                    Delete
            </button>
                </div>
              )
          }

        </Modal.Footer>
      </Modal>
    )
  }

}

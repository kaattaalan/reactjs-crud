/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import ItemService from '../services/item.service';
import VoteComponent from './vote.component';
import { timeSince, hasDeletePermission } from '../util/utils';

export default class ItemDialogue extends Component {
  constructor(props) {
    super(props);
    this.getItem = this.getItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      user: this.props.user,
      activeItem: undefined,
      title: "",
      description: "",
      itemId: "",
      editItem: false
    }
  }

  //single method to enable both set and reset functions.
  fillState(response) {
    //enable edit mode on input fields
    if (response === undefined) this.editItem();
    //set the state with values for editable
    this.setState({
      activeItem: response && response.data ? response.data : undefined,
      itemId: response && response.data && response.data.id ? response.data.id : "",
      title: response && response.data && response.data.title ? response.data.title : "",
      description: response && response.data && response.data.description ? response.data.description : "",
      createdDate: response && response.data && response.data.createdDate ? response.data.createdDate : undefined,
      itemUsername: response && response.data && response.data.userInfo && response.data.userInfo.username ? response.data.userInfo.username : "",
      itemViews: response && response.data && response.data.metaData ? response.data.metaData.viewCount : ""
    })
  }

  //renders either edit or new item window based on item id
  componentDidMount() {
    this.props.itemId ? this.getItem(this.props.itemId) : this.fillState(undefined);
  }

  getItem(id) {
    ItemService.get(id)
      .then(response => {
        this.fillState(response);
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

  editItem() {
    this.setState({
      ...this.state,
      editItem: true
    });
  }

  disableEdit() {
    this.setState({
      ...this.state,
      editItem: false
    });
  }

  saveItem() {
    ItemService.create({
      title: this.state.title,
      description: this.state.description,
      userId: this.state.user.id
    }).then(
      response => {
        this.props.handleClose();
      },
      error => {
        this.props.logout(error)
      })
  }

  deleteItem() {
    ItemService.delete(this.props.itemId).then(
      response => {
        this.props.handleClose();
      },
      error => {
        this.handleAPIError(error);
      })
  }

  updateItem() {
    ItemService.update({
      id: this.state.itemId,
      title: this.state.title,
      description: this.state.description,
      userId: this.state.user.id
    }).then(
      response => {
        this.props.handleClose();
      },
      error => {
        this.handleAPIError(error);
      })
  }

  handleAPIError(error) {
    if (403 === error.response.status) {
      this.disableEdit();
    }
  }

  handleClose() {
    if (this.state.editItem) {
      this.disableEdit();
    } else {
      this.props.handleClose();
    }
  }

  render() {
    //item dialogue goes here
    return (
      <div className="container">
        <div className="row title">
          {this.state.editItem ? (
            <input type="text" className="col-md-12" required value={this.state.title} onChange={this.handleChange} name="title" />
          ) : (
            <strong>{this.state.title}</strong>
          )}
        </div>
        <div className="row description" >
          {this.state.editItem ? (
            <textarea type="text" className="" value={this.state.description} onChange={this.handleChange} name="description" />
          ) : (
            <p> {this.state.description} </p>
          )}
        </div>
        <div className="row container col-md-12 small footer">
          {this.state.activeItem ? (
            <div>
              {/*<VoteComponent itemId={this.state.itemId} upVote={ItemService.upVote} downVote={ItemService.downVote} />*/}
            </div>
          ) : ("")}
          <div className="row col-md-4">
            &nbsp;
            <div className="text-muted small">Posted By <strong>{this.state.itemUsername}&nbsp;</strong></div>
            <div className="text-muted small">{this.state.createdDate ? timeSince(this.state.createdDate) + ' ago.' : ""}</div>
            <span className="text-muted small">&nbsp; Viewed {this.state.itemViews} times</span>
          </div>
          <div className="row ml-auto">
            {!this.props.itemId ? (
              <a href="#" className="text-success" onClick={this.saveItem}>&nbsp;Save</a>) : (
              this.state.editItem ? (
                <a href="#" className="text-success" onClick={() => { this.updateItem(); }}>&nbsp;Update</a>) : (
                hasDeletePermission(this.props.user) ? (
                  < div className="">
                    <a href="#" onClick={() => { this.editItem(); }}>&nbsp;Edit</a>
                    <a href="#" className="text-danger" onClick={() => { this.deleteItem(); }}>&nbsp;Delete</a>
                  </div>) : ("")
              ))}
            <a href="#" className="text-muted" onClick={this.handleClose}>&nbsp;Close</a>
          </div>
        </div>
        <hr />
      </div>
    )
  }
}

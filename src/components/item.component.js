import { Component } from "react";
import ItemService from '../services/item.service';
import { timeSince } from '../util/utils';

export default class ItemDialogue extends Component {
  constructor(props) {
    super(props);
    this.getItem = this.getItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.state = {
      user: this.props.user,
      activeItem: undefined,
      title: "",
      description: "",
      itemId: "",
      editItem: false,
      isAllowed: true
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
      itemUsername: response && response.data && response.data.userInfo && response.data.userInfo.username ? response.data.userInfo.username : ""
    })
  }

  //renders either edit or new item window based on item id
  componentDidMount() {
    this.props.itemId ? this.getItem(this.props.itemId) : this.fillState(undefined);
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

  editItem() {
    this.setState({
      ...this.state,
      editItem: true
    });
  }

  disableEdit() {
    this.setState({
      ...this.state,
      isAllowed: false
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

  render() {
    //item dialogue goes here
    return (
      <div className="container-fluid mt-100">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-header">
                <div className="media flex-wrap w-100 align-items-center">
                  <div className="media-body ml-3">
                    <div data-abc="true" >
                      {this.state.editItem ? (
                        <input type="text" className="form-control" required value={this.state.title} onChange={this.handleChange} name="title" />
                      ) : (
                        <strong> {this.state.title} </strong>
                      )}
                    </div>
                  </div>
                  <div className="text-muted small ml-3">
                    <div>Posted By <strong>{this.state.itemUsername}</strong></div>
                    <div className="text-muted small">{this.state.createdDate ? timeSince(this.state.createdDate) : ""}</div>
                  </div>
                </div>
              </div>
              <div className="card-body" >
                {this.state.editItem ? (
                  <textarea type="text" className="form-control" value={this.state.description} onChange={this.handleChange} name="description" />
                ) : (
                  <p> {this.state.description} </p>
                )}
              </div>
              <div className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                <div className="px-4 pt-3">
                  <a href="#" className="text-muted d-inline-flex align-items-center align-middle" data-abc="true">
                    <i className="fa fa-heart text-danger"></i>&nbsp;
                    <span className="align-middle">445</span> </a>
                  <span className="text-muted d-inline-flex align-items-center align-middle ml-4">
                    <i className="fa fa-eye text-muted fsize-3"></i>&nbsp;
                    <span className="align-middle">14532</span>
                  </span>
                </div>
                <div className="px-4 pt-3 row">
                  {
                    !this.props.itemId ? (
                      <button type="button" onClick={this.saveItem} className="btn btn-success btn-sm"><i className="ion ion-md-create">
                      </i> Save
                      </button>) : (
                      this.state.editItem ? (
                        <div>
                          {!this.state.isAllowed ? (
                            <div>
                              < button type="button" className="btn btn-link disabled">Forbidden</button>
                            </div>
                          ) : (
                            <div>
                              <button type="button" onClick={() => { this.updateItem(); }} className="btn btn-outline-success btn-sm"><i className="ion ion-md-create">
                              </i> Update
                              </button>
                              <button type="button" onClick={() => { this.deleteItem(); }} className="btn btn-outline-danger btn-sm"><i className="ion ion-md-create">
                              </i> Delete
                              </button>
                            </div>
                          )
                          }
                        </div>
                      ) : (
                        < button type="button" onClick={() => { this.editItem(); }} className="btn btn-link">Edit</button>
                      ))
                  }
                  <button type="button" onClick={() => { this.props.handleClose(); }} className="btn btn-outline-secondary btn-sm"><i className="ion ion-md-create">
                  </i> Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    )
  }

}

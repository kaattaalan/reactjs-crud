import React, { Component } from "react";
import UserCard from './user.component'

export default class navbar extends Component {
    constructor(props) {
        super(props);
        this.showUserdetails = this.showUserdetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.state = {
            query : ""
        };
    }

    showUserdetails = () => {
        this.setState({ showUser: true });
      };

    hideUserdetails = () => {
        this.setState({ showUser: false });
      };
    
    handleChange(evt) {
      const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
      this.setState({
        ...this.state,
        [evt.target.name]: value
      });
    }

    searchItem(){
        this.props.showItemList(this.state.query);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-brand">
                        React - CRUD
                    </div>
                    {(this.props.currentuser) ? (
                       <div className="col-md-8 ml-auto">
                        <div className="navbar-nav ml-auto">
                            <input
                                type="text"
                                className="form-control col-md-4 "
                                id="query"
                                value={this.state.query}
                                onChange={this.handleChange}
                                name="query"
                            />
                            <div onClick={this.searchItem}  className="btn btn-danger my-2 my-sm-0">
                            🔍
                            </div>
                            <br/>
                            <div className="ml-auto my-2 my-sm-0">
                            <div onClick={this.showUserdetails} className="btn btn-danger">
                            😊
                            </div>
                            </div>
                            <div className="">
                            <UserCard className="" show={this.state.showUser}
                                handleClose={this.hideUserdetails}
                                userName={this.props.currentuser.name}
                                logout={this.props.logout} />
                            </div>
                        </div>
                        </div> 
                    ) : null
                    }
                </nav>
            </div>
        )
    }

}
import React, { Component } from "react";

export default class navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-brand">
                        React - CRUD
                    </div>
                    {(this.props.currentuser) ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item px-2">
                                <div className="navbar-text" >
                                    {this.props.currentuser.name}
                                </div>
                            </li>
                            <li className="nav-item px-2">
                                <div onClick={this.props.logout} className="btn btn-danger my-2 my-sm-0">
                                    Logout
                            </div>
                            </li>
                        </div>
                    ) : null
                    }
                </nav>
            </div>
        )
    }

}
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
                            <li className="nav-item">
                                <div className="navbar-text" >
                                    {this.props.currentuser.name}
                                </div>
                            </li>
                            <li className="nav-item">
                                <div onClick={this.props.logout} className="nav-link">
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
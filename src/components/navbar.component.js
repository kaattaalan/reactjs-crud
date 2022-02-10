import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Search from './search.component'

export default class navbar extends Component {
    constructor(props) {
        super(props);
        this.showUserdetails = this.showUserdetails.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.state = {
            query: ""
        };
    }

    showUserdetails = () => {
        this.setState({ showUser: true });
    };

    hideUserdetails = () => {
        this.setState({ showUser: false });
    };

    //will be passed down to the search component for execution
    searchItem(query) {
        this.props.showItemList(query);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-brand">
                        Item - CRUD
                    </div>
                    {(this.props.currentuser) ? (
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <Search className="nav-item active" searchItem={this.searchItem} />
                            </ul>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.props.currentuser.username}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">{this.props.currentuser.email}</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#" onClick={this.props.logout}>Logout</a>
                                </div>
                            </div>
                        </div>
                    ) : null
                    }
                </nav>
            </div >
        )
    }

}
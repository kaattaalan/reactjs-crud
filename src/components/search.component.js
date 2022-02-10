import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            query: ""
        };
    }

    //updates the state based on changes in input
    handleChange(evt) {
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }

    render() {
        return (
            <div className="form-inline my-2 my-lg-0">
                <input
                    type="search"
                    className="form-control mr-sm-2"
                    id="query"
                    value={this.state.query}
                    onChange={this.handleChange}
                    name="query"
                />

                <div onClick={() => { this.props.searchItem(this.state.query); }} className="btn btn-outline-success my-2 my-sm-0">
                    Search
                </div>
            </div>
        )
    }

}
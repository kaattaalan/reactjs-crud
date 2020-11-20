import React, { Component } from "react";
import AuthService from '../services/auth.service'

export default class login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange(evt) {
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }
    handleLogin(e) {
        e.preventDefault();
        AuthService.login(this.state.email, this.state.password).then(
            () => {
                console.info('Login Success')
                //this.props.onLogin();
                //this.props.history.push("/profile");
                window.location.reload();
            },
            error => {
                console.info(error)
            }
        );
    }

    render(){
        return(
            <form onSubmit={this.handleLogin}>
            <div className="submit-form">
                <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <button  className="m-3 btn btn-sm btn-primary">
            Save
          </button>
            </div>
            </form>
        );
    }
}
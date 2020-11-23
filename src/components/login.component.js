import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: "",
      password: "",
      loginStatus: -1,
    };
  }

  handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({ loginStatus: 0 });
    AuthService.login(this.state.email, this.state.password).then(
      () => {
        console.info("Login Success");
        this.setState({ loginStatus: 1 });
        //this.props.onLogin(); this.props.history.push("/profile");
        window.location.reload();
      },
      (error) => {
        this.setState({ loginStatus: 2 });
        console.info(error);
      }
    );
  }

  render() {
    return (
      <form className="submit-form" onSubmit={this.handleLogin}>
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
        <div className="row">
          <button className="m-3 btn btn-sm btn-primary col-sm-6">
            Log In
          </button>
          <div className="col-sm-6">
            {this.state.loginStatus === 2 ? "Error Logging In : " : null}
          </div>
        </div>
      </form>
    );
  }
}

import React, { Component } from "react";
import { goTo, Link } from "react-chrome-extension-router";
import Login from "./Login";
import SecretMessagePage from "./SecretMessagePage";
var CryptoJS = require("crypto-js");

class Register extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      confirmPassword: "",
      warningMessage: "",
      errorMessage: "",
      successMessage: "",
    };
  }
  componentDidMount() {
    let storedPassword = window.localStorage.getItem("password");
    if (storedPassword) {
      this.setState({ warningMessage: "Your old password and secret will be replaced" });
    }
  }
  onpasschange = (e) => {
    this.setState({ password: e.target.value });
  };
  oncpasschange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  handlePassword = () => {
    var cipherSecret = CryptoJS.AES.encrypt(
      JSON.stringify(this.props.message),
      "my-secret-key@123"
    ).toString();
    localStorage.setItem("secretMessage", cipherSecret);
    if (this.state.password.length < 5) {
      this.setState({ errorMessage: "minmum 5 characters needed" });
      this.setState({ successMessage: "" });
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: "Passwords don't match" });
      this.setState({ successMessage: "" });
    } else {
      this.setState({ successMessage: "You Created Password Successfully" });
      this.setState({ errorMessage: "" });

      let loggedIn = true;
      localStorage.setItem("loggedIn", loggedIn);

      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(this.state.password),
        "my-secret-key@123"
      ).toString();

      localStorage.setItem("password", ciphertext);
      goTo(SecretMessagePage);
    }
  };
  render() {
    return (
      <>
        <div className="form-group"></div>
        <div className="form-group"></div>
        <div>
          <span className="text-warning">{this.state.warningMessage}</span>
          <div className="input-group input-group-sm mb-3">
            <input
              type="password"
              value={this.state.password}
              onChange={this.onpasschange}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <input
              type="password"
              value={this.state.confirmpass}
              onChange={this.oncpasschange}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Confirm Password"
            />
          </div>
          <span className="text-danger">{this.state.errorMessage}</span>
          <span className="text-success">{this.state.successMessage}</span>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handlePassword}
          >
            Submit
          </button>
        </div>
        <div className="text-center">
          <Link component={Login}>Login</Link>
        </div>
      </>
    );
  }
}
// );

export default Register;

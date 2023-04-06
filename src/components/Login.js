import React, { Component } from "react";
import { goTo, Link } from "react-chrome-extension-router";
import Register from "./Register";
import SecretMessagePage from "./SecretMessagePage";
var CryptoJS = require("crypto-js");

class Login extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  }
  onpasschange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleLogin = () => {
    let storedPassword = window.localStorage.getItem("password");
    var bytes = CryptoJS.AES.decrypt(storedPassword, "my-secret-key@123");
    var decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (this.state.password === decryptedPassword) {
      let loggedIn = true;
      localStorage.setItem("loggedIn", loggedIn);
      this.setState({ errorMessage: "" });
      this.setState({ successMessage: "Successfully Login" });
      goTo(SecretMessagePage);
    } else {
      this.setState({ successMessage: "" });
      this.setState({ errorMessage: "Password not match" });
    }
  };

  render() {
    return (
      <>
        <div className="input-group input-group-sm mb-3">
          <input
            type="password"
            id="password"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Password"
            onChange={this.onpasschange}
          />
        </div>
        <span className="text-danger">{this.state.errorMessage}</span>
        <span className="text-success">{this.state.successMessage}</span>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleLogin}
          >
            Submit
          </button>
        </div>
        <div className="text-center">
          <Link component={Register}>Register</Link>
        </div>
      </>
    );
  }
}

export default Login;

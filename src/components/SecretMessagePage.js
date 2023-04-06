import React, { Component } from "react";
import { goTo } from "react-chrome-extension-router";
import Home from "./Home";
var CryptoJS = require("crypto-js");

class SecretMessagePage extends Component {
  constructor() {
    super();
    this.state = {
      secretMessage: "",
    };
  }
  componentDidMount() {
    let storedSecret = window.localStorage.getItem("secretMessage");
    var bytes = CryptoJS.AES.decrypt(storedSecret, "my-secret-key@123");
    var decryptedMessage = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    this.setState({ secretMessage: decryptedMessage });
  }
  handleLogout = () => {
    let loggedIn = false;
    localStorage.setItem("loggedIn", loggedIn);
    goTo(Home);
  };

  handleReset = () => {
    let loggedIn = false;
    localStorage.setItem("loggedIn", loggedIn);
    localStorage.clear();
    goTo(Home);
  };

  handleReGenerate = () => {
    let result = Math.random().toString(36).substring(2, 7);
    var cipherSecret = CryptoJS.AES.encrypt(
      JSON.stringify(result),
      "my-secret-key@123"
    ).toString();
    localStorage.setItem("secretMessage", cipherSecret);
    this.setState({ secretMessage: result });
  };

  render() {
    return (
      <>
        <div>{this.state.secretMessage}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="btn btn-primary" onClick={this.handleLogout}>
            Logout
          </button>
          <button className="btn btn-primary" onClick={this.handleReset}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={this.handleReGenerate}>
            ReGenerate
          </button>
        </div>
      </>
    );
  }
}

export default SecretMessagePage;

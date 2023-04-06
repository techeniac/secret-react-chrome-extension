import React, { Component } from "react";
import {
  Router,
  goTo,
} from "react-chrome-extension-router";
import Home from "./components/Home";
import SecretMessagePage from "./components/SecretMessagePage";

class App extends Component {
  constructor() {
    super();
    let loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      goTo(SecretMessagePage)
    }else{
      console.log("fail constructor");
    }
  }
  render() {
    return (
      <div style={{ width: 300 , padding:10 }}>
        <h1>Secret Message</h1>
        <Router>
          <Home />
        </Router>
      </div>
    );
  }
}

export default App;

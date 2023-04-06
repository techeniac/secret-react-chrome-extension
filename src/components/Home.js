import React, { Component } from "react";
import { Link } from "react-chrome-extension-router";
import Register from "./Register";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      secretMessage: "",
    };
  }
  componentDidMount() {
    let result = Math.random().toString(36).substring(2, 7);
    this.setState({ secretMessage: result });
  }

  render() {
    return (
      <>
        <div>
          {this.state?.secretMessage
            ? this.state.secretMessage
            : "you already have some secret message Click on Next button"}
        </div>

        <div className="text-center">
          <Link
            component={Register}
            className="btn btn-primary"
            props={{ message: this.state.secretMessage }}
          >
            Next
          </Link>
        </div>
      </>
    );
  }
}

export default Home;

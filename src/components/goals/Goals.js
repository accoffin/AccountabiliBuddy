import React, { Component } from "react";
import "./Goals.css";
import service from "../../utils/service";

export default class Goals extends Component {
  componentDidMount() {
    console.log("Goals Component");
  }

  render() {
    return (
      <>
        <div id="Goals-main">These are your goals!</div>
      </>
    );
  }
}

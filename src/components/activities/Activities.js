import React, { Component } from "react";
import "./Activities.css";
import service from "../../utils/service";

export default class Activities extends Component {
  componentDidMount() {
    console.log("Activity Component");
  }

  render() {
    return (
      <>
        <div id="Activity-main">These are your activities!</div>
      </>
    );
  }
}
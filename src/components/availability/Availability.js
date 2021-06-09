import React, { Component } from "react";
import "./Availability.css";
import service from "../../utils/service";

export default class Availability extends Component {
  componentDidMount() {
    console.log("Availability Component");
  }

  render() {
    return (
      <>
        <div id="Availability-main">This is your availability!</div>
      </>
    );
  }
}

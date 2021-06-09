import React, { Component } from "react";
import "./Calendar.css";
import service from "../../utils/service";

export default class Calendar extends Component {
  componentDidMount() {
    console.log("Calendar Component");
  }

  render() {
    return (
      <>
        <div id="Calendar-main">This is your calendar!</div>
      </>
    );
  }
}

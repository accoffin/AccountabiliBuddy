import React, { Component } from "react";
import "./PixelaApi.css";
import service from "../../utils/service";

export default class Pixela extends Component {
  componentDidMount() {
    console.log("Pixela Component");
  }

  render() {
    return (
      <>
        <div id="Pixela-main">This is your Pixela Graph!</div>
      </>
    );
  }
}

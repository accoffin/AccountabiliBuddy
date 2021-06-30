import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "../auth/Login";
import "./Landing.css";
import ABlogo from "../../images/logo.png";

export default class Landing extends Component {
  render() {
    return (
      <>
        <div id="landing-main">
          <img src={ABlogo} alt="AB logo" />
          <div id="landing-chart">
            <br />
            <Login {...this.props} setUser={this.props.setUser} />
            <br />
            <ul>
              Don't have an account?
              <Link to="/auth/signup" style={{ textDecoration: "none" }}>
                <li style={{ textDecoration: "none" }}>Sign Up!</li>
              </Link>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

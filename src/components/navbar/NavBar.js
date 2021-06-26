import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import service from "../../utils/service";

export default class NavBar extends Component {

  handleLogout = () => {
    service.logout().then((response) => {
      this.props.setUser(null);
      this.props.history.push("/")
    });
  };

  render() {
    return (
      <div className={"navbar"}>
        {/* <ul className={"bold-small"}>
          <Link to="/" >
            <li>HOME</li>
          </Link>
        </ul> */}
        <ul className={"bold"}>
          {/* {this.props.user && (
            <>
              <Link to="/dashboard">
                <li>DASHBOARD</li>
              </Link>
              <button to="/auth/logout" onClick={this.handleLogout}>
                <li>LOGOUT</li>
              </button>
            </>
          )} */}

          {/* {!this.props.user && (
            <>
              <Link to="/auth/login">
                <li>LOGIN</li>
              </Link>
              <Link to="/auth/signup">
                <li>SIGN UP</li>
              </Link>
            </>
          )} */}

          {this.props.user && <li>{this.props.user.username}</li>}
        </ul>
      </div>
    );
  }
}
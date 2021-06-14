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
      <div className="navbar">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
        </ul>
        <ul>
          {this.props.user && (
            <>
              <Link to="/dashboard">
                <li>Dashboard</li>
              </Link>
              <button to="/auth/logout" onClick={this.handleLogout}>
                <li>Logout</li>
              </button>
            </>
          )}

          {!this.props.user && (
            <>
              <Link to="/auth/login">
                <li>Login</li>
              </Link>
              <Link to="/auth/signup">
                <li>Signup</li>
              </Link>
            </>
          )}

          {this.props.user && <li>{this.props.user.username}</li>}
        </ul>
      </div>
    );
  }
}
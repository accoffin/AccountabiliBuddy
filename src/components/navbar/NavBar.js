import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          <Link to="/celebrities">
            <li>Celebrities</li>
          </Link>

          <Link to="/movies">
            <li>Movies</li>
          </Link>
        </ul>
        <ul>
          {this.props.user ? (
            <Link to="/auth/logout">
              <li>Logout</li>
            </Link>
          ) : (
            <>
              <Link to="/auth/login">
                <li>Login</li>
              </Link>
              <Link to="/auth/signup">
                <li>Signup</li>
              </Link>
            </>
          )}
          <li>{this.props.user.username}</li>
        </ul>
      </div>
    );
  }
}

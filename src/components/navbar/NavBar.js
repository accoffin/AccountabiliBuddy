import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import service from "../../utils/service";

export default class NavBar extends Component {
  state={
    user: this.props.user,
  }

  handleLogout = () => {
    console.log("you clicked logout");
    service.logout().then((response) => {
      console.log(response.data);
      this.props.setUser(response.data);
      this.setState({
        user: response.data
      })
    });
  };

  render() {
    console.log("props from Navbar", this.props.user);
    console.log("checking for state nav bar", this.state.user);

    return (
      <div className="navbar">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
        </ul>
        <ul>
          {!this.state.user ? (
            <>
              <Link to="/dashboard">
                <li>Dashboard</li>
              </Link>
              <Link to="/auth/logout" onClick={this.handleLogout}>
                <li>Logout</li>
              </Link>
            </>
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

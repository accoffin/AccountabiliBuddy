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
                <div id="landing-chart" style={{ textDecoration: 'none' }}>
                    <br />
                    <Login {...this.props} setUser={this.props.setUser}/>
                    <br />
                    <ul>Don't have an account?
                    <br /> 
                    <Link to="/auth/signup" style={{ textDecoration: 'none' }}>
                    Sign Up!
                        </Link>
                        </ul>
                </div>
            </div>
            </>
        )
    }
}

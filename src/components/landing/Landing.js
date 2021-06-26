import React, { Component } from 'react';
import "./Landing.css";
import ABlogo from '../../images/logo.png'

export default class Landing extends Component {
    render() {
        return (
            <>
            <div id="landing-main">
                This will be a graph
                <img src={ABlogo} alt="AB logo" />
            </div>
            </>
        )
    }
}

import React, { Component } from 'react'
import "./Dashboard.css"
import service from '../../utils/service'

export default class Dashboard extends Component {
  componentDidMount() {
    const responseFromAPI = service.getDashboardRoot();
    console.log("dashboard: response from backend API", responseFromAPI);
  }
    
  render() {
        console.log("props from dashboard", this.props.goal)
        return (
            <>
            <div id="dashboard-main">
                This is the dashboard!
                {this.props}
            </div>
            </>
        )
    }
}

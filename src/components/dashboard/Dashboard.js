import React, { Component } from "react";
import "./Dashboard.css";
import service from "../../utils/service";
import Calendar from "../calendar/Calendar";
import Pixela from "../pixelaApi/pixelaApi";

export default class Dashboard extends Component {
  componentDidMount() {
    const responseFromAPI = service.getDashboardRoot();
    console.log("response form backend API", responseFromAPI);
  }

  state = {
    calendarView: "",
    viewedGoals: [],
  };

  render() {
    return (
      <>
        <div id="dashboard-main">
          This is the dashboard!
          <div id="calendar" render={(props) => <Calendar {...props} />}></div>
          <div id="pixelaGraph" render={(props) => <Pixela {...props} />}></div>
        </div>
      </>
    );
  }
}

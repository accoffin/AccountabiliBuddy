import React, { useEffect, useState, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import ApiCalendar from "react-google-calendar-api";
import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import service from "../../utils/service";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export default function CalendarComponent(props) {
  const [createdEvents, setCreatedEvents] = useState([]);

  useEffect(() => {
    service.getCreatedActivitiesFromDB().then((response) => {
      setCreatedEvents(response.data.created_activities);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="CalendarComponent">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={createdEvents}
          style={{ height: "100vh" }}
        />
      </div>
      ;
    </>
  );
}

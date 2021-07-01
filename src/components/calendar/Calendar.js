import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import service from "../../utils/service";

const localizer = momentLocalizer(moment);

export default function CalendarComponent(props) {
  const [createdEvents, setCreatedEvents] = useState([]);

  useEffect(() => {
    service.getCreatedActivitiesFromDB().then((response) => {
      console.log("response from cal", response.data.createdActivities);
      setCreatedEvents(response.data.createdActivities);
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

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarComponent({activitiesForCalendar}) {

  return (
    <>
      <div className="CalendarComponent">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={activitiesForCalendar}
          style={{ height: "100vh" }}
        />
      </div>
    </>
  );
}

import React, { Component } from "react";
import ApiCalendar from "react-google-calendar-api";
import "./Calendar.css";

// export default function CalendarFunction() {
//   const [value, onChange] = useState(new Date());

//   return (
//     <div>
//       <Calendar onChange={onChange} value={value} />
//     </div>
//   );
// }
export default class Calendar extends Component {
  render() {
    return (
      <>
        <div id="Calendar-main">This is your calendar!</div>
      </>
    );
  }
}

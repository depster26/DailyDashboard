import React from "react";

import { TIME_OPTIONS } from "../constants";

const UpcomingEvent = ({ calEvent }) => {
  const startDate = calEvent.start.hasOwnProperty("dateTime")
    ? new Date(calEvent.start.dateTime)
    : new Date(calEvent.start.date);

  return (
    <li className="calendar-event">
      {calEvent.start.dateTime && (
        <span className="event-time">
          {startDate.toLocaleTimeString([], TIME_OPTIONS)}
        </span>
      )}
      <span className="event-title">{calEvent.summary}</span>
    </li>
  );
};

export default UpcomingEvent;

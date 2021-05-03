import React, { useState, useEffect } from "react";

import { DATE_OPTIONS, TIME_OPTIONS } from "../constants";

const CurrentDateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 5000);
    return () => clearInterval(timer);
  });

  return (
    <div className="current-date-time">
      <p className="stat-large">{date.toLocaleTimeString([], TIME_OPTIONS)}</p>
      <p className="stat-small">
        {date.toLocaleDateString("en-US", DATE_OPTIONS)}
      </p>
    </div>
  );
};

export default CurrentDateTime;

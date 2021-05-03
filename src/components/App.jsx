import React from "react";

import Weather from "./Weather";
import Location from "./Location";
import UpcomingEvents from "./UpcomingEvents";

const App = () => {
  return (
    <div className="container">
      <Location />
      <Weather />
      <hr />
      <UpcomingEvents />
    </div>
  );
};

export default App;

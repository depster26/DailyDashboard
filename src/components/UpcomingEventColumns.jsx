import React from "react";

import UpcomingEvent from "./UpcomingEvent";

const UpcomingEventColumns = ({ todaysEvents, tomorrowsEvents }) => {
  const renderEvents = (events) => {
    if (events && events.length > 0) {
      return (
        <ul>
          {events.map((evt) => {
            return <UpcomingEvent calEvent={evt} key={evt.id} />;
          })}
        </ul>
      );
    }

    return <p>No upcoming events</p>;
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h4>Today {todaysEvents.day}</h4>
          {renderEvents(todaysEvents.allDayEvents.concat(todaysEvents.events))}
        </div>
        <div className="col">
          <h4>Tomorrow {tomorrowsEvents.day}</h4>
          {renderEvents(
            tomorrowsEvents.allDayEvents.concat(tomorrowsEvents.events)
          )}
        </div>
      </div>
    </>
  );
};

export default UpcomingEventColumns;

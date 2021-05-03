import React from "react";

import HourlyForecastItem from "./HourlyForecastItem";

const HourlyForecast = ({ forecast }) => {
  return (
    <div className="scrolling-weather-panel">
      <div className="d-flex align-items-center">
        {forecast.map((item) => {
          return <HourlyForecastItem forecastItem={item} key={item.dt} />;
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;

import React from "react";

import { convertUnixTimestamp } from "../utils/general";
import { TIME_OPTIONS, WEATHER_ICON_MAPPING } from "../constants";
import TemperatureValue from "./TemperatureValue";

const HourlyForecastItem = ({ forecastItem }) => {
  const itemDateTime = convertUnixTimestamp(forecastItem.dt);
  const iconClassName = WEATHER_ICON_MAPPING[forecastItem.weather[0].icon];

  return (
    <div className="hourly-forecast-item">
      <p>{itemDateTime.toLocaleTimeString([], TIME_OPTIONS)}</p>
      <p>
        <i className={`wu wu-64 wu-white ${iconClassName}`}></i>
      </p>
      <p>{forecastItem.weather[0].main}</p>
      <p className="hourly-temp">
        <TemperatureValue temp={forecastItem.temp} />
      </p>
      <p>
        <i className="fal fa-wind"></i> {Math.round(forecastItem.wind_speed)}{" "}
        mph
      </p>
      <p>
        <i className="fal fa-raindrops"></i> {forecastItem.pop}%
      </p>
    </div>
  );
};

export default HourlyForecastItem;

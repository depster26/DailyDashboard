import React, { useEffect, useState } from "react";
import axios from "axios";

import { WEATHER_URL, FIFTEEN_MINS_MS } from "../constants";
import appConfig from "../app-config";
import CurrentForecast from "./CurrentForecast";
import HourlyForecast from "./HourlyForecast";
import CurrentDateTime from "./CurrentDateTime";
import CurrentTemp from "./CurrentTemp";

const Weather = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const url = WEATHER_URL.replace("{LAT}", appConfig.openWeather.lat)
        .replace("{LON}", appConfig.openWeather.lon)
        .replace("{API}", appConfig.openWeather.apiKey);

      try {
        setIsWorking(true);
        const result = await axios.get(url);
        if (result && result.data) {
          let tempCurrent = result.data.current;

          if (result.data.daily) {
            tempCurrent.tempHigh = result.data.daily[0].temp.max;
            tempCurrent.tempLow = result.data.daily[0].temp.min;
            tempCurrent.sunRise = result.data.daily[0].sunrise;
            tempCurrent.sunSet = result.data.daily[0].sunset;
          }

          setCurrentForecast(tempCurrent);
          setHourlyForecast(result.data.hourly);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsWorking(false);
      }
    };

    // do an initial load of the weather....
    getWeather();

    // and then kick off timer to refresh every 15 mins
    let timer = setInterval(() => getWeather(), FIFTEEN_MINS_MS);
    return () => clearInterval(timer);
  }, []);

  if (!isWorking && hourlyForecast) {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <div className="align-items-center">
            <CurrentDateTime />
          </div>
          <div className="align-items-center">
            <CurrentForecast forecast={currentForecast} />
          </div>
          <div className="align-items-center">
            <CurrentTemp forecast={currentForecast} />
          </div>
        </div>

        <hr />
        <HourlyForecast forecast={hourlyForecast} />
      </>
    );
  }

  return <div>Loading...</div>;
};

export default Weather;

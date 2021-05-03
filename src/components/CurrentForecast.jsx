import { WEATHER_ICON_MAPPING } from "../constants";

const CurrentForecast = ({ forecast }) => {
  return (
    <i
      className={`wu wu-128 wu-white ${
        WEATHER_ICON_MAPPING[forecast.weather[0].icon]
      }`}
    ></i>
  );
};

export default CurrentForecast;

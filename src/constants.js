// Weather:
export const WEATHER_URL =
  "https://api.openweathermap.org/data/2.5/onecall?lat={LAT}&lon={LON}&units=imperial&exclude=minutely&appid={API}";

export const WEATHER_ICON_URL =
  "http://openweathermap.org/img/wn/{ICON_CODE}@2x.png";

export const FIFTEEN_MINS_MS = 900000;
export const ONE_HOUR_MS = 3600000;
export const TWO_HOURS_MS = 7200000;

// Date and Time:
export const DATE_OPTIONS = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const TIME_OPTIONS = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
};

// Weather

export const WEATHER_ICON_MAPPING = {
  "01d": "wu-day wu-clear",
  "02d": "wu-day wu-partlycloudy",
  "03d": "wu-day wu-cloudy",
  "04d": "wu-day wu-mostlycloudy",
  "09d": "wu-day wu-chancerain",
  "10d": "wu-day wu-rain",
  "11d": "wu-day wu-tstorms",
  "13d": "wu-day wu-chancesnow",
  "50d": "wu-day wu-fog",
  "01n": "wu-night wu-clear",
  "02n": "wu-night wu-partlycloudy",
  "03n": "wu-night wu-cloudy",
  "04n": "wu-night wu-mostlycloudy",
  "09n": "wu-night wu-chancerain",
  "10n": "wu-night wu-rain",
  "11n": "wu-night wu-tstorms",
  "13n": "wu-night wu-chancesnow",
  "50n": "wu-night wu-fog",
};

import TemperatureValue from "./TemperatureValue";

const CurrentTemp = ({ forecast }) => {
  return (
    <>
      <p className="stat-large">
        <TemperatureValue temp={forecast.temp} />
      </p>
      <p className="stat-small">
        <TemperatureValue temp={forecast.tempHigh} /> {" / "}
        <TemperatureValue temp={forecast.tempLow} />
      </p>
    </>
  );
};

export default CurrentTemp;

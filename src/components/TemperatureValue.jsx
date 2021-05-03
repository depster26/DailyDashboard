const TemperatureValue = ({ temp, unit = "F" }) => {
  return (
    <>
      {Math.round(temp)}
      <sup>o</sup>
      {unit}
    </>
  );
};

export default TemperatureValue;

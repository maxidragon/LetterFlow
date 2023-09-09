import FlagIcon from "./FlagIcon/FlagIcon";

const CountryNameWithFlag = (props: {
  country: { name: string; code: string };
}) => {
  return (
    <>
      <FlagIcon code={props.country.code} /> {props.country.name}
    </>
  );
};

export default CountryNameWithFlag;

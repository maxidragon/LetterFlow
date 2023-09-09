import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Country } from "../../logic/interfaces";

const CountrySelect = (props: {
  selectedCountries: number[];
  handleCountrySelectChange: (event: SelectChangeEvent<number[]>) => void;
  possibleCountries: Country[];
  menu: {
    PaperProps: {
      style: {
        maxHeight: number;
        width: number;
      };
    };
  };
}) => {
  return (
    <FormControl sx={{ mt: 2, width: "100%" }}>
      <InputLabel id="countries-label">Countries</InputLabel>
      <Select
        labelId="countries-label"
        multiple
        value={props.selectedCountries}
        onChange={props.handleCountrySelectChange}
        input={<OutlinedInput label="Chip" />}
        renderValue={(selected: number[]) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: number) => {
              const country = props.possibleCountries.find(
                (c: Country) => c.id === value,
              );
              return <Chip key={value} label={country ? country.name : ""} />;
            })}
          </Box>
        )}
        MenuProps={props.menu}
      >
        {props.possibleCountries.map((country: Country) => (
          <MenuItem key={country.id} value={country.id}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelect;

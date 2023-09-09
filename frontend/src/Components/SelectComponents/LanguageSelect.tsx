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
import { Language } from "../../logic/interfaces";

const LanguageSelect = (props: {
  selectedLanguages: number[];
  handleLanguageSelectChange: (event: SelectChangeEvent<number[]>) => void;
  possibleLanguages: Language[];
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
      <InputLabel id="languages-label">Languages</InputLabel>
      <Select
        labelId="languages-label"
        multiple
        value={props.selectedLanguages}
        onChange={props.handleLanguageSelectChange}
        input={<OutlinedInput label="Chip" />}
        renderValue={(selected: number[]) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: number) => {
              const language = props.possibleLanguages.find(
                (c: Language) => c.id === value,
              );
              return <Chip key={value} label={language ? language.name : ""} />;
            })}
          </Box>
        )}
        MenuProps={props.menu}
      >
        {props.possibleLanguages.map(
          (language: { id: number; name: string }) => (
            <MenuItem key={language.id} value={language.id}>
              {language.name}
            </MenuItem>
          ),
        )}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;

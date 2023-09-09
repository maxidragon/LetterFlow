import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const LanguageLevelSelect = (props: {
  selectedLevel: "BASIC" | "INTERMEDIATE" | "FLUENT" | "NATIVE" | undefined;
  handleLevelChange: (
    event: SelectChangeEvent<"BASIC" | "INTERMEDIATE" | "FLUENT" | "NATIVE">,
  ) => void;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="level-label">Level</InputLabel>
      <Select
        labelId="level-label"
        value={props.selectedLevel}
        onChange={props.handleLevelChange}
      >
        <MenuItem value="BASIC">Basic</MenuItem>
        <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
        <MenuItem value="FLUENT">Fluent</MenuItem>
        <MenuItem value="NATIVE">Native</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageLevelSelect;

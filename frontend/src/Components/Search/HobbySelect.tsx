import { FormControl, InputLabel, Select, OutlinedInput, Box, Chip, MenuItem } from "@mui/material";
import { Hobby } from "../../logic/interfaces";

const HobbySelect = (props: {
    selectedHobbies: number[];
    handleHobbySelectChange: any;
    menu: {
        PaperProps: {
            style: {
                maxHeight: number;
                width: number;
            };
        };
    };
    possibleHobbies: Hobby[];
}) => {
    return (
        <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel id="hobbies-label">Hobbies</InputLabel>
            <Select
                labelId="hobbies-label"
                multiple
                value={props.selectedHobbies}
                onChange={props.handleHobbySelectChange}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected: number[]) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value: number) => {
                            const hobby = props.possibleHobbies.find(
                                (h: Hobby) => h.id === value
                            );
                            return <Chip key={value} label={hobby ? hobby.name : ""} />;
                        })}
                    </Box>
                )}
                MenuProps={props.menu}
            >
                {props.possibleHobbies.map((hobby: { id: number; name: string }) => (
                    <MenuItem
                        key={hobby.id}
                        value={hobby.id}
                    >
                        {hobby.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default HobbySelect;
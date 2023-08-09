import { FormControl, InputLabel, Select, OutlinedInput, Box, Chip, MenuItem } from "@mui/material";

const GenderSelect = (props: {
    selectedGender: string[];
    handleGenderChange: any;
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
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
                labelId="gender-label"
                multiple
                value={props.selectedGender}
                onChange={props.handleGenderChange}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected: string[]) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value: string) => {
                            return (
                                <Chip key={value} label={value === "MALE" ? "Male" : value === "FEMALE" ? "Female" : "Other"} />
                            );
                        })}
                    </Box>
                )}
                MenuProps={props.menu}
            >
                <MenuItem
                    key={"FEMALE"}
                    value={"FEMALE"}
                >
                    Female
                </MenuItem>
                <MenuItem
                    key={"MALE"}
                    value={"MALE"}
                >
                    Male
                </MenuItem>
                <MenuItem
                    key={"OTHER"}
                    value={"OTHER"}
                >
                    Other
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default GenderSelect;
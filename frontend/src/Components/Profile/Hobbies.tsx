import { Box, Chip } from "@mui/material";
import { Hobby } from "../../logic/interfaces";

const Hobbies = (props: { hobbies: Hobby[] }) => {
  return (
    <Box>
      {props.hobbies.map((hobby: Hobby) => (
        <Chip label={hobby.name} key={hobby.id}/>
      ))}
    </Box>
  );
};

export default Hobbies;

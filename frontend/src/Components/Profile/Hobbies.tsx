import { Box, Chip } from "@mui/material";

const Hobbies = (props: { hobbies: string[] }) => {
  return (
    <Box>
      {props.hobbies.map((hobby: string) => (
        <Chip label={hobby} />
      ))}
    </Box>
  );
};

export default Hobbies;

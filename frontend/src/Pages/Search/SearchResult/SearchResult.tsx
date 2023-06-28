import { Box, Typography } from "@mui/material";
import SearchCard from "../../../Components/Card/SearchCard";

const SearchResult = (props: { users: any[] }) => {
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
        Search Result
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'row', mt: 3, flexWrap: 'wrap',  overflow: 'auto', height: '70vh'}}>
      {props.users.map((user: any) => (
        <SearchCard
          key={user.id}
          id={user.id}
          username={user.username}
          country={user.country}
          gender={user.gender}
        />
      ))}
      </Box>
    </>
  );
};

export default SearchResult;

import { Box, Typography } from "@mui/material";
import SearchCard from "../../../Components/Card/SearchCard";
import PaginationFooter from "../../../Components/PaginationFooter";
import { User } from "../../../logic/interfaces";

const SearchResult = (props: {
  users: User[],
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) => {
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
        Results
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, flexWrap: 'wrap', overflow: 'auto', height: '70vh' }}>
        {props.users.map((user: User) => (
          <SearchCard
            key={user.id}
            id={user.id}
            username={user.username}
            country={user.country}
            gender={user.gender}
          />
        ))}
      </Box >
      <Box>
        {props.users.length > 0 && <PaginationFooter page={props.page} totalPages={props.totalPages} handlePageChange={props.handlePageChange} />}
      </Box>
    </>
  );
};

export default SearchResult;

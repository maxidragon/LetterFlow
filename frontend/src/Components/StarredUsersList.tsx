import { useEffect, useState } from "react";
import { getMyStarredUsers } from "../logic/user";
import { List } from "@mui/material";
import StarredUser from "./StarredUser";
import { User } from "../logic/interfaces";

const StarredUsersList = () => {
  const [starredUsers, setStarredUsers] = useState<User[]>([]);

  useEffect(() => {
    const getStarredUsers = async () => {
      const starredUsers = await getMyStarredUsers();
      setStarredUsers(starredUsers);
    };
    getStarredUsers();
  }, []);

  return (
    <>
      <List>
        {starredUsers.map((user: User) => (
          <StarredUser key={user.id} user={user} />
        ))}
      </List>
    </>
  );
};

export default StarredUsersList;

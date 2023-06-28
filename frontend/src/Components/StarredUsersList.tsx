import { useEffect, useState } from "react";
import { getMyStarredUsers } from "../logic/user";
import { List } from "@mui/material";
import StarredUser from "./StarredUser";

const StarredUsersList = () => {
  const [starredUsers, setStarredUsers] = useState<any[]>([]);

  useEffect(() => {
    const getStarredUsers = async () => {
      const starredUsers = await getMyStarredUsers();
      console.log(starredUsers);
      setStarredUsers(starredUsers);
    };
    getStarredUsers();
  }, []);

  return (
        <>
            <List>
                {starredUsers.map((user: any) => (
                    <StarredUser key={user.User.id} user={user.User} />
                ))}
            </List>
        </>
    );
};

export default StarredUsersList;

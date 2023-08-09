import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import CountryNameWithFlag from "./CountryNameWithFlag";
import { useState } from "react";
import ProfileModal from "./ModalComponents/ProfileModal";
import { User } from "../logic/interfaces";

const StarredUser = (props: { user: User }) => {
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  return (
    <>
      <ListItemButton onClick={() => setShowProfileModal(true)}>
        <ListItemAvatar>
          <Avatar alt="Profile Picture" />
        </ListItemAvatar>
        <ListItemText
          primary={props.user.username}
          secondary={<CountryNameWithFlag country={props.user.country} />}
        />
      </ListItemButton>
      <ProfileModal
        open={showProfileModal}
        handleClose={() => setShowProfileModal(false)}
        userId={props.user.id}
      />
    </>
  );
};

export default StarredUser;

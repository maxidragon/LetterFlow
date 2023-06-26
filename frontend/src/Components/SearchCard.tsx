import { Card, CardContent, Typography } from "@mui/material";
import ProfileModal from "./ModalComponents/ProfileModal";
import { useState } from "react";

const SearchCard = (props: {
  id: number;
  username: string;
  country: string;
  gender: string;
}) => {
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  return (
    <>
      <Card
        sx={{ width: 300, mr: 5, mt: 2, cursor: "pointer", maxHeight: 300 }}
        onClick={() => setShowProfileModal(true)}
      >
        <CardContent sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {props.username}
          </Typography>
          <Typography variant="body2">{props.country}</Typography>
          <Typography sx={{ mt: 2 }} color="text.secondary">
            {props.gender &&
              props.gender.charAt(0).toUpperCase() +
                props.gender.slice(1).toLowerCase()}
          </Typography>
        </CardContent>
      </Card>
      <ProfileModal
        open={showProfileModal}
        handleClose={() => setShowProfileModal(false)}
        userId={props.id}
      />
    </>
  );
};

export default SearchCard;

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { getProfile } from "../../logic/user";
import { Button, CircularProgress, Divider } from "@mui/material";
import { formatDate } from "../../logic/other";
import Hobbies from "../Profile/Hobbies";
import CreateIcon from '@mui/icons-material/Create';
import WriteLetterModal from "./WriteLetterModal";

const ProfileModal = (props: {
  open: boolean;
  handleClose: any;
  userId: number;
}) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const getUserProfile = async () => {
      const data = await getProfile(props.userId);
      console.log(data);
      setProfile(data);
      setLoading(false);
    };
    getUserProfile();
  }, [props.userId]);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h4">{profile.username}</Typography>
              {profile.birthDate && (
                <Typography variant="h5">
                  {formatDate(profile.birthDate)}
                </Typography>
              )}
              <Typography variant="h6">
                Country: {profile.country.name}
              </Typography>
              <Typography variant="h6">
                Gender: {(profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1).toLowerCase())}
              </Typography>
              <Typography variant="h6">Letter delivers in 24 hours</Typography>
              <Divider />
              <Typography variant="h6">Hobbies:</Typography>
              <Hobbies hobbies={profile.hobbies} />
              <Divider />
              <Typography variant="h6">Languages:</Typography>
              {profile.languages.map((language: any) => (
                <Typography variant="h6">{language.name} {`(${language.level.charAt(0) + language.level.slice(1).toLowerCase()})`}</Typography>
              ))}
              <Divider />
              <Typography variant="h6">Preferences:</Typography>
              <Typography variant="h6">Reply time: {profile.replyTime ? profile.replyTime.toLowerCase() : "No preferences"}</Typography>
              <Button variant="contained" startIcon={<CreateIcon/>} onClick={() => setOpen(true)}>Write</Button>
              <WriteLetterModal receiverName={profile.username} receiverId={profile.id} open={open}
                                      handleClose={() => setOpen(false)}/>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProfileModal;

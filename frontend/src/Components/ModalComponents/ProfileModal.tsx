import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { getProfile, starUser, unstarUser } from "../../logic/user";
import { Button, CircularProgress, Divider, IconButton } from "@mui/material";
import Hobbies from "../Profile/Hobbies";
import CreateIcon from "@mui/icons-material/Create";
import WriteLetterModal from "./WriteLetterModal";
import { style } from "./modalStyles";
import CountryNameWithFlag from "../CountryNameWithFlag";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { enqueueSnackbar } from "notistack";
import { getUserInfo } from "../../logic/auth";
import { getDeliveryTime } from "../../logic/letters";
import dayjs from "dayjs";
import { UserLanguage } from "../../logic/interfaces";
const ProfileModal = (props: {
  open: boolean;
  handleClose: any;
  userId: number;
}) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [deliveryTime, setDeliveryTime] = useState<number>(0);

  const userInfo = getUserInfo();
  useEffect(() => {
    const getUserProfile = async () => {
      if (props.open) {
        const data = await getProfile(props.userId);
        console.log(data);
        const deliveryTime = await getDeliveryTime(props.userId);
        setProfile(data);
        setDeliveryTime(deliveryTime.timeInHours);
        setLoading(false);
      }

    };
    getUserProfile();
  }, [props.userId, props.open]);

  const handleStar = async () => {
    if (profile.starred) {
      const status = await unstarUser(profile.id);
      if (status === 200) {
        enqueueSnackbar("User unstarred", { variant: "success" });
      } else {
        enqueueSnackbar("Server error", { variant: "error" });
      }
    } else {
      const status = await starUser(profile.id);
      if (status === 201) {
        enqueueSnackbar("User starred", { variant: "success" });
      } else {
        enqueueSnackbar("Server error", { variant: "error" });
      }
    }
    setProfile({
      ...profile,
      starred: !profile.starred
    });
  };
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography variant="h4">{profile.username}</Typography>
                {userInfo.id !== profile.id && (
                  <IconButton onClick={handleStar}>
                    {profile.starred ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                )}
              </Box>
              <Typography variant="body1">{profile.description}</Typography>
              {profile.showBirthDate === "AGE" ?
                <Typography variant="h6">
                  Age: {dayjs(profile.birthDate).diff(dayjs(), 'year') * -1}
                </Typography>
                : profile.showBirthDate === "DATE" && (
                  <Typography variant="h6">
                    Birth date: {dayjs(profile.birthDate).format('DD/MM/YYYY')}
                  </Typography>
                )}
              <Typography variant="h6">
                Country: <CountryNameWithFlag country={profile.country} />
              </Typography>
              <Typography variant="h6">
                Gender:{" "}
                {profile.gender &&
                  profile.gender.charAt(0).toUpperCase() +
                  profile.gender.slice(1).toLowerCase()}
              </Typography>
              <Typography variant="h6">Letter delivers in {deliveryTime} hours</Typography>
              <Divider />
              <Typography variant="h6">Hobbies:</Typography>
              <Hobbies hobbies={profile.hobbies} />
              <Divider />
              <Typography variant="h6">Languages:</Typography>
              {profile.languages.map((language: UserLanguage) => (
                <Typography variant="h6">
                  {language.name}{" "}
                  {`(${language.level.charAt(0) +
                    language.level.slice(1).toLowerCase()
                    })`}
                </Typography>
              ))}
              <Divider />
              <Typography variant="h6">Preferences:</Typography>
              <Typography variant="h6">
                Reply time:{" "}
                {profile.replyTime
                  ? profile.replyTime.toLowerCase()
                  : "No preferences"}
              </Typography>
              {userInfo.id !== profile.id && (
                <>
                  <Button
                    variant="contained"
                    startIcon={<CreateIcon />}
                    onClick={() => setOpen(true)}
                  >
                    Write
                  </Button>
                  <WriteLetterModal
                    receiverName={profile.username}
                    receiverId={profile.id}
                    open={open}
                    handleClose={() => setOpen(false)}
                  />
                </>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProfileModal;

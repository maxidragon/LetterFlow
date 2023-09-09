import CreateIcon from "@mui/icons-material/Create";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import LetterCard from "../../../Components/Card/LetterCard";
import ProfileModal from "../../../Components/ModalComponents/ProfileModal";
import WriteLetterModal from "../../../Components/ModalComponents/WriteLetterModal";
import Hobbies from "../../../Components/Profile/Hobbies";
import { getUserProfile } from "../../../logic/auth";
import { getCountryTime } from "../../../logic/countries";
import { getLettersFromConversations } from "../../../logic/letters";
import { Letter, Profile } from "../../../logic/interfaces";

const Conversation = (props: { receiverId: number }) => {
  const [receiverInfo, setReceiverInfo] = useState<Profile>();
  const [countryTime, setCountryTime] = useState<string>("");
  const [letters, setLetters] = useState<Letter[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  useEffect(() => {
    const getReceiverInfo = async () => {
      const info = await getUserProfile(props.receiverId);
      setReceiverInfo(info);
    };

    const getLetters = async () => {
      const lettersList = await getLettersFromConversations(props.receiverId);
      setLetters(lettersList);
    };
    getReceiverInfo();
    getLetters();
  }, [props.receiverId]);
  useEffect(() => {
    const getInfoAboutCountry = () => {
      if (receiverInfo === null || receiverInfo === undefined) return;

      const time = getCountryTime(receiverInfo.timezone);
      setCountryTime(time);
    };
    getInfoAboutCountry();
  }, [receiverInfo, receiverInfo?.country.name]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {receiverInfo && countryTime && (
          <>
            <Box>
              <Typography
                variant="h4"
                sx={{ cursor: "pointer" }}
                onClick={() => setShowProfileModal(true)}
              >
                {receiverInfo.username}
              </Typography>
              <Typography variant="h6">
                {receiverInfo.country.name} ({countryTime})
              </Typography>
              <Hobbies hobbies={receiverInfo.hobbies} />
            </Box>
            <Box>
              <Button
                variant="contained"
                startIcon={<CreateIcon />}
                onClick={() => setOpen(true)}
              >
                Write
              </Button>
              <WriteLetterModal
                receiverName={receiverInfo?.username}
                receiverId={props.receiverId}
                open={open}
                handleClose={() => setOpen(false)}
              />
              <ProfileModal
                open={showProfileModal}
                handleClose={() => setShowProfileModal(false)}
                userId={props.receiverId}
              />
            </Box>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 10,
            flexWrap: "wrap",
          }}
        >
          {letters.map((letter: Letter) => (
            <LetterCard letter={letter} key={letter.id} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Conversation;

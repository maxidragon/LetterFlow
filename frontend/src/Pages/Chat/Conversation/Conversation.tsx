import CreateIcon from '@mui/icons-material/Create';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import LetterCard from "../../../Components/Card/LetterCard";
import ProfileModal from "../../../Components/ModalComponents/ProfileModal";
import WriteLetterModal from "../../../Components/ModalComponents/WriteLetterModal";
import Hobbies from "../../../Components/Profile/Hobbies";
import { getUserProfile } from "../../../logic/auth";
import { getCountryInfo } from "../../../logic/countries";
import { getLettersFromConversations } from "../../../logic/letters";

const Conversation = (props: { receiverId: number }) => {
    const [receiverInfo, setReceiverInfo] = useState<any>(null);
    const [countryInfo, setCountryInfo] = useState<any>(null);
    const [letters, setLetters] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
    useEffect(() => {
        const getReceiverInfo = async () => {
            const info = await getUserProfile(props.receiverId);
            console.log(info);
            setReceiverInfo(info);
        };

        const getLetters = async () => {
            const lettersList = await getLettersFromConversations(props.receiverId);
            console.log(lettersList);
            setLetters(lettersList);
        };
        getReceiverInfo();
        getLetters();
    }, [props.receiverId]);
    useEffect(() => {
        const getInfoAboutCountry = async () => {
            if (receiverInfo === null) return;
            const info = await getCountryInfo(receiverInfo.country.name);
            const currentTime = new Date().toLocaleString('en-US', { timeZone: receiverInfo.timezone, hour12: false });
            info.time = currentTime.split(', ')[1].split(':')[0] + ':' + currentTime.split(',')[1].split(':')[1];
            setCountryInfo(info);
        };
        getInfoAboutCountry();
    }, [receiverInfo, receiverInfo?.country.name]);
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                {receiverInfo && countryInfo &&
                    <Box>
                        <Typography variant="h4" sx={{ cursor: 'pointer' }} onClick={() => setShowProfileModal(true)}>{receiverInfo.username}</Typography>
                        <Typography variant="h6">{receiverInfo.country.name} ({countryInfo.time})</Typography>
                        <Hobbies hobbies={receiverInfo.hobbies} />
                    </Box>
                }
                <Box>
                    <Button variant="contained" startIcon={<CreateIcon />} onClick={() => setOpen(true)}>Write</Button>
                    <WriteLetterModal receiverName={receiverInfo?.username} receiverId={props.receiverId} open={open}
                        handleClose={() => setOpen(false)} />
                    <ProfileModal open={showProfileModal} handleClose={() => setShowProfileModal(false)} userId={props.receiverId} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 10, flexWrap: 'wrap' }}>
                    {letters.map((letter: any) => (
                        <LetterCard letter={letter} key={letter.id} />
                    ))}

                </Box>

            </Box>
        </>
    )
};

export default Conversation;
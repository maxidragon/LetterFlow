import Box from "@mui/material/Box";
import {getUserProfile} from "../../../logic/auth";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {getCountryInfo} from "../../../logic/countries";
import CreateIcon from '@mui/icons-material/Create';
import LetterCard from "../../../Components/LetterCard";
import {getLettersFromConversations} from "../../../logic/letters";
import WriteLetterModal from "../../../Components/WriteLetterModal";

const Conversation = (props: { receiverId: number }) => {
    const [receiverInfo, setReceiverInfo] = useState<any>(null);
    const [countryInfo, setCountryInfo] = useState<any>(null);
    const [letters, setLetters] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        const getReceiverInfo = async () => {
            const info = await getUserProfile(props.receiverId);
            console.log(info);
            setReceiverInfo(info);
        };
        const getInfoAboutCountry = async () => {
            const info = await getCountryInfo(receiverInfo.country.name);
            const localDate = new Date();
            let offsetSign = info.timezones[0].includes("+") ? 1 : -1;
            let offsetParts = info.timezones[0].split(/:|UTC/);
            let utcOffset = (parseInt(offsetParts[1]) + parseInt(offsetParts[2]) / 60) * offsetSign;
            let utcHour = localDate.getUTCHours() + utcOffset;
            let utcMinutes = localDate.getUTCMinutes();
            info.time = ("0" + utcHour).slice(-2) + ":" + ("0" + utcMinutes).slice(-2);
            setCountryInfo(info);
        };
        const getLetters = async () => {
            const lettersList = await getLettersFromConversations(props.receiverId);
            console.log(lettersList);
            setLetters(lettersList);
        };
        getReceiverInfo();
        getInfoAboutCountry();
        getLetters();
    }, [props.receiverId, receiverInfo?.country.name]);
    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
                {receiverInfo && countryInfo &&
                    <Box>
                        <Typography variant="h4">{receiverInfo.username}</Typography>
                        <Typography variant="h6">{receiverInfo.country.name} ({countryInfo.time})</Typography>
                        <Box>
                            {receiverInfo.hobbies.map((hobby: string) => (
                                <Chip label={hobby}/>
                            ))}
                        </Box>
                    </Box>
                }
                <Box>
                    <Button variant="contained" startIcon={<CreateIcon/>} onClick={() => setOpen(true)}>Write</Button>
                    <WriteLetterModal receiverName={receiverInfo?.username} receiverId={props.receiverId} open={open}
                                      handleClose={() => setOpen(false)}/>

                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', mt: 10, flexWrap: 'wrap'}}>
                    {letters.map((letter: any) => (
                        <LetterCard letter={letter} key={letter.id}/>
                    ))}

                </Box>

            </Box>
        </>
    )
};

export default Conversation;
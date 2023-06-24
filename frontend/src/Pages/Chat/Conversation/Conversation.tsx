import Box from "@mui/material/Box";
import {getUserProfile} from "../../../logic/auth";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {getCountryInfo} from "../../../logic/countries";

const Conversation = (props: { receiverId: number }) => {
    const [receiverInfo, setReceiverInfo] = useState<any>(null);
    const [countryInfo, setCountryInfo] = useState<any>(null);
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
            getInfoAboutCountry();
            getReceiverInfo();
        }, [props.receiverId, receiverInfo.country.name]
    )
    ;
    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%'}}>
                {receiverInfo &&
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
            </Box>
        </>
    )
};

export default Conversation;
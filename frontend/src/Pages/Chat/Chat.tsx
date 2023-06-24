import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import ConversationsList from "../../Components/ConversationsList";

const Chat = (props: { noConversation: boolean }) => {
    const {receiverId} = useParams<{ receiverId: string }>();
    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%'}}>
                <Box sx={{width: '20%', height: '100vh'}}>
                    <ConversationsList/>
                </Box>
                <Box sx={{flex: 1}}>
                    {
                        props.noConversation ? "Select conversation" : "Conversation"
                    }
                </Box>
            </Box>


        </>
    )
};

export default Chat;
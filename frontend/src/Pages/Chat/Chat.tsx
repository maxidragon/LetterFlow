import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import ConversationsList from "../../Components/ConversationsList";
import Conversation from "./Conversation/Conversation";

const Chat = (props: { noConversation: boolean, children?: any }) => {
    const {receiverId} = useParams<{ receiverId: string }>();
    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%'}}>
                <Box sx={{width: '20%', height: '100vh'}}>
                    <ConversationsList/>
                </Box>
                <Box sx={{flex: 1, ml: 1}}>
                    {
                        props.noConversation ? (props.children ? (<>
                                {props.children}
                            </>
                        ) : 'Select conversation') : <Conversation receiverId={parseInt(receiverId as string)}/>
                    }

                </Box>
            </Box>


        </>
    )
};

export default Chat;
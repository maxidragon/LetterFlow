import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getMyConversations} from "../logic/letters";
import {List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {getUserInfo} from "../logic/auth";
import CountryNameWithFlag from "./CountryNameWithFlag";
import { Converstation } from "../logic/interfaces";

const ConversationsList = () => {
    const navigate = useNavigate();
    const user = getUserInfo();
    const [conversations, setConversations] = useState<Converstation[]>([]);
    useEffect(() => {
        const getConversations = async () => {
            const conversations = await getMyConversations();
            setConversations(conversations);
        };
        getConversations();
    }, []);
    return (
        <>
            <List>
                {conversations.map((conversation: Converstation) => (
                    <ListItemButton onClick={() => navigate(`/chat/${conversation.to.id === user.id ? conversation.from.id : conversation.to.id}`)}>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture"/>
                        </ListItemAvatar>
                        <ListItemText primary={conversation.to.id === user.id ? conversation.from.username : conversation.to.username} secondary={<CountryNameWithFlag country={conversation.to.id === user.id ? conversation.from.country : conversation.to.country} />}/>
                    </ListItemButton>
                ))}
            </List>
        </>
    );
};

export default ConversationsList;
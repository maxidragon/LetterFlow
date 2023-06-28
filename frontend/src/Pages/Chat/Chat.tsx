import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import ConversationsList from "../../Components/ConversationsList";
import Conversation from "./Conversation/Conversation";
import EmailIcon from "@mui/icons-material/Email";
import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import { useState } from "react";
import StarredUsersList from "../../Components/StarredUsersList";
const Chat = (props: { noConversation: boolean; children?: any }) => {
  const { receiverId } = useParams<{ receiverId: string }>();
  const [showConversation, setShowConversation] = useState<boolean>(true);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ width: "20%", height: "100vh" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton onClick={() => setShowConversation(true)}>
              <EmailIcon />
            </IconButton>
            <IconButton onClick={() => setShowConversation(false)}>
              <StarIcon />
            </IconButton>
          </Box>
          {showConversation ? <ConversationsList /> : <StarredUsersList />}
        </Box>
        <Box sx={{ flex: 1, ml: 1 }}>
          {props.noConversation ? (
            props.children ? (
              <>{props.children}</>
            ) : (
              "Select conversation"
            )
          ) : (
            <Conversation receiverId={parseInt(receiverId as string)} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Chat;

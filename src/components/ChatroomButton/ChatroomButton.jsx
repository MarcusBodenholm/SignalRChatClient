import { Box, Typography } from "@mui/material";
import "./ChatroomButton.css";
import useChatContext from "../../contexts/useChatContext";



const ChatroomButton = ({chatname}) => {

    const {activeChat, setActiveChat} = useChatContext();

    const handleClick = () => {
        setActiveChat(chatname);
    }
    return (
        <Box className={activeChat === chatname ? "activechat chatbutton" : "chatbutton"} sx={{width: "100%", paddingLeft: "15px", textAlign: "left"}} onClick={() => handleClick()}>
            <Typography># {chatname}</Typography>
        </Box>
    )
}


export default ChatroomButton;
import { Stack, Typography } from "@mui/material";
import "./ChatMessage.jsx"
import DateFormatter from "../../helpers/dateFormatter";
import useUserContext from "../../contexts/useUserContest.jsx";


const ChatMessage = ({message}) => {
    const formatTimeStamp = time => {
        const timestamp = new Date(time);
        const dateFormatter = DateFormatter();
        return dateFormatter.FullDate(timestamp);
    }
    const {user} = useUserContext();
    const color = user.username === message.user ? "black" : "red";

    return (
        <Stack direction="row">
            <Typography variant="standard" sx={{marginRight: "10px", fontStyle:"italic"}}>{formatTimeStamp(message.timeStamp)}</Typography>
            <Typography variant="standard" sx={{marginRight: "5px", fontWeight:"bold", color: color}}>{message.username}:</Typography>
            <Typography variant="standard" >{message.message}</Typography>
        </Stack>
    )
}


export default ChatMessage;
import { Stack, Typography } from "@mui/material";
import "./ChatroomButton.css";
import useChatContext from "../../contexts/useChatContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ChatroomButton = ({chatname, owner, user, connection}) => {

    const {activeChat, setActiveChat} = useChatContext();

    const handleClick = () => {
        setActiveChat(chatname);
    }
    const handleDeleteRoom = () => {
        console.log("trying to delete " +  chatname)
        connection.send("DeleteGroup", chatname)
    }
    return (
        <Stack direction="row" className={activeChat === chatname ? "activechat chatbutton" : "chatbutton"} sx={{width: "100%", paddingLeft: "15px", textAlign: "left"}} >
            <Typography sx={{width:"100%"}} onClick={() => handleClick()}># {chatname}</Typography>
            <Stack sx={{paddingRight: "5px", justifyContent:"center", marginLeft:"10px"}} onClick={() => handleDeleteRoom()}>
                { user === owner ? <FontAwesomeIcon className="deleteroomicon"  icon={faTrash}/>: <></>}

            </Stack>
        </Stack>
    )
}


export default ChatroomButton;
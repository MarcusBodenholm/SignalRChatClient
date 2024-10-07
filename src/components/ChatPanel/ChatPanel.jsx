/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import "./ChatPanel.css";
import useChatContext from "../../contexts/useChatContext";
import { useEffect, useState } from "react";
import ChatMessageList from "../ChatMessageList/ChatMessageList";
import GroupUsersPanel from "../GroupUsersPanel/GroupUsersPanel";

const ChatPanel = () => {

    const {activeChat, connection, initializeConnection, chatMessages, setChatMessages} = useChatContext();
    const [message, setMessage] = useState("");
    useEffect(() => {
        initializeConnection();
    }, [])
    useEffect(() => {
        const changeChatRoom = async() => {
            if (connection !== null && connection.state === "Connected") {
                setChatMessages([]);
                console.log(activeChat)
                await connection.invoke('SwitchGroup', activeChat)
            }

        }
        changeChatRoom();
    }, [activeChat, connection])

    const handleMessageChange = (event) => {
        const messageValue = event.target.value;
        setMessage(messageValue);
    }
    const handleMessageSend = () => {
        try {
            const messageToSend = message.replace("script", "")
            connection.send("SendGroupMessage", messageToSend, activeChat);
            setMessage("");
        }
        catch(error) {
            console.error(error.toString());
        }
    }
    return (
        <Stack className="chatpanelstack" sx={{display: "grid"}}>
            <Typography sx={{marginTop:"5px", marginBottom: "5px"}} variant="h3">{activeChat}</Typography>
            <Divider sx={{marginBottom:"5px"}}/>
            <ChatMessageList cssClass="chatview" chatMessages={chatMessages}/>
            <Divider sx={{marginBottom:"10px", marginTop:"0px"}}/>
            <Stack className="chatuserpanel" direction="row">

                <TextField sx={{width: "90%"}} id="chatmessagefield" label="What's on your mind?" value={message} onChange={(event) => handleMessageChange(event)}></TextField>
                <Button  disabled={message.length == 0} variant="contained"  onClick={() => handleMessageSend()}>Send</Button>
            </Stack>
            <GroupUsersPanel/>
        </Stack>
    )
}

export default ChatPanel;
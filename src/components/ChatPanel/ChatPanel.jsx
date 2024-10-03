/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import "./ChatPanel.css";
import useChatContext from "../../contexts/useChatContext";
import { useEffect, useState } from "react";
import useUserContext from "../../contexts/useUserContest";
import { HubConnectionBuilder } from "@microsoft/signalr/src";
import ChatMessageList from "../ChatMessageList/ChatMessageList";

const ChatPanel = () => {

    const {activeChat, connection, initializeConnection, chatMessages, setChatMessages} = useChatContext();
    const {user} = useUserContext();
    const [message, setMessage] = useState("");
    const [toggleAddUser, setToggleAddUser] = useState(false);
    const [addUser, setAddUser] = useState("");
    useEffect(() => {
        initializeConnection();
    }, [])
    useEffect(() => {
        const changeChatRoom = async() => {
            if (connection !== null && connection.state === "Connected") {
                setChatMessages([]);
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
            connection.send("SendGroupMessage", message, activeChat);
            setMessage("");
        }
        catch(error) {
            console.error(error.toString());
        }
    }
    const handleAddUser = async() => {
        const userToAdd = addUser;
        setAddUser("");
        setToggleAddUser(!toggleAddUser)
        connection.invoke("AddUserToGroup", activeChat, userToAdd)
            .then(() => {
                console.log("user added")
            })
            .catch(err => console.error(err.toString()))
    }
    return (
        <Stack className="chatpanelstack" sx={{display: "grid"}}>
            <Typography sx={{marginTop:"5px", marginBottom: "5px"}} variant="h3">{activeChat}</Typography>
            <Divider sx={{marginBottom:"5px"}}/>
            <ChatMessageList chatMessages={chatMessages}/>
            <Divider sx={{marginBottom:"10px", marginTop:"0px"}}/>
            <Stack className="chatuserpanel" direction="row">

                <TextField id="chatmessagefield" label="What's on your mind?" value={message} onChange={(event) => handleMessageChange(event)}></TextField>
                <Button  disabled={message.length == 0} variant="contained"  onClick={() => handleMessageSend()}>Send</Button>
                {activeChat !== "Lobby" ? <Button variant="outlined" onClick={() => setToggleAddUser(!toggleAddUser)}>Add user</Button> : <></>}
                {toggleAddUser ? 
                    <Stack direction="row">
                        <TextField id="adduserfield" label="Username to add" value={addUser} onChange={(event) => setAddUser(event.target.value)}></TextField>
                        <Button disabled={addUser.length === 0} variant="outlined" onClick={() => handleAddUser()}>Add</Button>
                    </Stack> 
                    
                    : <></>}
            </Stack>
        </Stack>
    )
}

export default ChatPanel;
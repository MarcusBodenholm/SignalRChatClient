import { Button, Stack, TextField, Typography } from "@mui/material";
import "./ChatPanel.css";
import useChatContext from "../../contexts/useChatContext";
import { useEffect, useState } from "react";
import useUserContext from "../../contexts/useUserContest";
import { HubConnectionBuilder } from "@microsoft/signalr/src";

const ChatPanel = () => {

    const {activeChat, connection, setConnection} = useChatContext();
    const {user} = useUserContext();
    const [chatMessages, setChatMessages] = useState([])
    const [message, setMessage] = useState("");
    const [toggleAddUser, setToggleAddUser] = useState(false);
    const [addUser, setAddUser] = useState("");
    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken')
        
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7174/chathub", {accessTokenFactory: () => token})
            .build();
        connection.start().then(() => {
            console.log("connected to the hub");
        }).catch((error) => console.error(error))
        setChatMessages([])
        connection.on('ReceiveGroupMessage',(user, message) => {
            setChatMessages(prev => [...prev, {user, message}])
            console.log(user, message)
        })
        connection.on('ReceiveError', (user, message) => {
            setChatMessages(prev => [...prev, {user, message}])
        })
    
        setConnection(connection);
        return () => {
            connection.stop().then(() => console.log("Connection stopped"));
        }
    }, [])
    useEffect(() => {
        const changeChatRoom = async() => {
            if (connection !== undefined && connection.state === "Connected") {
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
        <Stack className="chatpanelstack">
            <Typography>{activeChat}</Typography>
            <Stack direction="column">
                {chatMessages.map((message, idx) => {
                    return <Typography key={idx + message.user}>{`${message.user}: ${message.message}`}</Typography>
                })}
            </Stack>
            <Stack direction="row">
                <TextField id="chatmessagefield" label="What's on your mind?" value={message} onChange={(event) => handleMessageChange(event)}></TextField>
                <Button color="black" disabled={message.length == 0} variant="outlined" onClick={() => handleMessageSend()}>Send</Button>
                {activeChat !== "Lobby" ? <Button color="black" variant="outlined" onClick={() => setToggleAddUser(!toggleAddUser)}>Add user</Button> : <></>}
                {toggleAddUser ? 
                    <Stack direction="row">
                        <TextField id="adduserfield" label="Username to add" value={addUser} onChange={(event) => setAddUser(event.target.value)}></TextField>
                        <Button color="black" disabled={addUser.length === 0} variant="outlined" onClick={() => handleAddUser()}>Add</Button>
                    </Stack> 
                    
                    : <></>}
            </Stack>
        </Stack>
    )
}

export default ChatPanel;
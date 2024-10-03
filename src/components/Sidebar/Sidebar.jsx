import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useUserContext from "../../contexts/useUserContest";
import ChatroomButton from "../ChatroomButton/ChatroomButton";
import useChatContext from "../../contexts/useChatContext";


const Sidebar = () => {
    const {user} = useUserContext();
    const {connection, chats, setChats} = useChatContext();
    const [createChat, setCreateChat] = useState(false);
    const [newChatName, setNewChatName] = useState("")
    useEffect(() => {
        const fetchRooms = async() => {
            try {
                const response = await fetch(`https://localhost:7174/chatrooms/${user.username}`, {
                    method: 'GET',
                })
                if (response.ok) {
                    const data = await response.json();
                    setChats(data);
                }
    
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchRooms();
    }, [])
    const toggleChatCreation = () => {
        setCreateChat(!createChat);
    }
    const updateNewChatName = (event) => {
        setNewChatName(event.target.value)
    }
    const handleChatCreation = async() => {
        const chatname = newChatName;
        setNewChatName("");
        toggleChatCreation();
        connection.invoke("StartGroup", chatname)
            .then(() => {
                setChats(prev => [...prev, chatname])
            })
            .catch(err => console.error(err.toString()))

    }
    return (
        <Box sx={{width: "270px", height: "85vh", backgroundColor: "rgb(21, 124, 206)", color: "white"}}>
            <Stack direction="row" sx={{justifyContent: "space-between", padding:"15px", paddingTop:"5px", paddingBottom:"2px", borderBottom:"2px solid white"}}>
                <Typography variant="h5">
                    Chatrooms
                </Typography>
                <Box onClick={() => toggleChatCreation()}>+</Box>
            </Stack>
            <Stack direction="column" spacing={1} sx={{marginTop:"10px"}}>
                {chats.map((item, idx) => {
                    return <ChatroomButton chatname={item} key={idx}/>
                })}
            </Stack>
            {
                createChat ? <>
                    <Stack direction="column" sx={{margin: "5px", padding:"5px", backgroundColor: "#f5f5f5", borderRadius:"5px"}}>
                        <Typography sx={{color: "rgb(21, 124, 206)"}}>Name chat</Typography>
                        <Stack direction="row">
                            <TextField value={newChatName} variant="standard" autoFocus={true} onChange={(event) => updateNewChatName(event)}></TextField>
                            <Button color="white" sx={{backgroundColor: "rgb(21, 124, 206)", marginLeft: "5px"}} variant="contained" onClick={() => handleChatCreation()}>Create</Button>
                        </Stack>
                    </Stack>
                </> 
                : 
                <></>
            }
        </Box>
    )
}


export default Sidebar;
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useUserContext from "../../contexts/useUserContest";
import ChatroomButton from "../ChatroomButton/ChatroomButton";
import useChatContext from "../../contexts/useChatContext";
import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";

const Sidebar = () => {
    const {user} = useUserContext();
    const {connection, chats, setChats} = useChatContext();
    const [createChat, setCreateChat] = useState(false);
    const [newChatName, setNewChatName] = useState("")
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
                console.log(chats)
                setChats(prev => [...prev, {name: chatname, owner: user.username}])
            })
            .catch(err => console.error(err.toString()))

    }
    const handleLogOutClick = ()=> {
        window.location.href = "/login";
    }
    return (
        <Stack sx={{justifyContent:"space-between",width: "270px", height: "90vh", backgroundColor: "rgb(21, 124, 206)", color: "white"}}>
            <Stack>
                <Stack direction="row" sx={{justifyContent: "space-between", padding:"15px", paddingTop:"5px", paddingBottom:"2px", borderBottom:"2px solid white"}}>
                    <Typography variant="h5">
                        Chatrooms
                    </Typography>
                    <FontAwesomeIcon className="addgroupbutton" onClick={() => toggleChatCreation()} icon={faPlus} />
                </Stack>
                <Stack direction="column" spacing={1} sx={{marginTop:"10px"}}>
                    {chats.map((item, idx) => {
                        return <ChatroomButton chatname={item.name} owner={item.owner} user={user.username} connection={connection} key={idx}/>
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

            </Stack>
            <Stack direction="row" sx={{padding:"15px", width:"100%", justifyContent:"space-between"}}>
                <Typography variant="h6">{user.username}</Typography>
                <Stack sx={{cursor:"pointer"}} direction="row" onClick={() => handleLogOutClick()}>
                    <Typography sx={{alignSelf:"center"}} textAlign="center">Log out</Typography>
                    <FontAwesomeIcon className="logouticon" icon={faRightFromBracket}/>

                </Stack>
            </Stack>
        </Stack>
    )
}


export default Sidebar;
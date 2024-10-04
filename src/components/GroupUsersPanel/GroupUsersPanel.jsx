import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import useChatContext from "../../contexts/useChatContext";
import "./GroupUsersPanel.css";
import { useState } from "react";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserContext from "../../contexts/useUserContest";


const GroupUsersPanel = () => {
    
    const {members, activeChat, connection} = useChatContext();
    const [toggleAddUser, setToggleAddUser] = useState(false);
    const [addUser, setAddUser] = useState("");
    const {user} = useUserContext();
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
    const handleOpenDmClick = (username) => {
        console.log(username)
        connection.invoke("StartPrivateChat", username )
    }
    return (
        <Stack className="groupuserpanelcontainer">
            <Stack direction="row" sx={{height: "100%", width:"100%"}}>
                <Divider orientation="vertical" flexItem></Divider>
                <Stack direction="column" sx={{height: "100%", width:"100%", justifyContent:"space-between"}}>
                    <Stack direction="column" sx={{height: "100%", width:"100%", paddingLeft:"10px"}} spacing={1}>
                        <Typography variant="h5" fontWeight="bold">Users</Typography>
                        {/* <Typography textAlign="left">Online {onlineUsers.length}</Typography> */}
                        {members.map((item, idx) => {
                            const isPresent = item.present
                            const notPresent = item.present === false && item.online
                            let typography
                            if (isPresent) {
                                typography = <Typography sx={{color: "green"}} textAlign="left" key={idx}>{item.username} (online)</Typography>
                            } else if (notPresent) {
                                typography = <Typography sx={{color: "orange"}} textAlign="left" fontStyle="italic" key={idx}>{item.username} (elsewhere)</Typography>
                            } else {
                                typography = <Typography textAlign="left" key={idx}>{item.username}</Typography>
                            }  
                            return (
                                <Stack key={idx} direction="row" sx={{justifyContent: "space-between", paddingRight: "5px", alignItems: "center"}}>
                                    {typography}
                                    {item.username !== user.username ? <FontAwesomeIcon data-username={item.username} onClick={() => handleOpenDmClick(item.username)} className="opendmbutton" icon={faRocketchat}/> : <></>}
                                </Stack>
                            )
                        })}
                    </Stack>
                    {activeChat !== "Lobby" ? <Button variant="outlined" onClick={() => setToggleAddUser(!toggleAddUser)}>Add user</Button> : <></>}
                    {toggleAddUser ? 
                        <Stack direction="row">
                            <TextField id="adduserfield" label="Username to add" value={addUser} onChange={(event) => setAddUser(event.target.value)}></TextField>
                            <Button disabled={addUser.length === 0} variant="outlined" onClick={() => handleAddUser()}>Add</Button>
                        </Stack> 
                    
                    : <></>}

                </Stack>
            </Stack>
        </Stack>
    )
}

export default GroupUsersPanel
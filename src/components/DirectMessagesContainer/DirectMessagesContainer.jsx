import { Button, Dialog, DialogContent, DialogTitle, Divider, Paper, Stack, TextField } from "@mui/material";
import useChatContext from "../../contexts/useChatContext";
import "./DirectMessagesContainer.css";
import useUserContext from "../../contexts/useUserContest";
import ChatMessageList from "../ChatMessageList/ChatMessageList";
import Draggable from 'react-draggable';
import { useRef, useState } from "react";

function PaperComponent(props) {
    const nodeRef = useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef}
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper ref={nodeRef}  {...props} />
      </Draggable>
    );
  }
  

const DirectMessagesContainer = () => {
    const {dmOpen, setDmOpen, dmDetails, connection} = useChatContext();
    const {user} = useUserContext();
    const [message, setMessage] = useState("");

    const dmTitle = () => {
        const dmWith = dmDetails.participant1 === user.username ? dmDetails.participant2 : dmDetails.participant1;
        return dmWith;
    }
    const handleClose = () => {
        setDmOpen(false);
    }
    const handleMessageChange = (event) => {
        const messageValue = event.target.value;
        setMessage(messageValue);
    }
    const handleMessageSend = () => {
        console.log("send dm " + message)
        console.log(dmDetails)
        connection.send("SendPrivateMessage", dmDetails.id, message)
        setMessage("");
    }

    return (
        <Dialog maxWidth="false" open={dmOpen} onClose={handleClose} PaperComponent={PaperComponent}>
            <DialogTitle style={{cursor: "move"}} id="draggable-dialog-title">
                Private chat with {dmTitle()}
            </DialogTitle>
            <DialogContent sx={{width:"80%"}}>
                <Divider sx={{marginBottom:"5px"}}/>
                <ChatMessageList cssClass="dmchatview" chatMessages={dmDetails.messages}/> 
                <Divider sx={{marginBottom:"10px", marginTop:"0px"}}/>
                <Stack direction="row">
                    <TextField sx={{width: "90%"}} id="chatmessagefield" label="What's on your mind?" value={message} onChange={(event) => handleMessageChange(event)}></TextField>
                    <Button disabled={message.length == 0} variant="contained"  onClick={() => handleMessageSend()}>Send</Button>
                </Stack>

            </DialogContent>
        </Dialog>
    )
}


export default DirectMessagesContainer;
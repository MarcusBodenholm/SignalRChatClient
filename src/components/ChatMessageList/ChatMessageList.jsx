import { Stack } from "@mui/material";
import "./ChatMessageList.css";
import { useEffect, useRef } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";


const ChatMessageList = ({chatMessages, cssClass}) => {
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
        
    })
    return (
        <Stack className={cssClass} direction="column" ref={messagesEndRef}>
            {chatMessages.map((message, idx) => {
                return <ChatMessage key={idx + message.username} message={message}/>
            })}
            <div ref={messagesEndRef}></div>
        </Stack>

    )
}

export default ChatMessageList
import { createContext, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr/src";

export const ChatContext = createContext(null);

export default function ChatContextProvider({children}){
    const [activeChat, setActiveChat] = useState("Lobby");
    const [connection, setConnection] = useState(null);
    const [chatMessages, setChatMessages] = useState([])
    const [chats, setChats] = useState([]);
    const initializeConnection = () => {
        const token = sessionStorage.getItem('jwtToken')
        const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7174/chathub", {accessTokenFactory: () => token})
        .build();
        connection.start().then(() => {
            console.log("connected to the hub");
        }).catch((error) => console.error(error))
        setChatMessages([])
        connection.on('ReceiveGroupMessage',(message) => {
            setChatMessages(prev => [...prev, {user:message.username, message:message.message, timeStamp:message.timeStamp}])
        })
        connection.on('ReceiveError', (user, message) => {
            setChatMessages(prev => [...prev, {user, message}])
        })
        connection.on("ReceiveGroup", (room) => {
            console.log(chats);
            setChats(prev => [...prev, room])
            console.log(chats);

        })
        connection.on("GroupGone", (groupDeleted) => {
            setChats(prev => [...prev.filter(c => c.name !== groupDeleted)])
            setActiveChat(() => "Lobby");

        })

        setConnection(connection);
        return () => {
            connection.stop().then(() => console.log("Connection stopped"));
        }
        
    }
    const stopConnection = () => {
        connection.stop().then(() => console.log("Connection stopped"));
    }
    return <ChatContext.Provider value={{activeChat, setActiveChat, connection, chatMessages, setChatMessages, chats, setChats, initializeConnection, stopConnection}}>
        {children}
    </ChatContext.Provider>

}
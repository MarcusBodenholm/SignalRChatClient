import { createContext, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr/src";

export const ChatContext = createContext(null);

export default function ChatContextProvider({children}){
    const [activeChat, setActiveChat] = useState("Lobby");
    const [connection, setConnection] = useState(null);
    const [chatMessages, setChatMessages] = useState([])
    const [chats, setChats] = useState([]);
    const [members, setMembers] = useState([]); // {name: "name", online: true}
    const [dmOpen, setDmOpen] = useState(false);
    const [dmDetails, setDmDetails] = useState([]);

    const initializeConnection = () => {
        const token = sessionStorage.getItem('jwtToken')
        const connection = new HubConnectionBuilder()
        .withUrl("https://signalrchat-prog23.azurewebsites.net/chathub", {accessTokenFactory: () => token})
        .build();
        connection.start().then(() => {
            console.log("connected to the hub");
        }).catch((error) => console.error(error))
        setChatMessages([])
        connection.on('ReceiveGroupMessage',(message) => {
            setChatMessages(prev => [...prev, {username:message.username, message:message.message, timeStamp:message.timeStamp}])
        })
        connection.on('ReceiveError', (user, message) => {
            setChatMessages(prev => [...prev, {user, message}])
        })
        connection.on("ReceiveGroup", (room) => {
            setChats(prev => [...prev, room])

        })
        connection.on("GroupGone", (groupDeleted) => {
            setChats(prev => [...prev.filter(c => c.name !== groupDeleted)])
            setActiveChat(() => "Lobby");

        })
        connection.on("SwitchGroupInfo", (groupInfo) => {
            setMembers(groupInfo.groupUsers);
            setChatMessages(groupInfo.messages);
        })
        //Payload structure {messages: [{}], }
        connection.on("InitialPayload", (payload) => {
            setChats(payload.groups);
            setMembers(payload.groupUsers)
            setChatMessages(payload.messages)
        })
        connection.on("UpdateListOfUsers", (groupUsers) => {
            setMembers(groupUsers);
        })
        connection.on("OpenPrivateChat", (payload) => {
            setDmDetails(payload);
            setDmOpen(true);
        })
        connection.on("ReceivePrivateMessage", (message) => {
            setDmDetails((prev) => ({...prev, messages: [...prev.messages, message]}));

        })
        setConnection(connection);
        return () => {
            connection.stop();
        }
        
    }
    return <ChatContext.Provider value={{activeChat, 
                        setActiveChat, connection, chatMessages, 
                        setChatMessages, chats, setChats, 
                        initializeConnection, 
                        members, setMembers, dmOpen, setDmOpen,
                        dmDetails, setDmDetails}}>
        {children}
    </ChatContext.Provider>

}
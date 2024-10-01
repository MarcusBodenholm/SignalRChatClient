import { createContext, useState } from "react";

export const ChatContext = createContext(null);

export default function ChatContextProvider({children}){
    const [activeChat, setActiveChat] = useState("Lobby");
    const [connection, setConnection] = useState();
    return <ChatContext.Provider value={{activeChat, setActiveChat, connection, setConnection}}>
        {children}
    </ChatContext.Provider>

}
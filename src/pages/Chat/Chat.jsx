import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { Stack } from "@mui/material";
import ChatPanel from "../../components/ChatPanel/ChatPanel";
import DirectMessagesContainer from "../../components/DirectMessagesContainer/DirectMessagesContainer";

const Chat = () => {



    return (
        <>
            <Header/>
            <Stack direction="row">
                <Sidebar/>
                <ChatPanel/>
                <DirectMessagesContainer/>
            </Stack>

        </>
    )
}


export default Chat;
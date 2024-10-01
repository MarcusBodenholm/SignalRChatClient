import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { Stack } from "@mui/material";
import ChatPanel from "../../components/ChatPanel/ChatPanel";

const Chat = () => {



    return (
        <>
            <Header/>
            <Stack direction="row">
                <Sidebar/>
                <ChatPanel/>

            </Stack>

        </>
    )
}


export default Chat;
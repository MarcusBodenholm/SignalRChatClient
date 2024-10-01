import Chat from "./Chat/Chat";
import Login from "./Login/Login"
import Register from "./Register/Register";


const pagesData = [
    {
        path: "login",
        element: <Login/>,
        title: "Login"
    },
    {
        path: "register",
        element: <Register/>,
        title: "Register"
    },
    {
        path: "chat",
        element: <Chat/>,
        title: "Chat"
    }
]

export default pagesData;
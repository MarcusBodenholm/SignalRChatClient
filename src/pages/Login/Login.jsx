import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useState } from "react";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const handleUsernameChange = (event) => {
        const usernameValue = event.target.value;
        setUsername(usernameValue);
    }
    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue)
    }



    return (
        <>
        <Header/>
        <Box sx={{height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Stack direction="column" spacing={2} sx={{ minWidth: "400px", padding: "2rem", backgroundColor: "white", borderRadius: "5px", textAlign: "left"}}>
                <Typography variant="h2">Login</Typography>
                <Typography variant="text">To use the SignalRChat you need to log in.</Typography>
                <TextField value={username} id="register-username" label="Username" variant="standard" onChange={(event) => handleUsernameChange(event)}/>
                <TextField value={password} id="register-password" label="Password" variant="standard" onChange={(event) => handlePasswordChange(event)}/>
                <Button color="black" variant="outlined">Login</Button>
                <NavLink to="/register">Not registered? Register here!</NavLink>
            </Stack>
        </Box>

        </>
    )
}


export default Login;
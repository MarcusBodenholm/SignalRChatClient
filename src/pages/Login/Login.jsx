import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useState } from "react";
import useUserContext from "../../contexts/useUserContest";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const {setUser} = useUserContext();
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        const usernameValue = event.target.value;
        setUsername(usernameValue);
    }
    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setPassword(passwordValue)
    }
    const handleLoginClick = async() => {
        if (username.length === 0 || password.length === 0) return;
        try {
            const response = await fetch("https://localhost:7174/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('jwtToken', data.token);
                setUser({username: username});
                navigate('/chat')

            }
            else {
                setError("Error: " + "The username or password was incorrect.")
            }
        }
        catch (error) {
            console.log(error)

        }

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
                <Button color="black" variant="outlined" onClick={() => handleLoginClick()}>Login</Button>
                {error.length === 0 ? <></> : <Typography variant="text" sx={{color: "red", fontStyle: "italic"}}>{error}</Typography>}
                <NavLink to="/register">Not registered? Register here!</NavLink>
            </Stack>
        </Box>

        </>
    )
}


export default Login;
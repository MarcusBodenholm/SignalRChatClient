import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useState } from "react";


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState({error: false, errorText: "", password: ""})
    const handleUsernameChange = (event) => {
        const usernameValue = event.target.value;
        setUsername(usernameValue);
    }
    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        const passwordCheck = passwordRegex.test(passwordValue);
        if (passwordCheck === false) {
            setPassword({error: true, errorText:"Password criteria: 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number", password: passwordValue})
        }
        else {
            setPassword({error: false, errorText:"", password: passwordValue})
        }
    }
    return (
        <>
        <Header/>
        <Box sx={{height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Stack direction="column" spacing={2} sx={{ width: "550px", padding: "2rem", backgroundColor: "white", borderRadius: "5px", textAlign: "left"}}>
                <Typography variant="h2">Register</Typography>
                <Typography variant="text">To use the SignalRChat you need to be registered.</Typography>
                <TextField value={username} id="register-username" label="Username" variant="standard" onChange={(event) => handleUsernameChange(event)}/>
                <TextField value={password.password} id="register-password" label="Password" variant="standard" onChange={(event) => handlePasswordChange(event)} error={password.error} helperText={password.errorText}/>
                <Button color="black" variant="outlined">Register</Button>
                <NavLink to="/login">Already registered? Login here!</NavLink>
            </Stack>
        </Box>

        </>
    )
}


export default Register;
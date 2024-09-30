import { AppBar, Box, Stack, Typography } from "@mui/material";



const Header = () => {
    


    return (
        <>
            <Box sx={{width:"100%"}}>
                <AppBar position="relative">
                    <Stack sx={{justifyContent: "center", alignItems: "center", height: "100px"}}>
                        <Typography variant="h2">SignalRChat</Typography>
                    </Stack>
                </AppBar>
            </Box>
        </>
    )
}

export default Header;
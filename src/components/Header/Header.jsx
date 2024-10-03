import { Box, Stack, Typography } from "@mui/material";



const Header = () => {
    


    return (
        <>
            <Box sx={{width:"100%", backgroundColor:"white"}}>
                <Stack sx={{justifyContent: "center", alignItems: "center", height: "50px"}}>
                    <Typography variant="standard">SignalRChat - the best way to connect!</Typography>
                </Stack>
            </Box>
        </>
    )
}

export default Header;
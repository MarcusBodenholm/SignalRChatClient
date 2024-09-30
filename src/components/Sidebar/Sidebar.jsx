import { Box } from "@mui/material";


const Sidebar = () => {

    // Fetch all group chats of the user. 
    return (
        <Box sx={{width: "80px"}}>
            <ul>
                <li>Chat 1</li>
                <li>Chat 2</li>
                <li>Chat 3</li>
                <li>Chat 4</li>
                <li>Chat 5</li>
                <li>Chat 6</li>
                <li>Chat 7</li>

            </ul>
        </Box>
    )
}


export default Sidebar;
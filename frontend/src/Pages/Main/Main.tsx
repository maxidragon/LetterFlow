import {isUserLoggedIn} from "../../logic/auth";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Main = () => {
    const navigate = useNavigate();
    const [isLoggedIn] = useState(isUserLoggedIn());
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/chat');
        }
    }, [isLoggedIn, navigate]);
    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column', mt: 5}}>
                <Typography variant="h3">Welcome to LetterFlow</Typography>
                <Typography variant="h5">Make friends around the world</Typography>
            </Box>
        </>
    );
};

export default Main;
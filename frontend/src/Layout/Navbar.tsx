import {AppBar, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import LoginPartial from "./LoginPartial";

const Navbar = (props: any) => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" color="inherit" style={{flexGrow: 1}}  component={Link}
                            to={`/`} sx={{textDecoration: 'none'}}>
                    {props.title ? props.title : "LetterFlow"}
                </Typography>
                <LoginPartial />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
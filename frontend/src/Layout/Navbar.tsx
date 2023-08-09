import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginPartial from "./LoginPartial";
import { getUserInfo } from "../logic/auth";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const user = getUserInfo();
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          style={{ flexGrow: 1 }}
          component={Link}
          to={`/`}
          sx={{ textDecoration: "none" }}
        >
          LetterFlow
          {user && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 2 }}
                component={Link}
                to={`/search`}
              >
                <SearchIcon />
              </IconButton>
            </>
          )}
        </Typography>
        <LoginPartial />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

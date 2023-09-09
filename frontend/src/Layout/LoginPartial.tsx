import { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo, logout } from "../logic/auth";
import SettingsIcon from "@mui/icons-material/Settings";

const LoginPartial = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const user = getUserInfo();
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {user ? (
        <>
          {isMobile ? null : <Typography>Hello {user.username}</Typography>}
          <IconButton
            color="inherit"
            onClick={(event) => {
              event.preventDefault();
              logout();
              navigate("/");
              window.location.reload();
            }}
          >
            <LogoutIcon fontSize="medium" />
          </IconButton>
          <IconButton
            component={Link}
            to={`/settings`}
            rel="noopener noreferrer"
          >
            <SettingsIcon sx={{ color: "#fff" }} fontSize="medium" />
          </IconButton>
        </>
      ) : (
        <IconButton color="inherit" component={Link} to={"/auth/login"}>
          <LoginIcon fontSize="medium" />
        </IconButton>
      )}
    </>
  );
};

export default LoginPartial;

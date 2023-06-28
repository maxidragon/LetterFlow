import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../logic/user";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import HobbyModal from "../../Components/ModalComponents/HobbyModal";
import ChangePasswordModal from "../../Components/ModalComponents/ChangePasswordModal";
import LanguageModal from "../../Components/ModalComponents/LanguageModal";

const Settings = () => {
  const [openHobbyModal, setOpenHobbyModal] = useState<boolean>(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState<boolean>(false);
  const [openLanguageModal, setOpenLanguageModal] = useState<boolean>(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSettings();
      console.log(data);
      setSettings(data);
    };

    fetchData();
  }, []);
  const handleEmailChange = (event: any) => {
    setSettings({
      ...settings,
      email: event.target.value,
    });
  };
  const handleUsernameChange = (event: any) => {
    setSettings({
      ...settings,
      username: event.target.value,
    });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const status = await updateSettings(settings);
    if (status === 200) {
      enqueueSnackbar("Settings has been updated", { variant: "success" });
    } else {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          mt: 5,
          mb: 10,
        }}
      >
        <>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid item>
              <Typography variant="h5">Settings</Typography>
            </Grid>
            {settings ? (
              <>
                <Grid item>
                  <TextField
                    margin="normal"
                    id="email"
                    label="Email Address"
                    name="email"
                    value={settings.email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="normal"
                    id="username"
                    label="Username"
                    name="username"
                    defaultValue={settings.username}
                    onChange={handleUsernameChange}
                    autoComplete="username"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => setOpenHobbyModal(true)}
                  >
                    Change hobbies
                  </Button>
                  <HobbyModal
                    open={openHobbyModal}
                    handleClose={() => setOpenHobbyModal(false)}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => setOpenChangePasswordModal(true)}
                  >
                    Change password
                  </Button>
                  <ChangePasswordModal
                    open={openChangePasswordModal}
                    handleClose={() => setOpenChangePasswordModal(false)}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => setOpenLanguageModal(true)}
                  >
                    Change languages
                  </Button>
                  <LanguageModal 
                    open={openLanguageModal}
                    handleClose={() => setOpenLanguageModal(false)}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleSubmit}>
                    Update
                  </Button>
                </Grid>
              </>
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </>
      </Box>
    </>
  );
};

export default Settings;

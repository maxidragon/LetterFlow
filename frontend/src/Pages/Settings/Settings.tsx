import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { getSettings, updateSettings } from "../../logic/user";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import HobbyModal from "../../Components/ModalComponents/HobbyModal";
import ChangePasswordModal from "../../Components/ModalComponents/ChangePasswordModal";
import LanguageModal from "../../Components/ModalComponents/LanguageModal";
import { verifyCountry } from "../../logic/auth";
import PersonIcon from "@mui/icons-material/Person";
import ProfileModal from "../../Components/ModalComponents/ProfileModal";
import { DatePicker } from "@mui/x-date-pickers";

const Settings = () => {
  const [openHobbyModal, setOpenHobbyModal] = useState<boolean>(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState<boolean>(false);
  const [openLanguageModal, setOpenLanguageModal] = useState<boolean>(false);
  const [settings, setSettings] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSettings();
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

  const handleAppearInSearchChange = (event: any) => {
    setSettings({
      ...settings,
      appearInSearch: event.target.checked,
    });
  };

  const handleBirthDateChange = (newValue: any) => {
    if (newValue instanceof Date) {
      setSettings({
        ...settings,
        birthDate: newValue,
      });
    } else if (newValue !== null) {
      const date = new Date(newValue);
      setSettings({
        ...settings,
        birthDate: date,
      });
    } else {
      setSettings({
        ...settings,
        birthDate: null,
      });
    }
  };

  const handleShowBirthDateChange = (event: any) => {
    setSettings({
      ...settings,
      showBirthDate: event.target.value,
    });
  };
  const handleDescriptionChange = (event: any) => {
    setSettings({
      ...settings,
      description: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await updateSettings(settings);
    if (response.status === 200) {
      enqueueSnackbar("Settings has been updated", { variant: "success" });
    } else if (response.status === 400) {
      response.data.message.forEach((msg: string) => {
        enqueueSnackbar((msg.charAt(0).toUpperCase() + msg.slice(1)), { variant: "error" });
      });
    } else {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  };
  const handleCountryVerify = async (event: any) => {
    event.preventDefault();
    const data = await verifyCountry();
    if (data) {
      enqueueSnackbar(data.msg, { variant: "success" });
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
          <Grid sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Grid item>
              <Typography variant="h5">Settings</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" endIcon={<PersonIcon />} onClick={() => setShowProfileModal(true)}>
                Preview profile
              </Button>
            </Grid>
            {settings ? (
              <>
                <ProfileModal
                  open={showProfileModal}
                  handleClose={() => setShowProfileModal(false)}
                  userId={settings.id}
                />
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
                    fullWidth
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
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <DatePicker
                    label="Birth date"
                    value={dayjs(settings.birthDate)}
                    onChange={handleBirthDateChange}
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth sx={{ textAlign: 'left' }}>
                    <InputLabel id="show-birth-date-label">Show birth date on profile</InputLabel>
                    <Select
                      labelId="show-birth-date-label"
                      value={settings.showBirthDate}
                      onChange={handleShowBirthDateChange}
                    >
                      <MenuItem value="AGE">Show age</MenuItem>
                      <MenuItem value="DATE">Show date</MenuItem>
                      <MenuItem value="NONE">Hide completely</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControlLabel control={<Checkbox onChange={handleAppearInSearchChange} checked={settings.appearInSearch} />} label="Appear in search" />
                </Grid>
                <Grid item>
                  <TextField
                    multiline
                    rows={15}
                    placeholder="Write something about yourself"
                    fullWidth
                    value={settings.description}
                    onChange={handleDescriptionChange}
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
                  <Button variant="contained" onClick={handleCountryVerify}>
                    Verify country
                  </Button>
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

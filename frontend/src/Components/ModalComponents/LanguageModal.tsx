import {
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllLanguages } from "../../logic/selectValues";
import { enqueueSnackbar } from "notistack";
import { style } from "./modalStyles";
import { addLanguage, getMyLanguages } from "../../logic/language";

const LanguageModal = (props: { open: boolean; handleClose: any }) => {
  const [possibleLanguages, setPossibleLanguages] = useState<any[]>([]);
  const [myLanguages, setMyLanguages] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const getMyLanguagesData = async () => {
    const data = await getMyLanguages();
    setMyLanguages(data);
  };
  useEffect(() => {
    const getPossibleLanguages = async () => {
      const data = await getAllLanguages();
      setPossibleLanguages(data);
    };
    getPossibleLanguages();
    getMyLanguagesData();
  }, []);
  const handleLanguageChange = (event: SelectChangeEvent) => {
    setSelectedLanguage(event.target.value);
  };
  const handleLevelChange = (event: SelectChangeEvent) => {
    setSelectedLevel(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const status = await addLanguage(selectedLanguage, selectedLevel);
    if (status === 201) {
      enqueueSnackbar("Language has been added", { variant: "success" });
      await getMyLanguagesData();
    } else {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  };
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          <Typography variant="h6">My languages</Typography>
          {myLanguages.map((row: any) => (
            <>
              <Typography variant="body1">
                {row.Language.name} - {row.level}
              </Typography>
            </>
          ))}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormControl fullWidth sx={{ mr: 2 }}>
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                {possibleLanguages.map((row: any) => (
                  !myLanguages.some((language) => language.Language.id === row.id) && (
                  <MenuItem value={row.id}>{row.name}</MenuItem>
                  )
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="level-label">Level</InputLabel>
              <Select
                labelId="level-label"
                value={selectedLevel}
                onChange={handleLevelChange}
              >
                <MenuItem value="BASIC">Basic</MenuItem>
                <MenuItem value="INTERMEDIATE">Intermediate</MenuItem>
                <MenuItem value="FLUENT">Fluent</MenuItem>
                <MenuItem value="NATIVE">Native</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default LanguageModal;

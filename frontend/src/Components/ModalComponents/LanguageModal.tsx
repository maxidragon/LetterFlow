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
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllLanguages } from "../../logic/selectValues";
import { enqueueSnackbar } from "notistack";
import { style } from "./modalStyles";
import { addLanguage, getMyLanguages, removeLanguage } from "../../logic/language";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from "material-ui-confirm";
import LanguageLevelSelect from "../SelectComponents/LanguageLevelSelect";
import EditLanguageModal from "./EditLanguageModal";
import { Language, UserLanguage } from "../../logic/interfaces";

const LanguageModal = (props: { open: boolean; handleClose: any }) => {
  const confirm = useConfirm();
  const [possibleLanguages, setPossibleLanguages] = useState<Language[]>([]);
  const [myLanguages, setMyLanguages] = useState<UserLanguage[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [editedLanguage, setEditedLanguage] = useState<any>(null);
  const [openEditLanguageModal, setOpenEditLanguageModal] = useState<boolean>(false);
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
    setSelectedLanguage(+event.target.value);
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
  const handleDeleteLanguage = async (id: number) => {
    confirm({ "description": "Are you sure you want to remove this language from your profile?" }).then(async () => {
      const status = await removeLanguage(id);
      if (status === 204) {
        enqueueSnackbar("Language has been removed", { variant: "success" });
        await getMyLanguagesData();
      } else {
        enqueueSnackbar("Server error", { variant: "error" });
      }
    }).catch(() => {
      enqueueSnackbar("Language has not been removed", { variant: "info" });
    });
  };
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          <Typography variant="h6">My languages</Typography>
          <List>
            {myLanguages.map((row: UserLanguage) => (
              <>
                <ListItem
                  secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => {
                        setEditedLanguage(row);
                        setOpenEditLanguageModal(true);
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => {
                        handleDeleteLanguage(row.id);
                      }}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                  key={row.id}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <EditIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={row.name}
                    secondary={row.level}
                  />
                </ListItem>
              </>
            ))}
          </List>
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
                {possibleLanguages.map((row: Language) => (
                  !myLanguages.some((language) => language.id === row.id) && (
                    <MenuItem value={row.id} key={row.id}>{row.name}</MenuItem>
                  )
                ))}
              </Select>
            </FormControl>
            <LanguageLevelSelect selectedLevel={selectedLevel} handleLevelChange={handleLevelChange} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Box>
          {editedLanguage && <EditLanguageModal open={openEditLanguageModal} handleClose={() => setOpenEditLanguageModal(false)} editedLanguage={editedLanguage} getMyLanguages={getMyLanguagesData} />}
        </Box>
      </Modal>
    </>
  );
};

export default LanguageModal;

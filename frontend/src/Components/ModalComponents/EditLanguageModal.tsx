import {
  Modal,
  Box,
  Typography,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { style } from "./modalStyles";
import LanguageLevelSelect from "../SelectComponents/LanguageLevelSelect";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { updateLanguage } from "../../logic/language";
import { UserLanguage } from "../../logic/interfaces";

const EditLanguageModal = (props: {
  open: boolean;
  handleClose: () => void;
  getMyLanguages: () => void;
  editedLanguage: UserLanguage;
}) => {
  const [selectedLevel, setSelectedLevel] = useState<
    "BASIC" | "INTERMEDIATE" | "FLUENT" | "NATIVE" | undefined
  >(undefined);

  useEffect(() => {
    setSelectedLevel(props.editedLanguage.level);
  }, [props.editedLanguage]);

  const handleLevelChange = (
    event: SelectChangeEvent<"BASIC" | "INTERMEDIATE" | "FLUENT" | "NATIVE">,
  ) => {
    setSelectedLevel(
      event.target.value as "BASIC" | "INTERMEDIATE" | "FLUENT" | "NATIVE",
    );
  };

  const handleSubmit = async () => {
    if (!selectedLevel) return;
    const status = await updateLanguage(props.editedLanguage.id, selectedLevel);
    if (status === 200) {
      enqueueSnackbar("Language has been edited", { variant: "success" });
      await props.getMyLanguages();
      props.handleClose();
    } else {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <Typography variant="h6">Edit your language level</Typography>
        <LanguageLevelSelect
          selectedLevel={selectedLevel}
          handleLevelChange={handleLevelChange}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Edit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditLanguageModal;

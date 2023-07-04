import { Modal, Box, Typography, Button } from "@mui/material";
import { style } from "./modalStyles";
import LanguageLevelSelect from "../SelectComponents/LanguageLevelSelect";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { updateLanguage } from "../../logic/language";

const EditLanguageModal = (props: { open: boolean; handleClose: any, getMyLanguages: any, editedLanguage: any }) => {
    const [selectedLevel, setSelectedLevel] = useState<any>(null);

    useEffect(() => {
        setSelectedLevel(props.editedLanguage.level);
    }, [props.editedLanguage]);

    const handleLevelChange = (event: any) => {
        setSelectedLevel(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const status = await updateLanguage(props.editedLanguage.Language.id, selectedLevel);
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
                <LanguageLevelSelect selectedLevel={selectedLevel} handleLevelChange={handleLevelChange} />
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
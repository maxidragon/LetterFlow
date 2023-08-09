import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {useRef} from "react";
import {sendLetter} from "../../logic/letters";
import {enqueueSnackbar} from "notistack";
import {useConfirm} from "material-ui-confirm";
import { style } from "./modalStyles";

const WriteLetterModal = (props: { receiverName: string, receiverId: number, open: boolean, handleClose: any }) => {
    const confirm = useConfirm();
    const contentRef: any = useRef();
    console.log(typeof props.handleClose);
    const handleSend = async () => {
        confirm({description: "You can't edit or delete this letter"})
            .then(async () => {
                const response = await sendLetter(props.receiverId, contentRef.current.value);
                if (response === 201) {
                    enqueueSnackbar("Letter sent", {variant: "success"});
                    props.handleClose();
                } else {
                    enqueueSnackbar("Error. Try again later", {variant: "error"});
                }
            })
            .catch((error) => {
                console.error(error);
                enqueueSnackbar("Something went wrong", {variant: "error"});
            });
    };
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Send a letter to {props.receiverName}
                </Typography>
                <TextField
                    multiline
                    rows={15}
                    placeholder={"Write your letter here..."}
                    fullWidth
                    inputRef={contentRef}
                />
                <Box sx={{display: 'flex', justifyContent: 'end', mt: 2}}>
                    <Button variant="contained" endIcon={<SendIcon/>} onClick={handleSend}>Send</Button>
                </Box>
            </Box>
        </Modal>
    )
};

export default WriteLetterModal;
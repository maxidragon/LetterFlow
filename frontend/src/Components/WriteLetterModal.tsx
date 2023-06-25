import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {useRef} from "react";
import {sendLetter} from "../logic/letters";

const WriteLetterModal = (props: { receiverName: string, receiverId: number, open: boolean, handleClose: any }) => {
    const contentRef: any = useRef();
    const handleSend = async () => {
        const response = await sendLetter(props.receiverId, contentRef.current.value);
        console.log(response);
    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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
import {
  Modal,
  Box,
  Divider,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { style } from "./modalStyles";
import { useRef } from "react";
import { enqueueSnackbar } from "notistack";
import { changePassword } from "../../logic/auth";

const ChangePasswordModal = (props: {
  open: boolean;
  handleClose: () => void;
}) => {
  const oldPasswordRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();
  const newPasswordRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();
  const newPasswordAgainRef: React.MutableRefObject<
    HTMLInputElement | null | undefined
  > = useRef();
  const handleSubmit = async () => {
    if (
      !oldPasswordRef.current ||
      !newPasswordRef.current ||
      !newPasswordAgainRef.current
    )
      return;
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const newPasswordAgain = newPasswordAgainRef.current.value;
    if (newPassword !== newPasswordAgain) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }
    const status = await changePassword(oldPassword, newPassword);
    if (status === 200) {
      enqueueSnackbar("Password has been changed", { variant: "success" });
      props.handleClose();
    } else if (status === 403) {
      enqueueSnackbar("Wrong password", { variant: "error" });
    } else {
      enqueueSnackbar("Server error", { variant: "error" });
    }
  };
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          <Typography variant="h4">Change password</Typography>
          <Divider />
          <TextField
            margin="normal"
            label="Old password"
            autoComplete="password"
            autoFocus
            inputRef={oldPasswordRef}
            type="password"
          />
          <TextField
            margin="normal"
            label="New password"
            autoComplete="new-password"
            autoFocus
            inputRef={newPasswordRef}
            type="password"
          />
          <TextField
            margin="normal"
            label="Repeat password"
            autoComplete="new-password"
            autoFocus
            inputRef={newPasswordAgainRef}
            type="password"
          />
          <Box>
            <Button variant="contained" onClick={handleSubmit}>
              Change password
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;

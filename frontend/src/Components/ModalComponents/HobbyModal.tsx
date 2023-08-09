import {
  Modal,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllHobbies } from "../../logic/selectValues";
import { addHobby, getMyHobbies, removeHobby } from "../../logic/hobby";
import { enqueueSnackbar } from "notistack";
import { style } from "./modalStyles";
import { Hobby } from "../../logic/interfaces";

const HobbyModal = (props: {
  open: boolean;
  handleClose: any;
}) => {

  const [possibleHobbies, setPossibleHobbies] = useState<Hobby[]>([]);
  const [myHobbies, setMyHobbies] = useState<Hobby[]>([]);
  const getMyHobbiesData = async () => {
    const data = await getMyHobbies();
    setMyHobbies(data);
  };
  useEffect(() => {
    const getPossibleHobbies = async () => {
      const data = await getAllHobbies();
      setPossibleHobbies(data);
    };
    if (props.open) {
      getPossibleHobbies();
      getMyHobbiesData();
    }
  }, [props.open]);

  const handleCheckboxChange = async (hobbyId: number, isChecked: boolean) => {
    if (isChecked) {
      const status = await addHobby(hobbyId);
      if (status === 200) {
        getMyHobbiesData();
        enqueueSnackbar("Successfully added this hobby to your profile", { variant: "success" });
      } else {
        enqueueSnackbar("Server error", { variant: "error" });
      }
    } else {
      const status = await removeHobby(hobbyId);
      if (status === 200) {
        getMyHobbiesData();
        enqueueSnackbar("Successfully removed this hobby from your profile", { variant: "success" });
      } else {
        enqueueSnackbar("Server error", { variant: "error" });
      }
    }
  };
  return (
    <>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Hobby</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {possibleHobbies.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Checkbox onChange={(event: any) => handleCheckboxChange(row.id, event.target.checked)} checked={myHobbies.some(obj => obj.id === row.id)} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
};

export default HobbyModal;

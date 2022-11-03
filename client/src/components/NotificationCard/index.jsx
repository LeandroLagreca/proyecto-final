import React from "react";
import { useDispatch } from "react-redux";
import { deleteFromNotifications } from "../../redux/actions/notifications";
import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";

export default function NotificationCard({ text, id }) {
  const dispatch = useDispatch();

  function handleDelete() {
    Swal.fire({
      title: "¿Estas seguro de borrar esta notificacion?",
      icon: "info",
      toast: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFromNotifications(id));
      }
    });
  }
  return (
    <>
      <Box
        width={300}
        display="flex"
        py={3.5}
        px={1}
        position="relative"
        sx={{ wordBreak: "break-all" }}
      >
        <Typography textAlign={"start"}>{text}</Typography>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleDelete}
        >
          <Close />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
}

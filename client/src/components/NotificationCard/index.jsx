import React from "react";
import { useDispatch } from "react-redux";
import { deleteFromNotifications } from "../../redux/actions/notifications";
import { Close } from "@mui/icons-material";
import { IconButton, ListItemText, MenuItem } from "@mui/material";
import Swal from "sweetalert2";


export default function NotificationCard({text, id}) {
  const dispatch = useDispatch()

  function handleDelete() {
    Swal.fire({
      title: '¿Estas seguro de borrar esta notificacion?',
      icon: 'info',
      toast: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFromNotifications(id))
      }
    })
      
  }
  return (
    <MenuItem sx={{width: 350, overflow: 'clip'}}>
      <ListItemText sx={{wordBreak: 'break-word', width: '100%'}} >{text}</ListItemText>
      <IconButton onClick={handleDelete}>
            <Close />
        </IconButton>
    </MenuItem>
  );
}

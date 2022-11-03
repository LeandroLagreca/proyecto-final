import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IconButton, MenuItem, Menu } from "@mui/material";
import { MoreVert, DeleteForever } from "@mui/icons-material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/credenciales";
import Swal from "sweetalert2";

export default function DotMenu({ id }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function requestNewPassword(email) {
    const actionCodeSettings = {
      url: "http://localhost:3000/user/",
      handleCodeInApp: true,
    };
    sendPasswordResetEmail(auth, email, actionCodeSettings);
  }

  function handleDelete() {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este usuario?",
      icon: "info",
      toast: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.put("http://localhost:3001/user/" + id, {
          available: false,
        });
        navigate(0);
      }
    });
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={requestNewPassword}>Cambiar contraseña</MenuItem>
        <MenuItem onClick={handleDelete}>
          Eliminar usuario
          <DeleteForever />
        </MenuItem>
      </Menu>
    </div>
  );
}

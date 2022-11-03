import { useState } from "react";
import { useSelector } from "react-redux";
import { IconButton, Badge, Menu } from "@mui/material";
import { NotificationsActive } from "@mui/icons-material";

import { NotificationCard } from "../";

export default function NotificationsWidget() {
  const { notifications } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  if (status !== "logged" || !notifications.length) return <></>;
  const open = Boolean(anchorEl);
  const handleIconButton = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleIconButton}
      >
        <Badge badgeContent={notifications.length} color="primary">
          <NotificationsActive />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {notifications.map((el, i) => (
          <NotificationCard text={el.text} id={el.id} />
        ))}
      </Menu>
    </>
  );
}

import React from "react";
import { Link } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import { People, Games, ConfirmationNumber } from "@mui/icons-material";

export default function AdminNavBar() {
  return (
    <Drawer
      PaperProps={{ sx: { marginTop: "103px" } }}
      anchor="left"
      open={true}
      variant="permanent"
    >
      <List sx={{ paddingTop: 3 }}>
        <Divider />
        <ListItem>
          <Link to='/admin/users'>
            <ListItemButton>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to='/admin/games'>
            <ListItemButton>
              <ListItemIcon>
                <Games />
              </ListItemIcon>
              <ListItemText primary={"Games"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to='/admin/orders'>
            <ListItemButton>
              <ListItemIcon>
                <ConfirmationNumber />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
}

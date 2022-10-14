import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import { People, Games } from "@mui/icons-material";

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
          <ListItemButton>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary={"Usuarios"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Games />
            </ListItemIcon>
            <ListItemText primary={"Videojuegos"} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
      <List>
        <ListItem></ListItem>
      </List>
    </Drawer>
  );
}

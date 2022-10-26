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
  Link as MuiLink,
} from "@mui/material";

import { People, Games, ConfirmationNumber } from "@mui/icons-material";

export default function AdminNavBar() {
  return (
    <Drawer
      PaperProps={{ sx: { paddingTop: theme => theme.spacing(5), zIndex: 1} }}
      anchor="left"
      open={true}
      variant="permanent"
    >
      <List sx={{ paddingTop: 3 }}>
        <Divider />
        <ListItem>
          <MuiLink color={'secondary'} component={Link} to='/admin/users' underline="none">
            <ListItemButton>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItemButton>
          </MuiLink>
        </ListItem>
        <Divider />
        <ListItem>
          <MuiLink color={'secondary'} component={Link} to='/admin/games' underline="none">
            <ListItemButton>
              <ListItemIcon>
                <Games />
              </ListItemIcon>
              <ListItemText primary={"Games"} />
            </ListItemButton>
          </MuiLink>
        </ListItem>
        <Divider />
        <ListItem>
          <MuiLink color={'secondary'} component={Link} to='/admin/orders' underline="none">
            <ListItemButton>
              <ListItemIcon>
                <ConfirmationNumber />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </MuiLink>
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
}

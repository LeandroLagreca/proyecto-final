import { ConfirmationNumber, Games, People, QuestionMark } from '@mui/icons-material'
import { Divider, ListItem, ListItemButton, Link as MuiLink, ListItemIcon, ListItemText, List } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminMenu() {
  return (
    <List sx={{ paddingTop: 8 }}>
        <Divider />
        <ListItem>
          <MuiLink color={'secondary'} component={Link} to='/admin' underline="none">
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
        <ListItem>
          <MuiLink color={'secondary'} component={Link} to='/admin/questions' underline="none">
            <ListItemButton>
              <ListItemIcon>
                <QuestionMark />
              </ListItemIcon>
              <ListItemText primary={"Preguntas"} />
            </ListItemButton>
          </MuiLink>
        </ListItem>
        <Divider />
      </List>
  )
}

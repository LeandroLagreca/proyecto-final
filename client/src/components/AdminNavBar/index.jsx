import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Drawer, IconButton, Link as MuiLink } from "@mui/material";
import AdminMenu from "./AdminMenu";

export default function AdminNavBar() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Drawer
        PaperProps={{
          sx: { position: "static", display: { xs: "none", md: "flex" } },
        }}
        open={true}
        variant="permanent"
      >
        <AdminMenu />
      </Drawer>
      <>
        <Button
          onClick={handleDrawerToggle}
          sx={{ m: 2, height:'max-content', display: { xs: "block", md:'none' } }}
          variant='contained'
          color='primary'
        >
          Menu
        </Button>
        <Drawer
        PaperProps={{
          sx: { position: "static", display: { xs: "block", md: "none" }, width:240 },
        }}
        open={open}
        onClose={handleDrawerToggle}
        variant="temporary"
      >
        <AdminMenu />
      </Drawer>
      </>
    </>
  );
}

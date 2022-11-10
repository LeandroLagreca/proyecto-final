import * as React from "react";
import { useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "../Navbar/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import PercentIcon from "@mui/icons-material/Percent";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Link as RouterLink } from "react-router-dom";
import { Container, Link } from "@mui/material";
import Switch from "@mui/material/Switch";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import { useContext, useRef } from "react";
import { ColorModeContext } from "../Theme/Theme";
import { Link as scrollLink } from "react-scroll";
import "./Sidebar.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const label = { inputProps: { "aria-label": "Switch demo" } };

const Sidebar = () => {
  const theme = useTheme();
  const { status } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const { mode, toggleMode } = useContext(ColorModeContext);
  // const contact = useRef()

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant='temporary'
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {Boolean(status !== "guest") && (
              <>
                <ListItem>
                  <Link
                    component={RouterLink}
                    to={"/account/purchases"}
                    underline="none"
                    sx={{
                      color: (mode === "dark") ? "white"  : "black" ,
                    }}
                    className="navlink"
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <VideogameAssetIcon />
                      </ListItemIcon>
                      <ListItemText primary={"My collection"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    component={RouterLink}
                    to={"/wishes"}
                    underline="none"
                    sx={
                      mode === "dark" ? { color: "white" } : { color: "black" }
                    }
                    className="navlink"
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <FavoriteIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Wish List"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            )}
            <ListItem>
              <Link
                component={RouterLink}
                to={"/discounts"}
                underline="none"
                sx={mode === "dark" ? { color: "white" } : { color: "black" }}
                className="navlink"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <PercentIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Discounts"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                component={RouterLink}
                to={"/about"}
                underline="none"
                sx={mode === "dark" ? { color: "white" } : { color: "black" }}
                className="navlink"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <QuestionMarkIcon />
                  </ListItemIcon>
                  <ListItemText primary={"About"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                component={"a"}
                underline="none"
                sx={mode === "dark" ? { color: "white" } : { color: "black" }}
                href="#contacto"
                offset={50}
                duration={500}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Contact us"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Switch
                checked={mode === "dark"}
                onChange={toggleMode}
                color={"secondary"}
              />
              <ListItemIcon>
                <Brightness5Icon />
              </ListItemIcon>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
    </>
  );
};

export default Sidebar;

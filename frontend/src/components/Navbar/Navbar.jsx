import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../UserContext";

const Navbar = () => {
  const { selectedUserAvatar } = useUser();
  const location = useLocation();

  const isHomePage = location.pathname.includes("/home");

  const getUserIdFromLocalStorage = () => {
    return localStorage.getItem("selectedUserId");
  };

  return (
    <AppBar
      position="static"
      className="navbar-container"
      sx={{ backgroundColor: "#9B4202" }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <LocalBarIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 1 }}
        >
          Cocktail Application
        </Typography>
        {isHomePage && selectedUserAvatar && (
          <Link
            to={`/user/${getUserIdFromLocalStorage()}`}
            style={{ textDecoration: "none" }}
          >
            <Avatar src={selectedUserAvatar} style={{ cursor: "pointer" }} />
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

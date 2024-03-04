import { Button } from "@mui/material";
import React from "react";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="navbar-wrapper">
      <h1>Events Data Chart</h1>
      <Button
        sx={{
          backgroundColor: "#05F2C7",
          border: "1px solid #05F2C7",
          color: "#172C53",
          "&:hover": {
            backgroundColor: "#172C53",
            border: "1px solid #172C53",
            color: "#05F2C7",
            cursor: "pointer",
          },
        }}
        onClick={() => dispatch(logout())}
        variant="contained"
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;

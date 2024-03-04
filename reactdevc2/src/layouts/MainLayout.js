import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { token } = useSelector((state) => state);

  useEffect(() => {}, []);

  return (
    <div>
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

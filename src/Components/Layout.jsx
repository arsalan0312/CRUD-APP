import React from "react";
import DrawerComponent from "./DrawerComponent";

const Layout = ({ children }) => {
  return <DrawerComponent>{children}</DrawerComponent>;
};

export default Layout;

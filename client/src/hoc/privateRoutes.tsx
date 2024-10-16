import React from "react";
import { getLocalStorage } from "../utils/LocalStorage";
import Vehicles from "../pages/Vehicles";

const privateRoutes = ({ children }) => {
  let isToken = getLocalStorage("token");
  let isSeller = getLocalStorage("user");

  return <div>{isToken && isSeller ? children : <Vehicles />}</div>;
};

export default privateRoutes;

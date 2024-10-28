import React from "react";
import { getLocalStorage } from "../../utils/LocalStorage";
import Vehicles from "../../pages/Vehicles";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  let isToken = getLocalStorage("userToken");
  let user = getLocalStorage("user");

  return <div>{isToken && user?.user?.role === "ADMIN" ? children : <Vehicles />}</div>;
};

export default PrivateRoutes;

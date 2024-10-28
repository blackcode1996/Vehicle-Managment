import React from "react";
import { getLocalStorage } from "../../utils/LocalStorage";
import Registration from "../../pages/Registration";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  let isToken = getLocalStorage("userToken");

  return <div>{isToken  ? children : <Registration />}</div>;
};

export default PrivateRoutes;

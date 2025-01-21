import { Outlet } from "react-router-dom";
import Header from "../header";

const LayoutPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutPage;

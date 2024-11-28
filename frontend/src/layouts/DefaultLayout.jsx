import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const DefaultLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="mt-10 w-full px-52">
        <Outlet />
      </div>
        <Footer/>
    </div>  
  );
};

export default DefaultLayout;

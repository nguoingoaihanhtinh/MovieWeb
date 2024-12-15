import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const DefaultLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header Section */}
      <Header />
      {/* Content Section */}
      <div className="flex mt-10 w-full px-16  ">
        <Outlet />
      </div>
      {/* Footer Section */}
      <div className="footer w-full">
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;

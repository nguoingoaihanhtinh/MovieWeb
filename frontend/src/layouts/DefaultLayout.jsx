import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const DefaultLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header Section */}
      <Header />
      {/* Content Section */}
      <div className="flex mt-16 w-full px-40 bg-gray-800">
        <Outlet />
      </div>
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;

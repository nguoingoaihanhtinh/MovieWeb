import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (movieType) => {
    navigate(`/list?movieType=${movieType}`);
  };
  if (location.pathname === "/list") {
    return null; // Don't render the NavBar if we're on the "/list" page
  }
  return (
    <nav className="hidden space-x-5 text-base text-gray-200 lg:flex capitalize items-center">
      <div
        onClick={() => navigate("/")}
        className="transition-colors hover:text-purple-500 hover:underline duration-300 cursor-pointer"
      >
        Trang chủ
      </div>
      <div
        onClick={() => handleNavigate("phim-le")}
        className="transition-colors hover:text-purple-500 hover:underline duration-300 cursor-pointer"
      >
        Phim lẻ
      </div>
      <div
        onClick={() => handleNavigate("phim-bo")}
        className="transition-colors hover:text-purple-500 hover:underline  duration-300 cursor-pointer"
      >
        Phim bộ
      </div>
      <div
        onClick={() => handleNavigate("tv-shows")}
        className="transition-colors hover:text-purple-500 hover:underline  duration-300 cursor-pointer"
      >
        TV Show
      </div>
      <div
        onClick={() => handleNavigate("hoat-hinh")}
        className="transition-colors hover:text-purple-500 hover:underline  duration-300 cursor-pointer"
      >
        Hoạt hình
      </div>
    </nav>
  );
};

export default NavBar;

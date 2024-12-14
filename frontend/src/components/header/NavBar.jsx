const NavBar = () => {
  return (
    <nav className="hidden space-x-5 text-base text-gray-200 lg:flex capitalize items-center">
      <a href="/" className="transition-colors hover:text-basicLime duration-300">
        Trang chủ
      </a>
      <a href="/list?movieType=phim-le" className="transition-colors hover:text-basicLime duration-300">
        Phim lẻ
      </a>
      <a href="/list?movieType=phim-bo" className="transition-colors hover:text-basicLime duration-300">
        Phim bộ
      </a>
      <a href="/list?movieType=tv-shows" className="transition-colors hover:text-basicLime duration-300">
        TV Show
      </a>
      <a href="/list?movieType=hoat-hinh" className="transition-colors hover:text-basicLime duration-300">
        Hoạt hình
      </a>
    </nav>
  );
};

export default NavBar;

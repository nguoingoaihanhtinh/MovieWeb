import React, { useState, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ setType }) => {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);
  const [isCountriesHovered, setIsCountriesHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://ophim1.com/v1/api/the-loai');
      const data = await response.json();
      setCategories(data.data.items);
    };
    const fetchCountries = async () => {
        const response = await fetch('https://ophim1.com/v1/api/quoc-gia');
        const data = await response.json();
        setCountries(data.data.items);
      };
    fetchCategories();
    fetchCountries();
  }, []);

  const handleCategoriesMouseEnter = () => setIsCategoriesHovered(true);
  const handleCategoriesMouseLeave = () => setIsCategoriesHovered(false);
  const handleCountriesMouseEnter = () => setIsCountriesHovered(true);
  const handleCountriesMouseLeave = () => setIsCountriesHovered(false);

  // Handle category click: set type and navigate to /list
  const handleCategoryClick = (category) => {
    setType(category); // Update the category in the FilmListPage (or use filters here)
    navigate(`/list?movieType=${category.slug}`); // Navigate to /list with selected movieType
  };

  // Handle country click: set type and navigate to /list
  const handleCountryClick = (country) => {
    setType(country); // Update country type (optional, can use filters)
    navigate(`/list?country=${country.slug}`); // Navigate to /list with selected country
  };

  return (
    <nav className="hidden space-x-5 text-base text-gray-200 lg:flex capitalize items-center">
       <a href="/" className="transition-colors hover:text-basicLime duration-300">Trang chủ</a>
      <a href="/list?movieType=phim-le" className="transition-colors hover:text-basicLime duration-300">Phim lẻ</a>
      <a href="/list?movieType=phim-bo" className="transition-colors hover:text-basicLime duration-300">Phim bộ</a>
      <a href="/list?movieType=tv-shows" className="transition-colors hover:text-basicLime duration-300">TV Show</a>
      <a href="/list?movieType=hoat-hinh" className="transition-colors hover:text-basicLime duration-300">Hoạt hình</a>


      {/* Categories Dropdown */}
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={handleCategoriesMouseEnter}
        onMouseLeave={handleCategoriesMouseLeave}
      >
        <button className="transition-colors hover:text-[#5745be] duration-300 flex items-center gap-3">
          Thể loại <FaAngleDown />
        </button>
        {isCategoriesHovered && (
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 bg-slate-500 shadow-lg text-sm rounded-md w-[400px] z-10 grid grid-cols-4 gap-1 p-1 text-center"
          >
            {categories.map((category) => (
              <a
                key={category._id}
                onClick={() => handleCategoryClick(category)} // Update category and navigate
                className="py-1 hover:underline text-center text-white font-normal hover:font-semibold hover:text-cyan-300"
              >
                {category.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Countries Dropdown */}
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={handleCountriesMouseEnter}
        onMouseLeave={handleCountriesMouseLeave}
      >
        <button className="transition-colors hover:text-[#5745be] duration-300 flex items-center gap-3">
          Quốc gia <FaAngleDown />
        </button>
        {isCountriesHovered && (
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 bg-slate-500 shadow-lg text-sm rounded-md w-[400px] z-10 grid grid-cols-4 gap-1 p-1 text-center"
          >
            {countries.map((country) => (
              <a
                key={country._id}
                onClick={() => handleCountryClick(country)} // Update country and navigate
                className="py-1 hover:underline text-center text-white font-normal hover:font-semibold hover:text-cyan-300"
              >
                {country.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

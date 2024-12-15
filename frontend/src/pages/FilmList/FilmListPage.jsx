import { useState, useEffect, Suspense } from "react";
import { useParams, useLocation } from "react-router-dom";
import FilmList from "../../components/Films/FilmList";
import PopolarFilm from "../HomePage/Popular/PopolarFilm";
import Filter from "../../components/Films/Filter";

const categoryMap = {
  "phim-le": "Phim Lẻ",
  "phim-bo": "Phim Bộ",
  "tv-shows": "TV Show",
  "hoat-hinh": "Hoạt Hình",
  "phim-sap-chieu": "Phim sắp chiếu",
  hot: "Phim Hot",
};

const FilmListPage = () => {
  const { name } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const movieType = queryParams.get("movieType");
  const country = queryParams.get("country");

  const [filters, setFilters] = useState({
    movieType: movieType || "",
    genre: "",
    country: country || "",
    year: "",
    sort_field: "",
  });

  const [categoryName, setCategoryName] = useState("Loading...");
  const [movies, setMovies] = useState({}); // Store all preloaded movies
  const [loading, setLoading] = useState(true); // Loading state for preload
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
  }, []);
  useEffect(() => {
    if (filters.movieType) {
      setCategoryName(categoryMap[filters.movieType] || "Unknown Category");
    } else if (name) {
      setCategoryName(categoryMap[name] || "Unknown Category");
    }
  }, [filters.movieType, name]);

  const FilmUrl = `https://ophim1.com/v1/api/danh-sach/${filters.movieType || ""}?category=${filters.genre}&country=${
    filters.country
  }&year=${filters.year}&sort_field=${filters.sort_field}`;

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const preloadMovies = async () => {
    setLoading(true);
    try {
      const newMovies = {};
      const totalPagesToFetch = 5; // Number of pages to preload
      for (let page = 1; page <= totalPagesToFetch; page++) {
        const response = await fetch(`${FilmUrl}&page=${page}`);
        const data = await response.json();
        if (data.data && Array.isArray(data.data.items)) {
          newMovies[page] = data.data.items;
        }
      }
      setMovies(newMovies);
    } catch (error) {
      console.error("Error preloading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies({});
    preloadMovies();
  }, [FilmUrl]);

  return (
    <div className="bg-black/50 p-5">
      <div className="flex justify-center w-full px-20">
        <div className="filter items-center w-full">
          <Suspense fallback={<div>Loading filters...</div>}>
            <Filter onFilterChange={handleFilterChange} />
          </Suspense>
        </div>
      </div>
      <div className="content flex flex-col xl:flex-row gap-5 p-5 w-full">
        <div className="filmlist basis-2/3">
          <div>
            <div className="heading flex items-center justify-between px-10">
              <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
                {categoryName}
              </h1>
            </div>
            <Suspense fallback={<div>Loading films...</div>}>
              {!loading && <FilmList movies={movies} grid={4} itemPerPage={20} pageLimit={5} />}
            </Suspense>
          </div>
        </div>
        <div className="order-3 xl:order-3 basis-full xl:basis-1/3">
          <Suspense fallback={<div>Loading popular films...</div>}>
            <PopolarFilm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default FilmListPage;

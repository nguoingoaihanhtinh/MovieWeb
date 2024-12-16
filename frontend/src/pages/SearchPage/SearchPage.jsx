import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilmList from "../../components/Films/FilmList";
import { Spin } from "antd";

const SearchPage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Parse the query parameter
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      if (!keyword.trim()) {
        setMovies([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const results = [];
        for (let page = 1; page <= 3; page++) {
          const response = await fetch(`https://ophim1.com/v1/api/tim-kiem?keyword=${keyword}&page=${page}`);
          const data = await response.json();
          if (data?.data?.items && Array.isArray(data.data.items)) {
            results.push(...data.data.items);
          } else {
            console.warn("Unexpected API response structure:", data);
          }
        }
        setMovies(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [keyword]);

  const handleNavigate = () => {
    navigate("/list?movieType=hot");
  };
  if (loading) {
    return (
      <div className="text-center mt-10 items-center flex justify-center">
        <Spin />
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="flex justify-center w-full py-10 bg-slate-800 ">
        <div className="font-bold text-xl text-center items-center bg-gradient-to-r  from-orange-500 to-red-500 bg-clip-text text-transparent ">
          Không có kết quả tìm kiếm cho từ khóa &quot;{keyword}&quot;
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-slate-800 ">
      <div className="flex justify-between px-5 py-2">
        <h1 className="font-bold text-xl text-center items-center bg-gradient-to-r  from-orange-500 to-red-500 bg-clip-text text-transparent">
          Kết quả tìm kiếm cho từ khóa &quot;{keyword}&quot;
        </h1>
        <button
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
          onClick={() => handleNavigate()}
        >
          Xem thêm
        </button>
      </div>
      <FilmList movies={movies} itemPerPage={18} grid={6} pageLimit={5} />
    </div>
  );
};

export default SearchPage;

import { useEffect, useState, Suspense } from "react";
import { Button } from "antd"; // Assuming you want to use Ant Design buttons
import PopularCard from "../../../components/Films/PopularCard";

const PopolarFilm = () => {
  const [movies, setMovies] = useState([]);

  const [page, setPage] = useState(1); // For pagination
  const [categoryUrl, setCategoryUrl] = useState(
    "https://ophim1.com/v1/api/danh-sach/moi?category=&country=&year=&sort_field=week&page=1"
  ); // Default URL with 'week'
  const pageSize = 10; // Set your desired page size

  // Fetch movies data
  useEffect(() => {
    fetch(categoryUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data.items)) {
          setMovies(data.data.items); // Load movies
        } else {
          console.error('Expected an array in "data.data.items", but received:', data);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [categoryUrl, page]);

  // Paginate the movies array based on the current page and pageSize
  const currentMovies = movies.slice((page - 1) * pageSize, page * pageSize);

  const handlePeriodChange = (period) => {
    setPage(1); // Reset to first page
    const newUrl = `https://ophim1.com/v1/api/danh-sach/moi?category=&country=&year=&sort_field=${period}&page=1`;
    setCategoryUrl(newUrl); // Update URL for the selected period
  };

  if (movies.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="upcoming ">
      <div className="heading flex items-center justify-between px-10 py-2">
        <div className="relative inline-block">
          <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
            Phim mới
          </h1>
        </div>
        <div className="buttons flex gap-2">
          <Button
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
            onClick={() => handlePeriodChange("week")}
          >
            Tuần
          </Button>
          <Button
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
            onClick={() => handlePeriodChange("month")}
          >
            Tháng
          </Button>
          <Button
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
            onClick={() => handlePeriodChange("year")}
          >
            Năm
          </Button>
        </div>
      </div>

      {/* Lazy load FilmList */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="movies-list grid  sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1  gap-4 px-5 py-5 xl:border-purple-500 xl:border-l">
          {currentMovies.map((movie) => (
            <PopularCard
              key={movie.id}
              img={movie.thumb_url}
              title={movie.name}
              origin_name={movie.origin_name}
              year={movie.year}
              slug={movie.slug}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default PopolarFilm;

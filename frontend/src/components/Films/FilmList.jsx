import { useState } from "react";
import FilmCard from "./FilmCard";
import { Pagination } from "antd";

// eslint-disable-next-line react/prop-types
const FilmList = ({ movies, grid, itemPerPage }) => {
  console.log("movies", movies);
  const [currentPage, setCurrentPage] = useState(1);
  const movieArray = Object.values(movies).flat();
  // Get the current movies to display
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentMovies = movieArray.slice(startIndex, endIndex);

  const gridClass = `grid grid-cols-${grid} gap-4 mt-2 px-5`;

  // eslint-disable-next-line react/prop-types
  if (movies.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className={gridClass}>
        {currentMovies.map((movie) => (
          <FilmCard
            key={movie._id}
            img={movie.thumb_url}
            title={movie.name}
            origin_name={movie.origin_name}
            status={movie.episode_current}
            quality={movie.quality}
            slug={movie.slug}
          />
        ))}
      </div>

      <div className="w-full flex justify-center mt-5">
        <Pagination
          current={currentPage}
          total={movieArray.length}
          pageSize={itemPerPage}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          // eslint-disable-next-line react/prop-types
          hideOnSinglePage={movies.length <= itemPerPage}
        />
      </div>
    </div>
  );
};

export default FilmList;

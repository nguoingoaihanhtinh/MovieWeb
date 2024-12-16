import { useState } from "react";
import FilmCard from "./FilmCard";
import { Pagination, Skeleton } from "antd";

// eslint-disable-next-line react/prop-types
const FilmList = ({ movies, grid, itemPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const movieArray = Object.values(movies).flat();
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  // Simulate loading delay (optional)
  const currentMovies = isLoading
    ? Array.from({ length: itemPerPage }) // Show skeleton placeholders while loading
    : movieArray.slice(startIndex, endIndex);

  const gridClass = `grid gap-4 mt-2 px-5 ${
    grid === 1
      ? "sm:grid-cols-1"
      : grid === 2
      ? "sm:grid-cols-1 md:grid-cols-2"
      : grid === 3
      ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : grid === 4
      ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  }`;

  const renderSkeletons = () =>
    Array.from({ length: itemPerPage }).map((_, index) => (
      <div
        key={index}
        className="shadow-lg rounded-xl dark:bg-slate-700 dark:text-white h-[360px] flex flex-col justify-between min-w-[250px] p-5 gap-5 "
      >
        <div className="relative overflow-hidden h-[300px] w-full">
          {/* Skeleton for the image */}
          <Skeleton.Image
            active
            className="mx-auto rounded-t-xl h-[300px] w-full bg-cover bg-no-repeat object-cover transition duration-700"
          />
          {/* Placeholder for Quality Button */}
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-purple-500 text-white text-xs font-bold py-1 px-3 rounded-tl-xl rounded-br-xl w-[50px]"></div>

          {/* Placeholder for Status Button */}
          <div className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold py-1 px-3 rounded-full"></div>
        </div>

        {/* Skeleton for Title and Origin Name */}
        <div className="p-2 items-center text-center">
          <Skeleton
            active
            title={{ width: "80%" }} // Matches the width of the title
            paragraph={{ rows: 1, width: "60%" }} // Matches the width of the subtitle
          />
        </div>
      </div>
    ));

  return (
    <div>
      <div className={gridClass}>
        {isLoading
          ? renderSkeletons() // Show skeleton placeholders
          : currentMovies.map((movie, index) =>
              movie ? (
                <FilmCard
                  key={movie._id || index}
                  img={movie.thumb_url}
                  title={movie.name}
                  origin_name={movie.origin_name}
                  status={movie.episode_current}
                  quality={movie.quality}
                  slug={movie.slug}
                />
              ) : (
                <div key={index} className="hidden" />
              )
            )}
      </div>

      <div className="w-full flex justify-center mt-5">
        <Pagination
          current={currentPage}
          total={movieArray.length}
          pageSize={itemPerPage}
          onChange={(page) => {
            setIsLoading(true); // Simulate loading
            setTimeout(() => {
              setCurrentPage(page);
              setIsLoading(false); // Reset loading state
            }, 500); // Simulate fetch delay
          }}
          showSizeChanger={false}
          hideOnSinglePage={movieArray.length <= itemPerPage}
        />
      </div>
    </div>
  );
};

export default FilmList;

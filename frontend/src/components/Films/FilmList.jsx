import React, { useEffect, useState } from 'react';
import FilmCard from './FilmCard';
import { Pagination } from 'antd';

const FilmList = ({ categoryUrl, grid, itemPerPage, pageLimit }) => {
  const [movies, setMovies] = useState({}); // Cache of fetched movies by page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false); // Loading state
  const [totalMovies, setTotalMovies] = useState(0); // Total number of movies

  const fetchMovies = async (page) => {
    setLoading(true); // Set loading state before fetching data

    try {
      const response = await fetch(`${categoryUrl}&page=${page}`);
      const data = await response.json();

      if (data.data && Array.isArray(data.data.items)) {
        const fetchedMovies = data.data.items.slice(0, itemPerPage); // Respect `itemPerPage` here
        setMovies((prev) => ({
          ...prev,
          [page]: fetchedMovies,
        }));

        // Dynamically set totalMovies based on valid data received
        setTotalMovies((prevTotal) =>
          Math.min(prevTotal + fetchedMovies.length, pageLimit * itemPerPage)
        );
      }
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    // Clear previous movies and reload from page 1 whenever `categoryUrl` changes
    setMovies({});
    setCurrentPage(1); // Reset to page 1 when the filter changes

    fetchMovies(1); // Fetch first page after URL change

    // Optionally, preload the next two pages
    if (1 + 1 <= pageLimit) fetchMovies(2);
    if (1 + 2 <= pageLimit) fetchMovies(3);
  }, [categoryUrl, pageLimit]); // Re-fetch data whenever `categoryUrl` changes

  const currentMovies = movies[currentPage] || [];

  if (loading && currentMovies.length === 0) {
    return <p>Loading...</p>;
  }

  if (totalMovies === 0) {
    return <p>No movies available</p>;
  }

  const gridClass = `grid grid-cols-${grid} gap-4 mt-2 px-5`;

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
          total={Math.min(totalMovies, pageLimit * itemPerPage)} // Ensure total respects pageLimit
          pageSize={itemPerPage}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          hideOnSinglePage={totalMovies <= itemPerPage}
        />
      </div>
    </div>
  );
};

export default FilmList;

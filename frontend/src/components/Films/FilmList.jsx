import React, { useEffect, useState } from 'react';
import FilmCard from './FilmCard';
import { Pagination } from 'antd';

const FilmList = ({ categoryUrl, number }) => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0); // Total number of movies
  const [page, setPage] = useState(1);

  // Determine page size based on the grid column count
  const pageSize = number === 6 ? 6 : 8;

  useEffect(() => {
    fetch(categoryUrl)
      .then(response => response.json())
      .then(data => {
        if (data.data && Array.isArray(data.data.items)) {
          setMovies(data.data.items); // Load movies
          setTotal(data.data.items.length); // Set total movie count
        } else {
          console.error('Expected an array in "data.data.items", but received:', data);
        }
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, [categoryUrl]);

  // Paginate the movies array based on the current page and pageSize
  const currentMovies = movies.slice((page - 1) * pageSize, page * pageSize);

  if (movies.length === 0) {
    return <p>Loading...</p>;
  }

  // Generate a dynamic grid class based on the number of columns
  const gridClass = `grid grid-cols-${number} gap-4 mt-4 px-5`;

  return (
    <div>
      <div className={gridClass}>
        {currentMovies.map(movie => (
          <FilmCard
            key={movie.id}
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
          className="items-center"
          onChange={(page) => setPage(page)}
          total={total}
          current={page}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default FilmList;

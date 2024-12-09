import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Button } from 'antd';
import Hero from './Hero';
import PopolarFilm from './Popular/PopolarFilm';

// Lazy load FilmList component
const FilmList = lazy(() => import('../../components/Films/FilmList'));

const HomePage = () => {
  const categoryUrls = {
    new: 'https://ophim1.com/v1/api/danh-sach/phim-sap-chieu?category=&country=&year=&sort_field=&page=NaN',
    hot: 'https://ophim1.com/v1/api/danh-sach/hot?category=&country=&year=&sort_field=',
    movies: 'https://ophim1.com/v1/api/danh-sach/phim-le?category=&country=&year=&sort_field=',
    series: 'https://ophim1.com/v1/api/danh-sach/phim-bo?category=&country=&year=&sort_field=',
    animation: 'https://ophim1.com/v1/api/danh-sach/hoat-hinh?category=&country=&year=&sort_field=',
  };

  const [movies, setMovies] = useState({
    new: [],
    hot: [],
    movies: [],
    series: [],
    animation: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchMoviesByCategory = async () => {
    try {
        const promises = Object.entries(categoryUrls).map(async ([category, url]) => {
            const response = await fetch(url);
            const data = await response.json();
            console.log(`API response for ${category}:`, data);
            return {
                [category]: Array.isArray(data.data?.items) ? data.data.items : [],
            };
        });
        const results = await Promise.all(promises);
        console.log("Processed movie categories:", results);
        setMovies(results.reduce((acc, curr) => ({ ...acc, ...curr }), {}));
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};


  

  useEffect(() => {
    fetchMoviesByCategory();
  }, []);
  useEffect(() => {
    console.log("Movies new:", movies.new);
}, [movies.new]);
  return (
    <div className="home-page bg-slate-800 flex flex-col">
      <div className="hero">
        <Hero data={movies.hot || []} />
      </div>
      <div className="upcoming">
        <div className="heading flex items-center justify-between px-10">
          <div className="relative inline-block">
            <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
              Phim mới
            </h1>
          </div>
          <Button
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
          >
            Xem thêm
          </Button>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <FilmList movies={movies.new || []} itemPerPage={6} grid={6} pageLimit={1} />
        </Suspense>
      </div>
      <div className="content flex mt-20">
        <div className="Films basis-2/3 flex flex-col gap-2">
          {['hot', 'movies', 'series', 'animation'].map((category) => (
            <div key={category} className={`${category}-movies mt-5`}>
              <div className="heading flex items-center justify-between px-10">
                <div className="relative inline-block">
                  <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
                    {category === 'hot'
                      ? 'Phim Hot'
                      : category === 'movies'
                      ? 'Phim lẻ'
                      : category === 'series'
                      ? 'Phim bộ'
                      : 'Phim hoạt hình'}
                  </h1>
                </div>
                <Button
                  className="bg-gradient-to-r my-2 from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
                >
                  Xem thêm
                </Button>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <FilmList
                  movies={movies[category] || []}
                  itemPerPage={8}
                  grid={4}
                  pageLimit={2}
                />
              </Suspense>
            </div>
          ))}
        </div>
        <div className="basis-1/3">
          <PopolarFilm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Button, Carousel } from 'antd';
import Hero from './Hero';
import PopolarFilm from './Popular/PopolarFilm';

// Lazy load FilmList component
const FilmList = lazy(() => import('../../components/Films/FilmList'));

const HomePage = () => {
  const hotMoviesUrl = 'https://ophim1.com/v1/api/danh-sach/hot?category=&country=&year=&sort_field=';
  const moviesUrl = 'https://ophim1.com/v1/api/danh-sach/phim-le?category=&country=&year=&sort_field=';
  const seriesUrl = 'https://ophim1.com/v1/api/danh-sach/phim-bo?category=&country=&year=&sort_field=';
  const animationUrl = 'https://ophim1.com/v1/api/danh-sach/hoat-hinh?category=&country=&year=&sort_field=';

  const [heroMovies, setHeroMovies] = useState([]); 
  const movieSlugs = ['tham-tiem-giau-kin', 'alita-thien-than-chien-binh', 'charlie-va-nha-may-so-co-la', 'arcane-phan-2', 'anh-em-cuphead'];

  const fetchHeroMovies = async () => {
    try {
      const requests = movieSlugs.map(slug => 
        fetch(`https://ophim1.com/v1/api/phim/${slug}`)
      );
      const responses = await Promise.all(requests);
      const moviesData = await Promise.all(responses.map(res => res.json()));
      setHeroMovies(moviesData.map(movie => movie.data)); // Assuming movie data is inside `data`
    } catch (error) {
      console.error('Error fetching hero movies:', error);
    }
  };

  useEffect(() => {
    fetchHeroMovies();
  }, []);

  return (
    <div className="home-page bg-slate-800  flex flex-col ">
      <div className="hero">
        <Hero data={heroMovies} />
      </div>
      <div className="">
      <div className="upcoming">
        <div className="heading flex items-center justify-between  px-10">
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

        {/* Lazy load FilmList */}
        <Suspense fallback={<div>Loading...</div>}>
          <FilmList categoryUrl="https://ophim1.com/v1/api/danh-sach/phim-sap-chieu?category=&country=&year=&sort_field=&page=NaN" itemPerPage={6} grid={6} pageLimit={1}/>
        </Suspense>
      </div>

      <div className="content flex mt-20">
        <div className="Films basis-2/3 flex flex-col gap-2">
          <div className="hot-movies">
            <div className="heading flex items-center justify-between px-10">
              <div className="relative inline-block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
                  Phim Hot
                </h1>
              </div>
              <Button
                className="bg-gradient-to-r my-2 from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
              >
                Xem thêm
              </Button>
            </div>

            {/* Lazy load FilmList */}
            <Suspense fallback={<div>Loading...</div>}>
              <FilmList categoryUrl={hotMoviesUrl} itemPerPage={8} grid={4} pageLimit={2} />
            </Suspense>
          </div>

          <div className="movies mt-5 ">
            <div className="heading flex items-center justify-between  px-10">
              <div className="relative inline-block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
                  Phim lẻ
                </h1>
              </div>
              <Button
                className="bg-gradient-to-r my-2 from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
              >
                Xem thêm
              </Button>
            </div>

            {/* Lazy load FilmList */}
            <Suspense fallback={<div>Loading...</div>}>
              <FilmList categoryUrl={moviesUrl} itemPerPage={8} grid={4} pageLimit={2}/>
            </Suspense>
          </div>

          <div className="hot-series mt-10 ">
            <div className="heading flex items-center justify-between  px-10">
              <div className="relative inline-block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
                  Phim bộ
                </h1>
              </div>
              <Button
                className="bg-gradient-to-r my-2 from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
              >
                Xem thêm
              </Button>
            </div>

            {/* Lazy load FilmList */}
            <Suspense fallback={<div>Loading...</div>}>
              <FilmList categoryUrl={seriesUrl} itemPerPage={8} grid={4} pageLimit={2} />
            </Suspense>
          </div>
          <div className="hot-series mt-10 ">
            <div className="heading flex items-center justify-betweenpx-10">
              <div className="relative inline-block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
                  phim hoạt hình
                </h1>
              </div>
              <Button
                className="bg-gradient-to-r my-2 from-orange-500 to-pink-500 text-white font-bold rounded-lg px-4 py-2 hover:from-pink-500 hover:to-orange-500 border-none"
              >
                Xem thêm
              </Button>
            </div>

            {/* Lazy load FilmList */}
            <Suspense fallback={<div>Loading...</div>}>
              <FilmList categoryUrl={animationUrl} itemPerPage={8} grid={4} pageLimit={2} />
            </Suspense>
          </div>
        </div>
        <div className="basis-1/3">
          <PopolarFilm />
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

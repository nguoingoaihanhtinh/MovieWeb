import React, { Suspense, lazy } from 'react';
import { Button } from 'antd';

// Lazy load FilmList component
const FilmList = lazy(() => import('../../components/Films/FilmList'));

const HomePage = () => {
  const hotMoviesUrl = 'https://ophim1.com/v1/api/danh-sach/hot?category=&country=&year=&sort_field=&page=1';
  const moviesUrl = 'https://ophim1.com/v1/api/danh-sach/phim-le?category=&country=&year=&sort_field=&page=NaN';
  const seriesUrl = 'https://ophim1.com/v1/api/danh-sach/phim-bo?category=&country=&year=&sort_field=&page=NaN';
  const animationUrl = 'https://ophim1.com/v1/api/danh-sach/hoat-hinh?category=&country=&year=&sort_field=&page=NaN';

  return (
    <div className="home-page bg-slate-800 ">
      <div className="upcoming">
        <div className="heading flex items-center justify-between border-b border-slate-950 px-10">
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
          <FilmList categoryUrl="https://ophim1.com/v1/api/danh-sach/phim-sap-chieu?category=&country=&year=&sort_field=&page=NaN" number={6} />
        </Suspense>
      </div>

      <div className="content flex mt-20">
        <div className="Films basis-2/3 flex flex-col gap-2">
          <div className="hot-movies">
            <div className="heading flex items-center justify-between border-b border-slate-950 px-10">
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
              <FilmList categoryUrl={hotMoviesUrl} number={4} />
            </Suspense>
          </div>

          <div className="movies mt-10 ">
            <div className="heading flex items-center justify-between border-b border-slate-950 px-10">
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
              <FilmList categoryUrl={moviesUrl} number={4} />
            </Suspense>
          </div>

          <div className="hot-series mt-10 ">
            <div className="heading flex items-center justify-between border-b border-slate-950 px-10">
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
              <FilmList categoryUrl={seriesUrl} number={4} />
            </Suspense>
          </div>
          <div className="hot-series mt-10 ">
            <div className="heading flex items-center justify-between border-b border-slate-950 px-10">
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
              <FilmList categoryUrl={animationUrl} number={4} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

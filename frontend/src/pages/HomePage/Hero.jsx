import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight, FaCalendar, FaGlobe } from 'react-icons/fa';
import RatingCircle from '../../components/Rating/CircularRating';
import { FaFilm, FaLanguage } from 'react-icons/fa6';

const Hero = ({ data = [] }) => { // Default data is an empty array
    console.log('data',data)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [data.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  };
  console.log(data[currentSlide]);
  return (
    <div className="relative w-full ">
      {/* Carousel Items */}
      <div className="h-[25vh] sm:min-h-[80vh] p-4 md:p-0 relative m-5 rounded-xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 rounded-2xl"
          style={{
            backgroundImage: `url(https://img.ophim.live/uploads/movies/${data[currentSlide]?.item.poster_url || data[currentSlide]?.image})`, // Handle null background or image
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
        <div className="relative z-10 h-full flex items-center px-10 text-white">
  <div className="max-w-xl space-y-4 px-20 text-left">
    <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent relative">
      {data[currentSlide]?.item.origin_name || 'Unknown Origin'}
    </h2>
    <p className="text-2xl font-bold">
      {data[currentSlide]?.item.name || 'Untitled'}
    </p>
    <div className="info flex space-x-6 items-center">
      <p className='flex items-center gap-2 text-lg'>
        <span className="font-semibold"><FaCalendar /></span> {data[currentSlide]?.item.year || 'N/A'}
      </p>
      <p className='flex items-center gap-2 text-lg'>
        <span className="font-semibold"><FaGlobe/></span> {data[currentSlide]?.item?.country?.[0]?.name || 'Unknown'}
      </p>
   
      {data[currentSlide]?.item.tmdb.vote_average && (
        <p>
        <RatingCircle rating={data[currentSlide]?.item.tmdb.vote_average} />
        </p>
    )}
    </div>

   
    <p className='flex items-center gap-2 text-lg'>
    <FaLanguage />
      <span className="font-semibold"> Language:</span> {data[currentSlide]?.item.lang || 'N/A'}
    </p>
    <p className='flex items-center gap-2 text-lg'>
        <FaFilm />
      <span className="font-semibold"> Quality:</span> {data[currentSlide]?.item.quality || 'Unknown'}
    </p>
    <button
      className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium"
      onClick={() => alert('More info coming soon!')}
    >
      More Info
    </button>
  </div>
</div>
      </div>

      {/* Carousel Navigation */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-black/50 text-3xl text-white p-2 rounded-full z-20 hover:cursor-pointer"
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-black/50 text-3xl text-white p-2 rounded-full z-20 hover:cursor-pointer"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Hero;

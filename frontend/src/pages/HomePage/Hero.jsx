import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaCalendar, FaGlobe } from "react-icons/fa";
import RatingCircle from "../../components/Rating/CircularRating";
import { FaFilm, FaLanguage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Hero = ({ data = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const defaultMovie = {
    poster_url: "default_image_url", // Replace with an actual default image URL
    name: "Untitled",
    origin_name: "Unknown Origin",
    year: "N/A",
    country: [{ name: "Unknown" }],
    lang: "N/A",
    quality: "Unknown",
    tmdb: { vote_average: null },
  };

  const currentMovie = data[currentSlide] || defaultMovie;

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
  const infoClicked = () => {
    navigate(`/detail/${currentMovie.slug}`);
  };
  return (
    <div className="relative w-full">
      <div className="h-[25vh] sm:min-h-[80vh] p-4 md:p-0 relative m-5 rounded-xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 rounded-2xl"
          style={{
            backgroundImage: `url(https://img.ophim.live/uploads/movies/${currentMovie.poster_url})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
        <div className="relative z-10 h-full flex items-center px-10 text-white">
          <div className="max-w-xl space-y-4 px-20 text-left">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              {currentMovie.origin_name}
            </h2>
            <p className="text-2xl font-bold">{currentMovie.name}</p>
            <div className="info flex space-x-6 items-center">
              <p className="flex items-center gap-2 text-lg">
                <FaCalendar /> {currentMovie.year}
              </p>
              <p className="flex items-center gap-2 text-lg">
                <FaGlobe /> {currentMovie.country[0]?.name}
              </p>
              {currentMovie.tmdb.vote_average && <RatingCircle rating={currentMovie.tmdb.vote_average} />}
            </div>
            <p className="flex items-center gap-2 text-lg">
              <FaLanguage />
              <span>Language:</span> {currentMovie.lang}
            </p>
            <p className="flex items-center gap-2 text-lg">
              <FaFilm />
              <span>Quality:</span> {currentMovie.quality}
            </p>
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-medium"
              onClick={infoClicked}
            >
              More Info
            </button>
          </div>
        </div>
      </div>
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

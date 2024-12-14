import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SearchCard = ({ img, title, subtitle, slug }) => {
  const fullImageUrl = `https://img.ophim.live/uploads/movies/${img}`;
  const lowQualityImage = `${fullImageUrl}?w=10`;

  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Link to={`/detail/${encodeURIComponent(slug)}`}>
      <div className="shadow-lg transition-all duration-500 hover:shadow-xl hover:bg-slate-900 cursor-pointer flex gap-2">
        <div className="relative overflow-hidden w-1/3">
          {/* Low-quality image placeholder */}
          <img
            src={lowQualityImage}
            alt={title}
            className={`mx-auto rounded-t-xl h-[100px] w-[50px] bg-center bg-cover bg-no-repeat object-cover transition duration-700 ${
              isLoaded ? "img-loaded" : "img-blur"
            }`}
            loading="lazy"
          />
          <img
            src={fullImageUrl}
            alt={title}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-xl transition-all duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad} // This will trigger when the full image is loaded
            loading="lazy"
          />
        </div>
        <div className="title flex flex-col justify-center text-center w-2/3">
          <h4 className="h4 text-lg text-white font-semibold text-center">{title}</h4>
          <h4 className="text-md text-gray-500 text-center">{subtitle}</h4>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;

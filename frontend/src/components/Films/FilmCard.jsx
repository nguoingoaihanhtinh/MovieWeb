import { Link } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const FilmCard = ({ img, title, origin_name, status, quality, slug }) => {
  // Ensure full URL for the image if it's a relative URL
  const fullImageUrl = `https://img.ophim.live/uploads/movies/${img}`;

  // Low-quality version of the image (can be either a tiny version or a blurred placeholder)
  const lowQualityImage = `${fullImageUrl}?w=10`; // This is just an example, you can adjust the image URL to create a low-res version

  const [isLoaded, setIsLoaded] = useState(false); // Track image loading state

  // Handle the image load event to remove blur effect
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Link to={`/detail/${encodeURIComponent(slug)}`}>
      <div className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-700 dark:text-white cursor-pointer rounded-xl">
        <div className="relative overflow-hidden">
          {/* Low-quality image placeholder */}
          <img
            src={lowQualityImage}
            alt={title}
            className={`mx-auto rounded-t-xl h-[300px] w-full bg-cover bg-no-repeat object-cover transition duration-700 ${
              isLoaded ? "img-loaded" : "img-blur"
            }`}
            loading="lazy"
          />

          {/* Full-quality image */}
          <img
            src={fullImageUrl}
            alt={title}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-xl transition-all duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad} // This will trigger when the full image is loaded
            loading="lazy"
          />

          {/* Quality Button */}
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-purple-500 text-white text-xs font-bold py-1 px-3 rounded-tl-xl rounded-br-xl w-[50px]">
            {quality}
          </div>

          {/* Status Button */}
          <div className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold py-1 px-3 rounded-full">
            {status}
          </div>
        </div>

        {/* Title and Origin Name */}
        <div className="p-2 items-center text-center">
          <h1 className="line-clamp-1 text-teal-400 font-bold text-base truncate">{origin_name}</h1>
          <p className="line-clamp-1 text-sm truncate">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;

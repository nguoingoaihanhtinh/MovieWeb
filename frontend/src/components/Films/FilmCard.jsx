import { Link } from "react-router-dom";

const FilmCard = ({ id, img, title, origin_name, status, quality, slug }) => {
  // Ensure full URL for the image if it's a relative URL
  const fullImageUrl = img.startsWith("http") ? img : `https://img.ophim.live/uploads/movies/${img}`;

  // Encode the title for the URL to handle special characters
  const encodedTitle = encodeURIComponent(title);

  return (
    <Link to={`/detail/${encodeURIComponent(slug)}`}>
      <div className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-700 dark:text-white cursor-pointer rounded-xl">
        <div className="relative overflow-hidden">
          {/* Image with lazy loading */}
          <img
            src={fullImageUrl}
            alt={title}
            className="mx-auto rounded-t-xl h-[300px] w-full bg-cover bg-no-repeat object-cover transition duration-700"
            loading="lazy" // This will enable lazy loading for the image
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

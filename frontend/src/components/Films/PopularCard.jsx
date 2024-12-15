import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PopularCard = ({ img, title, origin_name, year, slug }) => {
  // Ensure full URL for the image if it's a relative URL
  // eslint-disable-next-line react/prop-types
  const fullImageUrl = img && img.startsWith("http") ? img : img ? `https://img.ophim.live/uploads/movies/${img}` : "";

  return (
    <Link to={`/detail/${encodeURIComponent(slug)}`}>
      <div className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-700 dark:text-white cursor-pointer rounded-xl flex">
        <div className="relative overflow-hidden basis-1/4 min-w-[110px] min-h-[160px]">
          {/* Image with lazy loading */}
          <img
            src={fullImageUrl}
            alt={title}
            className="mx-auto rounded-t-xl bg-center bg-cover bg-no-repeat object-cover transition duration-700 p-2"
            loading="lazy" // This will enable lazy loading for the image
          />
        </div>

        {/* Title and Origin Name */}
        <div className="p-2 items-start text-left flex flex-col justify-center gap-2">
          <h1 className="text-teal-400 sm:text-base xl:text-lg truncate line-clamp-2" title={origin_name}>
            {origin_name}
          </h1>
          <p className="line-clamp-1 text-sm truncate">{title}</p>
          <p className="line-clamp-1 text-sm truncate">{year}</p>
        </div>
      </div>
    </Link>
  );
};

export default PopularCard;

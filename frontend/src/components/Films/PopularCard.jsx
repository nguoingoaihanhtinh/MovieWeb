import { Link } from "react-router-dom";

const PopularCard = ({ id, img, title, origin_name, year, slug }) => {
  // Ensure full URL for the image if it's a relative URL
  const fullImageUrl = img && img.startsWith("http") 
  ? img 
  : img 
  ? `https://img.ophim.live/uploads/movies/${img}` 
  : '';

  // Encode the title for the URL to handle special characters
  const encodedTitle = encodeURIComponent(title);

  return (
    <Link to={`/detail/${encodeURIComponent(slug)}`}>
      <div className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-700 dark:text-white cursor-pointer rounded-xl flex">
        <div className="relative overflow-hidden basis-1/4 min-w-[110px] min-h-[160px] ">
          {/* Image with lazy loading */}
          <img
            src={fullImageUrl}
            alt={title}
            className="mx-auto rounded-t-xl  bg-center bg-cover bg-no-repeat object-cover transition duration-700 p-2"
            loading="lazy" // This will enable lazy loading for the image
          />
        </div>

        {/* Title and Origin Name */}
        <div className="p-2 items-start text-left flex flex-col justify-center gap-2">
            <h1 className="line-clamp-1 text-teal-400 font-bold text-lg truncate ">{origin_name}</h1>
            <p className="line-clamp-1 text-sm truncate">{title}</p>
            <p className="line-clamp-1 text-sm truncate">{year}</p>
        </div>

      </div>
    </Link>
  );
};

export default PopularCard;

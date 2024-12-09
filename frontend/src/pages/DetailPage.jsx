import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";

const MovieDetail = () => {
  const { name } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const navigate = useNavigate();
  const [showEpisodes, setShowEpisodes] = useState(false);

  const fetchMovieDetails = async (movieName) => {
    try {
      console.log("Fetching details for movie:", movieName); // Log movie name
      setLoading(true);
      const response = await fetch(`https://ophim1.com/v1/api/phim/${movieName}`);
      const data = await response.json();
      // console.log('data',movieDetails?.data?.item?.episodes?.[0]?.server_data?.length)
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("Movie Details:", movieDetails);
  useEffect(() => {
    fetchMovieDetails(decodeURIComponent(name)); // Decode the movie name when fetching
  }, [name]);
  
  if (loading) {
    return <div>Loading...</div>; // Show loading text while data is being fetched
  }

  if (!movieDetails || !movieDetails.data) {
    return <div>Movie details not found.</div>; // Handle cases where no movie data is returned
  }
  const film = movieDetails.data;
  // console.log('test',film)
  const handleWatchButtonClick = () => {
    navigate(`/watch/${film.item.slug}`); // Navigate to WatchPage with the movie name
  };

  const toggleEpisodeList = () => {
    setShowEpisodes((prev) => !prev);
  };

  return (
    <div className="flex bg-black/20 p-5">
        <div className="mt-8 flex flex-col md:flex-row gap-8 basis-2/3 ">
        <div className="flex flex-col">
          <div className="flex gap-8">
            <div className="w-full md:w-1/3 px-4 md:px-0">
              <div className="relative max-w-[90%] mx-auto md:max-w-none">
              <span className="lazy-load-image-background lazy-load-image-loaded">
                  <img src={`https://img.ophim.live/uploads/movies/${film.item.thumb_url}`}  className="w-full rounded-lg shadow-lg"/>
              </span>
              <div className="absolute bottom-1 left-1 right-1 flex gap-2">
                <button onClick={toggleEpisodeList} className="relative bg-gradient-to-r from-blue-400 to-indigo-600 hover:to-indigo-600 hover:from-blue-400 text-white  rounded-lg transition-all duration-300 ease-in-out  hover:scale-105 hover:shadow-xl flex-1 text-sm">
                  <p className="font-light text-sm">Tập phim</p>
                </button>
                <button onClick={handleWatchButtonClick} className="relative bg-gradient-to-r from-pink-500 to-orange-400 hover:to-orange-400 hover:from-pink-500 text-white  rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl flex-1 text-sm">
                  <p className="font-light text-sm">Xem phim</p>
                </button>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 text-left">
              <p className="text-2xl font-medium mb-2">{film.item.name}</p>
              <p className="text-gray-400 mb-4">{film.item.origin_name}</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-3 text-sm text-left pt-10">
                <div>
                  <span className="text-gray-400">Năm: </span>
                  <span className="text-gray-200">{film.item.year}</span>
                </div>
                <div>
                  <span className="text-gray-400">Thời lượng: </span>
                  <span className="text-gray-200">{film.item.time}</span>
                </div>
                <div>
                  <span className="text-gray-400">Đang phát: </span>
                  <span className="text-gray-200">{film.item.status === 'ongoing' ? 'Đang cập nhật' : 'Hoàn tất'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Tập mới nhất: </span>
                  <span className="text-gray-200">{film.item.episode_current}</span>
                </div>
                <div>
                  <span className="text-gray-400">Quốc gia: </span>
                  <span className="text-gray-200">{film.item.country?.map(country => country.name).join(", ") || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Chất lượng: </span>
                  <span className="text-gray-200">{film.item.quality}</span>
                </div>
                <div>
                  <span className="text-gray-400">Thể loại: </span>
                  <span className="text-gray-200">
                    {film.item.category?.map(category => category.name).join(", ") || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="mb-2 max-w-[500px] max-h-[75px] overflow-clip">
                <h2 className="font-semibold mb-2">Diễn viên</h2>
                <p className="text-gray-400 text-sm">{film.item.actor?.join(", ") || 'N/A'}</p>
              </div>
              <div className="flex items-center mb-6">
                <span className="text-yellow-400 text-lg mr-1">⭐</span>
                <span className="text-xl font-bold">{film.tmdb?.vote_average || 'N/A'}</span>
                <span className="text-gray-400 ml-2">({film.tmdb?.vote_count || 0} lượt)</span>
              </div>
              </div>
              </div>
              {/* Episode List */}
              {showEpisodes && (
                movieDetails?.data?.item?.episodes?.[0]?.server_data?.length > 0 ? (
                  <div className="">
                    <div className="w-1/5 flex gap-5 bg-gray-800 px-5 py-2 items-center text-center"><FaBars/><span className="font-semibold text-yellow-600">{movieDetails.data.item.episodes[0].server_name}</span></div>
                    <div className="flex flex-wrap gap-2  p-5 bg-gray-800">
                      {movieDetails.data.item.episodes[0].server_data.map((episode) => (
                        <button
                          key={episode.slug}
                          onClick={() =>
                            navigate(`/watch/${movieDetails.data.item.slug}/episode/${episode.slug}`)
                          }
                          className="bg-gray-600 hover:bg-gray-500 text-white rounded px-4 py-2 text-sm"
                        >
                          {episode.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>No episodes available.</div>
                )
              )}

              </div>
        </div>
          <div className="basis-1/3 border"></div>
        </div>
        

  );
};

export default MovieDetail;

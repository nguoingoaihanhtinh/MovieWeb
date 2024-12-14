import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js"; // Import hls.js
import { FaAngleDown, FaAngleUp, FaBars } from "react-icons/fa6";
import PopolarFilm from "../HomePage/Popular/PopolarFilm";
import RelatedList from "../../components/Films/RelatedList";

const WatchPage = () => {
  const { name } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState(null); // Track selected episode
  const videoRef = useRef(null); // Reference for the video element
  const [showContent, setShowContent] = useState(false);

  const fetchMovieDetails = async (movieName) => {
    try {
      setLoading(true);
      const response = await fetch(`https://ophim1.com/v1/api/phim/${movieName}`);
      const data = await response.json();
      console.log("data", data);
      setMovieDetails(data);
      setSelectedEpisode(data?.data?.item?.episodes?.[0]?.server_data?.[0]);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails(decodeURIComponent(name));
  }, [name]);

  // Update video source when the selected episode changes
  useEffect(() => {
    if (selectedEpisode?.link_m3u8 && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(selectedEpisode.link_m3u8); // Load the selected episode's m3u8 file
      hls.attachMedia(videoRef.current); // Attach it to the video element

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS.js error:", data);
      });

      return () => {
        hls.destroy(); // Clean up HLS.js instance when the component unmounts
      };
    }
  }, [selectedEpisode]);

  const toggleContent = () => {
    setShowContent((prev) => !prev); // Toggle the visibility of the content
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode); // Update the selected episode
  };

  return (
    <div className="mt-4">
      <h4 className="bg-gray-700 p-2 text-yellow-500 font-semibold ">
        NẾU KHÔNG TẢI ĐƯỢC NỘI DUNG, HÃY BẤM F5 HOẶC TẢI LẠI TRANG 1 HOẶC 2 LẦN BẠN NHÉ .
      </h4>
      <div className="flex mt-5">
        {/* 70% Section */}
        <div className="w-full xl:w-[70%] bg-gray-800 p-5">
          <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            {loading ? (
              <p>Loading...</p>
            ) : selectedEpisode?.link_m3u8 ? (
              <video ref={videoRef} controls className="w-full h-full">
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Video not available</p>
            )}
          </div>
          {/* Movie description section */}
          <div className="mt-6 p-4 bg-gray-700/50 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="mb-4 text-left">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-amber-500 capitalize">
                {movieDetails?.data?.item?.name || "Movie Title"}
              </p>
              <h4 className="border-b pb-5 border-gray-600 text-gray-400 font-semibold">
                {movieDetails?.data?.item?.episode_current} | {movieDetails?.data?.item?.quality} |{" "}
                {movieDetails?.data?.item?.lang}
              </h4>
              <div
                className="buttons pt-5 flex items-center text-center justify-start hover:text-yellow-600"
                onClick={toggleContent}
              >
                <h4 className="text-white hover:text-yellow-600">Nội dung phim</h4>
                {showContent ? <FaAngleUp className="ml-2" /> : <FaAngleDown className="ml-2" />}
              </div>
              {showContent && (
                <div className="content mt-4 text-gray-300 text-sm">
                  {movieDetails?.data?.item?.content || "No content available."}
                </div>
              )}
            </div>
          </div>
          <div className="mt-5">
            {movieDetails?.data?.item?.episodes?.[0]?.server_data?.length > 0 ? (
              <div>
                <div className="w-1/5 flex gap-5 bg-gray-700/50 px-5 py-2 items-center text-center">
                  <FaBars />
                  <span className="font-semibold text-yellow-600">
                    {movieDetails.data.item.episodes[0].server_name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 p-5 bg-gray-700/50">
                  {movieDetails.data.item.episodes[0].server_data.map((episode) => (
                    <button
                      key={episode.slug}
                      onClick={() => handleEpisodeClick(episode)}
                      className={`${
                        selectedEpisode?.slug === episode.slug ? "bg-gray-500" : "bg-gray-600 hover:bg-gray-500"
                      } text-white rounded px-4 py-2 text-sm`}
                    >
                      {episode.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>No episodes available.</div>
            )}
          </div>
          <div className="related mt-5">
            <div className="p-4 bg-gray-700/50">
              <RelatedList slug={movieDetails?.data?.item?.slug} />
            </div>
          </div>
        </div>
        {/* 30% Section */}
        <div className="w-full xl:w-[30%] bg-gray-800">
          <PopolarFilm />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;

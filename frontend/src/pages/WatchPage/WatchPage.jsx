import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Hls from 'hls.js';  // Import hls.js

const WatchPage = () => {
  const { name } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);  // Reference for the video element

  const fetchMovieDetails = async (movieName) => {
    try {
      setLoading(true);
      const response = await fetch(`https://ophim1.com/v1/api/phim/${movieName}`);
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails(decodeURIComponent(name));
  }, [name]);

  // Get the m3u8 link for the video
  const videoLink = movieDetails?.data?.item?.episodes?.[0]?.server_data?.[0]?.link_m3u8;

  // Use HLS.js to play the video if it's available
  useEffect(() => {
    if (videoLink && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoLink);  // Load the m3u8 file
      hls.attachMedia(videoRef.current);  // Attach it to the video element

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        console.log('Manifest loaded');
      });

      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error('HLS.js error:', data);
      });

      return () => {
        hls.destroy();  // Clean up HLS.js instance when component unmounts
      };
    }
  }, [videoLink]);

  return (
    <div className="w-full xl:w-[70%] mt-10">
      <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden shadow-lg">
        {loading ? (
          <p>Loading...</p>
        ) : videoLink ? (
          <div className="relative w-full h-full bg-cover bg-center">
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          
            </div>
            <video
              ref={videoRef}
              controls
              className="w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <p>Video not available</p>
        )}
      </div>

      {/* Movie description section */}
      <div className="mt-6 bg-subModal p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="mb-4">
          <p className="text-sm sm:text-base md:text-lg font-semibold text-amber-500 capitalize">
            {movieDetails?.data?.item?.name || 'Movie Title'}
          </p>
        </div>
        {/* Content toggle section */}
      </div>
    </div>
  );
};

export default WatchPage;

import { Suspense, useEffect, useState } from "react";
import FilmList from "./FilmList";
import { Spin } from "antd";

// eslint-disable-next-line react/prop-types
const RelatedList = ({ slug }) => {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = async () => {
    if (!slug) return;
    try {
      const response = await fetch(`https://ophim1.com/v1/api/phim/${slug}`);
      const data = await response.json();
      const categories = data?.data?.item?.category || [];
      if (categories.length > 0) {
        fetchRelatedMovies(categories[0].slug);
      } else {
        setRelatedMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchRelatedMovies = async (categorySlug) => {
    try {
      setLoading(true);
      const fetchPage = async (page) => {
        const response = await fetch(
          `https://ophim1.com/v1/api/danh-sach/phim-bo?category=${categorySlug}&page=${page}`
        );
        const data = await response.json();
        return data?.data?.items || [];
      };

      const [page1Movies, page2Movies] = await Promise.all([fetchPage(1), fetchPage(2)]);

      const combinedMovies = [...page1Movies, ...page2Movies].filter((movie) => movie.slug !== slug);

      setRelatedMovies(combinedMovies);
    } catch (error) {
      console.error("Error fetching related movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchMovieDetails();
    }
  }, [slug]);

  return (
    <div>
      <div className="heading flex items-center justify-between ">
        <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
          Có thể bạn sẽ thích
        </h1>
      </div>
      {loading ? (
        <div>
          <Spin className="text-lg" />
        </div>
      ) : relatedMovies.length > 0 ? (
        <Suspense fallback={<div>Loading films...</div>}>
          {!loading && <FilmList movies={relatedMovies} grid={4} itemPerPage={20} pageLimit={5} />}
        </Suspense>
      ) : (
        <div>No related films found.</div>
      )}
    </div>
  );
};

export default RelatedList;

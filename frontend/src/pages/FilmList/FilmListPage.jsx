import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FilmList from '../../components/Films/FilmList';
import PopolarFilm from '../HomePage/Popular/PopolarFilm';
import Filter from '../../components/Films/Filter';

const categoryMap = {
  'phim-le': 'Phim Lẻ',
  'phim-bo': 'Phim Bộ',
  'tv-shows': 'TV Show',
  'hoat-hinh': 'Hoạt Hình',
};

const FilmListPage = () => {
  const { name } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const movieType = queryParams.get('movieType');
  const country = queryParams.get('country');

  const [filters, setFilters] = useState({
    movieType: movieType || '',
    genre: '',
    country: country || '',
    year: '',
    sort_field: '',
  });

  const [categoryName, setCategoryName] = useState('Loading...');
  
  // Dynamically set the category name based on filters or URL param
  useEffect(() => {
    if (filters.movieType) {
      setCategoryName(categoryMap[filters.movieType] || 'Unknown Category');
    } else if (name) {
      setCategoryName(categoryMap[name] || 'Unknown Category');
    }
  }, [filters.movieType, name]);

  // Dynamically create the API URL based on current filters
  const FilmUrl = `https://ophim1.com/v1/api/danh-sach/${filters.movieType || ''}?category=${filters.genre}&country=${filters.country}&year=${filters.year}&sort_field=${filters.sort_field}`;

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  // Trigger an API call when filters change
  useEffect(() => {
    // Optional: Log the URL to debug
    console.log('Fetching films with URL:', FilmUrl);
  }, [FilmUrl]); // This effect will run every time `FilmUrl` changes

  return (
    <div>
      <div className="filter">
        <Suspense fallback={<div>Loading filters...</div>}>
          <Filter onFilterChange={handleFilterChange} />
        </Suspense>
      </div>
      <div className="content flex">
        <div className="filmlist basis-2/3">
          <div>
            <div className="heading flex items-center justify-between px-10">
              <h1 className="font-bold text-xl bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent relative z-10">
                {categoryName}
              </h1>
            </div>
            <Suspense fallback={<div>Loading films...</div>}>
              <FilmList 
                categoryUrl={FilmUrl} 
                grid={4} 
                itemPerPage={20} // Set number of items per page dynamically
                pageLimit={8}
              />
            </Suspense>
          </div>
        </div>
        <div className="popular basis-1/3">
          <Suspense fallback={<div>Loading popular films...</div>}>
            <PopolarFilm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default FilmListPage;

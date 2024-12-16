import { useState, useEffect, useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useDebounce from "../../../hooks/useDebouce";
import SearchCard from "./SearchCard";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const searchBoxRef = useRef(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Controls dropdown visibility
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false); // Tracks search box visibility
  const debouncedKeyword = useDebounce(keyword, 300);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedKeyword.trim()) {
        setResults([]);
        return;
      }
      try {
        const response = await fetch(`https://ophim1.com/v1/api/tim-kiem?keyword=${debouncedKeyword}`);
        const data = await response.json();

        // Accessing `items` array from `data`
        if (data?.data?.items && Array.isArray(data.data.items)) {
          setResults(data.data.items.slice(0, 10)); // Limit to 10 results
        } else {
          setResults([]); // Handle unexpected response structure
          console.warn("Unexpected API response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [debouncedKeyword]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setDropdownVisible(false);
        setSearchBoxVisible(false); // Hide search box when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
      setSearchBoxVisible(false); // Hide search box after navigating
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setDropdownVisible(value.trim() !== "");
  };

  return (
    <div ref={searchBoxRef} className="relative flex items-center justify-end space-x-4">
      {/* Search Box */}
      {isSearchBoxVisible && (
        <div className="absolute right-0 z-[51] flex flex-col items-end">
          <div className="transition-all duration-300 ease-in-out w-64 md:w-96">
            <div className="relative flex items-center">
              {/* Search Input */}
              <input
                className="w-full font-light rounded border border-gray-700 bg-blackoil/70 p-2 
                            pr-10 text-slate-200 placeholder-white outline-none transition-all duration-300 opacity-80"
                type="text"
                placeholder="Tìm kiếm tên phim, shows...."
                value={keyword}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              {/* Search Button */}
              <button
                onClick={() => handleSearch()}
                className="absolute right-0 text-gray-400 transition-colors hover:text-white"
              >
                <FaMagnifyingGlass />
              </button>
            </div>

            {/* DropDown */}
            {isDropdownVisible && results.length > 0 && (
              <div className="absolute z-10 flex-col flex gap-2 mt-2 max-h-[50vh] w-full overflow-y-auto rounded-lg bg-blackoil shadow-lg bg-black">
                {results.map((item) => (
                  <SearchCard
                    key={item.id}
                    img={item.thumb_url}
                    title={item.name}
                    subtitle={item.origin_name}
                    slug={item.slug}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Toggle Search Box Button */}
      {!isSearchBoxVisible && (
        <button
          onClick={() => setSearchBoxVisible((prev) => !prev)}
          className="text-lightGhostWhite transition-colors hover:text-white"
        >
          <FaMagnifyingGlass />
        </button>
      )}
    </div>
  );
};

export default SearchBox;

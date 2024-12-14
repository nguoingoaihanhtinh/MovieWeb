import { useState, useEffect, useRef } from "react";
import { FaMarker } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useDebounce from "../../../hooks/useDebouce";
import SearchCard from "./SearchCard";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const searchBoxRef = useRef(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Controls dropdown visibility
  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedKeyword.trim()) {
        setResults([]);
        return;
      }
      try {
        const response = await fetch(`https://ophim1.com/v1/api/tim-kiem?keyword=${debouncedKeyword}`);
        const data = await response.json();

        console.log("API Response:", data);

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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setDropdownVisible(value.trim() !== "");
  };

  return (
    <div ref={searchBoxRef} className="flex items-center space-x-4">
      <div className="relative z-[51]">
        <div className="relative">
          <div className="transition-all duration-300 ease-in-out w-64 md:w-96">
            <div className="relative flex items-center justify-between gap-10">
              {/* Search Input */}
              <button className="absolute left-0 text-lightGhostWhite transition-colors hover:text-white">
                <FaMagnifyingGlass />
              </button>
              <input
                className="w-full absolute font-light rounded border border-gray-700 bg-blackoil/70 p-2 
                        px-10 text-slate-200 placeholder-white outline-none transition-all duration-300 opacity-80 "
                type="text"
                placeholder="Tìm kiếm tên phim, shows...."
                value={keyword}
                onChange={handleInputChange}
              />

              <button className="absolute right-2 text-gray-400 transition-colors hover:text-white">
                <FaMarker />
              </button>
            </div>

            {/* DropDown */}
            {isDropdownVisible && results.length > 0 && (
              <div className="absolute z-10 flex-col flex gap-2 mt-7 max-h-[50vh] w-full overflow-y-auto rounded-lg bg-blackoil shadow-lg bg-black">
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
      </div>
    </div>
  );
};

export default SearchBox;

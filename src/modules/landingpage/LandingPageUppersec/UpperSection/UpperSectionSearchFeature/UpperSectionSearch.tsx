import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Searchplaceholders } from "../../../Var";
import axios from "axios";
import { Api_url } from "../../../../../config/globalConfig";

export function UpperSectionSearch() {
  const [searchValues, setSearchValues] = useState<string[]>(["", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const newVal = [...searchValues];
    newVal[index || 0] = e.target.value;
    setSearchValues(newVal);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Extract search parameters
      const [query, experience, location] = searchValues;

      // Build query parameters
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (experience) params.append("experience", experience);
      if (location) params.append("location", location);

      // Make API call
      const response = await axios.get(
        `${Api_url}/searchJobs?${params.toString()}`
      );
      console.log(`${Api_url}/searchJobs?${params.toString()}`);

      // Store search results in localStorage for the results page
      localStorage.setItem("jobSearchResults", JSON.stringify(response.data));

      // Navigate to search results page
      navigate("/search-results");
    } catch (error) {
      console.error("Error searching jobs:", error);
      setError("No Job Found");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const SearchPlaceholderArray = Object.values(Searchplaceholders);

  return (
    <div className="w-full flex flex-col pt-[50px] pb-[100px] text-primary-900 dark:text-primary-50 bg-transparent transition-colors duration-300">
      <h1 className="text-[2rem] text-center px-5 max-w-[90%] mx-auto md:text-[1.5rem] md:pt-[60px] md:pb-[20px] sm:text-[1.2rem] sm:pt-[40px] sm:pb-[15px] flex justify-center pb-[31px] pt-[100px] font-bold text-primary-900 dark:text-primary-50">
        Hiring Made Simple - Find Your Dream Job Now!
      </h1>

      {/* Search Bar */}
      <div className="flex w-[60%] mx-auto items-center bg-white dark:bg-gray-800 rounded-[50px] p-[0.75rem_1.5rem] max-w-[800px] shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="w-[27px] h-[27px] flex items-center mr-4">
          <FontAwesomeIcon className="text-[22px] text-secondary-500 dark:text-secondary-400 ml-[5px]" icon={faMagnifyingGlass} />
        </div>
        {SearchPlaceholderArray.map((placeholder, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="text-primary-300 dark:text-primary-600 mx-[10px] text-[1.2rem] select-none"> | </div>}
            <input
              className="flex-1 border-none outline-none text-[0.95rem] text-primary-800 dark:text-primary-50 bg-transparent placeholder:text-primary-400 dark:placeholder:text-primary-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
              placeholder={placeholder}
              value={searchValues[index]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChangeInput(e, index)}
              onKeyPress={handleKeyPress}
              name={`Search${index}`}
              disabled={isLoading}
            />
          </React.Fragment>
        ))}
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-gradient-to-br from-secondary-500 to-primary-500 text-primary-900 dark:text-primary-50 border-none px-[2rem] py-[0.75rem] rounded-[25px] cursor-pointer font-semibold text-[0.9rem] transition-all duration-300 ml-4 hover:bg-gradient-to-br hover:from-secondary-600 hover:to-primary-600 hover:-translate-y-[1px] shadow-md hover:shadow-lg disabled:from-primary-300 disabled:to-primary-400 disabled:cursor-not-allowed disabled:transform-none lg:px-[1.5rem] lg:py-[0.5rem] lg:text-[0.8rem] hover:bg"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && (
        <div className="flex justify-center border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 w-fit rounded-[27px] p-[10px_20px] font-bold mx-auto text-red-500 dark:text-red-400 mt-[30px] shadow-sm animate-pulse">
          {error}
        </div>
      )}
    </div>
  );
}

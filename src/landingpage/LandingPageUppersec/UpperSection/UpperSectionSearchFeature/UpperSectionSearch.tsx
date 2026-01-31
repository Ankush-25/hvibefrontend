import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Searchplaceholders } from "../../../Var";
import axios from "axios";
import { Api_url } from "../../../../globalConfig";

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
    <div className="w-full flex flex-col pt-[50px] pb-[100px] text-white">
      <h1 className="text-[2rem] text-center px-5 max-w-[90%] mx-auto md:text-[1.5rem] md:pt-[60px] md:pb-[20px] sm:text-[1.2rem] sm:pt-[40px] sm:pb-[15px] flex justify-center pb-[31px] pt-[100px] font-bold">
        Hiring Made Simple - Find Your Dream Job Now!
      </h1>

      {/* Mobile Search Bar */}
      <div className="hidden md:flex bg-white rounded-[50px] p-[0.75rem_1rem] mx-4 shadow-lg items-center gap-2">
        <input
          type="text"
          placeholder="Search jobs, location, or skills..."
          value={searchValues[0]}
          onChange={(e) => handleOnChangeInput(e)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="flex-1 border-none outline-none text-[0.9rem] text-[#333] placeholder:text-[#6c757d]"
        />
        <button
          className="bg-[#007bff] text-white border-none p-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-[#0056b3] disabled:bg-[#6c757d] disabled:cursor-not-allowed"
          onClick={handleSearch}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden md:flex items-center bg-white rounded-[50px] p-[0.75rem_1.5rem] mx-auto max-w-[800px] shadow-lg border border-black/10 w-full lg:mx-4 lg:max-w-none md:flex">
        <div className="w-[27px] h-[27px] flex items-center mr-4">
          <FontAwesomeIcon className="text-[26px] text-[#635555] ml-[5px]" icon={faMagnifyingGlass} />
        </div>
        {SearchPlaceholderArray.map((placeholder, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="text-[#635555] mx-[5px] text-[1.2rem]"> | </div>}
            <input
              className="flex-1 border-none outline-none text-[0.9rem] text-[#333] bg-transparent placeholder:text-[#6c757d] disabled:opacity-60 disabled:cursor-not-allowed text-black"
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
          className="bg-[#007bff] text-white border-none px-[2rem] py-[0.75rem] rounded-[25px] cursor-pointer font-semibold text-[0.9rem] transition-all duration-300 ml-4 hover:bg-[#0056b3] hover:-translate-y-[1px] disabled:bg-[#6c757d] disabled:cursor-not-allowed disabled:transform-none lg:px-[1.5rem] lg:py-[0.5rem] lg:text-[0.8rem]"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && (
        <div className="flex justify-center border border-gray-400 w-fit rounded-[27px] p-[10px] font-bold mx-auto text-[#b761b7] mt-[48px] hover:shadow-[0_0_10px_rgba(142,68,173,0.6)]">
          {error}
        </div>
      )}
    </div>
  );
}

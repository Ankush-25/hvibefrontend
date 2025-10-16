import { MobileSearchBar, SearchBar, SearchButton, SearchInput, UpperSearchAndTextWrapper } from "./UpperSectionSearchStyles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./UpperSection.css"
import React, { useState, useEffect } from "react";
import { Searchplaceholders } from "../../../Var";
import axios from "axios";
import { Api_url } from "../../../../globalConfig";
import { useNavigate } from "react-router-dom";

export function UpperSectionSearch() {
  const [searchValues, setSearchValues] = useState(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOnChangeInput = (e, index) => {
    const newVal = [...searchValues];
    newVal[index?index:0] = e.target.value;
    setSearchValues(newVal);
  }

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Extract search parameters
      const [query, experience, location] = searchValues;
      
      // Build query parameters
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      if (experience) params.append('experience', experience);
      if (location) params.append('location', location);
      
      // Make API call
      const response = await axios.get(`${Api_url}/searchJobs?${params.toString()}`);
      console.log(`${Api_url}/searchJobs?${params.toString()}`);
      
      // Store search results in localStorage for the results page
      localStorage.setItem('jobSearchResults', JSON.stringify(response.data));
      
      // Navigate to search results page
      navigate('/search-results');
      
    } catch (error) {
      console.error('Error searching jobs:', error);
      setError("No Job Found");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const SearchPlaceholderArray = Object.values(Searchplaceholders);

  return (
    <UpperSearchAndTextWrapper>
      <h1 className="flex justify-center pb-[31px] pt-[100px] sm:text-sm font-bold">
        Hiring Made Simple - Find Your Dream Job Now!
      </h1>
       <MobileSearchBar className="block md:hidden">
        <div className="border-1 border-white">
          <SearchInput
            className="text-black text-bold !pl-5 !w-3/2"
            placeholder="Designation Or Location Or Experience"
            name="MobileSearch"
            value ={searchValues[0]}
            onChange={(e)=>handleOnChangeInput(e)}/>
        </div>
        <div className="flex pl-26 items-center"> 
          <div className="bg-blue-500 ml-[6px] rounded-[29px] ">
          <FontAwesomeIcon 
            className="text-base m-auto p-[13px] "
            icon={faMagnifyingGlass} 
            />
            </div>
        </div>
      </MobileSearchBar>
      <SearchBar className="hidden sm:block">
        <div className="SearchIcondiv"> 
          <FontAwesomeIcon 
            className="SearchIcon"
            icon={faMagnifyingGlass} 
          />
        </div>
        {SearchPlaceholderArray.map((placeholder, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className="inputSeprator"> | </div>}
            <SearchInput
              className="text-black"
              index={index}
              placeholder={placeholder}
              value={searchValues[index]}
              onChange={(e) => handleOnChangeInput(e, index)}
              onKeyPress={handleKeyPress}
              name={`Search${index}`}
              disabled={isLoading}
            />
          </React.Fragment>
        ))}
        <SearchButton onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </SearchButton>
      </SearchBar>
      {error && <div className="search-error">
        {error}</div>}
    </UpperSearchAndTextWrapper>
  );
}

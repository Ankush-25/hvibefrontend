import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare, faBuilding, faMapMarkerAlt, faFilter, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../../../../../lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../types/redux';
import { JobListing } from '../../../../../types/landingPage';

interface FilterState {
  jobType: string;
  category: string;
  experienceLevel: string;
}

interface SearchResultsData {
  jobsSearched?: JobListing[];
  [key: string]: any;
}

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState<SearchResultsData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const SearchedData = useSelector((state: RootState) => state.search.data);
  const [filters, setFilters] = useState<FilterState>({
    jobType: '',
    category: '',
    experienceLevel: '',
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve search results from localStorage
    (() => {
      if (SearchedData) {
        try {
          setSearchResults(SearchedData);
        } catch (error) {
          console.error('Error parsing search results:', error);
        }
      }
      if (!SearchedData) {
        const results = localStorage.getItem('jobSearchResults');
        if (results) {
          try {
            const parsedResults = JSON.parse(results);
            setSearchResults(parsedResults);
          } catch (error) {
            console.error('Error parsing search results:', error);
          }
        }
      }
    })();
    console.log(SearchedData)
    console.log(searchResults)
    setLoading(false);
  }, [SearchedData]);


  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    // Filter logic would go here in a real implementation
    // For now, we'll just toggle the filter panel
    setShowFilters(false);
  };

  const handleBackToSearch = () => {
    navigate('/');
  };

  const filteredJobs = searchResults?.jobsSearched?.filter((job: any) => {
    if (filters.jobType && job.jobType !== filters.jobType) return false;
    if (filters.category && job.category !== filters.category) return false;
    if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) return false;
    return true;
  });

  if (loading) {
    return <div className="text-center p-12 text-[#555] text-xl">Loading search results...</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto my-[2rem] px-[1rem] font-sans">
      <div className="flex items-center justify-between mb-[2rem] py-[1rem] border-b border-[#eaeaea]">
        <button
          className="flex items-center gap-[0.5rem] px-[1.5rem] py-[0.75rem] bg-gradient-to-br from-[#6e45e2] to-[#88d3ce] text-white border-none rounded-[8px] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(110,69,226,0.2)] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(110,69,226,0.3)]"
          onClick={handleBackToSearch}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Search</span>
        </button>
        <h1 className="m-0 text-[2rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6e45e2] to-[#88d3ce]">Search Results</h1>
        <button
          className="flex items-center gap-[0.5rem] px-[1.5rem] py-[0.75rem] bg-gradient-to-br from-[#6e45e2] to-[#88d3ce] text-white border-none rounded-[8px] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(110,69,226,0.2)] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(110,69,226,0.3)]"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FontAwesomeIcon icon={faFilter} />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex gap-[2rem] mt-[2rem] flex-col md:flex-row">
        {showFilters && (
          <div className="w-full md:w-[280px] bg-white p-[1.5rem] rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] h-fit md:sticky md:top-[2rem] mb-[2rem] md:mb-0">
            <h3 className="mt-0 mb-[1.5rem] text-[#333] text-[1.25rem] font-semibold pb-[0.75rem] border-b-2 border-[#f0f0f0]">Filter Results</h3>

            <div className="mb-[1.5rem]">
              <label className="block mb-[0.5rem] font-medium text-[#555] text-[0.95rem]">Job Type</label>
              <select
                name="jobType"
                value={filters?.jobType}
                onChange={handleFilterChange}
                className="w-full p-[0.75rem] border border-[#e0e0e0] rounded-[8px] text-[0.95rem] transition-colors duration-300 bg-[#f9f9f9] focus:outline-none focus:border-[#6e45e2] focus:shadow-[0_0_0_3px_rgba(110,69,226,0.1)]"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-[1.5rem]">
              <label className="block mb-[0.5rem] font-medium text-[#555] text-[0.95rem]">Category</label>
              <select
                name="category"
                value={filters?.category}
                onChange={handleFilterChange}
                className="w-full p-[0.75rem] border border-[#e0e0e0] rounded-[8px] text-[0.95rem] transition-colors duration-300 bg-[#f9f9f9] focus:outline-none focus:border-[#6e45e2] focus:shadow-[0_0_0_3px_rgba(110,69,226,0.1)]"
              >
                <option value="">All Categories</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-[1.5rem]">
              <label className="block mb-[0.5rem] font-medium text-[#555] text-[0.95rem]">Experience Level</label>
              <select
                name="experienceLevel"
                value={filters?.experienceLevel}
                onChange={handleFilterChange}
                className="w-full p-[0.75rem] border border-[#e0e0e0] rounded-[8px] text-[0.95rem] transition-colors duration-300 bg-[#f9f9f9] focus:outline-none focus:border-[#6e45e2] focus:shadow-[0_0_0_3px_rgba(110,69,226,0.1)]"
              >
                <option value="">All Levels</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <button
              className="w-full p-[0.75rem] bg-gradient-to-br from-[#6e45e2] to-[#88d3ce] text-white border-none rounded-[8px] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(110,69,226,0.2)] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(110,69,226,0.3)] flex items-center justify-center gap-[0.5rem]"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col gap-[1.5rem] grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
          <div className="text-[#666] mb-[1rem]">
            Found <span className="font-bold text-[#6e45e2]">{filteredJobs?.length}</span> jobs
          </div>

          {filteredJobs?.length === 0 ? (
            <div className="text-center py-[3rem] px-[1rem] col-span-full">
              <FontAwesomeIcon icon={faSearch} className="text-[#ddd] text-[3rem] mb-[1rem]" />
              <h3 className="text-[#555] mb-[1rem] text-[1.25rem]">No matching jobs found</h3>
              <p className="text-[#888] mb-[1.5rem]">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            filteredJobs?.map((job) => (
              <div className="bg-white rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-[1.5rem] transition-all duration-300 border border-[#f0f0f0] hover:-translate-y-[5px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]" key={job._id}>
                <div className="flex justify-between items-start mb-[1rem]">
                  <div className="text-[1.25rem] font-bold text-[#1a1a1a] m-0 mb-[0.5rem]">{job.title}</div>
                  {job.isActive && <div className="bg-[#e6f7f5] text-[#00b894] text-[0.75rem] font-bold px-[10px] py-[4px] rounded-[20px] uppercase tracking-wider">Active</div>}
                </div>

                <div className="flex items-center gap-[0.75rem] mb-[1rem]">
                  <div className="flex items-center gap-[0.5rem] text-[#666] text-[0.95rem]">
                    <FontAwesomeIcon icon={faBuilding} className="text-[#aaa]" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                  <div className="flex items-center gap-[0.5rem] text-[#666] text-[0.95rem]">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#aaa]" />
                    <span className="font-medium">{job.location}</span>
                  </div>
                </div>

                <div className="text-[#555] text-[0.95rem] leading-[1.6rem] mb-[1.5rem] line-clamp-3 overflow-hidden">
                  {job.description && job.description.length > 150
                    ? `${job.description.substring(0, 150)}...`
                    : job.description}
                </div>

                <div className="flex flex-wrap gap-[0.75rem] mb-[1.5rem]">
                  <span className="bg-[#f5f5f5] px-[0.75rem] py-[0.35rem] rounded-[50px] text-[0.85rem] text-[#555] flex items-center gap-[0.5rem]">{job.jobType}</span>
                  <span className="bg-[#f5f5f5] px-[0.75rem] py-[0.35rem] rounded-[50px] text-[0.85rem] text-[#555] flex items-center gap-[0.5rem]">{job.category}</span>
                  <span className="bg-[#f5f5f5] px-[0.75rem] py-[0.35rem] rounded-[50px] text-[0.85rem] text-[#555] flex items-center gap-[0.5rem]">{job.experienceLevel}</span>
                </div>

                <div className="flex justify-between items-center pt-[1rem] border-t border-[#f0f0f0]">
                  <div className="font-semibold text-[#6e45e2] text-[1rem]">{job.salary ? `$${job.salary}` : 'Salary not specified'}</div>
                  <button className="flex items-center gap-[0.5rem] px-[1.25rem] py-[0.6rem] bg-gradient-to-br from-[#6e45e2] to-[#88d3ce] text-white border-none rounded-[8px] font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(110,69,226,0.3)]">
                    <FontAwesomeIcon icon={faUpRightFromSquare} />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 
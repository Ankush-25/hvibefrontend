import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Api_url } from "../../../../../config/globalConfig.js";
import { freshersJobs } from "../../../Var";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightFromSquare,
  faBuilding,
  faMapMarkerAlt,
  faGraduationCap,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import CarouselComponent from "../../../../../components/ui/CarouselComponent";
import { FresherJob } from "../../../../../types/landingPage";

interface FresherJobCardProps {
  data: FresherJob;
}

import { useTheme } from "../../../../../context/ThemeContext";

function FresherJobCard({ data }: FresherJobCardProps) {
  const handleApplyClick = () => {
    // Handle application logic here
    console.log("Applied for job:", data.title);
  };

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-secondary-900 dark:to-secondary-800 rounded-[20px] shadow-lg hover:shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-[25px] h-[300px] flex flex-col transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] relative border border-gray-100 dark:border-white/5 overflow-hidden backdrop-blur-md hover:-translate-y-2 dark:hover:shadow-[0_15px_50px_rgba(0,0,0,0.5),0_0_25px_rgba(var(--color-secondary-500),0.25)] hover:border-secondary-500/50 group mx-2">
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[radial-gradient(circle,rgba(var(--color-secondary-500),0.1)_0%,rgba(0,0,0,0)_70%)] rounded-full translate-x-[30%] -translate-y-[30%] pointer-events-none"></div>

      <div className="flex justify-between items-start mb-5 relative z-[2] after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-[60px] after:h-[3px] after:bg-gradient-to-r after:from-secondary-500 after:to-primary-500 after:rounded-[3px] after:transition-[width] after:duration-300 group-hover:after:w-[80px]">
        <div className="text-[1.2rem] font-bold text-gray-800 dark:text-white leading-[1.4] max-w-[80%] line-clamp-2">
          {data.title}
        </div>
        <div className="bg-gradient-to-br from-secondary-500 to-primary-500 text-white text-[0.7rem] font-semibold px-[14px] py-[4px] rounded-[50px] shadow-md uppercase tracking-[0.5px] relative overflow-hidden z-[1] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary-500 before:to-secondary-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
          <span className="relative z-10">Fresher</span>
        </div>
      </div>

      <div className="my-[15px] flex flex-col gap-[10px]">
        <div className="flex items-center gap-[10px]">
          <FontAwesomeIcon icon={faBuilding} className="text-secondary-500 text-[0.9rem] w-[18px] text-center" />
          <span className="text-[1.05rem] text-gray-600 dark:text-[#ddd] truncate">{data.company}</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-secondary-500 text-[0.9rem] w-[18px] text-center" />
          <span className="text-[1.05rem] text-gray-600 dark:text-[#ddd] truncate">{data.location}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-[10px] my-5 relative">
        <span className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-[#ddd] px-[14px] py-[6px] rounded-[50px] text-[0.75rem] flex items-center gap-[6px] border border-gray-200 dark:border-white/5 transition-all duration-300 backdrop-blur-[5px] hover:bg-secondary-500/20 hover:border-secondary-500/30 hover:-translate-y-[2px]">
          <FontAwesomeIcon icon={faGraduationCap} /> {data.education || "Any Graduate"}
        </span>
        <span className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-[#ddd] px-[14px] py-[6px] rounded-[50px] text-[0.75rem] flex items-center gap-[6px] border border-gray-200 dark:border-white/5 transition-all duration-300 backdrop-blur-[5px] hover:bg-secondary-500/20 hover:border-secondary-500/30 hover:-translate-y-[2px]">
          <FontAwesomeIcon icon={faCalendarAlt} /> {data.type || "Full-time"}
        </span>
      </div>

      <div className="mt-auto flex justify-between items-center relative z-[2] pt-[15px] border-t border-gray-200 dark:border-white/5">
        <div className="font-bold text-gray-900 dark:text-white text-[1.1rem]">{data.salary || "₹2.5L - ₹5L/year"}</div>
        <button
          className="bg-gradient-to-br from-secondary-500 to-primary-500 text-white border-none px-[24px] py-[10px] rounded-[50px] font-semibold cursor-pointer flex items-center gap-[8px] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden shadow-md before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary-500 before:to-secondary-500 before:opacity-0 before:transition-opacity before:duration-400 hover:before:opacity-100 hover:-translate-y-[2px] hover:shadow-lg group/btn"
          onClick={handleApplyClick}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} className="relative z-[1] transition-transform duration-300 group-hover/btn:translate-x-[3px]" />
          <span className="relative z-[1]">Apply Now</span>
        </button>
      </div>
    </div>
  );
}

export function FreshersJobsCarousel() {
  const [jobsData, setJobsData] = useState<FresherJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch from API first
        const response = await axios.get(`${Api_url}/FresherJobs/10`);
        if (response && response.data && response.data.jobsCollection) {
          setJobsData(response.data.jobsCollection);
        } else {
          // Fallback to mock data if API fails
          setJobsData(freshersJobs.jobs || []);
        }
      } catch (err) {
        console.error("Failed to fetch freshers jobs:", err);
        // Use mock data as fallback
        setJobsData(freshersJobs.jobs || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-[80px] pb-[120px] bg-gray-50 dark:bg-gradient-to-br dark:from-[#1a1a1a] dark:to-[#242424] relative overflow-hidden before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-secondary-500 before:to-transparent before:z-[1]">
        <h2 className="text-[2.5rem] font-extrabold text-center mb-[15px] text-gray-900 dark:text-white relative inline-block left-1/2 -translate-x-1/2 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-secondary-500 after:to-primary-500 after:rounded-[3px]">Freshers Jobs</h2>
        <div className="text-center p-[40px] text-[1.2rem] text-gray-500 dark:text-[#aaaaaa]">Loading freshers jobs...</div>
      </div>
    );
  }

  return (
    <CarouselComponent
      data={jobsData}
      renderItem={(item) => (<FresherJobCard data={item} />)}
      title="Freshers Jobs"
      subtitle="Start your career journey with these exciting opportunities for freshers"
      theme={theme} />
  );
}
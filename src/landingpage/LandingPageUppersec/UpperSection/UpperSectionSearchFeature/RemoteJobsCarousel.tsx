import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightFromSquare,
  faBuilding,
  faMapMarkerAlt,
  faGlobe,
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import CarouselComponent from "../../../../components/CarouselComponent";
import { mockRemoteJobs } from "../../../Var"
import { RemoteJob } from "../../../../types/landingPage";

interface RemoteJobCardProps {
  job: RemoteJob | any; // using any for fallback if API returns different structure
}

const RemoteJobCard = ({ job }: RemoteJobCardProps) => {
  const navigate = useNavigate();

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to job application page with job ID
    navigate(`/jobs/${job?.id}/apply`);
  };

  return (
    <div className="bg-gradient-to-br from-[#1e1e1e] to-[#252525] rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-[25px] h-[300px] flex flex-col transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] relative border border-white/5 overflow-hidden backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_15px_50px_rgba(0,0,0,0.5),0_0_25px_rgba(142,68,173,0.25)] hover:border-[#8e44ad]/50 group mx-2">
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[radial-gradient(circle,rgba(142,68,173,0.1)_0%,rgba(0,0,0,0)_70%)] rounded-full translate-x-[30%] -translate-y-[30%] pointer-events-none"></div>

      <div className="flex justify-between items-start mb-5 relative z-[2] after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-[60px] after:h-[3px] after:bg-gradient-to-r after:from-[#8e44ad] after:to-[#3498db] after:rounded-[3px] after:transition-[width] after:duration-300 group-hover:after:w-[80px]">
        <div className="text-[1.2rem] font-bold text-white leading-[1.4] max-w-[80%] line-clamp-2">
          {job?.title}
        </div>
        <div className="bg-gradient-to-br from-[#8e44ad] to-[#3498db] text-white text-[0.7rem] font-semibold px-[14px] py-[4px] rounded-[50px] shadow-[0_4px_15px_rgba(142,68,173,0.4)] uppercase tracking-[0.5px] relative overflow-hidden z-[1] flex items-center gap-[5px] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#3498db] before:to-[#8e44ad] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
          <FontAwesomeIcon icon={faGlobe} className="relative z-10" />
          <span className="relative z-10">Remote</span>
        </div>
      </div>

      <div className="my-[15px] flex flex-col gap-[10px]">
        <div className="flex items-center gap-[10px]">
          <FontAwesomeIcon icon={faBuilding} className="text-[#9b59b6] text-[0.9rem] w-[18px] text-center" />
          <span className="text-[1.05rem] text-[#ddd] truncate">{job?.company}</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#9b59b6] text-[0.9rem] w-[18px] text-center" />
          <span className="text-[1.05rem] text-[#ddd] truncate">{job?.location}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-[10px] my-5 relative">
        <span className="bg-white/5 text-[#ddd] px-[14px] py-[6px] rounded-[50px] text-[0.75rem] flex items-center gap-[6px] border border-white/5 transition-all duration-300 backdrop-blur-[5px] hover:bg-[#8e44ad]/20 hover:border-[#8e44ad]/30 hover:-translate-y-[2px]">
          <FontAwesomeIcon icon={faBriefcase} /> {job?.type}
        </span>
        <span className="bg-white/5 text-[#ddd] px-[14px] py-[6px] rounded-[50px] text-[0.75rem] flex items-center gap-[6px] border border-white/5 transition-all duration-300 backdrop-blur-[5px] hover:bg-[#8e44ad]/20 hover:border-[#8e44ad]/30 hover:-translate-y-[2px]">
          <FontAwesomeIcon icon={faGraduationCap} /> {job?.experience}
        </span>
      </div>

      <div className="mt-auto flex justify-between items-center relative z-[2] pt-[15px] border-t border-white/5">
        <div className="font-bold text-white text-[1.1rem]">{job?.salary}</div>
        <button
          className="bg-gradient-to-br from-[#8e44ad] to-[#3498db] text-white border-none px-[24px] py-[10px] rounded-[50px] font-semibold cursor-pointer flex items-center gap-[8px] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden shadow-[0_4px_15px_rgba(142,68,173,0.4)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#3498db] before:to-[#8e44ad] before:opacity-0 before:transition-opacity before:duration-400 hover:before:opacity-100 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(142,68,173,0.6)] group/btn"
          onClick={handleApplyClick}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} className="relative z-[1] transition-transform duration-300 group-hover/btn:translate-x-[3px] group-hover/btn:shadow-[0_6px_20px_rgba(142,68,173,0.5)]" />
          <span className="relative z-[1]">Apply Now</span>
        </button>
      </div>
    </div>
  );
};

const RemoteJobsCarousel = () => {
  const [jobData, setJobData] = useState<RemoteJob[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch from API first
        // const response = await axios.get(`${Api_url}/RemoteJobs/10`);
        // if (response && response.data && response.data.jobsCollection) {
        //   setJobData(response.data.jobsCollection);
        // } else {
        // Fallback to mock data if API fails
        setJobData(mockRemoteJobs);
        // }
      } catch (err) {
        console.error("Failed to fetch remote jobs:", err);
        // Use mock data as fallback
        setJobData(mockRemoteJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="py-[80px] pb-[120px] bg-gradient-to-br from-[#1a1a1a] to-[#242424] relative overflow-hidden before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#8e44ad] before:to-transparent before:z-[1]">
        <h2 className="text-[2.5rem] font-extrabold text-center mb-[15px] text-white relative inline-block left-1/2 -translate-x-1/2 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-[#8e44ad] after:to-[#3498db] after:rounded-[3px]">Remote Jobs</h2>
        <div className="text-center p-[40px] text-[1.2rem] text-[#aaaaaa]">Loading remote jobs...</div>
      </div>
    );
  }

  return (
    <CarouselComponent
      data={jobData}
      renderItem={(item) => <RemoteJobCard job={item} />}
      title="Remote Jobs"
      subtitle="Work from anywhere with these remote job opportunities"
      theme="dark" />
  );
};

export default RemoteJobsCarousel;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faBuilding,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Api_url } from "../../../../../config/globalConfig";
import { internships } from "../../../Var";
import CarouselComponent from "../../../../../components/ui/CarouselComponent";

interface InternshipCardProps {
  internship: {
    id: string;
    title: string;
    company: string;
    location: string;
  };
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  const navigate = useNavigate();

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to job application page with job ID
    navigate(`/jobs/${internship.id}/apply`);
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-[12px] p-[22px] h-[300px] flex flex-col transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] border border-[#8e44ad]/20 shadow-[0_10px_20px_rgba(0,0,0,0.2)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[4px] before:bg-gradient-to-r before:from-[#8e44ad] before:to-[#3498db] before:opacity-80 before:transition-all before:duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(142,68,173,0.3)] hover:border-[#8e44ad] hover:before:h-[6px] hover:before:opacity-100 group mx-2">
      <div className="flex justify-between items-start mb-[18px] relative z-[1]">
        <div className="text-[1.25rem] font-bold text-white m-0 leading-[1.4] flex-1 tracking-[0.3px] shadow-sm">
          {internship.title}
        </div>
        <div className="bg-gradient-to-br from-[#8e44ad] to-[#6c5ce7] text-white text-[0.7rem] font-semibold px-[12px] py-[4px] rounded-[20px] inline-flex items-center gap-[6px] ml-[12px] uppercase tracking-[0.5px] shadow-[0_2px_10px_rgba(142,68,173,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_15px_rgba(142,68,173,0.5)]">
          Internship
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[12px] my-[12px] bg-white/3 p-[14px] rounded-[10px] border border-white/5 backdrop-blur-[5px]">
        <div className="flex items-center gap-[8px] my-[6px] text-[#b8c2cc] text-[0.9rem] transition-all duration-300">
          <FontAwesomeIcon icon={faBuilding} className="text-[#8a94a5]" />
          <span className="text-[#e6e6e6] font-medium">{internship.company}</span>
        </div>
        <div className="flex items-center gap-[8px] my-[6px] text-[#b8c2cc] text-[0.9rem] transition-all duration-300">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#8a94a5]" />
          <span className="text-[#e6e6e6] font-medium">{internship.location}</span>
        </div>
      </div>

      <div className="mt-auto">
        <button
          className="bg-gradient-to-br from-[#8e44ad] to-[#6c5ce7] text-white border-none padding-[12px_20px] rounded-[8px] font-semibold cursor-pointer flex items-center justify-center gap-[8px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] w-full relative overflow-hidden z-[1] uppercase tracking-[0.5px] text-[0.85rem] shadow-[0_4px_15px_rgba(142,68,173,0.3)] py-3 px-5 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#6c5ce7] before:to-[#8e44ad] before:opacity-0 before:transition-opacity before:duration-400 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(142,68,173,0.4)] hover:before:opacity-100 active:translate-y-0 active:shadow-[0_2px_10px_rgba(142,68,173,0.3)] group/btn"
          onClick={handleApplyClick}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} className="relative z-[1] transition-transform duration-300 group-hover/btn:translate-x-[3px]" />
          <span className="relative z-[1]">Apply Now</span>
        </button>
      </div>
    </div>
  );
};

export function InternshipsCrousel() {
  const [internshipsData, setInternshipsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(`${Api_url}/internships`);
        setInternshipsData(response.data.internships || internships.internships);
      } catch (error) {
        console.error("Error fetching internships:", error);
        // Use mock data if API fails
        setInternshipsData(internships.internships);
      }
    };

    fetchInternships();
  }, []);

  const renderInternshipCard = (internship: any) => (
    <InternshipCard key={internship.id} internship={internship} />
  );

  return (
    <CarouselComponent
      data={internshipsData}
      renderItem={renderInternshipCard}
      title="Latest Internships"
      subtitle="Explore internship opportunities for students and freshers"
      theme="light"
      slidesToShow={4}
      slidesToScroll={1}
    />
  );
}

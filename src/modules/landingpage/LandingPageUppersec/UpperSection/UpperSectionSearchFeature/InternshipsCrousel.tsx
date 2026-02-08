import { useEffect, useState } from "react";
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
import { useTheme } from "../../../../../context/ThemeContext";

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
    <div className="bg-white dark:bg-gradient-to-br dark:from-secondary-900 dark:to-secondary-800 rounded-[20px] shadow-lg hover:shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-[25px] h-[300px] flex flex-col transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative border border-primary-100 dark:border-white/5 overflow-hidden backdrop-blur-md hover:-translate-y-2 dark:hover:shadow-[0_15px_50px_rgba(0,0,0,0.5),0_0_25px_rgba(var(--color-secondary-500),0.25)] hover:border-secondary-500/50 group mx-2">
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-secondary-500 to-primary-500 opacity-80 transition-all duration-300 group-hover:h-[6px] group-hover:opacity-100"></div>

      <div className="flex justify-between items-start mb-[18px] relative z-[1] pt-2">
        <div className="text-[1rem] font-bold text-primary-800 dark:text-primary-50 m-0 leading-[1.4] flex-1 tracking-[0.3px] w-48 truncate">
          {internship.title}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[12px] my-[12px] bg-primary-50 dark:bg-white/5 p-[14px] rounded-[10px] border border-primary-200 dark:border-white/5 backdrop-blur-[5px]">
        <div className="flex items-center gap-[8px] my-[6px] text-primary-600 dark:text-primary-300 text-[0.9rem] transition-all duration-300">
          <FontAwesomeIcon icon={faBuilding} className="text-secondary-500" />
          <span className="text-primary-700 dark:text-primary-200 font-medium">{internship.company}</span>
        </div>
        <div className="flex items-center gap-[8px] my-[6px] text-primary-600 dark:text-primary-300 text-[0.9rem] transition-all duration-300">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-secondary-500" />
          <span className="text-primary-700 dark:text-primary-200 font-medium">{internship.location}</span>
        </div>
      </div>

      <div className="mt-auto">
        <button
          className="bg-gradient-to-br from-secondary-500 to-primary-500 text-primary-50 border-none rounded-[50px] font-semibold cursor-pointer flex items-center justify-center gap-[8px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] w-full relative overflow-hidden z-[1] uppercase tracking-[0.5px] text-[0.85rem] shadow-md py-3 px-5 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary-500 before:to-secondary-500 before:opacity-0 before:transition-opacity before:duration-400 hover:-translate-y-[2px] hover:shadow-lg hover:before:opacity-100 active:translate-y-0 group/btn"
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
  const { theme } = useTheme();

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
      theme={theme}
      containerClassName="bg-transparent"
      customSettings={{
        slidesToShow: 4,
        slidesToScroll: 1,
      }}
    />
  );
}

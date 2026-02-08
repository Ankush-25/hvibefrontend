import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PopularJobtype } from "../../modules/landingpage/LandingPageUppersec/UpperSection/UpperSectionType/upperSecTypeParent";
import { Imagepaths } from './../../assets/Global_Need_files/ImagesPaths.js'
import { cn } from "../../lib/utils";

interface HeroSectionProps {
  userName: string;
}

function HeroSection({ userName }: HeroSectionProps) {
  const handleFindJobs = () => {
    window.location.href = "/jobs";
  };

  const handlePublishJob = () => {
    window.location.href = "/publish-job";
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-8 gap-10 md:gap-20 bg-[#1d1d1d]">
      <div className="flex flex-col w-full md:w-[45%] text-left">
        <div className="pb-8 flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {userName ? `Welcome, ${userName}!` : 'Begin Your Journey'}
          </h1>
          <p className="text-xl text-gray-400 mt-2">Apply from Here and Get Hired</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 mt-4">
          <button
            onClick={handleFindJobs}
            className={cn(
              "flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-purple-400/30 bg-[#211f1f] text-white text-lg font-medium",
              "transition-all duration-300 hover:bg-purple-100 hover:text-black hover:shadow-lg hover:-translate-y-1"
            )}
          >
            <FontAwesomeIcon icon={faSearch} />
            Find Jobs
          </button>
          <button
            onClick={handlePublishJob}
            className={cn(
              "flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-purple-400/30 bg-[#211f1f] text-white text-lg font-medium",
              "transition-all duration-300 hover:bg-purple-100 hover:text-black hover:shadow-lg hover:-translate-y-1"
            )}
          >
            <FontAwesomeIcon icon={faPlus} />
            Publish Job
          </button>
        </div>
      </div>

      <div className="hidden md:block w-full max-w-[460px]">
        <img
          src={Imagepaths.heroSectionImage}
          alt="Hero Section Image"
          className="w-full h-auto rounded-[40px] shadow-2xl object-cover"
        />
      </div>
    </div>
  );
}

export default HeroSection;

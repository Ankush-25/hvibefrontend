import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUpRightFromSquare,
    faBuilding,
    faMapMarkerAlt,
    faClock,
    faBriefcase,
    faGraduationCap,
    faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { cn } from "../../lib/utils";
import { JobCardProps } from "../../types/components";

/**
 * JobCard component for displaying job information
 */
const JobCard = ({
    data,
    onApply,
    onSave,
    isSaved = false,
    theme = "light",
    compact = false,
}: JobCardProps) => {
    const [saved, setSaved] = useState(isSaved);

    // Extract job data with fallbacks
    const {
        title = "Job Title",
        company = "Company Name",
        location = "Location",
        jobType = "Full-time",
        category = "Category",
        experienceLevel = "Experience",
        salary = "Competitive",
        postedDate,
        deadline,
        description,
        skillsRequired = [],
    } = data;

    // Calculate time since posting
    const getTimeAgo = (dateString: string): string => {
        if (!dateString) return "";

        const postedDate = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - postedDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    const handleSaveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSaved(!saved);
        if (onSave) onSave(data, !saved);
    };

    const handleApplyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onApply) onApply(data);
    };

    return (
        <div className={cn(
            "relative overflow-hidden transition-all duration-300 ease-in-out border",
            "bg-white border-gray-200 shadow-soft hover:shadow-strong hover:-translate-y-1",
            "rounded-2xl p-5 h-72 flex flex-col m-2.5",
            theme === "dark" && "bg-secondary-900 border-secondary-700 shadow-medium hover:shadow-strong hover:border-purple-600",
            compact && "h-auto p-4"
        )}>
            <div className={cn(
                "absolute top-4 right-4 w-8 h-8 flex items-center justify-center cursor-pointer z-10 rounded-full transition-all duration-200 ease-in-out",
                "hover:bg-black/5"
            )} onClick={handleSaveClick}>
                <FontAwesomeIcon
                    icon={saved ? faBookmarkSolid : faBookmarkRegular}
                    className={cn(
                        "text-gray-400 hover:text-primary-500 transition-colors",
                        saved && "text-primary-500"
                    )}
                />
            </div>

            <div className="flex justify-between items-start mb-4">
                <h3 className={cn(
                    "font-semibold text-gray-900 mb-1",
                    theme === "dark" && "text-white",
                    compact && "text-base mb-0"
                )}>{title}</h3>
                <span className={cn(
                    "inline-block px-3 py-1 text-xs font-medium rounded-full",
                    "bg-primary-100 text-primary-800",
                    theme === "dark" && "bg-primary-900 text-primary-200"
                )}>{jobType}</span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faBuilding} className="text-gray-400 w-4" />
                    <span className={cn(
                        theme === "dark" && "text-gray-300"
                    )}>{company}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 w-4" />
                    <span className={cn(
                        theme === "dark" && "text-gray-300"
                    )}>{location}</span>
                </div>
                {postedDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FontAwesomeIcon icon={faClock} className="text-gray-400 w-4" />
                        <span className={cn(
                            theme === "dark" && "text-gray-300"
                        )}>{getTimeAgo(postedDate)}</span>
                    </div>
                )}
            </div>

            {!compact && description && (
                <div className={cn(
                    "text-sm text-gray-600 mb-4 line-clamp-2",
                    theme === "dark" && "text-gray-400"
                )}>
                    {description.length > 100
                        ? `${description.substring(0, 100)}...`
                        : description}
                </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
                {!compact && category && (
                    <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md",
                        "bg-gray-100 text-gray-700",
                        theme === "dark" && "bg-gray-800 text-gray-300"
                    )}>
                        <FontAwesomeIcon icon={faBriefcase} className="w-3" />
                        {category}
                    </span>
                )}
                <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md",
                    "bg-gray-100 text-gray-700",
                    theme === "dark" && "bg-gray-800 text-gray-300"
                )}>
                    <FontAwesomeIcon icon={faGraduationCap} className="w-3" />
                    {experienceLevel}
                </span>
                {!compact && skillsRequired && skillsRequired.length > 0 && (
                    <span className={cn(
                        "inline-flex items-center px-2 py-1 text-xs font-medium rounded-md",
                        "bg-purple-100 text-purple-700",
                        theme === "dark" && "bg-purple-900 text-purple-300"
                    )}>
                        {`${skillsRequired.length} skills`}
                    </span>
                )}
            </div>

            <div className="flex justify-between items-center mt-auto">
                <div className={cn(
                    "font-semibold text-gray-900",
                    theme === "dark" && "text-white"
                )}>{salary}</div>
                <button
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out",
                        "bg-primary-500 text-white hover:bg-primary-600 hover:shadow-medium",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    )}
                    onClick={handleApplyClick}
                >
                    <FontAwesomeIcon icon={faUpRightFromSquare} />
                    <span>Apply Now</span>
                </button>
            </div>
        </div>
    );
};

export default JobCard;

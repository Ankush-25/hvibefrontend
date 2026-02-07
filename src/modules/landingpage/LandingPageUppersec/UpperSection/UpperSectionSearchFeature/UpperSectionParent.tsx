import { Fragment } from "react";
import { PopularJobtype } from "../UpperSectionType/upperSecTypeParent";
import { UpperSectionSearch } from "./UpperSectionSearch";
import { InternshipsCrousel } from "./InternshipsCrousel";
import RemoteJobsCarousel from "./RemoteJobsCarousel";
import { FreshersJobsCarousel } from "./FreshersJobsCarousel";
import { useTheme } from "../../../../../context/ThemeContext";

export function UpperSectionParent() {
    const { theme } = useTheme();

    return (
        <Fragment>
            <UpperSectionSearch />
            <PopularJobtype theme={theme} />
            <div className="w-full m-0 p-0 relative overflow-hidden bg-gray-50 dark:bg-[#1d1d1d] before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-full before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-secondary-500 before:to-transparent before:opacity-50">
                <InternshipsCrousel />
                <RemoteJobsCarousel />
                <FreshersJobsCarousel />
            </div>
        </Fragment>
    );
}

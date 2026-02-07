import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "../../lib/utils";
import { CarouselArrowProps, CarouselProps } from "../../types/components";

interface ThemedArrowProps extends CarouselArrowProps {
    theme?: "light" | "dark";
}

/**
 * Custom arrow component for the next button in the carousel
 */
function NextArrow({ className, onClick, theme = "light" }: ThemedArrowProps) {
    const isDisabled = className?.includes("slick-disabled");

    return (
        <button
            className={cn(
                "absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-none shadow-lg",
                "right-0 translate-x-1/2",
                theme === "light"
                    ? "bg-gradient-to-br from-secondary-500 to-primary-500 text-white hover:from-secondary-600 hover:to-primary-600 hover:shadow-xl hover:scale-110"
                    : "bg-gradient-to-br from-secondary-500 to-primary-500 text-white hover:from-secondary-400 hover:to-primary-400 hover:shadow-[0_0_20px_rgba(var(--color-secondary-500),0.5)] hover:scale-110",
                isDisabled && "opacity-30 cursor-not-allowed hover:scale-100"
            )}
            onClick={onClick}
            disabled={isDisabled}
            aria-label="Next slide"
        >
            <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
        </button>
    );
}

/**
 * Custom arrow component for the previous button in the carousel
 */
function PreviousArrow({ className, onClick, theme = "light" }: ThemedArrowProps) {
    const isDisabled = className?.includes("slick-disabled");

    return (
        <button
            className={cn(
                "absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-none shadow-lg",
                "left-0 -translate-x-1/2",
                theme === "light"
                    ? "bg-gradient-to-br from-secondary-500 to-primary-500 text-white hover:from-secondary-600 hover:to-primary-600 hover:shadow-xl hover:scale-110"
                    : "bg-gradient-to-br from-secondary-500 to-primary-500 text-white hover:from-secondary-400 hover:to-primary-400 hover:shadow-[0_0_20px_rgba(var(--color-secondary-500),0.5)] hover:scale-110",
                isDisabled && "opacity-30 cursor-not-allowed hover:scale-100"
            )}
            onClick={onClick}
            disabled={isDisabled}
            aria-label="Previous slide"
        >
            <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
        </button>
    );
}

/**
 * Centralized carousel component that can be reused across the application
 */
const CarouselComponent = ({
    data = [],
    renderItem,
    title,
    subtitle,
    customSettings = {},
    containerClassName = "",
    theme = "light",
    onItemClick,
    actionButton,
}: CarouselProps) => {
    // Default settings for the carousel
    const defaultSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <PreviousArrow theme={theme} />,
        nextArrow: <NextArrow theme={theme} />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Merge default settings with custom settings
    const settings = { ...defaultSettings, ...customSettings };

    // Handle empty data
    if (data.length === 0) {
        return (
            <div className={cn(
                "py-10 relative",
                "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
                containerClassName
            )}>
                {title && (
                    <h2 className={cn(
                        "text-3xl font-bold mb-4 relative inline-block text-center",
                        "after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-secondary-500 after:to-primary-500 after:rounded-md"
                    )}>{title}</h2>
                )}
                {subtitle && (
                    <p className="text-base text-gray-500 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No items to display</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            "py-10 relative",
            "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
            containerClassName
        )}>
            {title && (
                <div className="flex justify-center items-center mb-5 px-10 relative">
                    <h2 className={cn(
                        "text-3xl font-bold mb-4 relative inline-block text-center",
                        "after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-secondary-500 after:to-primary-500 after:rounded-md"
                    )}>{title}</h2>
                    {actionButton && <div className="ml-auto">{actionButton}</div>}
                </div>
            )}

            {subtitle && (
                <p className="text-base text-gray-500 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}

            <div className="relative px-14 mx-4 overflow-visible">
                <Slider {...settings}>
                    {data.map((item, index) => (
                        <div
                            key={item.id || item._id || index}
                            className="px-2 cursor-pointer"
                            onClick={() => onItemClick && onItemClick(item)}
                        >
                            {renderItem(item, index)}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CarouselComponent;

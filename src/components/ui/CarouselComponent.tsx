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

/**
 * Custom arrow component for the next button in the carousel
 */
function NextArrow({ className, style, onClick }: CarouselArrowProps) {
    return (
        <div
            className={`custom-arrow next-arrow ${className}`}
            style={{ ...style }}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faChevronRight} color="#fff" />
        </div>
    );
}

/**
 * Custom arrow component for the previous button in the carousel
 */
function PreviousArrow({ className, style, onClick }: CarouselArrowProps) {
    return (
        <div
            className={`custom-arrow prev-arrow ${className}`}
            style={{ ...style }}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faChevronLeft} color="#fff" />
        </div>
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
        prevArrow: <PreviousArrow />,
        nextArrow: <NextArrow />,
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
                theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white",
                containerClassName
            )}>
                {title && (
                    <h2 className={cn(
                        "text-3xl font-bold mb-4 relative inline-block text-center",
                        "after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-purple-600 after:to-blue-500 after:rounded-md"
                    )}>{title}</h2>
                )}
                {subtitle && (
                    <p className="text-base text-gray-500 mb-8 text-center max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
                <div className="text-center py-8">
                    <p className="text-gray-400">No items to display</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            "py-10 relative",
            theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white",
            containerClassName
        )}>
            {title && (
                <div className="flex justify-center items-center mb-5 px-10 relative">
                    <h2 className={cn(
                        "text-3xl font-bold mb-4 relative inline-block text-center",
                        "after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-purple-600 after:to-blue-500 after:rounded-md"
                    )}>{title}</h2>
                    {actionButton && <div className="ml-auto">{actionButton}</div>}
                </div>
            )}

            {subtitle && (
                <p className="text-base text-gray-500 mb-8 text-center max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}

            <div className="relative">
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

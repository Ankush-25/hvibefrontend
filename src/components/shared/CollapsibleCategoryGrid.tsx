import { useState, useEffect } from 'react';
import CategoryCard from '../ui/CategoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../../lib/utils';
import { CollapsibleCategoryGridProps } from '../../types/components';

/**
 * CollapsibleCategoryGrid component for displaying job categories in a grid layout
 * with collapse/expand functionality
 */
const CollapsibleCategoryGrid = ({
    categories = [],
    title = "Popular Categories",
    subtitle = "Explore jobs by category",
    theme = "light",
    onCategoryClick,
    initialVisibleCount = 6
}: CollapsibleCategoryGridProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

    // Update visible count based on screen size
    useEffect(() => {
        const handleResize = () => {
            // Adjust visible count based on screen width
            if (window.innerWidth <= 480) {
                setVisibleCount(3); // Show fewer items on mobile
            } else if (window.innerWidth <= 768) {
                setVisibleCount(4); // Show more on tablets
            } else {
                setVisibleCount(initialVisibleCount); // Default for larger screens
            }
        };

        // Initial call
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [initialVisibleCount]);

    // Array of colors for the category cards
    const categoryColors = [
        '#8e44ad', // Purple
        '#3498db', // Blue
        '#e74c3c', // Red
        '#2ecc71', // Green
        '#f39c12', // Orange
        '#1abc9c', // Teal
        '#d35400', // Dark Orange
        '#16a085', // Dark Teal
        '#c0392b', // Dark Red
        '#2980b9', // Dark Blue
        '#27ae60', // Dark Green
        '#f1c40f', // Yellow
    ];

    // Toggle expand/collapse state
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Determine which categories to display
    const displayedCategories = isExpanded
        ? categories
        : categories.slice(0, visibleCount);

    return (
        <div className={cn(
            "w-full py-15",
            theme === "light" ? "bg-gray-900 text-white border-t border-b border-gray-800" : "bg-gray-900 text-white"
        )}>
            <div className="text-center mb-10">
                <h2 className={cn(
                    "text-4xl font-bold mb-4 relative inline-block",
                    "after:content-[''] after:absolute after:-bottom-2.5 after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-purple-600 after:to-blue-500 after:rounded-md"
                )}>{title}</h2>
                {subtitle && (
                    <p className={cn(
                        "text-base text-gray-400 max-w-md mx-auto",
                        theme === "dark" && "text-gray-500"
                    )}>{subtitle}</p>
                )}
            </div>

            <div className={cn(
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto px-5",
                "transition-all duration-500 ease-in-out",
                isExpanded ? "max-h-96" : "max-h-64",
                "overflow-hidden"
            )}>
                {displayedCategories.map((category, index) => (
                    <CategoryCard
                        key={index}
                        title={category.title}
                        category={category.category}
                        icon={category.icon}
                        count={category.count}
                        theme={theme}
                        color={categoryColors[index % categoryColors.length]}
                        onClick={onCategoryClick}
                        style={{
                            animationDelay: `${(index + 1) * 100}ms`
                        }}
                    />
                ))}
            </div>

            {categories.length > visibleCount && (
                <div className="flex justify-center mt-8 pb-5">
                    <button
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out",
                            "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600",
                            "hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900",
                            theme === "dark" && "bg-gradient-to-r from-blue-600 to-purple-600"
                        )}
                        onClick={toggleExpand}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? "Show less categories" : "Show more categories"}
                    >
                        <span>{isExpanded ? "Show Less" : "Show More"}</span>
                        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CollapsibleCategoryGrid;

import CategoryCard from '../ui/CategoryCard';
import { CategoryGridProps } from '../../types/components';
import { cn } from '../../lib/utils';

/**
 * CategoryGrid component for displaying job categories in a grid layout
 */
const CategoryGrid = ({
    categories = [],
    title = "Popular Categories",
    subtitle = "Explore jobs by category",
    theme = "light",
    onCategoryClick
}: CategoryGridProps) => {
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
                "animate-fade-in"
            )}>
                {categories.map((category, index) => (
                    <CategoryCard
                        key={category.id || index}
                        title={category.title}
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
        </div>
    );
};

export default CategoryGrid;

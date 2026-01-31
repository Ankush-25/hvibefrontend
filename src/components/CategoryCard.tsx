import { useNavigate } from 'react-router-dom';
import { CategoryCardProps } from '../types/components';
import { cn } from '../lib/utils';

/**
 * CategoryCard component for displaying job categories
 */
const CategoryCard = ({ 
  title, 
  icon,
  category, 
  count = '1000+', 
  theme = 'light',
  color = '#8e44ad',
  onClick
}: CategoryCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick(title, category);
    } else {
      // Default behavior: navigate to jobs page with category filter
      navigate(`/search-results`);
    }
  };

  // Generate gradient based on color
  const generateGradient = (baseColor: string): string => {
    // Simple function to lighten a hex color
    const lightenColor = (color: string, percent: number): string => {
      const num = parseInt(color.slice(1), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return `#${(1 << 24 | (R < 255 ? R < 1 ? 0 : R : 255) << 16 | (G < 255 ? G < 1 ? 0 : G : 255) << 8 | (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
    };
    
    return `linear-gradient(135deg, ${baseColor}, ${lightenColor(baseColor, 20)})`;
  };

  const cardStyle: React.CSSProperties = {
    background: generateGradient(color),
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 ease-in-out",
        "rounded-xl p-4 text-white min-w-[140px] h-[140px]",
        "flex flex-col justify-between",
        "shadow-soft hover:shadow-strong hover:-translate-y-1",
        "before:absolute before:inset-0 before:bg-white/5 before:-translate-x-full before:transition-transform before:duration-500 before:ease-in-out",
        "hover:before:translate-x-0",
        "m-1",
        theme === 'dark' && "shadow-medium hover:shadow-strong",
        "md:min-w-[120px] md:h-[120px] md:p-3 md:rounded-lg",
        "xs:min-w-[100px] xs:h-[100px] xs:p-2.5 xs:rounded-lg"
      )}
      style={cardStyle}
      onClick={handleClick}
    >
      <div className={cn(
        "flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg transition-all duration-300 ease-in-out",
        "hover:scale-110 hover:bg-white/30",
        "mb-3",
        "md:w-10 md:h-10 md:mb-2",
        "xs:w-9 xs:h-9 xs:mb-1.5"
      )}>
        <span className={cn(
          "text-3xl",
          "md:text-2xl",
          "xs:text-xl"
        )}>{icon}</span>
      </div>
      <div className="flex flex-col">
        <h3 className={cn(
          "font-semibold text-white mb-1 truncate",
          "text-lg",
          "md:text-base",
          "xs:text-sm"
        )}>{title}</h3>
        <p className={cn(
          "text-white/80 text-sm m-0",
          "md:text-xs",
          "xs:text-xs"
        )}>{count} jobs</p>
      </div>
    </div>
  );
};

export default CategoryCard;

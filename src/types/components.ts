import { ReactNode } from 'react';

// Carousel Component Types
export interface CarouselArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export interface CarouselProps {
  data: any[];
  renderItem: (item: any, index: number) => ReactNode;
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  customSettings?: any;
  containerClassName?: string;
  theme?: 'light' | 'dark';
  onItemClick?: (item: any) => void;
  actionButton?: ReactNode;
}

// Protected Route Types
export interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  redirectTo?: string | null;
}

// Layout Types
export interface LayoutProps {
  // Add any props if needed in the future
}

// Category Card Types
export interface CategoryCardProps {
  title: string;
  icon: ReactNode;
  category?: string;
  count?: string;
  theme?: 'light' | 'dark';
  color?: string;
  onClick?: (title: string, category?: string) => void;
  style?: React.CSSProperties;
}

// Category Grid Types
export interface Category {
  id?: string | number;
  title: string;
  icon: ReactNode;
  count?: string;
  category?: string;
}

export interface CategoryGridProps {
  categories?: Category[];
  title?: string;
  subtitle?: string;
  theme?: 'light' | 'dark';
  onCategoryClick?: (title: string, category?: string) => void;
}

// Collapsible Category Grid Types
export interface CollapsibleCategoryGridProps extends CategoryGridProps {
  initialVisibleCount?: number;
}

// Job Card Types
export interface JobData {
  title?: string;
  company?: string;
  location?: string;
  jobType?: string;
  category?: string;
  experienceLevel?: string;
  salary?: string;
  postedDate?: string;
  deadline?: string;
  description?: string;
  skillsRequired?: string[];
  id?: string | number;
}

export interface JobCardProps {
  data: JobData;
  onApply?: (job: JobData) => void;
  onSave?: (job: JobData, saved: boolean) => void;
  isSaved?: boolean;
  theme?: 'light' | 'dark';
  compact?: boolean;
}

// Common Component Types
export type ThemeType = 'light' | 'dark';
export type ComponentSize = 'small' | 'medium' | 'large';

// Base Component Props
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

// Button Component Types (if needed in future)
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// Input Component Types (if needed in future)
export interface InputProps extends BaseComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

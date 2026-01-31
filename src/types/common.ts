// Common React component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Common form interfaces
export interface FormFieldProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

// Job-related interfaces
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
  description: string;
  requirements: string[];
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  postedAt: string;
  deadline?: string;
  category?: string;
  skills?: string[];
  employerId: string;
  status: 'active' | 'closed' | 'draft';
}

// Application interfaces
export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  resume?: string;
  coverLetter?: string;
  notes?: string;
}

// Company interfaces
export interface Company {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  size?: string;
  location?: string;
  website?: string;
  logo?: string;
  foundedYear?: number;
}

// Search and filter interfaces
export interface SearchFilters {
  query?: string;
  location?: string;
  jobType?: string;
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
  remote?: boolean;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}

// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Navigation interfaces
export interface NavigationItem {
  path: string;
  label: string;
  icon?: string;
  roles?: string[];
}

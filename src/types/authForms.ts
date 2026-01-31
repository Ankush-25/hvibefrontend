// Login form types
export interface LoginFormData {
  email: string;
  password: string;
  userType: 'job_seeker' | 'employer';
}

export interface LoginProps {
  // Add any props if needed in the future
}

// Signup form types
export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'job_seeker' | 'employer';
}

export interface SignupProps {
  // Add any props if needed in the future
}

// Form validation types
export interface FormValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  general?: string;
}

// User type options
export type UserTypeOption = 'job_seeker' | 'employer';

// Form state types
export interface FormState {
  isLoading: boolean;
  errorMessage: string;
}

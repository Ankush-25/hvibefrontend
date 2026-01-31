export interface LoginRequest {
  email: string;
  password: string;
  userType: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  userType: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  userType: string;
  user?: User;
}

export interface RegisterResponse {
  token: string;
  userId: string;
  userType: string;
  user?: User;
}

export interface User {
  userId: string;
  authtoken?: string;
  userType: string;
  username?: string;
  email?: string;
  [key: string]: any;
}

export interface AuthTokens {
  token: string;
  refreshToken?: string;
}

export interface RefreshTokenRequest {
  userId: string;
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export type UserType = 'jobseeker' | 'employer' | 'admin';

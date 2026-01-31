// Image path interfaces
export interface ImagePaths {
  HiringstoreslogoPath: string;
  heroSectionImage: string;
  globalProfileAvatar: string;
}

export interface CompaniesLogoPaths {
  Accenture: string;
  Amazon: string;
  Apple: string;
  Google: string;
  IBM: string;
  Meta: string;
  Microsoft: string;
  Netflix: string;
  Nvidia: string;
}

export interface SecondCompaniesLogoPaths {
  Salesforce: string;
  Oracle: string;
  Adobe: string;
  Intel: string;
  Cisco: string;
  SAP: string;
  Dropbox: string;
  Spotify: string;
  Tcs: string;
}

// Export types for use in components
export type ImagePathsType = ImagePaths;
export type CompaniesLogoPathsType = CompaniesLogoPaths;
export type SecondCompaniesLogoPathsType = SecondCompaniesLogoPaths;

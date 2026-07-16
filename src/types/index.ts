export interface NavItem {
  name: string;
  id: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  skills: string[];
}

export interface CertificationGroup {
  title: string;
  icon: string;
  certifications: Certification[];
}

export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  skills: string;
  link: string;
}

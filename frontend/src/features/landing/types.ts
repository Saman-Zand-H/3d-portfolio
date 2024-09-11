export type Skill = {
  name: string;
  imageUrl: string;
};

export type Experience = {
  company_name: string;
  title: string;
  date: string;
  icon: string;
  iconBg: string;
  points: string[];
};

export type Project = {
  iconUrl: string;
  theme: string;
  name: string;
  description: string;
  link: string;
};

export type Stage = {
  text: string;
  link?: string;
  linkText?: string;
};

export type Education = {
  university: string;
  degree: string;
  field: string;
  subfield?: string;
  date: string;
  logo: string;
  iconBg: string;
};

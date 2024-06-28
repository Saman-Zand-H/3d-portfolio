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

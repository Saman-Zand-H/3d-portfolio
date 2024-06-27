import { Experience } from '../types';

import { limerz, connect, hummersBroker, tasmim } from '../../../assets/icons';

export const experiences: Experience[] = [
  {
    company_name: 'Hummers Leasing',
    title: 'Software Engineer & DevOps',
    date: 'August 2023 - Present',
    icon: limerz,
    iconBg: '#ffdd95',
    points: [
      'Developed web software with Django, managed Linux servers, and established continuous delivery pipeline and data backup protocols.',
      'Implemented enterprise-level leasing management web software using Django framework for backend and Bootstrap and HTMX for frontend.',
      'Implemented a feature management and ABAC(Attribute Based Access Control) system in order to evolve this software into a platform.',
      'Maintained server infrastructure to ensure optimal performance and reliability.',
    ],
  },
  {
    company_name: 'Connect ISTI',
    title: 'Software Engineer & DevOps',
    date: 'October 2023 - Present',
    icon: connect,
    iconBg: '#6962ad',
    points: [
      'Developed web software with Django, managed Linux servers, and established continuous delivery pipeline and data backup protocols',
      'Made massive refactorings and improved the code structure.',
      'Improved performance, query speed, and security measures to optimize system functionality by a significant amount',
      'Maintained server infrastructure to ensure optimal performance and reliability',
    ],
  },
  {
    company_name: 'Hummers Broker',
    title: 'Linux System Administrator & DevOps',
    date: 'November 2023 - Present',
    icon: hummersBroker,
    iconBg: '#DBB5B5',
    points: [
      'Implemented automation scripts for DevOps processes.',
      'Maintained server infrastructure to ensure optimal performance and reliability.',
    ],
  },
  {
    company_name: 'Tasmim Assets Management',
    title: 'Linux System Administrator',
    date: 'May 2024 - Present',
    icon: tasmim,
    iconBg: '#F1E5D1',
    points: [
      'Implemented automation scripts for DevOps processes.',
      'Installed and configured an enterprise mail server.',
      'Maintained server infrastructure to ensure optimal performance and reliability.',
    ],
  },
];

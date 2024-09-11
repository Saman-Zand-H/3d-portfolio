import { Project } from '../types';
import {
  sheetTable,
  menu,
  finnotech,
  cocalc,
  home,
} from '../../../assets/icons';

export const projects: Project[] = [
  {
    iconUrl: home,
    theme: 'btn-back-yellow',
    name: '3D Portfolio',
    description:
      'My personal portfolio, written in React and Three.js, designed to showcase my projects and experiences in a visually appealing manner.',
    link: 'https://github.com/saman-zand-h/3d-portfolio',
  },
  {
    iconUrl: sheetTable,
    theme: 'btn-back-red',
    name: 'Django Flex Reports',
    description:
      'Django-Flex-Report is a robust Django package designed for seamless report generation, offering an array of powerful features.',
    link: 'https://github.com/saman-zand-h/django-flex-report',
  },
  {
    iconUrl: menu,
    theme: 'btn-back-green',
    name: 'Django Flex Menu',
    description:
      'Django-Flex-Menu is a versatile Django package tailored for building dynamic website menus, while integrating robust access management through django-waffle.',
    link: 'https://github.com/saman-zand-h/django-flex-menu',
  },
  {
    iconUrl: finnotech,
    theme: 'btn-back-blue',
    name: 'Django Finnotech',
    description:
      'Django-Finntoech is a Django package tailored for seamless integration with Finnotech, a prominent Iranian provider offering banking services and more.',
    link: 'https://github.com/saman-zand-h/django-finnotech',
  },
  {
    iconUrl: cocalc,
    theme: 'btn-back-pink',
    name: 'Python CoCalc',
    description:
      'Python-CoCalc is a versatile Python package designed for seamless interaction with the CoCalc API, whether self-hosted or cloud-based.',
    link: 'https://github.com/saman-zand-h/cocalc-python',
  },
];

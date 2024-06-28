import { createBrowserRouter } from 'react-router-dom';

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const Home = (await import('./pages/Home')).default;
        return { Component: Home };
      },
    },
    {
      path: '/about',
      lazy: async () => {
        const About = (await import('./pages/About')).default;
        return { Component: About };
      },
    },
    {
      path: '/contact',
      lazy: async () => {
        const Contact = (await import('./pages/Contact')).default;
        return { Component: Contact };
      },
    },
    {
      path: '/projects',
      lazy: async () => {
        const Projects = (await import('./pages/Projects')).default;
        return { Component: Projects };
      },
    },
  ]);
};

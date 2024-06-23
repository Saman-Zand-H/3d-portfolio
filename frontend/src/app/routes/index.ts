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
  ]);
};

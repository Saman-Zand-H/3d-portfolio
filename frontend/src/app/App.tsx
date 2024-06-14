import { useMemo } from 'react';
import { createRouter } from './routes';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './main-provider';

const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);
  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <main className="bt-slate-300/20">
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </main>
  );
};

export default App;

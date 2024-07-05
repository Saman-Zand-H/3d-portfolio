import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import { Loader } from '@react-three/drei';

const Base = () => {
  const navigationState = useNavigation().state;

  return (
    <section className="relative h-screen w-full">
      {navigationState === 'loading' && <Loader />}
      <Navbar />
      <Outlet />
    </section>
  );
};

export default Base;

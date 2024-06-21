import { Canvas, Vector3 } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Loader from '../../components/Loader';
import { Volcano } from '../../models/Volcano';
import { Sky } from '../../models/Sky';
import { Ship } from '../../models/Ship';
import Navbar from '../../components/Navbar';

const Home = () => {
  const adjustScreen = () => {
    let screenScale: Vector3, screenPosition: Vector3;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [0.026, 0.026, 0.026];
      screenPosition = [0, -14, -53.4];
    }

    return { screenScale, screenPosition };
  };

  const { screenScale, screenPosition } = adjustScreen();
  const [isRotating, setIsRotating] = useState(false);

  return (
    <section className="relative h-screen w-full bg-[#3f2e0f98]">
      <Navbar />
      <Canvas
        className={`h-screen w-full bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ near: 0.001, far: 30000, rotation: [Math.PI / 12, 0, 0] }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Sky
            scale={[500, 500, 500]}
            position={screenPosition}
            rotation={[Math.PI / 4, 0, 0]}
            isRotating={isRotating}
          />
          <Volcano
            scale={[0.0011, 0.0011, 0.0011]}
            position={[0, -0.2, -11]}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Ship
            scale={[0.002, 0.002, 0.002]}
            position={[0.2, -0.2, 3.2]}
            rotation={[0, Math.PI / 2, 0]}
            isRotation={isRotating}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;

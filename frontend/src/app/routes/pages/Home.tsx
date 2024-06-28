import { Canvas, Vector3 } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import HomeStage from '../../../features/landing/components/HomeStage';
import Loader from '../../../components/Loader';
import { Volcano } from '../../../features/landing/models/Volcano';
import { Sky } from '../../../features/landing/models/Sky';
import { Ship } from '../../../features/landing/models/Ship';
import Navbar from '../../../components/Navbar';

const Home = () => {
  const adjustSky = () => {
    let skyScale: Vector3, skyPosition: Vector3;

    if (window.innerWidth < 768) {
      skyScale = [500, 500, 500];
      skyPosition = [0, -14, -53.4];
    } else {
      skyScale = [500, 500, 500];
      skyPosition = [0, -14, -53.4];
    }

    return { skyScale, skyPosition };
  };

  const adjustVolcano = () => {
    let volcanoScale: Vector3, volcanoPosition: Vector3;

    if (window.innerWidth < 768) {
      volcanoScale = [0.0011, 0.0011, 0.0011];
      volcanoPosition = [0, -0.2, -11];
    } else {
      volcanoScale = [0.0011, 0.0011, 0.0011];
      volcanoPosition = [0, -0.2, -11];
    }

    return { volcanoScale, volcanoPosition };
  };

  const adjustShip = () => {
    let shipScale: Vector3, shipPosition: Vector3;

    if (window.innerWidth < 768) {
      shipScale = [0.0033, 0.0033, 0.0033];
      shipPosition = [0.2, 0.3, 2.6];
    } else {
      shipScale = [0.0033, 0.0033, 0.0033];
      shipPosition = [0.2, 0.3, 2.6];
    }

    return { shipScale, shipPosition };
  };

  const { skyScale, skyPosition } = adjustSky();
  const { volcanoScale, volcanoPosition } = adjustVolcano();
  const { shipScale, shipPosition } = adjustShip();
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState<number | null>(1);

  return (
    <section className="relative h-screen w-full bg-[#538392]">
      <Navbar />

      <div className="absolute left-0 right-0 top-28 z-10 flex items-center justify-center">
        {currentStage && <HomeStage currentStage={currentStage} />}
      </div>

      <Canvas
        className={`h-screen w-full bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{
          near: 0.001,
          far: 30000,
          rotation: [-Math.PI / 12, 0, 0],
          position: [0, 4, 6.5],
        }}
      >
        <Suspense fallback={<Loader color="white" />}>
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
            scale={skyScale}
            position={skyPosition}
            rotation={[Math.PI / 4, 0, 0]}
            isRotating={isRotating}
          />
          <Volcano
            scale={volcanoScale}
            position={volcanoPosition}
            rotation={[0, Math.PI / 3, 0]}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Ship
            scale={shipScale}
            position={shipPosition}
            rotation={[0, Math.PI / 2, 0]}
            isRotation={isRotating}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;

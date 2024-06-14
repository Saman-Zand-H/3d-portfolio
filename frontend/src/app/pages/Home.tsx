import { Canvas, Vector3 } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Loader from '../../components/loader';
import { ForestHouse } from '../../models/ForestHouse';
import { Sky } from '../../models/Sky';
import { Plane } from '../../models/Plane';

const Home = () => {
  const adjustScreen = () => {
    let screenScale: Vector3, screenPosition: Vector3;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [0.023, 0.023, 0.023];
      screenPosition = [0, -14, -53.4];
    }

    return { screenScale, screenPosition };
  };

  const { screenScale, screenPosition } = adjustScreen();
  const [isRotating, setIsRotating] = useState(false);

  return (
    <section className="relative h-screen w-full bg-[#3f2e0f98]">
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
          <Plane
            scale={[1.2, 1.2, 1.2]}
            position={[0, 7, -13]}
            rotation={[Math.PI / 4, -Math.PI / 2, 0]}
            isRotating={isRotating}
          />
          <ForestHouse
            scale={screenScale}
            position={screenPosition}
            rotation={[Math.PI / 12, -Math.PI / 3, 0]}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;

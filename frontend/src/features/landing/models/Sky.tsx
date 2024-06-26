/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import scene from '../../../assets/3d/sky/scene.glb';

type GLTFResult = GLTF & {
  nodes: {
    Object001_Material__25__background_JPG_002_0: THREE.Mesh;
  };
  materials: {
    ['Material__25__background_JPG_002.001']: THREE.MeshBasicMaterial;
  };
};

type SkyProps = JSX.IntrinsicElements['group'] & {
  isRotating: boolean;
};

export function Sky(props: SkyProps) {
  const { nodes, materials } = useGLTF(scene) as GLTFResult;
  const skyRef = useRef<THREE.Group>(null!);
  const { isRotating } = props;

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current!.rotation.y += 0.06 * delta;
    }
  });

  return (
    <group {...props} ref={skyRef} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.5479}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object001_Material__25__background_JPG_002_0.geometry}
          material={materials['Material__25__background_JPG_002.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(scene);

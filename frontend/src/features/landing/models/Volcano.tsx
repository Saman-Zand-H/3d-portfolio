/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Animateria (https://sketchfab.com/Animateria)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/volcano-island-lowpoly-4a6591dc9fee40d8bfda8350683af9af
Title: Volcano Island Lowpoly
*/

import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import scene from '../../../assets/3d/volcano/scene.glb';
import { useFrame, useThree } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Clouds_Clouds_0: THREE.Mesh;
    hammock_hammock_0: THREE.Mesh;
    Tequila_Bottle_Tequila_Bottle_0: THREE.Mesh;
    skeleton_skeleton_0: THREE.Mesh;
    Pyramid_Pyramid_0: THREE.Mesh;
    Island_Grass_Island_Grass_0: THREE.Mesh;
    shrubbery_shrubbery_0: THREE.Mesh;
    Lava_bubble_Lava_bubble_0: THREE.Mesh;
    Volcanic_lava_Volcanic_lava_0: THREE.Mesh;
    Palm_tree_2_Palm_tree_2_0: THREE.Mesh;
    Palm_tree_1_Palm_tree_1_0: THREE.Mesh;
    Volacano_Sand_Volacano_Sand_0: THREE.Mesh;
    Ocean_Ocean_0: THREE.Mesh;
    Volcano_Grass_Volcano_Grass_0: THREE.Mesh;
    Volcano_Base_Volcano_Base_0: THREE.Mesh;
  };
  materials: {
    Clouds: THREE.MeshStandardMaterial;
    hammock: THREE.MeshStandardMaterial;
    Tequila_Bottle: THREE.MeshStandardMaterial;
    skeleton: THREE.MeshStandardMaterial;
    Pyramid: THREE.MeshStandardMaterial;
    Island_Grass: THREE.MeshStandardMaterial;
    shrubbery: THREE.MeshStandardMaterial;
    Lava_bubble: THREE.MeshStandardMaterial;
    Volcanic_lava: THREE.MeshStandardMaterial;
    Palm_tree_2: THREE.MeshStandardMaterial;
    Palm_tree_1: THREE.MeshStandardMaterial;
    Volacano_Sand: THREE.MeshStandardMaterial;
    Ocean: THREE.MeshStandardMaterial;
    Volcano_Grass: THREE.MeshStandardMaterial;
    Volcano_Base: THREE.MeshPhysicalMaterial;
  };
};

type VolcanoProps = JSX.IntrinsicElements['group'] & {
  isRotating: boolean;
  setIsRotating: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStage: React.Dispatch<React.SetStateAction<number | null>>;
};

export function Volcano({
  isRotating,
  setCurrentStage,
  setIsRotating,
  ...props
}: VolcanoProps) {
  const { nodes, materials } = useGLTF(scene) as GLTFResult;
  const volcanoRef = useRef<THREE.Group>(null!);
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const { gl, viewport } = useThree();
  const dampingFactor = 0.95;

  const handlePointerDown = (e: PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    lastX.current = e.clientX;
    setIsRotating(true);
  };

  const handlePointerUp = (e: PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsRotating(() => false);
  };

  const handlePointerMove = (e: PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isRotating) return;

    const clientX = e.clientX;
    const delta = (clientX - lastX.current) / viewport.width;

    volcanoRef.current!.rotation.y += delta * 0.01 * Math.PI;
    lastX.current = clientX;
    rotationSpeed.current = delta * 0.01 * Math.PI;
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches[0].clientX;
    lastX.current = clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches[0].clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      volcanoRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchmove', handleTouchMove);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (isRotating) {
      const rotation = volcanoRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(1);
          break;
        case normalizedRotation >= 2 && normalizedRotation <= 2.4:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 3 && normalizedRotation <= 4.75:
          setCurrentStage(3);
          break;
        default:
          setCurrentStage(null);
      }
    }

    rotationSpeed.current *= dampingFactor;

    if (Math.abs(rotationSpeed.current) < 0.001) {
      rotationSpeed.current = 0;
    }

    volcanoRef.current.rotation.y += rotationSpeed.current;
  });

  return (
    <group {...props} dispose={null} ref={volcanoRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Clouds_Clouds_0.geometry}
        material={materials.Clouds}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.hammock_hammock_0.geometry}
        material={materials.hammock}
        position={[180.5087, 1151.676, 5904.3247]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tequila_Bottle_Tequila_Bottle_0.geometry}
        material={materials.Tequila_Bottle}
        position={[3492.5471, 1112.3707, 3620.925]}
        rotation={[-1.3802, 0.112, -0.0216]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.skeleton_skeleton_0.geometry}
        material={materials.skeleton}
        position={[3541.6699, 1110.0945, 3568.021]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pyramid_Pyramid_0.geometry}
        material={materials.Pyramid}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Island_Grass_Island_Grass_0.geometry}
        material={materials.Island_Grass}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100.0406}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shrubbery_shrubbery_0.geometry}
        material={materials.shrubbery}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lava_bubble_Lava_bubble_0.geometry}
        material={materials.Lava_bubble}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Volcanic_lava_Volcanic_lava_0.geometry}
        material={materials.Volcanic_lava}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Palm_tree_2_Palm_tree_2_0.geometry}
        material={materials.Palm_tree_2}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Palm_tree_1_Palm_tree_1_0.geometry}
        material={materials.Palm_tree_1}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Volacano_Sand_Volacano_Sand_0.geometry}
        material={materials.Volacano_Sand}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ocean_Ocean_0.geometry}
        material={materials.Ocean}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Volcano_Grass_Volcano_Grass_0.geometry}
        material={materials.Volcano_Grass}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Volcano_Base_Volcano_Base_0.geometry}
        material={materials.Volcano_Base}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100.0406}
      />
    </group>
  );
}

useGLTF.preload(scene);

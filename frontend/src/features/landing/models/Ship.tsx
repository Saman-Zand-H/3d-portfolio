import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import scene from '../../../assets/3d/ship/scene.glb';

type GLTFResult = GLTF & {
  nodes: {
    polySurface14_Material002_0: THREE.Mesh;
    polySurface12_Material002_0: THREE.Mesh;
    polySurface20_Material002_0: THREE.Mesh;
    polySurface23_Material002_0: THREE.Mesh;
    polySurface22_Material002_0: THREE.Mesh;
    polySurface21_Material002_0: THREE.Mesh;
    polySurface24_Material002_0: THREE.Mesh;
    polySurface5_Material002_0: THREE.Mesh;
    polySurface18_Material002_0: THREE.Mesh;
    polySurface4_Material002_0: THREE.Mesh;
    polySurface3_Material002_0: THREE.Mesh;
    polySurface2_Material002_0: THREE.Mesh;
    polySurface1_Material002_0: THREE.Mesh;
    polySurface10_Material002_0: THREE.Mesh;
    polySurface16_Material002_0: THREE.Mesh;
    polySurface36_Material002_0: THREE.Mesh;
    polySurface33_Material002_0: THREE.Mesh;
    polySurface34_Material002_0: THREE.Mesh;
    polySurface31_Material002_0: THREE.Mesh;
    polySurface32_Material002_0: THREE.Mesh;
    polySurface37_Material002_0: THREE.Mesh;
    polySurface38_Material002_0: THREE.Mesh;
    polySurface28_Material002_0: THREE.Mesh;
    polySurface29_Material002_0: THREE.Mesh;
    polySurface27_Material002_0: THREE.Mesh;
    polySurface26_Material002_0: THREE.Mesh;
    Object_7: THREE.SkinnedMesh;
    Object_8: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    ['Material.002']: THREE.MeshStandardMaterial;
    ['Material.001']: THREE.MeshStandardMaterial;
  };
};

type ShipProps = JSX.IntrinsicElements['group'] & {
  isRotation: boolean;
};

export function Ship(props: ShipProps) {
  const { nodes, materials, animations } = useGLTF(scene) as GLTFResult;
  const shipRef = useRef<THREE.Group>(null!);
  const { actions } = useAnimations(animations, shipRef);
  const { isRotation } = props;

  useEffect(() => {
    if (actions['Take 001']) {
      if (isRotation) {
        actions['Take 001'].play();
        return;
      }
      actions['Take 001'].stop();
    }
  }, [isRotation, actions]);

  return (
    <group ref={shipRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="4615bb3e6d52406caa7564c250624490fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials['Material.002']}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials['Material.001']}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <group
                    name="Object_6"
                    position={[30.7905, 3.2846, -169.1906]}
                    rotation={[-3.1312, 0.0466, 1.6798]}
                    scale={100}
                  />
                  <group name="group1">
                    <group
                      name="Ship"
                      position={[30.7905, 3.2846, -169.1906]}
                      rotation={[-3.1312, 0.0466, 1.6798]}
                      scale={100}
                    >
                      <group name="polySurface35" />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(scene);

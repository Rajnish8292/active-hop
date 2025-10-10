"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import styles from "./3dBottle.module.css";

import { Model } from "@/component/Model/Bottiglia-compress";
import { OrbitControls } from "@react-three/drei";
import { DirectionalLight } from "three";
import { Environment } from "@react-three/drei";
import { useRef } from "react";

function Scene() {
  return (
    <>
      <axesHelper args={[10]} />
      <Model />
    </>
  );
}
function Interact() {
  const modelRef = useRef(null);

  useFrame(({ gl, scene, camera, clock }) => {
    if (!modelRef.current) {
      const [model] = scene.children.filter((child) => child.type == "Group");
      modelRef.current = model;
    }
    if (modelRef.current) {
      modelRef.current.rotation.y = clock.getElapsedTime();
      // modelRef.current.rotation.x = clock.getElapsedTime();
      // modelRef.current.rotation.z = clock.getElapsedTime();
    }
  });

  return null;
}
export default function Bottle() {
  return (
    <div className={styles.bottle_container}>
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        camera={{ position: [-10, 0, -10], fov: 30 }}
      >
        <Environment preset="sunset" />
        <Scene />
        <Interact />

        <directionalLight
          color={0xffffff}
          intensity={3}
          position={[-3, 10, -10]}
        />
        <hemisphereLight args={[0xffffff, 0x8d8d8d, 3]} />
        <ambientLight color={0x404040} intensity={0.8} />
      </Canvas>
    </div>
  );
}

"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import styles from "./3dBottle.module.css";
import { Model } from "@/component/Model/Bottiglia-compress";
import { Environment } from "@react-three/drei";
import { useLayoutEffect, useRef, useState } from "react";

function Scene() {
  return (
    <>
      <Model />
    </>
  );
}
function Interact() {
  const modelRef = useRef(null);

  useFrame(({ scene, clock }) => {
    if (!modelRef.current) {
      const [model] = scene.children.filter((child) => child.type == "Group");
      modelRef.current = model;
    }
    if (modelRef.current) {
      modelRef.current.rotation.y = clock.getElapsedTime();
    }
  });

  return null;
}

export default function Bottle() {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 10]);

  useLayoutEffect(() => {
    if (window.innerWidth < 600) {
      setCameraPosition([0, 0, 20]);
    }
  }, []);
  return (
    <div className={styles.bottle_container}>
      <Canvas
        style={{ height: "100vh", width: "100vw" }}
        camera={{ position: cameraPosition, fov: 30 }}
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

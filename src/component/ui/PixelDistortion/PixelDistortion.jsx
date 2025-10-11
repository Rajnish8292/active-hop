"use client";
import styles from "./PixelDistortion.module.css";
import Sketch from "@/app/utils/PixelDistortion";
import { useEffect, useRef } from "react";

const FRAGMENT_SHADER = `varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uDataTexture;
uniform vec4 uResolution;

void main() {
    vec2 newUv = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);
    newUv = vUv;
    vec4 color = texture2D(uTexture, newUv);
    vec4 offset = texture2D(uDataTexture, newUv);
    gl_FragColor = vec4(1, 0.5, 1, 1.);
    gl_FragColor = color;
    gl_FragColor = texture2D(uDataTexture, newUv);
    gl_FragColor = texture2D(uTexture, newUv - 0.02*offset.xy);
}`;

const VERTEX_SHADER = `
varying vec3 pos;
varying vec2 vUv;
void main() {
    vUv = uv;
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition; 
}`;

export default function PixelDistortion() {
  const pixelDistortionContainerRef = useRef(null);

  useEffect(() => {
    if (!pixelDistortionContainerRef?.current) return;
    const PixelDistortion = new Sketch({
      dom: pixelDistortionContainerRef.current,
      image: {
        imageUrl: "/hero.jpg",
        height: 2048,
        width: 2048,
      },
      shaders: {
        vertex: VERTEX_SHADER,
        fragment: FRAGMENT_SHADER,
      },
      setting: {
        relaxation: 0.9,
        strength: 0.15,
        mouse: 0.05,
      },
      pixel: { countX: 500, countY: 250 },
    });

    return () => {
      PixelDistortion.dispose();
    };
  }, []);

  return (
    <div
      ref={pixelDistortionContainerRef}
      className={styles.pixel_distortion_container}
      style={{}}
    ></div>
  );
}

"use client";
import styles from "./Wheel.module.css";

import { useCallback, useEffect, useRef, useState } from "react";
const toRadians = (degrees) => (degrees * Math.PI) / 180;
const getCoordinate = (theta, min_radius, max_radius) => {
  //   let num_x = min_radius * max_radius * Math.cos(theta);
  //   let num_y = min_radius * max_radius * Math.sin(theta);
  //   let den_left = Math.pow(min_radius, 2) + Math.pow(Math.cos(theta), 2);
  //   let den_right = Math.pow(max_radius, 2) + Math.pow(Math.sin(theta), 2);
  //   let den = Math.pow(den_left + den_right, 1 / 2);
  //   console.log({ num_x, num_y, den });
  return { x: max_radius * Math.cos(theta), y: min_radius * Math.sin(theta) };
};
export default function Wheel() {
  const [angle, setAngle] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const lastScrollY = useRef(0);
  const tickingRef = useRef(false);
  const wheelRef = useRef();

  const scrollHandler = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;

    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";
      setScrollDirection(direction);
      setAngle((prevAngle) => {
        const increment = direction === "down" ? 1 : -1;
        let newAngle = prevAngle + increment;
        newAngle = newAngle % 360;
        return newAngle;
      });

      lastScrollY.current = currentScrollY;
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    if (!wheelRef?.current || !window) return;
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <svg
        data-angle={angle}
        ref={wheelRef}
        className={styles.wheel}
        viewBox="-285 -285 570 570"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "520px", height: "520px" }}
      >
        <circle
          cx="0"
          cy="0"
          r="260"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        ></circle>
        <g
          data-marker="0"
          data-svg-origin="-6 -6"
          transform={`matrix(1,0,0,1,${260 * Math.cos(toRadians(angle))},${
            260 * Math.sin(toRadians(angle))
          })`}
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            transformOrigin: "0px 0px",
          }}
        >
          <line
            x1="-6"
            y1="0"
            x2="6"
            y2="0"
            stroke="black"
            strokeWidth="2"
          ></line>
          <line
            x1="0"
            y1="-6"
            x2="0"
            y2="6"
            stroke="black"
            strokeWidth="2"
          ></line>
        </g>
        <g
          data-marker="1"
          data-svg-origin="-6 -6"
          transform={`matrix(1,0,0,1,${260 * Math.cos(toRadians(angle + 90))},${
            260 * Math.sin(toRadians(angle + 90))
          })`}
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            transformOrigin: "0px 0px",
          }}
        >
          <line
            x1="-6"
            y1="0"
            x2="6"
            y2="0"
            stroke="black"
            strokeWidth="2"
          ></line>
          <line
            x1="0"
            y1="-6"
            x2="0"
            y2="6"
            stroke="black"
            strokeWidth="2"
          ></line>
        </g>
        <g
          data-marker="2"
          data-svg-origin="-6 -6"
          transform={`matrix(1,0,0,1,${
            260 * Math.cos(toRadians(angle + 180))
          },${260 * Math.sin(toRadians(angle + 180))})`}
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            transformOrigin: "0px 0px",
          }}
        >
          <line
            x1="-6"
            y1="0"
            x2="6"
            y2="0"
            stroke="black"
            strokeWidth="2"
          ></line>
          <line
            x1="0"
            y1="-6"
            x2="0"
            y2="6"
            stroke="black"
            strokeWidth="2"
          ></line>
        </g>
        <g
          data-marker="3"
          data-svg-origin="-6 -6"
          transform={`matrix(1,0,0,1,${
            260 * Math.cos(toRadians(angle + 270))
          },${260 * Math.sin(toRadians(angle + 270))})`}
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            transformOrigin: "0px 0px",
          }}
        >
          <line
            x1="-6"
            y1="0"
            x2="6"
            y2="0"
            stroke="black"
            strokeWidth="2"
          ></line>
          <line
            x1="0"
            y1="-6"
            x2="0"
            y2="6"
            stroke="black"
            strokeWidth="2"
          ></line>
        </g>
      </svg>

      <div className={styles.feature_container}>
        {[
          { feature: "ZERO COLORING", offset: 0 },
          { feature: "ZERO KCAL", offset: 90 },
          { feature: "ZERO SUGAR", offset: 180 },
          { feature: "ZERO ALCOHOL", offset: 270 },
        ].map((e) => {
          return (
            <div
              key={e.feature}
              style={{
                transform: `translate(${
                  getCoordinate(toRadians(angle + e.offset), 300, 350).x
                }px, ${
                  getCoordinate(toRadians(angle + e.offset), 300, 350).y
                }px)`,
              }}
              className={styles.feature_block}
            >
              {e.feature}
            </div>
          );
        })}
      </div>
    </>
  );
}

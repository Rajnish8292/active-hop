"use client";
import styles from "./Wheel.module.css";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
const toRadians = (degrees) => (degrees * Math.PI) / 180;
const getCoordinate = (theta, min_radius, max_radius) => {
  return { x: max_radius * Math.cos(theta), y: min_radius * Math.sin(theta) };
};
export default function Wheel() {
  const [angle, setAngle] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [radius, setRadius] = useState(260);
  const lastScrollY = useRef(0);
  const tickingRef = useRef(false);
  const wheelRef = useRef();

  // Adjust radius for mobile devices
  useLayoutEffect(() => {
    if (window.innerWidth < 600) {
      setRadius(150);
    }
  }, []);

  const scrollHandler = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;

    // used requestAnimationFrame for better performance and continous scroll tracking
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";
      setScrollDirection(direction);
      setAngle((prevAngle) => {
        const increment = direction === "down" ? 1.5 : -1.5;
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
  }, [scrollHandler]);

  return (
    <>
      <svg
        data-angle={angle}
        ref={wheelRef}
        className={styles.wheel}
        viewBox={`${-(radius + 25)} ${-(radius + 25)} ${2 * (radius + 25)} ${
          2 * (radius + 25)
        }`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: `${2 * radius}px`, height: `${2 * radius}px` }}
      >
        <circle
          cx="0"
          cy="0"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        ></circle>
        <g
          data-marker="0"
          data-svg-origin="-6 -6"
          transform={`matrix(1,0,0,1,${radius * Math.cos(toRadians(angle))},${
            radius * Math.sin(toRadians(angle))
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
          transform={`matrix(1,0,0,1,${
            radius * Math.cos(toRadians(angle + 90))
          },${radius * Math.sin(toRadians(angle + 90))})`}
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
            radius * Math.cos(toRadians(angle + 180))
          },${radius * Math.sin(toRadians(angle + 180))})`}
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
            radius * Math.cos(toRadians(angle + 270))
          },${radius * Math.sin(toRadians(angle + 270))})`}
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
                  getCoordinate(
                    toRadians(angle + e.offset),
                    radius + 50,
                    radius + 100
                  ).x
                }px, ${
                  getCoordinate(
                    toRadians(angle + e.offset),
                    radius + 50,
                    radius + 100
                  ).y
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

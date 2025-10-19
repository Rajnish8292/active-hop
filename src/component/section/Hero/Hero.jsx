"use client";
import PixelDistortion from "@/component/ui/PixelDistortion/PixelDistortion";
import styles from "./Hero.module.css";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { navigation_atom } from "@/store/navigation_atom";
import gsap from "gsap";
export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const initialDimension = useRef(null);

  const [currentSection, setCurrentSection] = useRecoilState(navigation_atom);

  const scrollHandler = useCallback((e) => {
    const heroElement = heroRef?.current;
    if (!heroElement) return;

    const pixelDistortionElement =
      heroElement?.children[0]?.children[0]?.children[0];
    if (!pixelDistortionElement) return;

    if (!initialDimension.current) {
      initialDimension.current = {
        height: pixelDistortionElement.offsetHeight,
        width: pixelDistortionElement.offsetWidth,
      };
    }

    const { scrollY } = window;
    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;
    const { width, height } = initialDimension.current;
    const widthScrollFactor = 1; // width changes faster
    const heightScrollFactor = 1; // height changes slower

    // it calcuate percenatge scrolled in hero section
    // formula = (scrolled / (total height of hero section)) * 100
    const percentageScrolled = (scrollY / (windowHeight * 1)) * 100;

    // minimum dimension to which pixel distortion element can animate
    let minDimension = Math.min(windowHeight, windowWidth) * 0.7;

    // calcuate new height, width and border radius based on percentage scrolled
    const calcuatedHeight = Math.max(
      height * (1 - percentageScrolled / 100) * heightScrollFactor,
      minDimension
    );
    const calcuatedWidth = Math.max(
      width * (1 - percentageScrolled / 100) * widthScrollFactor,
      minDimension
    );
    const calcuatedRadius = 20 + scrollY;

    gsap.to(pixelDistortionElement, {
      height: calcuatedHeight,
      width: calcuatedWidth,
      borderRadius: calcuatedRadius,
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero_section}>
      <div
        style={{
          height: "170vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          padding: "0 var(--spacing-md)",
        }}
      >
        {" "}
        <PixelDistortion />
      </div>

      <div className={styles.hero_description}>
        <div ref={textRef} className={styles.hero_description_text}>
          Composed of a few natural elements. Designed to quench your thirst
          with pleasure thanks to the subtle herbaceous and bitter note
          characteristic of hops. It transmits a sensation of purity that
          recalls the very essence of spring water, but enriched by a charge of
          natural freshness that makes it unique. It is a drink that offers an
          unexpected sensory experience designed for those looking for natural
          but not banal, rich but not artificial flavors
        </div>
      </div>
    </section>
  );
}

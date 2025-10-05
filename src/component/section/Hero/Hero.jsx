"use client";
import PixelDistortion from "@/component/ui/PixelDistortion/PixelDistortion";
import styles from "./Hero.module.css";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/app/utils/ease";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  useGSAP(() => {
    if (!heroRef?.current || !textRef?.current) return;

    // const st = ScrollTrigger.create({
    //   trigger: heroRef.current,
    //   start: "top top",
    //   end: "bottom top",
    //   pin: true,
    //   scrub: true,
    //   onUpdate: (self) => {
    //     gsap.set(heroRef.current.children, {
    //       borderRadius: `${20 + 990 * self.progress}px`,
    //     });
    //   },
    // });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          gsap.set(heroRef.current.children[0], {
            borderRadius: `${20 + 980 * self.progress}px`,
            ease: EASE,
            duration: DURATION,
          });
        },
      },
    });

    tl.to(heroRef.current.children[0], {
      height: "500px",
      width: "500px",
      ease: EASE,
      duration: DURATION,
    }).to(
      textRef.current,
      {
        yPercent: -200,
        ease: EASE,
        duration: DURATION,
      },
      0.5
    );
  }, [heroRef?.current, textRef?.current]);
  return (
    <section ref={heroRef} className={styles.hero_section}>
      <PixelDistortion />
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

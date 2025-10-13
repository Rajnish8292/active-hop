"use client";
import PixelDistortion from "@/component/ui/PixelDistortion/PixelDistortion";
import styles from "./Hero.module.css";
import { useGSAP } from "@gsap/react";
import { useCallback, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE } from "@/app/utils/ease";
import { useRecoilState } from "recoil";
import { navigation_atom } from "@/store/navigation_atom";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [currentSection, setCurrentSection] = useRecoilState(navigation_atom);
  const enterHandler = useCallback(() => {
    setCurrentSection("Outdoor Inside");
  });
  const leaveHandler = useCallback(() => {
    setCurrentSection("");
  });
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        onEnter: enterHandler,
        onEnterBack: enterHandler,
        onLeave: leaveHandler,
        onLeaveBack: leaveHandler,
        onUpdate: (self) => {
          gsap.set(heroRef.current.children[0], {
            borderRadius: `${20 + 980 * self.progress}px`,
            ease: EASE,
            duration: DURATION * 2,
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
  }, []);
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

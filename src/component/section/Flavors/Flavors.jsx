"use client";
import { useRef } from "react";
import styles from "./Flavors.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Marquee from "@/component/ui/Marquee/Marquee";
import { DURATION, EASE } from "@/app/utils/ease";

export default function Flavors() {
  const sectionRef = useRef();
  const marquee1 = useRef();
  const marquee2 = useRef();
  const marquee3 = useRef();

  useGSAP(() => {
    if (!sectionRef?.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= 0.33) {
            // First section
            gsap.set(marquee1.current, {
              color: "var(--color-drop)",
              ease: EASE,
              duration: 0.3,
              overwrite: true,
            });
            gsap.set(marquee2.current, {
              color: "rgba(0, 0, 0, 0.1)",
              ease: EASE,
              duration: 0.3,
              overwrite: true,
            });
            gsap.set(marquee3.current, {
              color: "rgba(0, 0, 0, 0.1)",
              ease: EASE,
              duration: 0.3,
              overwrite: true,
            });

            gsap.set(marquee1.current.children, {
              animationPlayState: "paused",
            });
            gsap.set(marquee2.current.children, {
              animationPlayState: "running",
            });
            gsap.set(marquee3.current.children, {
              animationPlayState: "running",
            });
          }

          if (progress > 0.33 && progress <= 0.8) {
            // Second section
            gsap.set(marquee1.current, {
              color: "rgba(0, 0, 0, 0.1)",
              ease: EASE,
              duration: 0.3,
              overwrite: true,
            });
            gsap.set(marquee2.current, {
              color: "var(--color-trail)",
              ease: EASE,
              duration: 0.3,
              overwrite: true,
            });
            gsap.set(marquee3.current, {
              color: "rgba(0, 0, 0, 0.1)",
              ease: EASE,
              duration: 0.3,
              overwrite: true,
            });
            gsap.set(marquee1.current.children, {
              animationPlayState: "running",
            });
            gsap.set(marquee2.current.children, {
              animationPlayState: "paused",
            });
            gsap.set(marquee3.current.children, {
              animationPlayState: "running",
            });
          }

          if (progress > 0.8) {
            // Third section
            gsap.set(marquee1.current, {
              color: "rgba(0, 0, 0, 0.1)",
              ease: EASE,
              duration: 0.3,
              overwrite: true,
            });
            gsap.set(marquee2.current, {
              color: "rgba(0, 0, 0, 0.1)",
              ease: EASE,
              duration: 0.3,
              overwrite: true,
            });
            gsap.set(marquee3.current, {
              color: "var(--color-rad)",
              ease: EASE,
              duration: 0.3,
              overwrite: true,
            });
            gsap.set(marquee1.current.children, {
              animationPlayState: "running",
            });
            gsap.set(marquee2.current.children, {
              animationPlayState: "running",
            });
            gsap.set(marquee3.current.children, {
              animationPlayState: "paused",
            });
          }
        },
      },
    });

    tl.to(sectionRef.current.children, {
      yPercent: -50,
      ease: EASE,
    });
  }, [sectionRef?.current]);

  return (
    <section ref={sectionRef} style={{ height: "100vh", width: "100vw" }}>
      <div className={styles.marquee_container}>
        <Marquee
          text={"DROP"}
          count={16}
          direction={"left"}
          refernece={marquee1}
        />
        <Marquee
          text={"TRAIL"}
          count={16}
          direction={"right"}
          refernece={marquee2}
        />
        <Marquee
          text={"RAD"}
          count={16}
          direction={"left"}
          refernece={marquee3}
        />
      </div>
    </section>
  );
}

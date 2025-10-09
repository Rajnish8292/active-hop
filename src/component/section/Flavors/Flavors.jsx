"use client";
import { useCallback, useRef } from "react";
import styles from "./Flavors.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Marquee from "@/component/ui/Marquee/Marquee";
import { DURATION, EASE } from "@/app/utils/ease";
import { useRecoilState } from "recoil";
import { navigation_atom } from "@/store/navigation_atom";

export default function Flavors() {
  const sectionRef = useRef();
  const marquee1 = useRef();
  const marquee2 = useRef();
  const marquee3 = useRef();
  const hasTriggered = useRef(false);

  const [currentSection, setCurrentSection] = useRecoilState(navigation_atom);
  const enterHandler = useCallback(() => {
    if (!hasTriggered.current) {
      setCurrentSection("Flavors");
      hasTriggered.current = true;
    }
  }, []);
  const leaveHandler = useCallback(() => {
    setCurrentSection("");
    hasTriggered.current = false;
  }, []);
  useGSAP(() => {
    if (!sectionRef?.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: true,
        onEnterBack: enterHandler,
        onEnter: enterHandler,
        onLeaveBack: leaveHandler,
        onLeave: leaveHandler,

        onUpdate: (self) => {
          const progress = self.progress;
          console.log(progress);

          if (progress <= 0.232) {
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

          if (progress > 0.232 && progress <= 0.487) {
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

          if (progress >= 0.487) {
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
      yPercent: -100,
    });
  }, []);

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

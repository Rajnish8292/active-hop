"use client";
import { useCallback, useRef } from "react";
import styles from "./Flavors.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Marquee from "@/component/ui/Marquee/Marquee";
import { DURATION, EASE } from "@/app/utils/ease";
import { useRecoilState } from "recoil";
import { navigation_atom } from "@/store/navigation_atom";
import { flavor_atom } from "@/store/flavors_atom";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default function Flavors() {
  const marqueeContainerRef = useRef();
  const marquee1 = useRef();
  const marquee2 = useRef();
  const marquee3 = useRef();

  const [currentSection, setCurrentSection] = useRecoilState(navigation_atom);
  const [currentFlavor, setCurrentFlavor] = useRecoilState(flavor_atom);

  const currentFlavorRef = useRef(currentFlavor);

  /*
    optimize this function and reduced 150 lines of code to just 20 lines
  */

  const pasuseMarquee = useCallback((num) => {
    [marquee1, marquee2, marquee3].forEach((marqueeRef, index) => {
      if (index === num) {
        marqueeRef.current.children[0].style.animationPlayState = "paused";
        switch (num) {
          case 0:
            marqueeRef.current.style.color = "var(--color-drop)";
            break;
          case 1:
            marqueeRef.current.style.color = "var(--color-trail)";
            break;
          case 2:
            marqueeRef.current.style.color = "var(--color-rad)";
            break;
        }
      } else {
        marqueeRef.current.children[0].style.animationPlayState = "running";
        marqueeRef.current.style.color = "var(--color-gray)";
      }
    });
  }, []);

  const updateHandler = useCallback((self) => {
    const progress = self.progress;
    marqueeContainerRef.current.children[0].style.transform = `translateY(${
      110 - progress * 220
    }px)`;

    if (progress <= 0.432) {
      if (currentFlavorRef.current == "drop") return;
      setCurrentFlavor({
        name: "drop",
        url: "texture/ActiveHop_etichetta__01_drop.webp",
      });
      pasuseMarquee(0);
      currentFlavorRef.current = "drop";
    } else if (progress > 0.432 && progress <= 0.787) {
      if (currentFlavorRef.current == "trail") return;
      setCurrentFlavor({
        name: "trail",
        url: "texture/ActiveHop_etichetta__01_trail.webp",
      });
      pasuseMarquee(1);
      currentFlavorRef.current = "trail";
    } else {
      if (currentFlavorRef.current == "rad") return;
      setCurrentFlavor({
        name: "rad",
        url: "texture/ActiveHop_etichetta__01_rad.webp",
      });

      pasuseMarquee(2);
      currentFlavorRef.current = "rad";
    }
  }, []);

  useGSAP(() => {
    if (!marqueeContainerRef?.current) return;
    ScrollTrigger.create({
      trigger: marqueeContainerRef.current,
      start: "top center",
      end: "bottom center",
      onUpdate: updateHandler,
    });
  }, []);

  return (
    <section style={{ height: "auto", width: "100vw" }}>
      <div
        ref={marqueeContainerRef}
        style={{ height: "500vh", width: "100vw" }}
      >
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
      </div>
    </section>
  );
}

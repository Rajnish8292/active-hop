"use client";
import Wheel from "@/component/ui/Wheel/Wheel";
import styles from "./Feature.module.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
export default function Feature() {
  const sectionRef = useRef(null);
  useGSAP(() => {
    if (!sectionRef?.current) return;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=400%",
      pin: true,
    });
  }, [sectionRef?.current]);

  return (
    <section className={styles.feature} ref={sectionRef}>
      <Wheel />
      <div className={styles.detail}>
        <p>
          Activehop has been crafted with the goal of &quot;the rest is
          zero&quot;. 0 sugars, carbohydrates, fats and alcohol. The ingredients
          chosen are all of natural origin, without colorants to make the
          experience even purer and more genuine. All elements are naturally
          lactose-free and vegan friendly.
        </p>
      </div>
    </section>
  );
}

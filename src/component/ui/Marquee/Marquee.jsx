"use client";
import styles from "./Marquee.module.css";

export default function Marquee({ text, count, direction, theme, refernece }) {
  return (
    <div ref={refernece} className={styles.marquee}>
      <div
        className={
          direction == "left" ? styles.marquee_left : styles.marquee_right
        }
      >
        {[...Array(count)].map((_, i) => (
          <div key={i} className={styles.marquee_item}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

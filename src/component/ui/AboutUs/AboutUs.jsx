"use client";
import { DURATION, EXIT_DURATION } from "@/app/utils/ease";
import styles from "./AboutUs.module.css";
import { motion } from "motion/react";
export default function AboutUs() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: EXIT_DURATION }}
      style={{
        width: "600px",
        padding: "var(--spacing-md)",
        marginTop: "var(--spacing-lg)",
      }}
    >
      <p>
        I am{" "}
        <span
          className={styles.link}
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/rajnish-raj-9139602a4/",
              "__blank"
            );
          }}
        >
          Rajnish Raj
        </span>
        , and I developed this website to enhance my skills in GSAP, Framer
        Motion, and React Three Fiber. The design and interaction are inspired
        by the Awwwards-nominated site{" "}
        <span
          className={styles.link}
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            window.open("https://www.active-hop.com/", "__blank");
          }}
        >
          active-hop.com
        </span>
        .
      </p>
    </motion.div>
  );
}

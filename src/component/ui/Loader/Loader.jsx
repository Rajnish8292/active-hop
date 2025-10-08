"use client";
import styles from "./Loader.module.css";
import { motion } from "motion/react";
export default function Loader(args) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.loader}
    >
      <div className={styles.typewriter}>
        <p>LOADING</p>
      </div>
    </motion.div>
  );
}

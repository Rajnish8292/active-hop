import { EXIT_DURATION } from "@/app/utils/ease";
import Button from "../Button/Button";
import styles from "./Cart.module.css";
import { motion } from "motion/react";
export default function Cart() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: EXIT_DURATION }}
      className={styles.cart}
    >
      <p>Looks like you haven’t added anything yet, let’s get you started!</p>
      <div style={{ marginTop: "var(--spacing-md)" }}>
        <Button
          text={"Continue Shopping >"}
          bgColor={"rgba(255, 255, 255, 0.7)"}
          textColor="black"
        />
      </div>
    </motion.div>
  );
}

import Button from "../Button/Button";
import styles from "./Product.module.css";
import Image from "next/image";
import { motion } from "motion/react";
import { DURATION, EXIT_DURATION } from "@/app/utils/ease";
export default function Product() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: EXIT_DURATION }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ duration: EXIT_DURATION }}
        className={styles.product_container}
        style={{}}
      >
        <div className={[styles.product, "blurred_bg"].join(" ")}>
          <Image
            src={"/ActivHop13221-Edit-Edit-2.webp"}
            height={256}
            width={256}
            style={{ objectFit: "cover" }}
            alt="discover trail"
          />
          <div className={styles.product_title}>
            <span>Restoring.</span>
            <span>Natural.</span>
            <span>Tasty.</span>
          </div>
          <div style={{ padding: "var(--spacing-md)" }}>
            <Button text={"Discover Trail"} bgColor={"var(--color-trail)"} />
          </div>
        </div>
        <div className={[styles.product, "blurred_bg"].join(" ")}>
          <Image
            src={
              "/ActivHop13312-Edit-Edit-2_b64acd1f-fd7b-472a-9a25-51b01adc0207.webp"
            }
            height={256}
            width={256}
            style={{ objectFit: "cover" }}
            alt="discover rad"
          />
          <div className={styles.product_title}>
            <span>Rehydrating.</span>
            <span>Fit.</span>
            <span>Fresh.</span>
          </div>
          <div style={{ padding: "var(--spacing-md)" }}>
            <Button text={"Discover Rad"} bgColor={"var(--color-rad)"} />
          </div>
        </div>
        <div className={[styles.product, "blurred_bg"].join(" ")}>
          <Image
            src={"/ActivHop13091-Edit-Edit-2.webp"}
            height={256}
            width={256}
            style={{ objectFit: "cover" }}
            alt="discover drop"
          />

          <div className={styles.product_title}>
            <span>Refreshing.</span>
            <span>Genuine.</span>
            <span>Pure.</span>
          </div>
          <div style={{ padding: "var(--spacing-md)" }}>
            <Button text={"Discover Drop"} bgColor={"var(--color-drop)"} />
          </div>
        </div>
      </motion.div>
      <div style={{}}>
        <Button
          text={"EXPLORE. RESEARCH. TASTE. TRY THE DISCOVERY BOX"}
          bgColor={"black"}
          textColor={"white"}
        />
      </div>
    </motion.div>
  );
}

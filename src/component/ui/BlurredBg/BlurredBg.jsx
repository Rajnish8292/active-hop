import { DURATION } from "@/app/utils/ease";
import { motion } from "motion/react";
export default function BlurredBg({ clickHandler }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION * 0.5 }}
      className="blurred_bg"
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 990,
        background: "rgba(0 0, 0, 0.2)",
      }}
      onClick={clickHandler}
    ></motion.div>
  );
}

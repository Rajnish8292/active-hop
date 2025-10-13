import styles from "./Navigation.module.css";

import { navigation_atom } from "@/store/navigation_atom";
import { useRecoilState } from "recoil";

import { AnimatePresence, motion } from "motion/react";
export default function Navigation() {
  const [currentSection, setCurrentSection] = useRecoilState(navigation_atom);

  return (
    <div className={[styles.navigation, "blurred_bg"].join(" ")}>
      <div>ACTIVEHOP</div>
      <AnimatePresence mode="wait">
        {currentSection != "" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {" "}
            &gt; {currentSection.toUpperCase()}
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
}

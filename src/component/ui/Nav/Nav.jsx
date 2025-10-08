import styles from "./Nav.module.css";
import Logo from "../Logo/Logo";
import { motion } from "motion/react";
import { delay } from "motion";
export default function Nav({
  productClickHandler,
  subscribeClickHandler,
  aboutClickHandler,
  cartClickHandler,
}) {
  const nav_item_initial = {
    opacity: 0,
  };
  const nav_item_animate = {
    opacity: 1,
  };
  const nav_item_transition = {
    delay: 1.75,
    duration: 0.5,
  };

  const logo_initial = {
    y: "100%",
  };

  const logo_animate = {
    y: 0,
  };
  const logo_transition = {
    delay: 0.75,
    duration: 0.5,
  };
  return (
    <header className={styles.nav}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "0 var(--spacing-md)",
        }}
      >
        <div
          className={styles.nav_item}
          onClick={() => {
            productClickHandler();
          }}
        >
          <motion.p
            initial={nav_item_initial}
            animate={nav_item_animate}
            transition={nav_item_transition}
          >
            PRODUCTS
          </motion.p>
        </div>
        <div
          className={styles.nav_item}
          onClick={() => {
            aboutClickHandler();
          }}
        >
          <motion.p
            initial={nav_item_initial}
            animate={nav_item_animate}
            transition={nav_item_transition}
          >
            ABOUT US
          </motion.p>
        </div>
      </div>

      <div
        className={styles.nav_item}
        style={{ margin: "0 var(--spacing-md)" }}
      >
        <motion.p
          initial={logo_initial}
          animate={logo_animate}
          transition={logo_transition}
        >
          <Logo height={25} />
        </motion.p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "0 var(--spacing-md)",
        }}
      >
        <div
          className={styles.nav_item}
          onClick={() => {
            subscribeClickHandler();
          }}
        >
          <motion.p
            initial={nav_item_initial}
            animate={nav_item_animate}
            transition={nav_item_transition}
          >
            SUBSCRIBE
          </motion.p>
        </div>
        <div
          className={styles.nav_item}
          onClick={() => {
            cartClickHandler();
          }}
        >
          <motion.p
            initial={nav_item_initial}
            animate={nav_item_animate}
            transition={nav_item_transition}
          >
            CART (0)
          </motion.p>
        </div>
      </div>
    </header>
  );
}

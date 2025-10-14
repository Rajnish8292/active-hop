import styles from "./Nav.module.css";

export default function Nav() {
  return <nav className={["blurred_bg", styles.nav].join(" ")}></nav>;
}

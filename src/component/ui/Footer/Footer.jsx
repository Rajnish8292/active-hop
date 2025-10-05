import Logo from "../Logo/Logo";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.list}>
        <span style={{ marginRight: "calc(var(--spacing-lg)*2)" }}>
          CONTACTS
        </span>
        <span>PRIVACY POLICY</span>
        <span>REFUND POLICY</span>
        <span>SHIPPING POLICY</span>
        <span>TERM OF SERVICE</span>
        <span>CREDIT</span>
      </div>
      <div style={{ transform: "translate(0, 25%)" }}>
        <Logo height={15} />
      </div>
    </div>
  );
}

import styles from "./Button.module.css";
export default function Button({ text, bgColor, textColor = "black" }) {
  return (
    <button
      className={styles.button}
      style={{ background: bgColor, color: textColor }}
    >
      {text}
    </button>
  );
}

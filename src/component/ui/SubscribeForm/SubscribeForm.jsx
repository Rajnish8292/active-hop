import { useCallback, useState } from "react";
import Button from "../Button/Button";
import styles from "./SubscribeForm.module.css";
import { motion } from "motion/react";
import { EXIT_DURATION } from "@/app/utils/ease";
export default function SubscribeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const submitHandler = useCallback(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isError = false;
    if (name.length == 0) {
      setIsNameError(true);
      isError = true;
    } else {
      setIsNameError(false);
    }

    if (!emailRegex.test(email)) {
      setIsEmailError(true);
      isError = true;
    } else {
      setIsEmailError(false);
    }

    if (!isError) {
      alert("you are subscribed to our newsletter.");
    }
  }, [email, name, setIsEmailError, setIsNameError]);
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: EXIT_DURATION }}
      className={styles.form}
    >
      <p style={{ padding: "var(--spacing-md) 0" }}>
        Subscribe to our newsletter and get exclusive offers.
      </p>

      <p style={{ padding: "var(--spacing-sm) 0" }}>Name</p>
      <input
        type="text"
        placeholder="Rajnish Raj"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {isNameError && <span style={{ color: "red" }}>fill the name input</span>}

      <p style={{ padding: "var(--spacing-sm) 0" }}>Email*</p>
      <input
        type="email"
        placeholder="rajnish81018@gmail.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {isEmailError && (
        <span style={{ color: "red" }}>fill correct email adress</span>
      )}

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          style={{
            height: 15,
            width: 15,
            transform: "translate(0, 50%)",
            marginRight: "10px",
            outline: "none",
          }}
        />
        <p>
          I agree to receive promotional communications and confirm that I have
          read the privacy policy.
        </p>
      </div>
      <div style={{ margin: "var(--spacing-md) 0" }} onClick={submitHandler}>
        <Button
          text={"ISCRIVITI ALLA NEWSLETTER"}
          bgColor={"black"}
          textColor={"white"}
        />
      </div>
    </motion.div>
  );
}

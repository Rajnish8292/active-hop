"use client";

import Loader from "@/component/ui/Loader/Loader";
import styles from "./Header.module.css";
import Nav from "../Nav/Nav";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Header() {
  const ref = useRef();
  const [isRendered, setIsRendered] = useState(false);

  useGSAP(() => {
    setTimeout(() => {
      gsap.to(ref.current, {
        height: "auto",
      });
    }, 1000);

    setTimeout(() => {
      setIsRendered(true);
      gsap.to(ref.current, {
        height: "auto",
      });
    }, 3000);
  }, []);
  return (
    <div className={[styles.header, "blurred_bg"].join(" ")} ref={ref}>
      <div style={{ width: "100vw" }}>
        <Loader />
        <Nav />
        {isRendered && (
          <div
            style={{
              height: "200px",
              marginTop: "20px",
              background: "rgba(255, 0, 0, 0.3)",
              borderRadius: "60px",
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

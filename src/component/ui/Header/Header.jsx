/*
  state = "loading"
  state = "normal"
  state = "product"
  state = "suscribe"

*/
"use client";
import styles from "./Header.module.css";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { DURATION, EASE } from "@/app/utils/ease";
import Logo from "../Logo/Logo";

const styling = {
  loading: {
    header: {
      width: "100%",
      height: "100%",
      borderRadius: "100%",
    },
    loader: {
      opacity: 1,
    },
  },

  normal: {
    header: {
      width: "582px",
      height: "92px",
      borderRadius: "50px",
    },
    loader: {
      opacity: 0,
    },
    nav_child_1: {
      opacity: 1,
    },
    nav_child_2: {},
    nav_child_3: {},
  },
};

export default function Header() {
  const header_ref = useRef(null);
  const loader_ref = useRef(null);
  const nav_ref = useRef(null);

  const setStyling = useCallback(({ state, stylingDetail }) => {
    const tl = gsap.timeline();
    for (let { elem, elemName, callbacks } of stylingDetail) {
      tl.to(elem, {
        ...styling[state][elemName],
        ...callbacks,
      });
    }
  }, []);

  useState(() => {
    setTimeout(() => {
      // setStyling({
      //   state: "normal",
      //   stylingDetail: [
      //     {
      //       elem: header_ref.current,
      //       elemName: "header",
      //       callbacks: {},
      //     },
      //     {
      //       elem: loader_ref.current,
      //       elemName: "loader",
      //       callbacks: {
      //         onComplete: () => {},
      //       },
      //     },
      //     {
      //       elem: nav_ref.current,
      //       elemName: "nav",
      //       callbacks: {},
      //     },
      //   ],
      // });
    }, 1000);
  }, []);

  return (
    <div ref={header_ref} className={["blurred_bg", styles.header].join(" ")}>
      <div ref={loader_ref} className={styles.loader}>
        <div className={styles.typewriter}>
          <p>LOADINGG</p>
        </div>
      </div>
      <div ref={nav_ref} className={styles.nav}>
        <div style={{ display: "flex", gap: "10px" }}>
          <div className={styles.nav_item}>
            <p>PRODUCTS</p>
          </div>
          <div className={styles.nav_item}>
            <p>ABOUT US</p>
          </div>
        </div>

        <div>
          <Logo height={25} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div className={styles.nav_item}>
            <p>SUBSCRIBE</p>
          </div>
          <div className={styles.nav_item}>
            <p>SUBSCRIBE</p>
          </div>
        </div>
      </div>
    </div>
  );
}

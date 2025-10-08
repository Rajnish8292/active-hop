/*
  state = "loading"
  state = "normal"
  state = "product"
  state = "suscribe"

*/
"use client";
import styles from "./Header.module.css";

import { useCallback, useEffect, useRef, useState } from "react";

import Nav from "../Nav/Nav";
import Loader from "../Loader/Loader";

import { AnimatePresence } from "motion/react";
import gsap from "gsap";
import { EASE } from "@/app/utils/ease";
import Product from "../Product/Product";
import { redirect } from "next/dist/server/api-utils";

const state = {
  normal: {
    name: "normal",
    isLoaderRendered: false,
    isNavRendered: true,
    isProductRendered: false,
    headerStyle: {
      height: "auto",
      width: "auto",
      borderRadius: "60px",
    },
  },
  product: {
    name: "product",
    isLoaderRendered: false,
    isNavRendered: true,
    isProductRendered: true,

    headerStyle: {
      height: "600px",
      width: "800px",
      borderRadius: "var(--radius-lg)",
    },
  },
};

export default function Header() {
  const [isLoaderRendered, setIsLoaderRendered] = useState(true);
  const [isNavRendered, setIsNavRendered] = useState(false);
  const [isProductRendered, setIsProductRendered] = useState(false);
  const headerRef = useRef(null);

  const toState = (state) => {
    if (state.name == "normal") {
      if (isLoaderRendered != state.isLoaderRendered)
        setIsLoaderRendered(state?.isLoaderRendered);
      if (isNavRendered != state.isNavRendered)
        setIsNavRendered(state?.isNavRendered);
      // waiting for 1 second to render nav component for  calcuating height and width
      setTimeout(() => {
        const tween = gsap.to(headerRef.current, {
          ...state.headerStyle,
          ease: EASE,
          duration: 2,
        });
      }, 1000);
    }

    if (state.name == "product") {
      const tween = gsap.to(headerRef.current, {
        ...state.headerStyle,
        ease: EASE,
        duration: 1.5,
        onComplete: (self) => {},
        onUpdate: function () {
          if (this.progress() >= 0.3) {
            if (isProductRendered != state.isProductRendered)
              setIsProductRendered(state?.isProductRendered);
          }
        },
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      toState(state.normal);
    }, 2000);
    // setTimeout(() => {
    //   toState(state.product);
    // }, 4000);
  }, []);

  return (
    <>
      <div
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
      ></div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className={["blurred_bg", styles.header].join(" ")}
          ref={headerRef}
        >
          <AnimatePresence mode="wait">
            {isLoaderRendered && <Loader key={"loader"} />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isNavRendered && (
              <Nav
                key={"nav"}
                productClickHandler={() => {
                  toState(state.product);
                }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isProductRendered && <Product />}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

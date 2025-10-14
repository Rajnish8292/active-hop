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
import { DURATION, EASE, EXIT_DURATION } from "@/app/utils/ease";
import Product from "../Product/Product";
import { redirect } from "next/dist/server/api-utils";
import BlurredBg from "../BlurredBg/BlurredBg";
import SubscribeForm from "../SubscribeForm/SubscribeForm";
import AboutUs from "../AboutUs/AboutUs";
import Cart from "../Cart/Cart";

const state = {
  normal: {
    name: "normal",
    isLoaderRendered: false,
    isNavRendered: true,
    isProductRendered: false,
    isBgRendered: false,
    isSubscribeRendered: false,
    isAboutRendered: false,
    isCartRendered: false,
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
    isBgRendered: true,
    isSubscribeRendered: false,
    isAboutRendered: false,
    isCartRendered: false,

    headerStyle: {
      height: "600px",
      width: "800px",
      borderRadius: "var(--radius-lg)",
    },
  },
  subscribe: {
    name: "subscribe",
    isLoaderRendered: false,
    isNavRendered: true,
    isProductRendered: false,
    isBgRendered: true,
    isSubscribeRendered: true,
    isAboutRendered: false,
    isCartRendered: false,
    headerStyle: {
      height: "500px",
      width: "900px",
      borderRadius: "var(--radius-lg)",
    },
  },
  about: {
    name: "about",
    isLoaderRendered: false,
    isNavRendered: true,
    isProductRendered: false,
    isBgRendered: true,
    isSubscribeRendered: false,
    isAboutRendered: true,
    isCartRendered: false,
    headerStyle: {
      height: "220px",
      width: "700px",
      borderRadius: "var(--radius-lg)",
    },
  },

  cart: {
    name: "cart",
    isLoaderRendered: false,
    isNavRendered: true,
    isProductRendered: false,
    isBgRendered: true,
    isSubscribeRendered: false,
    isAboutRendered: false,
    isCartRendered: true,
    headerStyle: {
      height: "250px",
      width: "600px",
      borderRadius: "var(--radius-lg)",
    },
  },
  backToNormal: {
    name: "backToNormal",
    isLoaderRendered: false,
    isNavRendered: true,
    isProductRendered: false,
    isBgRendered: false,
    isSubscribeRendered: false,
    isAboutRendered: false,
    isCartRendered: false,
    headerStyle: {
      height: "auto",
      width: "auto",
      borderRadius: "60px",
    },
  },
};

export default function Header() {
  const [isLoaderRendered, setIsLoaderRendered] = useState(true);
  const [isNavRendered, setIsNavRendered] = useState(false);
  const [isProductRendered, setIsProductRendered] = useState(false);
  const [isBgRendered, setIsBgRendered] = useState(false);
  const [isSubscribeRendered, setIsSuscribeRendered] = useState(false);
  const [isAboutRendered, setIsAboutRendered] = useState(false);
  const [isCartRendered, setIsCartRendered] = useState(false);
  const headerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentTweenRef = useRef(null);

  const toState = useCallback(
    (state) => {
      if (isAnimatingRef.current) return; // Prevent state changes while animating
      isAnimatingRef.current = true;

      if (currentTweenRef.current) {
        currentTweenRef.current.kill(); // Kill any running animation before starting new
      }

      if (state.name === "normal") {
        if (isLoaderRendered !== state.isLoaderRendered)
          setIsLoaderRendered(state.isLoaderRendered);
        if (isNavRendered !== state.isNavRendered)
          setIsNavRendered(state.isNavRendered);
        setTimeout(() => {
          currentTweenRef.current = gsap.to(headerRef.current, {
            ...state.headerStyle,
            ease: EASE,
            duration: DURATION,
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          });
        }, 1000);
      }

      if (state.name === "product") {
        setIsBgRendered(state.isBgRendered);
        setIsSuscribeRendered(state.isSubscribeRendered);
        setIsAboutRendered(state.isAboutRendered);
        setIsCartRendered(state.isCartRendered);
        currentTweenRef.current = gsap.to(headerRef.current, {
          ...state.headerStyle,
          ease: EASE,
          duration: 1.5,
          onUpdate: function () {
            if (this.progress() >= 0.3) {
              if (isProductRendered !== state.isProductRendered)
                setIsProductRendered(state.isProductRendered);
            }
          },
          onComplete: () => {
            isAnimatingRef.current = false;
          },
          onInterrupt: () => {
            isAnimatingRef.current = false;
          },
        });
      }

      if (state.name === "subscribe") {
        setIsProductRendered(state.isProductRendered);
        setIsAboutRendered(state.isAboutRendered);
        setIsCartRendered(state.isCartRendered);
        setIsBgRendered(state.isBgRendered);
        currentTweenRef.current = gsap.to(headerRef.current, {
          ...state.headerStyle,
          ease: EASE,
          duration: 1.5,
          onUpdate: function () {
            if (this.progress() >= 0.3) {
              if (isSubscribeRendered !== state.isSubscribeRendered)
                setIsSuscribeRendered(state.isSubscribeRendered);
            }
          },
          onComplete: () => {
            isAnimatingRef.current = false;
          },
          onInterrupt: () => {
            isAnimatingRef.current = false;
          },
        });
      }

      if (state.name === "about") {
        setIsProductRendered(state.isProductRendered);
        setIsSuscribeRendered(state.isSubscribeRendered);
        setIsCartRendered(state.isCartRendered);
        setIsBgRendered(state.isBgRendered);
        currentTweenRef.current = gsap.to(headerRef.current, {
          ...state.headerStyle,
          ease: EASE,
          duration: 1.5,
          onUpdate: function () {
            if (this.progress() >= 0.3) {
              if (isAboutRendered !== state.isAboutRendered)
                setIsAboutRendered(state.isAboutRendered);
            }
          },
          onComplete: () => {
            isAnimatingRef.current = false;
          },
          onInterrupt: () => {
            isAnimatingRef.current = false;
          },
        });
      }

      if (state.name === "cart") {
        setIsProductRendered(state.isProductRendered);
        setIsSuscribeRendered(state.isSubscribeRendered);
        setIsAboutRendered(state.isAboutRendered);
        setIsBgRendered(state.isBgRendered);
        currentTweenRef.current = gsap.to(headerRef.current, {
          ...state.headerStyle,
          ease: EASE,
          duration: 1.5,
          onUpdate: function () {
            if (this.progress() >= 0.3) {
              if (isCartRendered !== state.isCartRendered)
                setIsCartRendered(state.isCartRendered);
            }
          },
          onComplete: () => {
            isAnimatingRef.current = false;
          },
          onInterrupt: () => {
            isAnimatingRef.current = false;
          },
        });
      }

      if (state.name === "backToNormal") {
        setIsProductRendered(state.isProductRendered);
        setIsSuscribeRendered(state.isSubscribeRendered);
        setIsAboutRendered(state.isAboutRendered);
        setIsCartRendered(state.isCartRendered);
        setTimeout(() => {
          setIsBgRendered(state.isBgRendered);
          currentTweenRef.current = gsap.to(headerRef.current, {
            ...state.headerStyle,
            ease: EASE,
            duration: DURATION,
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          });
        }, EXIT_DURATION * 1000 + 200);
      }
    },
    [
      isAboutRendered,
      isCartRendered,
      isLoaderRendered,
      isNavRendered,
      isProductRendered,
      isSubscribeRendered,
    ]
  );

  const bgClickHandler = useCallback(() => {
    toState(state.backToNormal);
  }, [toState]);

  useEffect(() => {
    setTimeout(() => {
      toState(state.normal);
    }, 1000);
  }, [toState]);

  return (
    <>
      {isBgRendered && <BlurredBg clickHandler={bgClickHandler} />}
      <div
        style={{
          height: "100vh",
          width: "100vw",
          pointerEvents: "none",
          position: "fixed",
          bottom: 0,
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
                subscribeClickHandler={() => {
                  toState(state.subscribe);
                }}
                aboutClickHandler={() => {
                  toState(state.about);
                }}
                cartClickHandler={() => {
                  toState(state.cart);
                }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isProductRendered && <Product />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isSubscribeRendered && <SubscribeForm />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isAboutRendered && <AboutUs />}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isCartRendered && <Cart />}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

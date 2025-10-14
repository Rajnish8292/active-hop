"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
/*

  working - if user scroll 75% of scrollable height then we put first children at last

*/
export default function LoopScroll({ children }) {
  const pageRef = useRef();
  const [childs, setChilds] = useState(React.Children.toArray(children));
  const hasReorderedRef = useRef(false); // prevent multiple triggers

  const scrollHandler = useCallback(() => {
    if (!pageRef.current) return;

    const scrollableHeight = pageRef.current.offsetHeight - window.innerHeight;
    const scrollY = window.scrollY;
    const scrolledPercentage = (scrollY / scrollableHeight) * 100;

    if (scrolledPercentage >= 75 && !hasReorderedRef.current) {
      hasReorderedRef.current = true;

      // Move first child to the end
      setChilds((prev) => {
        const newChilds = [...prev];
        newChilds.push(newChilds.shift());
        return newChilds;
      });
    }

    // Reset trigger when user scrolls back up
    if (scrolledPercentage < 60) {
      hasReorderedRef.current = false;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [scrollHandler]);
  return (
    <>
      <div ref={pageRef}>{childs}</div>
    </>
  );
}

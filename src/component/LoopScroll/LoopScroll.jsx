"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
/*

  working - if user scroll 75% of scrollable height then we put first children at last

*/
export default function LoopScroll({ children }) {
  const pageRef = useRef();
  const [childs, setChilds] = useState(React.Children.toArray(children));

  return (
    <>
      <div ref={pageRef}>{childs}</div>
    </>
  );
}

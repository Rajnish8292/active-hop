"use client";

import React, { useEffect, useState } from "react";

export default function LoopScroll({ children }) {
  const [childs, setChilds] = useState(React.Children.toArray(children));
  useEffect(() => {
    window.addEventListener("scroll", (e) => {});
  });
  return <>{childs}</>;
}

"use client";

import { RecoilRoot } from "recoil";

export default function RecoilRootComponent({ children }) {
  return (
    <>
      <RecoilRoot>{children}</RecoilRoot>
    </>
  );
}

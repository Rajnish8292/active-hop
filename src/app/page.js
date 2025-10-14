"use client";

import styles from "./page.module.css";
// import Hero from "@/component/section/Hero/Hero";
// import Flavors from "@/component/section/Flavors/Flavors";
// import Feature from "@/component/section/feature/Feature";
import LoopScroll from "@/component/LoopScroll/LoopScroll";
import Footer from "@/component/ui/Footer/Footer";
import Navigation from "@/component/ui/Navigation/Navigation";
import Bottle from "@/component/ui/3dBottle/3dBottle";
import { RecoilRoot } from "recoil";
import SmoothScroll from "@/component/SmoothScroll/SmoothScroll";
import { lazy } from "react";

const Hero = lazy(() => import("@/component/section/Hero/Hero"));
const Flavors = lazy(() => import("@/component/section/Flavors/Flavors"));
const Feature = lazy(() => import("@/component/section/feature/Feature"));
export default function Home() {
  return (
    <>
      <RecoilRoot>
        <Navigation />
        <Bottle />
        <Hero key={"hero"} />
        <Flavors key={"flavors"} />
        <Feature key={"feature"} />
        <Footer key={"footer"} />
      </RecoilRoot>
    </>
  );
}

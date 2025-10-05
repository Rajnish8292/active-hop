import styles from "./page.module.css";
import Hero from "@/component/section/Hero/Hero";
import Flavors from "@/component/section/Flavors/Flavors";
import Feature from "@/component/section/feature/Feature";
import LoopScroll from "@/component/LoopScroll/LoopScroll";
import Footer from "@/component/ui/Footer/Footer";
export default function Home() {
  return (
    <>
      <LoopScroll>
        <Hero key={"hero"} />
        <Flavors key={"flavors"} />
        <Feature key={"feature"} />
        <Footer key={"footer"} />
      </LoopScroll>
    </>
  );
}

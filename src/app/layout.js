import Header from "@/component/ui/Header/Header";
import "./globals.css";
import SmoothScroll from "@/component/SmoothScroll/SmoothScroll";

export const metadata = {
  title: "Active hop",
  description: "Developed by Rajnish Raj",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        {/* <Header /> */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

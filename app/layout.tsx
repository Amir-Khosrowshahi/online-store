import Layout from "@/app/components/layout/Layout";
import { Yekan_Bakh } from "./utils/font";
import "./globals.css";
import PersianDigitWrapper from "./components/PersianDigitWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fa'>
      <body className={Yekan_Bakh.className}>
        <PersianDigitWrapper>{children}</PersianDigitWrapper>
      </body>
    </html>
  );
}

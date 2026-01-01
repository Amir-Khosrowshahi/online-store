// Layout.tsx
import Header from "./MegaMenu";
import Footer from "./Footer";
export const dynamic = "force-dynamic";
import { pathname } from "next-extra/pathname";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

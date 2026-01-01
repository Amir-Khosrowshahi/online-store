import Header from "@/app/components/layout/MegaMenu";
import Footer from "@/app/components/layout/Footer";
export default function MainLayout({
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

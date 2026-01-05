import Footer from "@/shared/components/Footer";
import HeaderWrapper from "@/shared/components/header/HeaderWrapper";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderWrapper />
      <main className="grid min-h-[70dvh]">
        {children}
      </main>
      <Footer />
    </>
  );
}

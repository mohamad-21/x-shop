import Footer from "@/shared/components/Footer";
import Header from "@/shared/components/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="grid min-h-[70dvh]">
        {children}
      </main>
      <Footer />
    </>
  );
}

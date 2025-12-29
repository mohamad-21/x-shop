import Footer from "@/shared/components/Footer";
import Header from "@/shared/components/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col justify-center items-center min-h-[100dvh]">
      {children}
    </main>
  );
}

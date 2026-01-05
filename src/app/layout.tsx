import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/shared/components/ui/sonner";
import TopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: "X Shop",
    template: "%s / X Shop"
  },
  description: "X E-Commerce Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${inter.className} antialiased`}
      >
        {children}
        <Toaster />
        <TopLoader
          showSpinner={false}
          color="var(--primary)"
        />
      </body>
    </html>
  );
}

import Nav from "@/components/Nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Nav />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

import type { Metadata } from "next";
import "./globals.css";
// Providers
import { NextUIProvider } from "@nextui-org/react";
// Fonts
import { Fira_Code } from "next/font/google";
// Components
import NavBar from "./components/NavBar";

// If loading a variable font, you don't need to specify the font weight
const inter = Fira_Code({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "vsCode Like Blog",
  description: "vsCode Like Blog generated by jihokim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex w-full overflow-x-hidden`}>
        <NavBar />
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}

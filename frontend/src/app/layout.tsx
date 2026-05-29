// Importing the necessary modules 
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Creating the poppins font variable 
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Exporting the metadata for the app layout
export const metadata: Metadata = {
  title: "Todo App",
  description: `A simple and efficient todo app built with Next.js, TypeScript, and Tailwind CSS. 
                Manage your tasks with ease and stay organized throughout the day.`,
};

// Creating the root layout component for the app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

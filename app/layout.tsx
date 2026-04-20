import type { Metadata } from "next";
import { Inter, PT_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const serif = PT_Serif({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "CICS Alumni",
  description: "CICS Alumni Tracer System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans bg-[#F5F2EB]", inter.variable, serif.variable)}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

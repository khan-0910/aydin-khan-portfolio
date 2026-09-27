import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/system/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aydinkhan.vercel.app"),
  title: "Aydin Khan - Mechatronics & Automation",
  description:
    "Portfolio of Aydin Khan, a Mechatronics & Automation student at VIT Chennai interested in robotics, automation, electronics, programming and hands-on engineering.",
  keywords: [
    "Aydin Khan",
    "Mechatronics",
    "Automation",
    "Robotics",
    "VIT Chennai",
    "Engineering Portfolio",
  ],
  authors: [{ name: "Aydin Khan" }],
  openGraph: {
    title: "Aydin Khan - Mechatronics & Automation",
    description:
      "A digital engineering workshop. Turning ideas into machines, systems and working prototypes.",
    url: "https://aydinkhan.vercel.app",
    siteName: "Aydin Khan - Engineering Workshop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aydin Khan - Mechatronics & Automation",
    description:
      "A digital engineering workshop. Turning ideas into machines, systems and working prototypes.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#b7beae",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

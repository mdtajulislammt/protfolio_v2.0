import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Bebas_Neue, Playfair_Display, Cormorant_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MD Tajul Islam | Backend Developer & System Architect",
  description: "Backend Developer & Team Leader with deep expertise in designing scalable backend architectures, microservices, NestJS, Go, PostgreSQL, Docker, and distributed systems.",
  keywords: [
    "MD Tajul Islam",
    "Tajul Islam",
    "Backend Developer",
    "System Architect",
    "Team Leader",
    "NestJS",
    "Go",
    "Golang",
    "PostgreSQL",
    "Docker",
    "Microservices",
    "Backbencher Studio",
    "TechSoul",
    "Bangladesh"
  ],
  authors: [{ name: "MD Tajul Islam" }],
  openGraph: {
    title: "MD Tajul Islam | Backend Developer & System Architect",
    description: "Backend Developer & Team Leader specializing in scalable backend architectures, microservices, and database systems.",
    url: "https://devtajulportfolio.vercel.app",
    siteName: "MD Tajul Islam Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Tajul Islam | Backend Developer & System Architect",
    description: "Backend Developer & Team Leader specializing in scalable backend architectures, microservices, and database systems.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#dbeafe",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#dbeafe] text-black selection:bg-[#2563eb] selection:text-white antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

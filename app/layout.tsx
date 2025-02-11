import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import "./styles/globals.scss";
import "./styles/transitions.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omniswift Student Data",
  description: "Test example filterable data for omniswift tests",
  openGraph: {
    title: "Omniswift Student Data",
    description: "Test example filterable data for omniswift tests",
    type: "website",
    images: [
      {
        url: "https://omniswift-test.netlify.app/screenshort1.png",
        width: 1200,
        height: 630,
        alt: "Omniswift Student Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omniswift Student Data",
    description: "Test example filterable data for omniswift tests",
    images: ["https://omniswift-test.netlify.app/screenshort1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TikTok Car Quiz Generator",
  description: "Generator quizów samochodowych dla TikToka z AI",
  keywords: ["TikTok", "quiz", "samochody", "AI", "wideo"],
  authors: [{ name: "CarQuiz Team" }],
  openGraph: {
    title: "TikTok Car Quiz Generator",
    description: "Stwórz angażujący quiz samochodowy dla TikToka w kilka minut",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}

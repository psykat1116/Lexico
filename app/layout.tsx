import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import ExitModal from "@/components/modal/ExitModal";
import HeartsModal from "@/components/modal/HeartsModal";
import PracticeModal from "@/components/modal/PracticeModal";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  style: ["italic", "normal"],
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Lexico - Learn Languages Through Games & Challenges",
  description:
    "Lexico is a fun and interactive way to learn new languages through engaging games, challenges, and real-world scenarios. Whether you're a beginner or looking to refine your skills, our bite-sized lessons. Earn rewards, compete with friends, and track your progress as you master vocabulary, grammar, and pronunciation. With multiple languages to choose from, Lexico turns language learning into an exciting adventure. Start your journey today and make learning a language as fun as playing a game!",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://lexico.vercel.app/",
    siteName: "Lexico",
    title: "Lexico - Learn Languages Through Games & Challenges",
    description:
      "Lexico is a fun and interactive way to learn new languages through engaging games, challenges, and real-world scenarios. Whether you're a beginner or looking to refine your skills, our bite-sized lessons. Earn rewards, compete with friends, and track your progress as you master vocabulary, grammar, and pronunciation. With multiple languages to choose from, Lexico turns language learning into an exciting adventure. Start your journey today and make learning a language as fun as playing a game!",
    images: [
      {
        url: "/OpenGraph.png",
        width: 1200,
        height: 630,
        alt: "Lexico - Learn Languages Through Games & Challenges",
      },
    ],
  },
  authors: {
    url: "https://portfolio-one-gilt-34.vercel.app/",
    name: "Saikat Samanta",
  },
  keywords: [
    "Duolingo Clone",
    "Duolingo",
    "Language Learning",
    "Language Learning Games",
    "Language Learning Challenges",
    "Language Learning App",
    "Language Learning Website",
    "Lexico",
    "Lexico App",
    "Lexico Website",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, Outfit, Geist } from "next/font/google";
import "./globals.css";
import { NewsProvider } from "@/context/NewsContext";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { InvalidationProvider } from "@/components/providers/InvalidationProvider";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit-sans",
});

export const metadata: Metadata = {
  title: "News World",
  description: "World news headlines",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(playfair.variable, outfit.variable, geist.variable)}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className="font-outfit antialiased" suppressHydrationWarning>
        <QueryProvider>
          <InvalidationProvider>
            <BookmarkProvider>
              <NewsProvider>{children}</NewsProvider>
            </BookmarkProvider>
          </InvalidationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

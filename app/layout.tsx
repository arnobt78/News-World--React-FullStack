/**
 * Root Layout - Wraps all pages with providers, fonts, and SEO metadata.
 * This is a Server Component by default; children may be client components.
 */
import type { Metadata } from "next";
import { Playfair_Display, Outfit, Geist } from "next/font/google";
import "./globals.css";
import { NewsProvider } from "@/context/NewsContext";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { InvalidationProvider } from "@/components/providers/InvalidationProvider";
import { cn } from "@/lib/utils";

/* Google Fonts - loaded at build time, exposed as CSS variables for Tailwind */
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
  metadataBase: new URL("https://daily-world-news.vercel.app"),
  title: {
    default: "News World | Daily World News, Headlines & Search",
    template: "%s | News World",
  },
  description:
    "News World delivers the latest world news, headlines, and articles from thousands of sources. Browse by category, search keywords, and save bookmarks. Built with Next.js and GNews API.",
  keywords: [
    "news",
    "world news",
    "headlines",
    "daily news",
    "GNews API",
    "Next.js",
    "React",
    "news search",
    "bookmarks",
  ],
  authors: [
    {
      name: "Arnob Mahmud",
      url: "https://www.arnobmahmud.com",
    },
  ],
  creator: "Arnob Mahmud",
  publisher: "Arnob Mahmud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://daily-world-news.vercel.app",
    siteName: "News World",
    title: "News World | Daily World News, Headlines & Search",
    description:
      "News World delivers the latest world news, headlines, and articles from thousands of sources. Browse by category, search keywords, and save bookmarks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "News World | Daily World News, Headlines & Search",
    description:
      "News World delivers the latest world news, headlines, and articles from thousands of sources.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(playfair.variable, outfit.variable, geist.variable)}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('news-world-theme');var d=!(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches);document.documentElement.classList.toggle('dark',t?t==='dark':d);})();`,
          }}
        />
        <meta name="author" content="Arnob Mahmud (contact@arnobmahmud.com)" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className="font-outfit antialiased scrollbar-custom min-h-screen text-foreground" suppressHydrationWarning>
        {/* Provider chain: QueryProvider (React Query) → InvalidationProvider → BookmarkProvider → NewsProvider */}
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

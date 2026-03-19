"use client";

/**
 * Navbar - Top bar: logo, country/lang filters, refresh, theme toggle, nav links.
 * Active route uses same text color as hover (text-foreground).
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { RefreshCw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRefreshNews } from "@/hooks/useRefreshNews";
import { useNewsContext } from "@/context/NewsContext";
import { useBookmarks } from "@/context/BookmarkContext";
import { countries } from "@/data/countries";
import { languages } from "@/data/languages";

export default function Navbar() {
  const pathname = usePathname();
  const { refresh, isRefreshing } = useRefreshNews();
  const { filters, setCountry, setLang } = useNewsContext();
  const { bookmarkedArticles } = useBookmarks();

  const linkClass = (path: string, hiddenUntilSm = false) =>
    `font-outfit text-sm sm:text-base md:text-lg transition-colors ${
      hiddenUntilSm ? "hidden sm:inline " : ""
    }${pathname === path ? "text-foreground" : "text-foreground/80 hover:text-foreground"}`;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full min-h-16 px-4 sm:px-6 py-4 bg-transparent border-b border-border"
    >
      <div className="w-full min-h-[3.5rem] grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-playfair text-xl sm:text-2xl text-foreground tracking-wider hover:opacity-80 transition-opacity md:justify-self-start"
        >
          <Globe className="size-6 sm:size-7 md:size-8 opacity-80" />
          <span className="opacity-80">News World</span>
        </Link>

        <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center md:justify-self-center">
          <select
            value={filters.country}
            onChange={(e) => setCountry((e.target.value || "") as "")}
            className="bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-sm sm:text-base font-outfit outline-none focus:border-ring shrink-0"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={filters.lang}
            onChange={(e) => setLang((e.target.value || "") as "")}
            className="bg-muted text-foreground border border-border rounded-lg px-3 py-2 text-sm sm:text-base font-outfit outline-none focus:border-ring shrink-0"
          >
            <option value="">All Languages</option>
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4 md:justify-self-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => refresh()}
            disabled={isRefreshing}
            aria-label="Refresh news"
            className="text-foreground/80 hover:text-foreground hover:bg-muted size-9 sm:size-10 md:size-11"
          >
            <RefreshCw
              className={`size-4 sm:size-5 md:size-5 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
          <ThemeToggle />
          <Link href="/" className={linkClass("/", true)}>
            Home
          </Link>

          <Link href="/search" className={linkClass("/search")}>
            Search
          </Link>
          <Link
            href="/bookmarks"
            className={`relative inline-flex items-center ${linkClass("/bookmarks")}`}
          >
            Bookmarks
            <Badge
              variant="secondary"
              className="absolute -top-1.5 -right-3.5 min-w-5 h-5 px-1.5 rounded-full bg-[#0ea5e9] text-white border-0 text-xs font-semibold flex items-center justify-center shadow-md"
            >
              {bookmarkedArticles.length}
            </Badge>
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}

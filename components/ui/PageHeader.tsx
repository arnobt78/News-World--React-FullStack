"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRefreshNews } from "@/hooks/useRefreshNews";
import { useNewsContext } from "@/context/NewsContext";
import { countries } from "@/data/countries";
import { languages } from "@/data/languages";

export default function PageHeader() {
  const { refresh, isRefreshing } = useRefreshNews();
  const { filters, setCountry, setLang } = useNewsContext();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full min-h-[4rem] grid grid-cols-1 md:grid-cols-3 items-center gap-4 px-2 sm:px-4 py-4"
    >
      <Link
        href="/"
        className="flex items-center gap-2 font-playfair text-xl sm:text-2xl text-white tracking-wider hover:text-white/80 transition-colors md:justify-self-start"
      >
        <Globe className="size-6 sm:size-7 md:size-8 text-white/80" />
        <span className="text-white/80">News World</span>
      </Link>

      <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center md:justify-self-center">
        <select
          value={filters.country}
          onChange={(e) => setCountry((e.target.value || "") as "")}
          className="bg-[#0a0b0d] text-[#ddd] border border-[#333] rounded-lg px-3 py-2 text-sm sm:text-base font-outfit outline-none focus:border-[#b88efc] shrink-0"
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
          className="bg-[#0a0b0d] text-[#ddd] border border-[#333] rounded-lg px-3 py-2 text-sm sm:text-base font-outfit outline-none focus:border-[#b88efc] shrink-0"
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
          className="text-white/80 hover:text-white hover:bg-white/10 size-9 sm:size-10 md:size-11"
        >
          <RefreshCw
            className={`size-4 sm:size-5 md:size-5 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </Button>
        <ThemeToggle />
        <Link
          href="/"
          className="font-outfit text-sm sm:text-base md:text-lg text-white/80 hover:text-white transition-colors hidden sm:inline"
        >
          Home
        </Link>
        <Link
          href="/search"
          className="font-outfit text-sm sm:text-base md:text-lg text-white/80 hover:text-white transition-colors"
        >
          Search
        </Link>
        <Link
          href="/about"
          className="font-outfit text-sm sm:text-base md:text-lg text-white/80 hover:text-white transition-colors"
        >
          About
        </Link>
      </nav>
    </motion.header>
  );
}

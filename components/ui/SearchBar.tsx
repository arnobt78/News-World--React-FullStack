"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search news...",
  debounceMs = 300,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const debouncedSearch = useCallback(() => {
    onSearch(query.trim());
  }, [query, onSearch]);

  useEffect(() => {
    const timer = setTimeout(debouncedSearch, debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs, debouncedSearch]);

  return (
    <motion.div
      className={`flex items-center gap-2 rounded-xl border-2 transition-colors ${
        focused
          ? "border-[#b88efc] bg-white/5"
          : "border-[#333] bg-[#111214]"
      }`}
      animate={{ scale: focused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className="pl-4 text-[#888]">
        <i className="fa-solid fa-magnifying-glass" />
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 py-3 px-2 bg-transparent text-white placeholder-[#666] outline-none font-outfit text-sm sm:text-base md:text-lg"
        aria-label="Search news"
      />
    </motion.div>
  );
}

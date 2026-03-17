"use client";

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/context/BookmarkContext";
import type { Article } from "@/types/news";

const NO_IMG = "/images/no-img.png";

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  index?: number;
  isHeadline?: boolean;
}

export default function ArticleCard({
  article,
  onClick,
  index = 0,
  isHeadline = false,
}: ArticleCardProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const saved = isBookmarked(article.url);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`w-full rounded-xl relative cursor-pointer text-left overflow-hidden group ${
        isHeadline ? "h-64 sm:h-96 md:h-140" : "h-full min-h-60"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={article.image ?? NO_IMG}
        alt={article.title}
        suppressHydrationWarning
        onError={(e) => {
          e.currentTarget.src = NO_IMG;
        }}
        className="w-full h-full object-cover rounded-xl opacity-50 group-hover:opacity-60 transition-opacity duration-300"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(article.url, article);
        }}
        className="absolute top-3 right-3 p-2 sm:p-2.5 rounded-lg bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors z-10"
        aria-label={saved ? "Remove bookmark" : "Bookmark"}
      >
        <Bookmark
          className={`size-4 sm:size-5 md:size-5 ${saved ? "fill-current text-[#b88efc]" : ""}`}
        />
      </button>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-xl" />
      <div className="absolute left-0 bottom-0 w-full p-4 pr-12 rounded-b-xl">
        <h3
          suppressHydrationWarning
          className={`font-playfair text-white tracking-wider ${
            isHeadline
              ? "text-2xl sm:text-3xl md:text-4xl leading-tight"
              : "text-sm sm:text-base md:text-lg font-light leading-5"
          }`}
        >
          {article.title}
        </h3>
        {!isHeadline && article.source?.name && (
          <Badge
            variant="secondary"
            className="mt-1 bg-black/50 text-white/90 border-0 text-xs sm:text-sm"
            suppressHydrationWarning
          >
            {article.source.name}
          </Badge>
        )}
      </div>
    </motion.div>
  );
}

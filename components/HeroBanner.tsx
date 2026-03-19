"use client";

/**
 * HeroBanner - Cinemate-style hero: one large card at a time, auto-advance, dots, View Details.
 * Renders slide content only after mount to avoid SSR/client hydration mismatch (article order can differ).
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProxiedImageUrl } from "@/lib/imageProxy";
import type { Article } from "@/types/news";

const NO_IMG = "/images/no-img.png";
const HERO_INTERVAL_MS = 6000;

interface HeroBannerProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export default function HeroBanner({
  articles,
  onArticleClick,
}: HeroBannerProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const list = articles.slice(0, 5);

  useEffect(() => {
    if (!mounted || list.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, HERO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [mounted, list.length]);

  if (list.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-xl mb-6 relative h-64 sm:h-96 md:h-140 bg-muted/30">
      {mounted ? (
        <>
          <HeroSlide
            article={list[index]}
            index={index}
            onArticleClick={onArticleClick}
          />
          {list.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {list.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index
                      ? "bg-white scale-110"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

function HeroSlide({
  article,
  index,
  onArticleClick,
}: {
  article: Article;
  index: number;
  onArticleClick: (a: Article) => void;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`${article.url}-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        role="button"
        tabIndex={0}
        onClick={() => onArticleClick(article)}
        onKeyDown={(e) => e.key === "Enter" && onArticleClick(article)}
        className="absolute inset-0 cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getProxiedImageUrl(article.image)}
          alt={article.title}
          onError={(e) => {
            e.currentTarget.src = NO_IMG;
          }}
          className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-95 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent rounded-xl" />
        <div className="absolute left-0 bottom-0 top-0 flex flex-col justify-end p-6 md:p-10 max-w-2xl">
          <h2 className="font-playfair text-2xl sm:text-4xl md:text-5xl text-white font-semibold tracking-wider leading-tight">
            {article.title}
          </h2>
          {(article.description || article.content) && (
            <p className="font-outfit text-white/90 text-sm sm:text-base mt-2 line-clamp-3">
              {article.description || article.content}
            </p>
          )}
          <p className="font-outfit text-white/70 text-xs sm:text-sm mt-2">
            {article.source?.name ?? ""} ·{" "}
            {new Date(article.publishedAt).toLocaleDateString("en-US")}
          </p>
          <span className="inline-block mt-4 px-6 py-2.5 rounded-lg bg-[#0ea5e9] text-white font-outfit text-sm font-medium w-fit hover:opacity-90 transition-opacity">
            View Details
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

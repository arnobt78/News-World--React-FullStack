"use client";

/**
 * BannerSlider - Infinite film reel: duplicated strip, continuous scroll, seamless loop.
 * Renders reel only after mount to avoid SSR/client hydration mismatch (article order can differ).
 */
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProxiedImageUrl } from "@/lib/imageProxy";
import type { Article } from "@/types/news";

const NO_IMG = "/images/no-img.png";

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface BannerSliderProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  seed?: number;
}

const CARD_WIDTH = 280;
const CARD_GAP = 16;
const REEL_HEIGHT = 180;
const PX_PER_TICK = 0.8;
const TICK_MS = 16;

export default function BannerSlider({
  articles,
  onArticleClick,
  seed = 0,
}: BannerSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const bannerList =
    articles.length <= 10
      ? shuffle(articles, seed)
      : shuffle(articles, seed).slice(0, 10);

  const reelList = bannerList.length > 0 ? [...bannerList, ...bannerList] : [];
  const oneSetWidth =
    bannerList.length * CARD_WIDTH + (bannerList.length - 1) * CARD_GAP;

  useEffect(() => {
    if (!mounted) return;
    const el = scrollRef.current;
    if (!el || bannerList.length === 0) return;

    let scrollLeft = 0;
    const id = setInterval(() => {
      scrollLeft += PX_PER_TICK;
      if (scrollLeft >= oneSetWidth) scrollLeft = 0;
      el.scrollLeft = scrollLeft;
    }, TICK_MS);

    return () => clearInterval(id);
  }, [mounted, bannerList.length, oneSetWidth]);

  if (articles.length === 0) return null;

  return (
    <div
      className="w-full overflow-hidden rounded-xl mb-4 bg-muted/20"
      style={{ height: REEL_HEIGHT }}
    >
      {mounted && reelList.length > 0 ? (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide py-2 h-full"
          style={{ willChange: "scroll-position" }}
        >
          {reelList.map((article, index) => (
            <motion.div
              key={`${article.url}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.2,
                delay: Math.min(index * 0.02, 0.2),
              }}
              role="button"
              tabIndex={0}
              onClick={() => onArticleClick(article)}
              onKeyDown={(e) => e.key === "Enter" && onArticleClick(article)}
              className="relative shrink-0 w-[280px] h-[160px] rounded-xl overflow-hidden cursor-pointer group"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent rounded-xl" />
              <div className="absolute left-0 bottom-0 w-full p-3">
                <p
                  className="font-playfair text-white text-sm font-medium tracking-wider line-clamp-2"
                  title={article.title}
                >
                  {article.title}
                </p>
                <p className="font-outfit text-white/80 text-xs mt-0.5">
                  {article.source?.name ?? ""}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

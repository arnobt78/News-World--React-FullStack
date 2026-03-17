"use client";

/** Modal overlay for article detail; client-only for interactivity */
import { AnimatePresence, motion } from "framer-motion";
import { Share2, Bookmark } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/context/BookmarkContext";
import type { Article } from "@/types/news";

const NO_IMG = "/images/no-img.png";

interface NewsModalProps {
  show: boolean;
  article: Article | null;
  onClose: () => void;
}

async function handleShare(article: Article) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: article.title,
        url: article.url,
        text: article.description ?? article.title,
      });
    } catch {
      await navigator.clipboard.writeText(article.url);
    }
  } else {
    await navigator.clipboard.writeText(article.url);
  }
}

export default function NewsModal({ show, article, onClose }: NewsModalProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[1000] p-4"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-h-[90vh] bg-[#111214] p-4 rounded-xl shadow-2xl relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-6 text-2xl text-white cursor-pointer hover:text-[#b88efc] transition-colors"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            {article && (
              <Card className="border-0 bg-transparent shadow-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image ?? NO_IMG}
                  alt={article.title}
                  onError={(e) => {
                    e.currentTarget.src = NO_IMG;
                  }}
                  className="w-full h-auto max-h-[30rem] object-cover rounded-xl opacity-80"
                />
                <CardHeader className="px-0 pt-6">
                  <h2 className="font-playfair text-2xl sm:text-3xl text-white tracking-wider">
                    {article.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-4 items-center">
                    <Badge
                      variant="secondary"
                      className="bg-[#222] text-[#bbb]"
                    >
                      {article.source.name}
                    </Badge>
                    <span className="font-outfit text-sm text-[#bbb]">
                      {new Date(article.publishedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <div className="flex gap-2 ml-auto">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-[#222] text-[#bbb] hover:bg-[#333] hover:text-white"
                        onClick={() => handleShare(article)}
                      >
                        <Share2 className="size-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className={`bg-[#222] text-[#bbb] hover:bg-[#333] hover:text-white ${isBookmarked(article.url) ? "text-[#b88efc]" : ""}`}
                        onClick={() => toggleBookmark(article.url, article)}
                      >
                        <Bookmark
                          className={`size-4 mr-1 ${isBookmarked(article.url) ? "fill-current" : ""}`}
                        />
                        {isBookmarked(article.url) ? "Saved" : "Bookmark"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-0">
                  <p className="text-base text-[#ddd] leading-relaxed font-outfit">
                    {article.content}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-8 py-4 px-8 bg-gradient-to-r from-[#b88efc] to-[#6877f4] text-white text-center text-base uppercase rounded-[5rem] font-outfit hover:opacity-90 active:translate-y-0.5 transition-all"
                  >
                    Read More
                  </a>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

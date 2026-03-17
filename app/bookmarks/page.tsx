"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ArticleCard from "@/components/ui/ArticleCard";
import PageHeader from "@/components/ui/PageHeader";
import NewsModal from "@/components/NewsModal";
import { useBookmarks } from "@/context/BookmarkContext";
import type { Article } from "@/types/news";
import type { BookmarkArticle } from "@/context/BookmarkContext";

function toArticle(b: BookmarkArticle): Article {
  return {
    title: b.title,
    url: b.url,
    image: b.image,
    publishedAt: b.publishedAt,
    source: b.source,
    content: "",
    description: "",
  };
}

export default function BookmarksPage() {
  const { bookmarkedArticles } = useBookmarks();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-9xl mx-auto w-full">
        <PageHeader />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-8"
        >
          <h1 className="font-playfair text-4xl sm:text-5xl text-white tracking-wider mb-6">
            Bookmarks
          </h1>
          {bookmarkedArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p className="font-outfit text-white/70 mb-4">
                No bookmarked articles yet.
              </p>
              <Link
                href="/"
                className="font-outfit text-[#b88efc] hover:text-white transition-colors underline"
              >
                Browse headlines to bookmark
              </Link>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {bookmarkedArticles.map((b, index) => (
                  <ArticleCard
                    key={b.url}
                    article={toArticle(b)}
                    onClick={() => handleArticleClick(toArticle(b))}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
      <NewsModal
        show={showModal}
        article={selectedArticle}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

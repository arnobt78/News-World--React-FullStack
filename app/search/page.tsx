"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/ui/SearchBar";
import ArticleCard from "@/components/ui/ArticleCard";
import PageHeader from "@/components/ui/PageHeader";
import NewsModal from "@/components/NewsModal";
import SearchResultsSkeleton from "@/components/ui/SearchResultsSkeleton";
import { useSearch } from "@/hooks/useSearch";
import { useNewsContext } from "@/context/NewsContext";
import type { Article } from "@/types/news";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { filters } = useNewsContext();
  const { articles, totalArticles, loading, error } = useSearch(query, {
    lang: filters.lang || undefined,
    country: filters.country || undefined,
  });

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
            Search News
          </h1>
          <div className="max-w-2xl mb-6">
            <SearchBar
              onSearch={setQuery}
              placeholder="e.g. technology, sports..."
            />
          </div>
          {error && (
            <div className="py-12 text-center text-red-400 font-outfit">
              {error}
            </div>
          )}
          {loading && query && <SearchResultsSkeleton />}
          {!loading && query && !error && (
            <p className="font-outfit text-white/70 mb-6">
              {totalArticles > 0
                ? `${totalArticles} articles found`
                : "No articles found"}
            </p>
          )}
          <AnimatePresence mode="wait">
            {!loading && articles.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.url + index}
                    article={article}
                    onClick={() => handleArticleClick(article)}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {!loading && query && articles.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center text-white/60 font-outfit"
            >
              Try a different search term
            </motion.div>
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

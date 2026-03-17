"use client";

/** Main news section: CSR for category switching, uses SSR initial data for "general" */
import { useState } from "react";
import type { Article } from "@/types/news";
import type { NewsCategory } from "@/data/categories";
import { useNews } from "@/hooks/useNews";
import { useNewsContext } from "@/context/NewsContext";
import NewsNavbar from "./NewsNavbar";
import NewsGrid from "./NewsGrid";
import NewsModal from "./NewsModal";
import PageHeader from "./ui/PageHeader";
import AnimatedSection from "./ui/AnimatedSection";
import NewsGridSkeleton from "./ui/NewsGridSkeleton";

interface NewsSectionProps {
  initialArticles: Article[];
}

export default function NewsSection({ initialArticles }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategory>("general");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { filters } = useNewsContext();

  const { headline, news, loading, error } = useNews(
    selectedCategory,
    selectedCategory === "general" ? initialArticles : undefined,
    {
      country: filters.country || undefined,
      lang: filters.lang || undefined,
      max: 10,
    },
  );

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  return (
    <div className="w-full min-w-0">
      <div className="w-full min-h-screen bg-[#060709] flex flex-col gap-4 shadow-2xl rounded-2xl overflow-hidden">
        <header className="w-full bg-[#111214] border-b border-[#222]">
          <PageHeader />
        </header>

        <div className="flex gap-4 flex-1 min-h-0 px-2 sm:px-4 pb-8 max-[900px]:flex-col max-[900px]:gap-6">
          <NewsNavbar
            selectedCategory={selectedCategory}
            onCategoryClick={setSelectedCategory}
          />

          <AnimatedSection
            delay={0.1}
            direction="up"
            className="flex-1 min-w-0 min-h-0 flex flex-col"
          >
            {error ? (
              <div className="flex flex-col items-center justify-center h-64 text-[#ddd] gap-4">
                <p className="text-red-400">{error}</p>
                <p className="text-sm font-outfit">
                  Check GNEWS_API_KEY in Vercel env vars.
                </p>
              </div>
            ) : loading && !headline && news.length === 0 ? (
              <>
                <NewsGridSkeleton isHeadline />
                <NewsGridSkeleton count={6} />
              </>
            ) : (
              <>
                {headline && (
                  <div className="mb-4">
                    <NewsGrid
                      articles={[headline]}
                      onArticleClick={handleArticleClick}
                      isHeadline
                    />
                  </div>
                )}
                <NewsGrid articles={news} onArticleClick={handleArticleClick} />
              </>
            )}
          </AnimatedSection>
        </div>

        <footer className="w-full min-h-20 flex items-center justify-between px-2 sm:px-4 bg-[#111214] max-[500px]:min-h-32 max-[500px]:flex-col max-[500px]:justify-center max-[500px]:gap-4 max-[500px]:py-4">
          <p className="text-sm sm:text-base md:text-lg font-light text-[#bbb] font-outfit">
            <span className="font-playfair text-xl sm:text-2xl md:text-3xl">
              News World
            </span>
          </p>
          <p className="text-sm sm:text-base md:text-lg font-light text-[#bbb] font-outfit">
            &copy; {new Date().getFullYear()}. All reserved.
          </p>
        </footer>

        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}

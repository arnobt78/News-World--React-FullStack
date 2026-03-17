"use client";

/** Category navigation sidebar; client component for click handlers */
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import type { NewsCategory } from "@/data/categories";

interface NewsNavbarProps {
  selectedCategory: NewsCategory;
  onCategoryClick: (category: NewsCategory) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export default function NewsNavbar({
  selectedCategory,
  onCategoryClick,
}: NewsNavbarProps) {
  return (
    <motion.nav
      variants={container}
      initial="hidden"
      animate="show"
      className="w-1/5 min-w-[8rem] h-full bg-[#111214] flex flex-col gap-12 rounded-xl p-4 max-lg:flex-row max-lg:flex-wrap max-lg:justify-center max-lg:w-full max-lg:h-auto max-lg:gap-4"
    >
      <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#ddd] tracking-wider mb-4 max-lg:mb-0 max-lg:w-full max-lg:text-center">
        Categories
      </h2>
      <div className="flex flex-col gap-4 max-lg:flex-row max-lg:flex-wrap max-lg:justify-center max-lg:gap-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            type="button"
            variants={item}
            onClick={() => onCategoryClick(category)}
            className={`text-left text-sm sm:text-base md:text-lg font-light uppercase tracking-wider transition-all duration-200 rounded-lg px-3 py-2 ${
              selectedCategory === category
                ? "text-white font-medium bg-white/10"
                : "text-[#ddd] hover:text-white hover:bg-white/5"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}

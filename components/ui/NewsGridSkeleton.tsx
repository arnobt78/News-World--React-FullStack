"use client";

import ArticleCardSkeleton from "./ArticleCardSkeleton";

interface NewsGridSkeletonProps {
  isHeadline?: boolean;
  count?: number;
}

export default function NewsGridSkeleton({
  isHeadline = false,
  count = 6,
}: NewsGridSkeletonProps) {
  if (isHeadline) {
    return (
      <div className="mb-8">
        <ArticleCardSkeleton isHeadline />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[20rem] bg-[#111214] rounded-xl grid grid-cols-2 gap-4 p-4 justify-items-center items-center max-[500px]:grid-cols-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full h-full min-h-60">
          <ArticleCardSkeleton />
        </div>
      ))}
    </div>
  );
}

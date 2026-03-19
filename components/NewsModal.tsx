"use client";

/**
 * NewsModal - Article detail in shadcn Dialog. Share, Bookmark, Read More.
 * We show the full description/content that GNews returns; the API only provides
 * short snippets (often ending with "..."), not full article body. Full text is on the source site.
 */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Share2, Bookmark, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/context/BookmarkContext";
import { getProxiedImageUrl } from "@/lib/imageProxy";
import type { Article } from "@/types/news";
import Image from "next/image";

const NO_IMG = "/images/no-img.png";

/** GNews often returns content ending with " ... [1234 chars]"; strip for cleaner display. */
function stripCharsSuffix(text: string): string {
  return text.replace(/\s*\[[\d,]+(\s*chars?)?\]\s*$/i, "").trim();
}

/** Single body block: prefer content (API snippet), else description. Avoids duplicate paragraphs. */
function getArticleBody(article: Article): string | null {
  const content = article.content ? stripCharsSuffix(article.content) : "";
  const desc = article.description?.trim() ?? "";
  if (content && content.length >= desc.length) return content;
  if (desc) return desc;
  return content || null;
}

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
    <Dialog open={show} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-card border-border p-0 overflow-hidden flex flex-col rounded-xl ring-0"
        style={{ width: "90vw", maxWidth: "90vw", height: "90vh" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close modal"
        >
          <X className="size-6 cursor-pointer" />
        </button>
        <div className="overflow-y-auto scrollbar-custom flex-1 border-0">
          {article && (
            <Card className="border-0 bg-transparent shadow-none rounded-b-xl overflow-hidden">
              <Image
                src={getProxiedImageUrl(article.image)}
                alt={article.title}
                width={1000}
                height={1000}
                unoptimized
                onError={(e) => {
                  e.currentTarget.src = NO_IMG;
                }}
                className="w-full h-auto max-h-[30rem] object-cover rounded-t-xl opacity-90 group-hover:opacity-95 transition-opacity duration-300"
              />
              <div className="px-6 py-6">
                <DialogHeader>
                  <DialogTitle className="font-playfair text-2xl sm:text-3xl text-foreground tracking-wider text-left">
                    {article.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap gap-2 mt-3 items-center font-outfit text-sm">
                  <Badge
                    variant="secondary"
                    className="bg-muted text-foreground border-border"
                  >
                    {article.source.name}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-border text-muted-foreground"
                  >
                    {new Date(article.publishedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Badge>
                  {article.lang && (
                    <Badge
                      variant="outline"
                      className="border-border text-muted-foreground"
                    >
                      {article.lang}
                    </Badge>
                  )}
                  {article.source.country && (
                    <Badge
                      variant="outline"
                      className="border-border text-muted-foreground"
                    >
                      {article.source.country}
                    </Badge>
                  )}
                </div>
                {article.source.url && (
                  <a
                    href={article.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 font-outfit text-sm text-primary hover:text-primary/80 transition-colors underline"
                  >
                    Source: {article.source.name}
                  </a>
                )}
                {(() => {
                  const body = getArticleBody(article);
                  return body ? (
                    <div className="mt-4">
                      <p className="text-base text-foreground/90 leading-relaxed font-outfit whitespace-pre-wrap">
                        {body}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground font-outfit">
                        GNews provides a short summary only. Use <strong className="text-foreground/80">Read More</strong> below to open the full article on the source site.
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 text-base text-muted-foreground font-outfit italic">
                      No description or content available. Open the source for
                      the full article.
                    </p>
                  );
                })()}
                <div className="flex flex-wrap gap-2 mt-6 items-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-muted text-foreground hover:bg-muted/80"
                    onClick={() => handleShare(article)}
                  >
                    <Share2 className="size-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className={`bg-muted text-foreground hover:bg-muted/80 ${isBookmarked(article.url) ? "text-primary" : ""}`}
                    onClick={() => toggleBookmark(article.url, article)}
                  >
                    <Bookmark
                      className={`size-4 mr-1 ${isBookmarked(article.url) ? "fill-current" : ""}`}
                    />
                    {isBookmarked(article.url) ? "Saved" : "Bookmark"}
                  </Button>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 py-4 px-8 bg-primary text-primary-foreground text-center text-base uppercase rounded-[5rem] font-outfit hover:opacity-90 active:translate-y-0.5 transition-all"
                >
                  Read More
                </a>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

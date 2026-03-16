"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Article } from "@/types/news";

const STORAGE_KEY = "news-world-bookmarks";

export interface BookmarkArticle {
  url: string;
  title: string;
  image: string | null;
  publishedAt: string;
  source: { name: string };
}

interface BookmarkContextValue {
  bookmarkedUrls: Set<string>;
  bookmarkedArticles: BookmarkArticle[];
  toggleBookmark: (url: string, article?: Article) => void;
  isBookmarked: (url: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

function toMinimal(article: Article): BookmarkArticle {
  return {
    url: article.url,
    title: article.title,
    image: article.image ?? null,
    publishedAt: article.publishedAt,
    source: { name: article.source?.name ?? "Unknown" },
  };
}

function loadFromStorage(): BookmarkArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as BookmarkArticle[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveToStorage(articles: BookmarkArticle[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch {
    // ignore
  }
}

const bookmarkListeners = new Set<() => void>();
let cachedSnapshot: BookmarkArticle[] = [];
let snapshotInitialized = false;

function subscribeBookmarks(callback: () => void) {
  bookmarkListeners.add(callback);
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cachedSnapshot = loadFromStorage();
      callback();
    }
  };
  window.addEventListener("storage", handler);
  return () => {
    bookmarkListeners.delete(callback);
    window.removeEventListener("storage", handler);
  };
}

function getBookmarkSnapshot(): BookmarkArticle[] {
  if (typeof window === "undefined") return [];
  if (!snapshotInitialized) {
    cachedSnapshot = loadFromStorage();
    snapshotInitialized = true;
  }
  return cachedSnapshot;
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const bookmarkedArticles = useSyncExternalStore(
    subscribeBookmarks,
    getBookmarkSnapshot,
    () => []
  );

  const notify = useCallback(() => {
    cachedSnapshot = loadFromStorage();
    bookmarkListeners.forEach((cb) => cb());
  }, []);

  const bookmarkedUrls = new Set(bookmarkedArticles.map((a) => a.url));

  const toggleBookmark = useCallback((url: string, article?: Article) => {
    const current = loadFromStorage();
    const idx = current.findIndex((a) => a.url === url);
    let next: BookmarkArticle[];
    if (idx >= 0) {
      next = current.filter((a) => a.url !== url);
    } else if (article) {
      next = [...current, toMinimal(article)];
    } else {
      next = [...current, { url, title: "", image: null, publishedAt: "", source: { name: "" } }];
    }
    saveToStorage(next);
    notify();
  }, [notify]);

  const isBookmarked = useCallback(
    (url: string) => bookmarkedArticles.some((a) => a.url === url),
    [bookmarkedArticles]
  );

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedUrls, bookmarkedArticles, toggleBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks(): BookmarkContextValue {
  const ctx = useContext(BookmarkContext);
  if (!ctx) {
    throw new Error("useBookmarks must be used within BookmarkProvider");
  }
  return ctx;
}

import type { Article, GNewsResponse } from "@/types/news";

const NO_IMG = "/images/no-img.png";

function normalizeArticles(articles: Article[]): Article[] {
  return articles.map((a) => ({
    ...a,
    image: a.image ?? NO_IMG,
  }));
}

export interface FetchHeadlinesParams {
  category: string;
  country?: string;
  lang?: string;
  max?: number;
  page?: number;
}

export async function fetchHeadlinesClient(
  params: FetchHeadlinesParams
): Promise<{ headline: Article | null; news: Article[] }> {
  const searchParams = new URLSearchParams({ category: params.category });
  if (params.country) searchParams.set("country", params.country);
  if (params.lang) searchParams.set("lang", params.lang);
  if (params.max) searchParams.set("max", String(params.max));
  if (params.page) searchParams.set("page", String(params.page));
  const res = await fetch(`/api/headlines?${searchParams.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch headlines");
  const data: GNewsResponse = await res.json();
  const articles = normalizeArticles(data.articles ?? []);
  return {
    headline: articles[0] ?? null,
    news: articles.slice(1, 10),
  };
}

export interface FetchSearchParams {
  q: string;
  page?: number;
  lang?: string;
  country?: string;
  max?: number;
  sortby?: "publishedAt" | "relevance";
}

export async function fetchSearchClient(
  params: FetchSearchParams
): Promise<{ articles: Article[]; totalArticles: number }> {
  const searchParams = new URLSearchParams({ q: params.q.trim() });
  if (params.page) searchParams.set("page", String(params.page));
  if (params.lang) searchParams.set("lang", params.lang);
  if (params.country) searchParams.set("country", params.country);
  if (params.max) searchParams.set("max", String(params.max));
  if (params.sortby) searchParams.set("sortby", params.sortby);
  const res = await fetch(`/api/search?${searchParams.toString()}`);
  if (!res.ok) throw new Error("Failed to search");
  const data: GNewsResponse = await res.json();
  return {
    articles: normalizeArticles(data.articles ?? []),
    totalArticles: data.totalArticles ?? 0,
  };
}

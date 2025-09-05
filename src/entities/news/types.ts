export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsSearchParams {
  q?: string;
  category?: string;
  country?: string;
  page?: number;
  pageSize?: number;
}

export interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  totalResults: number;
}

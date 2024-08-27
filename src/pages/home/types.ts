export interface NewsArticle {
  source?: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
  animate?: boolean;
  id: string;
}

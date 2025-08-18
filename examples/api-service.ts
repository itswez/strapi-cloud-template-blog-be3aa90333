import { 
  ArticlesResponse, 
  ArticleResponse, 
  GlobalResponse, 
  CategoriesResponse, 
  AuthorsResponse,
  TagsResponse
} from '../types/blog-content';

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

// Helper function to build query parameters
const buildQuery = (params: Record<string, any> = {}) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  
  return searchParams.toString();
};

// Helper function to make API requests
const fetchAPI = async <T>(endpoint: string, params: Record<string, any> = {}): Promise<T> => {
  const query = buildQuery(params);
  const url = `${API_URL}${endpoint}${query ? `?${query}` : ''}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

// API Service class
export class StrapiAPI {
  // Get all articles with pagination and filters
  static async getArticles(params: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: Record<string, any>;
    populate?: string;
  } = {}): Promise<ArticlesResponse> {
    const defaultParams = {
      'pagination[page]': params.page || 1,
      'pagination[pageSize]': params.pageSize || 10,
      'sort': params.sort || 'publishedAt:desc',
      'populate': params.populate || 'cover,author,category,tags,blocks',
      ...params.filters
    };
    
    return fetchAPI<ArticlesResponse>('/articles', defaultParams);
  }

  // Get a single article by slug
  static async getArticleBySlug(slug: string): Promise<ArticleResponse> {
    const params = {
      'filters[slug][$eq]': slug,
      'populate': 'cover,author,category,tags,blocks'
    };
    
    const response = await fetchAPI<ArticlesResponse>('/articles', params);
    
    if (!response.data || response.data.length === 0) {
      throw new Error(`Article not found: ${slug}`);
    }
    
    return { data: response.data[0], meta: response.meta };
  }

  // Get a single article by ID
  static async getArticleById(id: number): Promise<ArticleResponse> {
    return fetchAPI<ArticleResponse>(`/articles/${id}`, {
      'populate': 'cover,author,category,tags,blocks'
    });
  }

  // Get all categories
  static async getCategories(): Promise<CategoriesResponse> {
    return fetchAPI<CategoriesResponse>('/categories', {
      'sort': 'name:asc'
    });
  }

  // Get all tags
  static async getTags(): Promise<TagsResponse> {
    return fetchAPI<TagsResponse>('/tags', {
      'sort': 'name:asc'
    });
  }

  // Get articles by tag
  static async getArticlesByTag(tagSlug: string, params: {
    page?: number;
    pageSize?: number;
  } = {}): Promise<ArticlesResponse> {
    const defaultParams = {
      'filters[tags][slug][$eq]': tagSlug,
      'pagination[page]': params.page || 1,
      'pagination[pageSize]': params.pageSize || 10,
      'sort': 'publishedAt:desc',
      'populate': 'cover,author,category,tags'
    };
    
    return fetchAPI<ArticlesResponse>('/articles', defaultParams);
  }

  // Get articles by category
  static async getArticlesByCategory(categorySlug: string, params: {
    page?: number;
    pageSize?: number;
  } = {}): Promise<ArticlesResponse> {
    const defaultParams = {
      'filters[category][slug][$eq]': categorySlug,
      'pagination[page]': params.page || 1,
      'pagination[pageSize]': params.pageSize || 10,
      'sort': 'publishedAt:desc',
      'populate': 'cover,author,category,tags,blocks'
    };
    
    return fetchAPI<ArticlesResponse>('/articles', defaultParams);
  }

  // Get all authors
  static async getAuthors(): Promise<AuthorsResponse> {
    return fetchAPI<AuthorsResponse>('/authors', {
      'populate': 'avatar',
      'sort': 'name:asc'
    });
  }

  // Get articles by author
  static async getArticlesByAuthor(authorId: number, params: {
    page?: number;
    pageSize?: number;
  } = {}): Promise<ArticlesResponse> {
    const defaultParams = {
      'filters[author][id][$eq]': authorId,
      'pagination[page]': params.page || 1,
      'pagination[pageSize]': params.pageSize || 10,
      'sort': 'publishedAt:desc',
      'populate': 'cover,author,category,tags,blocks'
    };
    
    return fetchAPI<ArticlesResponse>('/articles', defaultParams);
  }

  // Get global settings
  static async getGlobal(): Promise<GlobalResponse> {
    return fetchAPI<GlobalResponse>('/global', {
      'populate': 'defaultSeo,favicon'
    });
  }

  // Search articles
  static async searchArticles(query: string, params: {
    page?: number;
    pageSize?: number;
  } = {}): Promise<ArticlesResponse> {
    const defaultParams = {
      'filters[$or][0][title][$containsi]': query,
      'filters[$or][1][description][$containsi]': query,
      'pagination[page]': params.page || 1,
      'pagination[pageSize]': params.pageSize || 10,
      'sort': 'publishedAt:desc',
      'populate': 'cover,author,category,tags,blocks'
    };
    
    return fetchAPI<ArticlesResponse>('/articles', defaultParams);
  }

  // Get featured articles
  static async getFeaturedArticles(limit: number = 3): Promise<ArticlesResponse> {
    return fetchAPI<ArticlesResponse>('/articles', {
      'filters[featured][$eq]': true,
      'pagination[pageSize]': limit,
      'sort': 'publishedAt:desc',
      'populate': 'cover,author,category'
    });
  }

  // Get related articles (by category)
  static async getRelatedArticles(articleId: number, categoryId: number, limit: number = 3): Promise<ArticlesResponse> {
    return fetchAPI<ArticlesResponse>('/articles', {
      'filters[id][$ne]': articleId,
      'filters[category][id][$eq]': categoryId,
      'pagination[pageSize]': limit,
      'sort': 'publishedAt:desc',
      'populate': 'cover,author,category'
    });
  }
}

// React Hook for fetching articles
export const useArticles = () => {
  const [articles, setArticles] = React.useState<ArticlesResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchArticles = React.useCallback(async (params: any = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await StrapiAPI.getArticles(params);
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error, refetch: fetchArticles };
};

// React Hook for fetching a single article
export const useArticle = (slug: string) => {
  const [article, setArticle] = React.useState<ArticleResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await StrapiAPI.getArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  return { article, loading, error };
};

export default StrapiAPI; 
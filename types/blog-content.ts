// TypeScript interfaces for Strapi blog content
// Use these in your React app for type safety

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
  };
}

interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Author {
  id: number;
  attributes: {
    name: string;
    email: string;
    avatar?: StrapiImage;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Tag {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Block Components
export interface RichTextBlock {
  __component: 'shared.rich-text';
  id: number;
  body: string;
}

export interface MediaBlock {
  __component: 'shared.media';
  id: number;
  file: StrapiImage;
}

export interface QuoteBlock {
  __component: 'shared.quote';
  id: number;
  title: string;
  body: string;
}

export interface SliderBlock {
  __component: 'shared.slider';
  id: number;
  files: StrapiImage[];
}

export interface CodeBlock {
  __component: 'shared.code-block';
  id: number;
  code: string;
  language: 'javascript' | 'typescript' | 'jsx' | 'tsx' | 'html' | 'css' | 'scss' | 'json' | 'bash' | 'python' | 'php' | 'sql' | 'markdown' | 'yaml' | 'xml';
  title?: string;
  showLineNumbers: boolean;
}

export interface CallToActionBlock {
  __component: 'shared.call-to-action';
  id: number;
  title: string;
  url: string;
  style: 'primary' | 'secondary' | 'outline' | 'ghost';
  openInNewTab: boolean;
  icon?: string;
}

export interface EmbedBlock {
  __component: 'shared.embed';
  id: number;
  url: string;
  title?: string;
  aspectRatio: '16:9' | '4:3' | '1:1' | '21:9';
  autoplay: boolean;
}

export interface TableBlock {
  __component: 'shared.table';
  id: number;
  title?: string;
  headers: string[];
  rows: string[][];
  striped: boolean;
  bordered: boolean;
}

export type ContentBlock = 
  | RichTextBlock 
  | MediaBlock 
  | QuoteBlock 
  | SliderBlock 
  | CodeBlock 
  | CallToActionBlock 
  | EmbedBlock 
  | TableBlock;

export interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover?: StrapiImage;
    author?: {
      data: Author;
    };
    category?: {
      data: Category;
    };
    tags?: {
      data: Tag[];
    };
    blocks: ContentBlock[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// SEO Component
export interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaImage?: StrapiImage;
  keywords?: string;
  metaRobots?: string;
  structuredData?: any;
  metaViewport?: string;
  canonicalURL?: string;
}

// Global Component
export interface Global {
  id: number;
  attributes: {
    siteName: string;
    defaultSeo: SEO;
    favicon?: StrapiImage;
    createdAt: string;
    updatedAt: string;
  };
}

// API Response Types
export type ArticlesResponse = StrapiResponse<Article[]>;
export type ArticleResponse = StrapiResponse<Article>;
export type GlobalResponse = StrapiResponse<Global>;
export type CategoriesResponse = StrapiResponse<Category[]>;
export type AuthorsResponse = StrapiResponse<Author[]>;
export type TagsResponse = StrapiResponse<Tag[]>; 
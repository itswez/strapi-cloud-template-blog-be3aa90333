# Strapi Integration Guide for React App

## Quick Setup

### 1. Environment Variables
Add to your React app's `.env` file:
```bash
REACT_APP_STRAPI_URL=http://localhost:1338
```

### 2. Copy These Files to Your React App

#### A. TypeScript Interfaces (`src/types/blog-content.ts`)
```typescript
// Copy the entire content from types/blog-content.ts
// This provides full TypeScript support for Strapi content
```

#### B. API Service (`src/services/strapi-api.ts`)
```typescript
// Copy the entire content from examples/api-service.ts
// This provides ready-to-use functions and hooks
```

#### C. Content Renderer (`src/components/ContentRenderer.tsx`)
```typescript
// Copy the entire content from examples/ContentRenderer.tsx
// This renders all content blocks from Strapi
```

### 3. Install Dependencies (if not already installed)
```bash
npm install react react-dom
# For TypeScript support
npm install @types/react @types/react-dom
```

## Usage Examples

### Basic Blog List
```tsx
import { useArticles } from './services/strapi-api';

function BlogList() {
  const { articles, loading, error } = useArticles();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {articles?.data.map(article => (
        <article key={article.id}>
          <h2>{article.attributes.title}</h2>
          <p>{article.attributes.description}</p>
        </article>
      ))}
    </div>
  );
}
```

### Single Blog Post with Content Blocks
```tsx
import { useArticle } from './services/strapi-api';
import ContentRenderer from './components/ContentRenderer';

function BlogPost({ slug }) {
  const { article, loading, error } = useArticle(slug);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <article>
      <h1>{article.data.attributes.title}</h1>
      <ContentRenderer blocks={article.data.attributes.blocks} />
    </article>
  );
}
```

## Available Content Blocks

Your Strapi instance supports these content blocks:

1. **Rich Text** - Formatted text content
2. **Media** - Single images/videos
3. **Quote** - Quote blocks with attribution
4. **Slider** - Image galleries
5. **Code Block** - Syntax-highlighted code snippets
6. **Call to Action** - Buttons and links
7. **Embed** - YouTube videos, tweets, etc.
8. **Table** - Structured data display

## API Endpoints

- `http://localhost:1338/api/articles` - All articles
- `http://localhost:1338/api/categories` - All categories
- `http://localhost:1338/api/authors` - All authors
- `http://localhost:1338/api/global` - Global settings

## Strapi Admin Access

- URL: http://localhost:1338/admin
- Create an admin account when you first visit
- Create content with the new blocks in the Article content type

## Testing the Connection

1. Start your React app
2. Visit http://localhost:1338/admin to create some test content
3. Use the API service in your React app to fetch and display content
4. The ContentRenderer will automatically handle all block types 
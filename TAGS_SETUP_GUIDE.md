# Tags Setup Guide

This guide explains how to use the new tags feature in your Strapi blog template.

## Overview

Tags are now available as a collection type that allows you to:
- Create multiple tags and assign them to articles
- Filter articles by tags
- Display tags on article pages
- Create tag-based navigation

## Database Schema

### Tag Collection Type
- **name**: String (required, unique)
- **slug**: UID (auto-generated from name)
- **description**: Text (optional)
- **articles**: Many-to-many relation with articles

### Article Collection Type (Updated)
- **tags**: Many-to-many relation with tags (replaces the old enumeration field)

## Setup Instructions

### 1. Database Migration
The tags collection type has been created. If you're setting up a new instance:

```bash
npm run develop
```

This will automatically create the database tables and seed the initial data.

### 2. Seed Data
The seed script (`scripts/seed.js`) has been updated to include sample tags:
- Shopify
- Ecommerce
- Frontend Development
- Performance
- JavaScript
- React
- CSS
- API

### 3. API Endpoints
The following endpoints are now available:

- `GET /api/tags` - Get all tags
- `GET /api/tags/:id` - Get a specific tag
- `GET /api/articles?filters[tags][slug][$eq]=:tagSlug` - Get articles by tag

## Frontend Integration

### 1. API Service
The `examples/api-service.ts` file has been updated with tag-related methods:

```typescript
// Get all tags
const tags = await StrapiAPI.getTags();

// Get articles by tag
const articles = await StrapiAPI.getArticlesByTag('javascript');

// Get articles with tags populated
const articles = await StrapiAPI.getArticles({
  populate: 'cover,author,category,tags,blocks'
});
```

### 2. TypeScript Types
The `types/blog-content.ts` file includes the Tag interface:

```typescript
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
```

### 3. React Components
Use the provided React components in `examples/TagComponent.tsx`:

```tsx
import { TagComponent, TagList, TagFilter } from './examples/TagComponent';

// Display tags on an article
<TagComponent 
  tags={article.attributes.tags} 
  onTagClick={(tag) => navigate(`/tags/${tag.attributes.slug}`)}
/>

// Display a list of tags
<TagList 
  tags={allTags} 
  onTagClick={(tag) => console.log('Tag clicked:', tag)}
/>

// Filter component
<TagFilter 
  allTags={allTags}
  selectedTags={selectedTags}
  onTagToggle={(tagSlug) => setSelectedTags(prev => 
    prev.includes(tagSlug) 
      ? prev.filter(t => t !== tagSlug)
      : [...prev, tagSlug]
  )}
/>
```

## Usage Examples

### 1. Display Tags on Article Page
```tsx
import { TagComponent } from './examples/TagComponent';

function ArticlePage({ article }) {
  return (
    <article>
      <h1>{article.attributes.title}</h1>
      <TagComponent 
        tags={article.attributes.tags}
        onTagClick={(tag) => {
          // Navigate to tag page or filter articles
          router.push(`/tags/${tag.attributes.slug}`);
        }}
      />
      {/* Article content */}
    </article>
  );
}
```

### 2. Tag Filtering
```tsx
import { useState, useEffect } from 'react';
import { StrapiAPI } from './examples/api-service';
import { TagFilter } from './examples/TagComponent';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // Load all tags
    StrapiAPI.getTags().then(response => {
      setAllTags(response.data);
    });
  }, []);

  useEffect(() => {
    // Load articles based on selected tags
    if (selectedTags.length === 0) {
      StrapiAPI.getArticles().then(response => {
        setArticles(response.data);
      });
    } else {
      // Filter articles by selected tags
      const promises = selectedTags.map(tagSlug => 
        StrapiAPI.getArticlesByTag(tagSlug)
      );
      Promise.all(promises).then(responses => {
        const allArticles = responses.flatMap(response => response.data);
        setArticles(allArticles);
      });
    }
  }, [selectedTags]);

  return (
    <div>
      <TagFilter 
        allTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={(tagSlug) => {
          setSelectedTags(prev => 
            prev.includes(tagSlug) 
              ? prev.filter(t => t !== tagSlug)
              : [...prev, tagSlug]
          );
        }}
      />
      {/* Article list */}
    </div>
  );
}
```

### 3. Tag Cloud
```tsx
import { useEffect, useState } from 'react';
import { StrapiAPI } from './examples/api-service';

function TagCloud() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    StrapiAPI.getTags().then(response => {
      setTags(response.data);
    });
  }, []);

  return (
    <div className="tag-cloud">
      <h3>Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag.id}
            onClick={() => router.push(`/tags/${tag.attributes.slug}`)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            {tag.attributes.name}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## Admin Panel

### Creating Tags
1. Go to Content Manager > Tags
2. Click "Create new entry"
3. Fill in:
   - **Name**: The tag name (e.g., "JavaScript")
   - **Slug**: Auto-generated from name
   - **Description**: Optional description
4. Save the tag

### Assigning Tags to Articles
1. Go to Content Manager > Articles
2. Edit an article
3. In the "Tags" field, select one or more tags
4. Save the article

## API Queries

### Get Articles with Tags
```bash
GET /api/articles?populate=tags
```

### Get Articles by Tag
```bash
GET /api/articles?filters[tags][slug][$eq]=javascript&populate=tags
```

### Get All Tags
```bash
GET /api/tags
```

### Get Tag with Related Articles
```bash
GET /api/tags/1?populate=articles
```

## Styling

The provided React components use Tailwind CSS classes. You can customize the styling by:

1. Modifying the className props
2. Overriding the default classes
3. Creating your own styled components

Example custom styling:
```tsx
<TagComponent 
  tags={article.attributes.tags}
  className="my-4"
  onTagClick={(tag) => {
    // Custom click handler
  }}
/>
```

## Best Practices

1. **Tag Naming**: Use consistent, descriptive names
2. **Tag Count**: Limit the number of tags per article (3-5 recommended)
3. **Tag Management**: Regularly review and clean up unused tags
4. **Performance**: Use pagination when displaying large numbers of articles by tag
5. **SEO**: Consider using tag slugs in URLs for better SEO

## Troubleshooting

### Tags Not Showing
- Check that the `populate=tags` parameter is included in your API calls
- Verify that tags are assigned to articles in the admin panel
- Ensure the tag collection type is properly created

### API Errors
- Check that the tag permissions are set correctly
- Verify the API endpoints are accessible
- Check the Strapi logs for detailed error messages

### TypeScript Errors
- Make sure you're importing the correct types from `types/blog-content`
- Verify that the Tag interface is properly defined
- Check that your API responses match the expected types 
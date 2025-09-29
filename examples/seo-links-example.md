# SEO Links Fields - How They Work

## Overview

The `internalLinks` and `externalLinks` fields in the SEO component now use a structured Link component instead of raw JSON. This provides a much better user experience in the Strapi admin panel.

## Admin Panel Interface

### How It Looks in Strapi Admin

When you edit an article with SEO fields, you'll see:

#### Internal Links Section
- **"Add Internal Link"** button
- For each link, you get:
  - **Anchor Text** field (text input)
  - **URL** field (text input) 
  - **Open in New Tab** checkbox

#### External Links Section  
- **"Add External Link"** button
- For each link, you get:
  - **Anchor Text** field (text input)
  - **URL** field (text input)
  - **Open in New Tab** checkbox (usually checked for external links)

### Example: Shopify 2.0 Article

Here's how you would add links for your Shopify 2.0 sections article:

#### Internal Links:
1. **Anchor Text**: "5 Proven Ways to Improve Your Shopify Store Speed"
   **URL**: "/blog/shopify-store-speed-optimization"
   **Open in New Tab**: ☐ (unchecked)

2. **Anchor Text**: "Need help with Shopify 2.0 theme customisation? Get in touch."
   **URL**: "/contact" 
   **Open in New Tab**: ☐ (unchecked)

#### External Links:
1. **Anchor Text**: "Shopify's official Online Store 2.0 overview"
   **URL**: "https://shopify.dev/themes/architecture/sections"
   **Open in New Tab**: ☑ (checked)

## Data Structure

### API Response Format

When you fetch an article with SEO data, the links will be structured like this:

```json
{
  "data": {
    "attributes": {
      "seo": {
        "internalLinks": [
          {
            "id": 1,
            "anchorText": "5 Proven Ways to Improve Your Shopify Store Speed",
            "url": "/blog/shopify-store-speed-optimization",
            "openInNewTab": false
          },
          {
            "id": 2,
            "anchorText": "Need help with Shopify 2.0 theme customisation? Get in touch.",
            "url": "/contact",
            "openInNewTab": false
          }
        ],
        "externalLinks": [
          {
            "id": 3,
            "anchorText": "Shopify's official Online Store 2.0 overview",
            "url": "https://shopify.dev/themes/architecture/sections",
            "openInNewTab": true
          }
        ]
      }
    }
  }
}
```

## Frontend Implementation

### React Component Example

```tsx
import { Link } from '../types/blog-content';

interface LinksSectionProps {
  links: Link[];
  title: string;
  className?: string;
}

function LinksSection({ links, title, className = "" }: LinksSectionProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className={`links-section ${className}`}>
      <h3>{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a 
              href={link.url}
              target={link.openInNewTab ? "_blank" : "_self"}
              rel={link.openInNewTab ? "noopener noreferrer" : ""}
            >
              {link.anchorText}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Usage in blog post component
function BlogPost({ article }: { article: any }) {
  const { seo } = article.attributes;
  
  return (
    <article>
      <h1>{seo?.h1Title || article.attributes.title}</h1>
      
      {/* Your article content */}
      <div className="article-content">
        {/* ... article body ... */}
      </div>
      
      {/* SEO Links */}
      {seo?.internalLinks && (
        <LinksSection 
          links={seo.internalLinks}
          title="Related Articles"
          className="internal-links"
        />
      )}
      
      {seo?.externalLinks && (
        <LinksSection 
          links={seo.externalLinks}
          title="External Resources"
          className="external-links"
        />
      )}
    </article>
  );
}
```

### TypeScript Types

```typescript
// Link Component
export interface Link {
  id: number;
  anchorText: string;
  url: string;
  openInNewTab?: boolean;
}

// SEO Component (updated)
export interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  h1Title?: string;
  primaryKeywords?: string;
  secondaryKeywords?: string;
  canonicalUrl?: string;
  internalLinks?: Link[];      // Now uses Link component
  externalLinks?: Link[];      // Now uses Link component
  shareImage?: StrapiImage;
  openGraphTitle?: string;
  openGraphDescription?: string;
}
```

## Benefits of This Approach

### ✅ Better User Experience
- **Intuitive Interface**: No need to write JSON manually
- **Form Validation**: Strapi validates required fields
- **Reusable**: Same Link component can be used elsewhere
- **Flexible**: Easy to add more link properties in the future

### ✅ Developer Benefits
- **Type Safety**: Full TypeScript support
- **Structured Data**: Consistent data format
- **Extensible**: Easy to add new link properties
- **Maintainable**: Changes to Link component affect all uses

### ✅ SEO Benefits
- **Consistent Structure**: All links follow same format
- **Easy Management**: Content creators can easily add/remove links
- **Validation**: Required fields prevent incomplete links
- **Tracking**: Each link has unique ID for analytics

## Migration from JSON

If you previously used JSON fields, the data structure changes from:

```json
// Old JSON format
"internalLinks": [
  {
    "anchorText": "Link text",
    "url": "/some-url"
  }
]
```

To:

```json
// New Link component format  
"internalLinks": [
  {
    "id": 1,
    "anchorText": "Link text", 
    "url": "/some-url",
    "openInNewTab": false
  }
]
```

The main differences:
- Each link now has an `id` field
- Added `openInNewTab` boolean field
- Data is now stored as proper Strapi components instead of raw JSON

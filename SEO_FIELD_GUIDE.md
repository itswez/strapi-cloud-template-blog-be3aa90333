# SEO Field Guide for Strapi Blog

## Overview

This guide explains how to use the enhanced SEO fields in your Strapi blog to optimize content for search engines and social media sharing.

## SEO Component Fields

### Required Fields

#### Meta Title (`metaTitle`)
- **Purpose**: The title that appears in search engine results
- **Character Limit**: 60 characters (enforced in Strapi)
- **Best Practice**: Include primary keywords, keep it compelling
- **Example**: "How Shopify 2.0 Sections Make Theme Editing Easier"

#### Meta Description (`metaDescription`)
- **Purpose**: The description that appears below the title in search results
- **Character Limit**: 155 characters (enforced in Strapi)
- **Best Practice**: Include primary keywords, write compelling copy
- **Example**: "Learn how Shopify 2.0 sections give store owners more control, making theme editing easier with flexible layouts across any page."

### Optional Fields

#### H1 Title (`h1Title`)
- **Purpose**: Main heading for the page (can differ from meta title)
- **Best Practice**: Can be longer than meta title, include primary keywords
- **Example**: "How Shopify 2.0 Sections Make Theme Editing Easier for Store Owners"

#### Primary Keywords (`primaryKeywords`)
- **Purpose**: Main keywords for title, intro, headers, meta tags
- **Format**: Comma-separated list
- **Best Practice**: 3-5 primary keywords maximum
- **Example**: "Shopify 2.0 sections, Shopify sections everywhere, Shopify 2.0 theme editing"

#### Secondary Keywords (`secondaryKeywords`)
- **Purpose**: Keywords to sprinkle naturally in body text
- **Format**: Comma-separated list
- **Best Practice**: 5-10 secondary keywords
- **Example**: "Shopify theme customisation, Shopify page builder, Shopify 2.0 features, Shopify store flexibility, Custom Shopify sections"

#### Canonical URL (`canonicalUrl`)
- **Purpose**: Prevents duplicate content issues
- **Format**: Full URL
- **Example**: "https://yoursite.com/blog/shopify-2-0-sections-theme-editing-easier"

#### Internal Links (`internalLinks`)
- **Purpose**: Suggested internal links for SEO and user experience
- **Format**: JSON array with `anchorText` and `url`
- **Best Practice**: 2-3 relevant internal links per article
- **Example**:
```json
[
  {
    "anchorText": "5 Proven Ways to Improve Your Shopify Store Speed",
    "url": "/blog/shopify-store-speed-optimization"
  },
  {
    "anchorText": "Need help with Shopify 2.0 theme customisation? Get in touch.",
    "url": "/contact"
  }
]
```

#### External Links (`externalLinks`)
- **Purpose**: High-authority external links for SEO balance
- **Format**: JSON array with `anchorText` and `url`
- **Best Practice**: 1-2 external links per article
- **Example**:
```json
[
  {
    "anchorText": "Shopify's official Online Store 2.0 overview",
    "url": "https://shopify.dev/themes/architecture/sections"
  }
]
```

#### Share Image (`shareImage`)
- **Purpose**: Image for social media sharing
- **Format**: Single image file
- **Best Practice**: 1200x630px, relevant to content

#### Open Graph Title (`openGraphTitle`)
- **Purpose**: Custom title for social media sharing
- **Best Practice**: Can be different from meta title for better social engagement

#### Open Graph Description (`openGraphDescription`)
- **Purpose**: Custom description for social media sharing
- **Best Practice**: Can be different from meta description for better social engagement

## Content Types with SEO Fields

### Articles
- ✅ Full SEO component available
- Use for individual blog posts

### About Page
- ✅ Full SEO component available
- Use for about page optimization

### Categories
- ✅ Full SEO component available
- Use for category landing pages

### Global Settings
- ✅ Default SEO component available
- Use for site-wide SEO defaults

## SEO Best Practices

### 1. Keyword Strategy
- **Primary Keywords**: Use in title, H1, intro, meta tags
- **Secondary Keywords**: Sprinkle naturally throughout body text
- **Keyword Density**: 1-2% for primary, 0.5-1% for secondary

### 2. Content Structure
- Use H1 title as main heading
- Include primary keywords in first paragraph
- Use secondary keywords in subheadings and body text

### 3. Internal Linking
- Link to relevant articles on your site
- Use descriptive anchor text
- Aim for 2-3 internal links per article

### 4. External Linking
- Link to authoritative sources
- Use relevant anchor text
- Limit to 1-2 external links per article

### 5. Social Media Optimization
- Use custom Open Graph titles and descriptions
- Include high-quality share images
- Test sharing on different platforms

## Frontend Implementation

### TypeScript Usage
```typescript
interface Article {
  attributes: {
    // ... other fields
    seo?: {
      metaTitle: string;
      metaDescription: string;
      h1Title?: string;
      primaryKeywords?: string;
      secondaryKeywords?: string;
      canonicalUrl?: string;
      internalLinks?: Array<{
        anchorText: string;
        url: string;
      }>;
      externalLinks?: Array<{
        anchorText: string;
        url: string;
      }>;
      shareImage?: StrapiImage;
      openGraphTitle?: string;
      openGraphDescription?: string;
    };
  };
}
```

### React Component Example
```tsx
function SEOHead({ seo }: { seo: SEO }) {
  return (
    <Head>
      <title>{seo.metaTitle}</title>
      <meta name="description" content={seo.metaDescription} />
      {seo.primaryKeywords && (
        <meta name="keywords" content={seo.primaryKeywords} />
      )}
      {seo.canonicalUrl && (
        <link rel="canonical" href={seo.canonicalUrl} />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={seo.openGraphTitle || seo.metaTitle} />
      <meta property="og:description" content={seo.openGraphDescription || seo.metaDescription} />
      {seo.shareImage && (
        <meta property="og:image" content={seo.shareImage.url} />
      )}
    </Head>
  );
}
```

## Example Article with SEO Data

See `examples/seo-example-article.json` for a complete example of how to structure an article with all SEO fields populated according to the Shopify 2.0 sections example.

## Next Steps

1. **Start Strapi**: `npm run develop`
2. **Configure SEO**: Add SEO data to your articles
3. **Test Implementation**: Verify SEO tags in browser dev tools
4. **Monitor Performance**: Use Google Search Console to track rankings

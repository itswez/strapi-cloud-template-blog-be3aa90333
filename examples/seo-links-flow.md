# SEO Links Fields - User Flow

## How the Link Fields Work in Strapi Admin

```
┌─────────────────────────────────────────────────────────────┐
│                    Article Editor                           │
├─────────────────────────────────────────────────────────────┤
│  Title: [How Shopify 2.0 Sections Make...]                 │
│  Content: [Rich text editor...]                            │
│                                                             │
│  ┌─ SEO Component ─────────────────────────────────────┐   │
│  │ Meta Title: [How Shopify 2.0 Sections...]          │   │
│  │ Meta Description: [Learn how Shopify 2.0...]       │   │
│  │ Primary Keywords: [Shopify 2.0 sections...]        │   │
│  │ Secondary Keywords: [Shopify theme customisation...]│   │
│  │                                                     │   │
│  │ Internal Links:                                     │   │
│  │ ┌─ Link #1 ───────────────────────────────────┐    │   │
│  │ │ Anchor Text: [5 Proven Ways to Improve...] │    │   │
│  │ │ URL: [/blog/shopify-store-speed...]        │    │   │
│  │ │ ☐ Open in New Tab                          │    │   │
│  │ └─────────────────────────────────────────────┘    │   │
│  │ ┌─ Link #2 ───────────────────────────────────┐    │   │
│  │ │ Anchor Text: [Need help with Shopify...]   │    │   │
│  │ │ URL: [/contact]                            │    │   │
│  │ │ ☐ Open in New Tab                          │    │   │
│  │ └─────────────────────────────────────────────┘    │   │
│  │ [+ Add Internal Link]                              │   │
│  │                                                     │   │
│  │ External Links:                                     │   │
│  │ ┌─ Link #1 ───────────────────────────────────┐    │   │
│  │ │ Anchor Text: [Shopify's official Online...]│    │   │
│  │ │ URL: [https://shopify.dev/themes/...]      │    │   │
│  │ │ ☑ Open in New Tab                          │    │   │
│  │ └─────────────────────────────────────────────┘    │   │
│  │ [+ Add External Link]                               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Admin Input
- User clicks "Add Internal Link" or "Add External Link"
- Strapi creates a new Link component instance
- User fills in the form fields:
  - **Anchor Text**: The clickable text
  - **URL**: The destination URL
  - **Open in New Tab**: Checkbox for external links

### 2. Data Storage
```json
{
  "internalLinks": [
    {
      "id": 1,
      "anchorText": "5 Proven Ways to Improve Your Shopify Store Speed",
      "url": "/blog/shopify-store-speed-optimization",
      "openInNewTab": false
    }
  ],
  "externalLinks": [
    {
      "id": 2,
      "anchorText": "Shopify's official Online Store 2.0 overview",
      "url": "https://shopify.dev/themes/architecture/sections",
      "openInNewTab": true
    }
  ]
}
```

### 3. Frontend Rendering
```tsx
// Internal Links
{seo?.internalLinks?.map(link => (
  <a 
    href={link.url}
    target={link.openInNewTab ? "_blank" : "_self"}
    rel={link.openInNewTab ? "noopener noreferrer" : ""}
  >
    {link.anchorText}
  </a>
))}

// External Links  
{seo?.externalLinks?.map(link => (
  <a 
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {link.anchorText}
  </a>
))}
```

## Benefits Over JSON Fields

### Before (JSON Fields)
❌ Manual JSON editing
❌ No validation
❌ Easy to make syntax errors
❌ No user-friendly interface
❌ Hard to manage multiple links

### After (Link Components)
✅ Form-based interface
✅ Built-in validation
✅ Type safety
✅ Easy to add/remove links
✅ Reusable component
✅ Consistent data structure

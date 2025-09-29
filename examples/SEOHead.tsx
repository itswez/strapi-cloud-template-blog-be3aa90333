import React from 'react';
import Head from 'next/head';
import { SEO } from '../types/blog-content';

interface SEOHeadProps {
  seo: SEO;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export default function SEOHead({ seo, fallbackTitle, fallbackDescription }: SEOHeadProps) {
  const title = seo.metaTitle || fallbackTitle || 'Blog Post';
  const description = seo.metaDescription || fallbackDescription || '';
  const ogTitle = seo.openGraphTitle || seo.metaTitle || title;
  const ogDescription = seo.openGraphDescription || seo.metaDescription || description;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Keywords */}
      {seo.primaryKeywords && (
        <meta name="keywords" content={seo.primaryKeywords} />
      )}
      
      {/* Canonical URL */}
      {seo.canonicalUrl && (
        <link rel="canonical" href={seo.canonicalUrl} />
      )}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {seo.canonicalUrl && (
        <meta property="og:url" content={seo.canonicalUrl} />
      )}
      {seo.shareImage && (
        <>
          <meta property="og:image" content={seo.shareImage.url} />
          <meta property="og:image:width" content={seo.shareImage.width?.toString()} />
          <meta property="og:image:height" content={seo.shareImage.height?.toString()} />
          <meta property="og:image:alt" content={seo.shareImage.alternativeText || title} />
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {seo.shareImage && (
        <meta name="twitter:image" content={seo.shareImage.url} />
      )}
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

// Example usage in a blog post component
export function BlogPostSEO({ article }: { article: any }) {
  const { seo, title, description } = article.attributes;
  
  return (
    <>
      <SEOHead 
        seo={seo} 
        fallbackTitle={title}
        fallbackDescription={description}
      />
      
      {/* Your blog post content */}
      <article>
        <h1>{seo?.h1Title || title}</h1>
        {/* Render internal and external links */}
        {seo?.internalLinks && seo.internalLinks.length > 0 && (
          <div className="internal-links">
            <h3>Related Articles</h3>
            <ul>
              {seo.internalLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={link.url} 
                    className="internal-link"
                    target={link.openInNewTab ? "_blank" : "_self"}
                    rel={link.openInNewTab ? "noopener noreferrer" : ""}
                  >
                    {link.anchorText}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {seo?.externalLinks && seo.externalLinks.length > 0 && (
          <div className="external-links">
            <h3>External Resources</h3>
            <ul>
              {seo.externalLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={link.url} 
                    className="external-link"
                    target={link.openInNewTab ? "_blank" : "_self"}
                    rel={link.openInNewTab ? "noopener noreferrer" : ""}
                  >
                    {link.anchorText}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </>
  );
}

// Utility function to extract keywords for content analysis
export function extractKeywords(seo: SEO) {
  const primary = seo.primaryKeywords?.split(',').map(k => k.trim()) || [];
  const secondary = seo.secondaryKeywords?.split(',').map(k => k.trim()) || [];
  
  return {
    primary,
    secondary,
    all: [...primary, ...secondary]
  };
}

// Utility function to validate SEO data
export function validateSEO(seo: SEO) {
  const errors: string[] = [];
  
  if (seo.metaTitle && seo.metaTitle.length > 60) {
    errors.push('Meta title should be 60 characters or less');
  }
  
  if (seo.metaDescription && seo.metaDescription.length > 155) {
    errors.push('Meta description should be 155 characters or less');
  }
  
  if (seo.canonicalUrl && !isValidUrl(seo.canonicalUrl)) {
    errors.push('Canonical URL is not valid');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

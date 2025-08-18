import React from 'react';
import { ContentBlock, StrapiImage } from '../types/blog-content';

interface ContentRendererProps {
  blocks: ContentBlock[];
}

// Helper function to get image URL
const getImageUrl = (image: StrapiImage, format: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium') => {
  const baseUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
  if (image.attributes.formats?.[format]) {
    return `${baseUrl}${image.attributes.formats[format].url}`;
  }
  return `${baseUrl}${image.attributes.url}`;
};

// Individual block components
const RichTextBlock: React.FC<{ block: any }> = ({ block }) => (
  <div className="rich-text-block" dangerouslySetInnerHTML={{ __html: block.body }} />
);

const MediaBlock: React.FC<{ block: any }> = ({ block }) => (
  <div className="media-block">
    <img 
      src={getImageUrl(block.file)} 
      alt={block.file.attributes.alternativeText || block.file.attributes.name}
      className="w-full rounded-lg"
    />
    {block.file.attributes.caption && (
      <p className="text-sm text-gray-600 mt-2 text-center">{block.file.attributes.caption}</p>
    )}
  </div>
);

const QuoteBlock: React.FC<{ block: any }> = ({ block }) => (
  <blockquote className="quote-block border-l-4 border-blue-500 pl-4 my-6">
    <p className="text-lg italic mb-2">"{block.body}"</p>
    {block.title && <cite className="text-sm text-gray-600">— {block.title}</cite>}
  </blockquote>
);

const SliderBlock: React.FC<{ block: any }> = ({ block }) => (
  <div className="slider-block">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {block.files.map((file: StrapiImage, index: number) => (
        <img 
          key={index}
          src={getImageUrl(file, 'medium')} 
          alt={file.attributes.alternativeText || file.attributes.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      ))}
    </div>
  </div>
);

const CodeBlock: React.FC<{ block: any }> = ({ block }) => (
  <div className="code-block my-6">
    {block.title && (
      <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg text-sm font-mono">
        {block.title}
      </div>
    )}
    <pre className={`bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto ${block.title ? '' : 'rounded-lg'}`}>
      <code className={`language-${block.language}`}>
        {block.code}
      </code>
    </pre>
  </div>
);

const CallToActionBlock: React.FC<{ block: any }> = ({ block }) => {
  const baseStyles = "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors";
  const styleVariants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-blue-600 hover:bg-blue-50"
  };

  return (
    <div className="cta-block my-6 text-center">
      <a 
        href={block.url}
        target={block.openInNewTab ? "_blank" : "_self"}
        rel={block.openInNewTab ? "noopener noreferrer" : ""}
        className={`${baseStyles} ${styleVariants[block.style]}`}
      >
        {block.title}
        {block.icon && <span className="ml-2">{block.icon}</span>}
      </a>
    </div>
  );
};

const EmbedBlock: React.FC<{ block: any }> = ({ block }) => {
  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=${block.autoplay ? 1 : 0}`;
    }
    // Vimeo
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}?autoplay=${block.autoplay ? 1 : 0}`;
    }
    return url;
  };

  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square',
    '21:9': 'aspect-21/9'
  };

  return (
    <div className="embed-block my-6">
      {block.title && (
        <h3 className="text-lg font-semibold mb-2">{block.title}</h3>
      )}
      <div className={`${aspectRatioClasses[block.aspectRatio]} w-full`}>
        <iframe
          src={getEmbedUrl(block.url)}
          className="w-full h-full rounded-lg"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};

const TableBlock: React.FC<{ block: any }> = ({ block }) => (
  <div className="table-block my-6 overflow-x-auto">
    {block.title && (
      <h3 className="text-lg font-semibold mb-2">{block.title}</h3>
    )}
    <table className={`w-full border-collapse ${block.bordered ? 'border border-gray-300' : ''}`}>
      <thead>
        <tr>
          {block.headers.map((header: string, index: number) => (
            <th 
              key={index}
              className={`px-4 py-2 text-left font-semibold ${block.bordered ? 'border border-gray-300' : ''} bg-gray-100`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {block.rows.map((row: string[], rowIndex: number) => (
          <tr 
            key={rowIndex}
            className={block.striped && rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
          >
            {row.map((cell: string, cellIndex: number) => (
              <td 
                key={cellIndex}
                className={`px-4 py-2 ${block.bordered ? 'border border-gray-300' : ''}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main content renderer component
export const ContentRenderer: React.FC<ContentRendererProps> = ({ blocks }) => {
  const renderBlock = (block: ContentBlock) => {
    switch (block.__component) {
      case 'shared.rich-text':
        return <RichTextBlock key={block.id} block={block} />;
      case 'shared.media':
        return <MediaBlock key={block.id} block={block} />;
      case 'shared.quote':
        return <QuoteBlock key={block.id} block={block} />;
      case 'shared.slider':
        return <SliderBlock key={block.id} block={block} />;
      case 'shared.code-block':
        return <CodeBlock key={block.id} block={block} />;
      case 'shared.call-to-action':
        return <CallToActionBlock key={block.id} block={block} />;
      case 'shared.embed':
        return <EmbedBlock key={block.id} block={block} />;
      case 'shared.table':
        return <TableBlock key={block.id} block={block} />;
      default:
        return <div key={block.id}>Unknown block type: {block.__component}</div>;
    }
  };

  return (
    <div className="content-renderer">
      {blocks.map(renderBlock)}
    </div>
  );
};

export default ContentRenderer; 
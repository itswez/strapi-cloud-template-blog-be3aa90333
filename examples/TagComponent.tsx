import React from 'react';
import { Tag } from '../types/blog-content';

interface TagComponentProps {
  tags?: { data: Tag[] };
  onTagClick?: (tag: Tag) => void;
  className?: string;
}

export const TagComponent: React.FC<TagComponentProps> = ({ 
  tags, 
  onTagClick, 
  className = '' 
}) => {
  if (!tags?.data || tags.data.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.data.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick?.(tag)}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors duration-200"
        >
          #{tag.attributes.name}
        </button>
      ))}
    </div>
  );
};

interface TagListProps {
  tags: Tag[];
  onTagClick?: (tag: Tag) => void;
  className?: string;
}

export const TagList: React.FC<TagListProps> = ({ 
  tags, 
  onTagClick, 
  className = '' 
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick?.(tag)}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          {tag.attributes.name}
        </button>
      ))}
    </div>
  );
};

interface TagFilterProps {
  allTags: Tag[];
  selectedTags: string[];
  onTagToggle: (tagSlug: string) => void;
  className?: string;
}

export const TagFilter: React.FC<TagFilterProps> = ({ 
  allTags, 
  selectedTags, 
  onTagToggle, 
  className = '' 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-lg font-semibold">Filter by Tags</h3>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagToggle(tag.attributes.slug)}
            className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
              selectedTags.includes(tag.attributes.slug)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {tag.attributes.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagComponent; 
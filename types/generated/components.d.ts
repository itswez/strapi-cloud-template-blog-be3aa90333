import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCallToAction extends Struct.ComponentSchema {
  collectionName: 'components_shared_call_to_actions';
  info: {
    description: 'Buttons and links for user interaction';
    displayName: 'Call to Action';
    icon: 'link';
  };
  attributes: {
    icon: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    style: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCodeBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_code_blocks';
  info: {
    description: 'Display code snippets with syntax highlighting';
    displayName: 'Code Block';
    icon: 'code';
  };
  attributes: {
    code: Schema.Attribute.Text & Schema.Attribute.Required;
    language: Schema.Attribute.Enumeration<
      [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'html',
        'css',
        'scss',
        'json',
        'bash',
        'python',
        'php',
        'sql',
        'markdown',
        'yaml',
        'xml',
      ]
    > &
      Schema.Attribute.DefaultTo<'javascript'>;
    showLineNumbers: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedEmbed extends Struct.ComponentSchema {
  collectionName: 'components_shared_embeds';
  info: {
    description: 'Embed external content like videos, tweets, or other media';
    displayName: 'Embed';
    icon: 'play';
  };
  attributes: {
    aspectRatio: Schema.Attribute.Enumeration<['16:9', '4:3', '1:1', '21:9']> &
      Schema.Attribute.DefaultTo<'16:9'>;
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'A structured link with anchor text and URL';
    displayName: 'Link';
    icon: 'link';
    name: 'Link';
  };
  attributes: {
    anchorText: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Comprehensive SEO optimization fields for better search engine visibility';
    displayName: 'SEO';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    externalLinks: Schema.Attribute.Component<'shared.link', true>;
    h1Title: Schema.Attribute.String;
    internalLinks: Schema.Attribute.Component<'shared.link', true>;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 155;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    openGraphDescription: Schema.Attribute.Text;
    openGraphTitle: Schema.Attribute.String;
    primaryKeywords: Schema.Attribute.Text;
    secondaryKeywords: Schema.Attribute.Text;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTable extends Struct.ComponentSchema {
  collectionName: 'components_shared_tables';
  info: {
    description: 'Display structured data in table format';
    displayName: 'Table';
    icon: 'table';
  };
  attributes: {
    bordered: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    headers: Schema.Attribute.JSON;
    rows: Schema.Attribute.JSON;
    striped: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.call-to-action': SharedCallToAction;
      'shared.code-block': SharedCodeBlock;
      'shared.embed': SharedEmbed;
      'shared.link': SharedLink;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.table': SharedTable;
    }
  }
}

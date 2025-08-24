import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAccordionFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_accordion_faqs';
  info: {
    description: 'List of Accordion items';
    displayName: 'Accordion / FAQ';
  };
  attributes: {
    items: Schema.Attribute.Component<'blocks.accordion-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlocksAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_accordion_items';
  info: {
    description: 'Single FAQ item';
    displayName: 'Accordion Item';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksButtonGroup extends Struct.ComponentSchema {
  collectionName: 'components_blocks_button_groups';
  info: {
    description: 'A row of buttons with alignment';
    displayName: 'Button Group';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'center', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    buttons: Schema.Attribute.Component<'shared.button', true> &
      Schema.Attribute.Required;
  };
}

export interface BlocksCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_blocks_card_grids';
  info: {
    description: 'Grid of cards with optional title';
    displayName: 'Card Grid';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 2;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    items: Schema.Attribute.Component<'blocks.card-item', true> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksCardItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_card_items';
  info: {
    description: 'Single card for Card Grid';
    displayName: 'Card Item';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_cta_banners';
  info: {
    description: 'Centered call-to-action section';
    displayName: 'CTA Banner';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_items';
  info: {
    description: 'Icon + title + description';
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFeatureList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_lists';
  info: {
    description: 'Grid of features';
    displayName: 'Feature List';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 4;
          min: 2;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    items: Schema.Attribute.Component<'blocks.feature-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_banners';
  info: {
    description: 'Large visual header with copy & CTAs';
    displayName: 'Hero Banner';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'center', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    buttons: Schema.Attribute.Component<'shared.button', true>;
    eyebrow: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images'>;
    overlay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    richText: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksLogoCloud extends Struct.ComponentSchema {
  collectionName: 'components_blocks_logo_clouds';
  info: {
    description: 'Grid of logos';
    displayName: 'Logo Cloud';
  };
  attributes: {
    items: Schema.Attribute.Component<'blocks.logo-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlocksLogoItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_logo_items';
  info: {
    description: 'Single logo with optional link';
    displayName: 'Logo Item';
  };
  attributes: {
    href: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface BlocksMediaText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_media_texts';
  info: {
    description: 'Image/Video beside text and CTAs';
    displayName: 'Media & Text';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    mediaPosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    richText: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface BlocksPricingFeature extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pricing_features';
  info: {
    description: 'Feature row for a plan';
    displayName: 'Pricing Feature';
  };
  attributes: {
    included: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksPricingPlan extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pricing_plans';
  info: {
    description: 'Single pricing plan';
    displayName: 'Pricing Plan';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.button', false>;
    features: Schema.Attribute.Component<'blocks.pricing-feature', true> &
      Schema.Attribute.Required;
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    period: Schema.Attribute.String;
    price: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksPricingTable extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pricing_tables';
  info: {
    description: 'Table of multiple plans';
    displayName: 'Pricing Table';
  };
  attributes: {
    plans: Schema.Attribute.Component<'blocks.pricing-plan', true> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksRichtextColumn extends Struct.ComponentSchema {
  collectionName: 'components_blocks_richtext_column';
  info: {
    description: 'Einzelne Spalte mit Breite & Inhalt';
    displayName: 'Richtext Column';
    icon: 'columns';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.DefaultTo<''>;
    width: Schema.Attribute.Enumeration<
      ['1/6', '1/4', '1/3', '1/2', '2/3', '3/4', '5/6', '1']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'1/2'>;
  };
}

export interface BlocksRichtextColumns extends Struct.ComponentSchema {
  collectionName: 'components_blocks_richtext_columns';
  info: {
    description: 'Mehrspaltiger Richtext mit w\u00E4hlbaren Spaltenbreiten';
    displayName: 'Richtext Columns';
    icon: 'layer-group';
  };
  attributes: {
    backgorund: Schema.Attribute.Boolean;
    columns: Schema.Attribute.Component<'blocks.richtext-column', true> &
      Schema.Attribute.Required;
    gap: Schema.Attribute.Enumeration<['sm', 'md', 'lg', 'xl']> &
      Schema.Attribute.DefaultTo<'md'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksStatItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stat_items';
  info: {
    description: 'Label + value';
    displayName: 'Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksStats extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stats';
  info: {
    description: 'Group of KPIs/metrics';
    displayName: 'Stats';
  };
  attributes: {
    items: Schema.Attribute.Component<'blocks.stat-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlocksStepItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_step_items';
  info: {
    description: 'One step in a process';
    displayName: 'Step Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksSteps extends Struct.ComponentSchema {
  collectionName: 'components_blocks_steps';
  info: {
    description: 'List of steps / timeline';
    displayName: 'Steps';
  };
  attributes: {
    items: Schema.Attribute.Component<'blocks.step-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface BlocksTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    description: 'Quote with author';
    displayName: 'Testimonial';
  };
  attributes: {
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
    authorRole: Schema.Attribute.String;
    avatar: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Media<'images'>;
    quote: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: 'Reusable CTA button';
    displayName: 'Button';
  };
  attributes: {
    ariaLabel: Schema.Attribute.String;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    size: Schema.Attribute.Enumeration<['sm', 'default', 'lg', 'icon']> &
      Schema.Attribute.DefaultTo<'default'>;
    variant: Schema.Attribute.Enumeration<
      ['default', 'secondary', 'outline', 'ghost', 'link']
    > &
      Schema.Attribute.DefaultTo<'default'>;
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
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.accordion-faq': BlocksAccordionFaq;
      'blocks.accordion-item': BlocksAccordionItem;
      'blocks.button-group': BlocksButtonGroup;
      'blocks.card-grid': BlocksCardGrid;
      'blocks.card-item': BlocksCardItem;
      'blocks.cta-banner': BlocksCtaBanner;
      'blocks.feature-item': BlocksFeatureItem;
      'blocks.feature-list': BlocksFeatureList;
      'blocks.hero-banner': BlocksHeroBanner;
      'blocks.logo-cloud': BlocksLogoCloud;
      'blocks.logo-item': BlocksLogoItem;
      'blocks.media-text': BlocksMediaText;
      'blocks.pricing-feature': BlocksPricingFeature;
      'blocks.pricing-plan': BlocksPricingPlan;
      'blocks.pricing-table': BlocksPricingTable;
      'blocks.richtext-column': BlocksRichtextColumn;
      'blocks.richtext-columns': BlocksRichtextColumns;
      'blocks.stat-item': BlocksStatItem;
      'blocks.stats': BlocksStats;
      'blocks.step-item': BlocksStepItem;
      'blocks.steps': BlocksSteps;
      'blocks.testimonial': BlocksTestimonial;
      'shared.button': SharedButton;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}

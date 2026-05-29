import type { Schema, Struct } from '@strapi/strapi';

export interface PortfolioContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_contact_infos';
  info: {
    displayName: 'Contact Info';
  };
  attributes: {
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
    socialMedia: Schema.Attribute.JSON;
  };
}

export interface PortfolioExperience extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_experiences';
  info: {
    displayName: 'Experience';
  };
  attributes: {
    company: Schema.Attribute.String & Schema.Attribute.Required;
    duration: Schema.Attribute.String;
    responsibilities: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PortfolioProject extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_projects';
  info: {
    displayName: 'Project';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    technologies: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PortfolioSeo extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PortfolioSkill extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_skills';
  info: {
    displayName: 'Skill';
  };
  attributes: {
    level: Schema.Attribute.Enumeration<
      ['Beginner', 'Intermediate', 'Advanced']
    >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'portfolio.contact-info': PortfolioContactInfo;
      'portfolio.experience': PortfolioExperience;
      'portfolio.project': PortfolioProject;
      'portfolio.seo': PortfolioSeo;
      'portfolio.skill': PortfolioSkill;
    }
  }
}

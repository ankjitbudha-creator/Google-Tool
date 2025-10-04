import React from 'react';

export enum ToolCategory {
  CALCULATOR = 'Calculators',
  CONVERTER = 'Converters',
  GENERATOR = 'Generators',
  UTILITY = 'Utilities',
  IMAGE = 'Image Tools',
  PDF = 'PDF Tools',
}

export interface Tool {
  path: string;
  name: string;
  description: string;
  category: ToolCategory;
  component: React.FC;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  layout?: 'custom';
  about: string;
  howTo: {
    title: string;
    description: string;
  }[];
  features: {
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    title: string;
    description: string;
  }[];
}
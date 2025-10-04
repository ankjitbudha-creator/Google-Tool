import React from 'react';
import { tools } from '../../config/tools';
import { SingleToolLayout } from '../../components/SingleToolLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Tool, ToolCategory } from '../../types';
import { siteConfig } from '../../config/site';

interface ToolPageProps {
  params: {
    category: string;
    slug: string;
  };
}

// Statically generate routes for all tools at build time
export async function generateStaticParams() {
  return tools
    .filter(tool => tool.path.split('/').length === 3) // Ensure path format is /category/slug
    .map(tool => {
      const [, category, slug] = tool.path.split('/');
      return { category, slug };
    });
}

const getApplicationCategory = (category: ToolCategory) => {
    switch (category) {
        case ToolCategory.CALCULATOR: return 'BusinessApplication';
        case ToolCategory.CONVERTER: return 'Utilities';
        case ToolCategory.GENERATOR: return 'DeveloperApplication';
        case ToolCategory.IMAGE: return 'MultimediaApplication';
        case ToolCategory.PDF: return 'ProductivityApplication';
        default: return 'BrowserApplication';
    }
};

// Generate dynamic metadata for each tool page
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { category, slug } = params;
  const path = `/${category}/${slug}`;
  const tool = tools.find(t => t.path === path);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  const url = `${siteConfig.baseURL}${tool.path}`;
  const schemas: object[] = [];

  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.baseURL },
        { "@type": "ListItem", "position": 2, "name": "All Tools", "item": `${siteConfig.baseURL}/all-tools` },
        { "@type": "ListItem", "position": 3, "name": tool.name, "item": url }
    ]
  });

  schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": tool.name,
      "description": tool.description,
      "applicationCategory": getApplicationCategory(tool.category),
      "operatingSystem": "Web-based",
      "url": url,
      "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
      },
      "featureList": tool.features.map(f => f.title)
  });

  if (tool.howTo && tool.howTo.length > 0) {
      schemas.push({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": `How to use the ${tool.name}`,
          "step": tool.howTo.map((step, index) => ({
              "@type": "HowToStep",
              "name": step.title,
              "text": step.description,
              "position": index + 1,
              "url": url
          }))
      });
  }

  return {
    title: `${tool.name} | Babal Tools`,
    description: tool.about,
    alternates: {
      canonical: url,
    },
    other: {
      "script[type=\"application/ld+json\"]": JSON.stringify(schemas),
    }
  };
}

const ToolPage: React.FC<ToolPageProps> = ({ params }) => {
  const { category, slug } = params;
  const path = `/${category}/${slug}`;
  const tool = tools.find(t => t.path === path);

  if (!tool) {
    notFound();
  }
  
  const ToolComponent = tool.component;

  return (
    <SingleToolLayout tool={tool as Tool}>
      <ToolComponent />
    </SingleToolLayout>
  );
};

export default ToolPage;

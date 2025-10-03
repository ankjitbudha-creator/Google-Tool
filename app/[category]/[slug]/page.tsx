import React from 'react';
import { tools } from '../../config/tools';
import { SingleToolLayout } from '../../components/SingleToolLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Tool } from '../../types';

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

  return {
    title: `${tool.name} | Babal Tools`,
    description: tool.description,
  };
}

const ToolPage: React.FC<ToolPageProps> = ({ params }) => {
  const { category, slug } = params;
  const path = `/${category}/${slug}`;
  const tool = tools.find(t => t.path === path);

  if (!tool) {
    notFound();
  }

  // Handle tools that might have a fully custom layout
  if (tool.layout === 'custom') {
    const CustomComponent = tool.component;
    return <CustomComponent />;
  }
  
  const ToolComponent = tool.component;

  return (
    <SingleToolLayout tool={tool as Tool}>
      <ToolComponent />
    </SingleToolLayout>
  );
};

export default ToolPage;

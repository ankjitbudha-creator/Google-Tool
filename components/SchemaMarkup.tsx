import React, { useEffect } from 'react';

interface SchemaMarkupProps {
  schema: object | object[];
}

/**
 * A component that injects a JSON-LD schema into the document head.
 * This does not render any visible elements.
 */
export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schema }) => {
  useEffect(() => {
    const scriptId = 'schema-markup';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.innerHTML = JSON.stringify(schema);

    // No cleanup function is returned, so the schema of the last rendered page persists.
    // This is generally acceptable for SPAs as crawlers often re-evaluate the page on navigation.
  }, [schema]);

  return null;
};

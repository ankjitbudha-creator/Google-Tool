
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mt-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

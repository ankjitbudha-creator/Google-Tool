
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { AllToolsPage } from './pages/AllToolsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { tools } from './config/tools';
import { SingleToolLayout } from './pages/SingleToolLayout';
import { HomeHeader } from './components/HomeHeader';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-tools" element={<AllToolsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        {tools.map(tool => (
          <Route
            key={tool.path}
            path={tool.path}
            element={
              tool.layout === 'custom' ? (
                <tool.component />
              ) : (
                <SingleToolLayout tool={tool}>
                  <tool.component />
                </SingleToolLayout>
              )
            }
          />
        ))}
        <Route path="*" element={
          <div className="bg-light dark:bg-slate-900 flex flex-col min-h-screen">
            <HomeHeader />
            <main className="flex-grow flex items-center justify-center py-20">
              <NotFoundPage />
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
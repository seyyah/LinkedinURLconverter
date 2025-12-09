import React from 'react';
import { Header } from './components/Header';
import { Converter } from './components/Converter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <Header />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            LinkedIn Embed Generator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Easily convert LinkedIn post URLs into embeddable iframe codes for your website, blog, or portfolio.
          </p>
        </div>

        <Converter />
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} LinkEmbed. Not affiliated with LinkedIn.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
             <span className="text-sm text-slate-400">
               Built with React & Tailwind
             </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
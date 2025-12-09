import React, { useState } from 'react';
import { generateEmbedData } from '../utils/linkedin';
import { CopyButton } from './CopyButton';

export const Converter: React.FC = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<{ embedUrl: string; iframeCode: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const data = generateEmbedData(url);

    if (data.error) {
      setError(data.error);
    } else if (data.embedUrl && data.iframeCode) {
      setResult({
        embedUrl: data.embedUrl,
        iframeCode: data.iframeCode
      });
    }
  };

  const handleClear = () => {
    setUrl('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Generate Embed Code</h2>
        <form onSubmit={handleConvert} className="space-y-4">
          <div>
            <label htmlFor="linkedin-url" className="block text-sm font-medium text-slate-700 mb-1">
              LinkedIn Post URL
            </label>
            <div className="relative">
              <input
                id="linkedin-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.linkedin.com/feed/update/urn:li:activity:..."
                className="block w-full rounded-lg border-slate-300 border px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-linkedin-500 focus:ring-linkedin-500 shadow-sm transition-all"
                required
              />
              {url && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Supports standard feed URLs and shared activity links.
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-1 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-linkedin-600 hover:bg-linkedin-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-linkedin-500 transition-colors"
            >
              Generate Code
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Result 1: Direct Embed URL */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Embed URL (src)</h3>
              <CopyButton textToCopy={result.embedUrl} label="Copy URL" />
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 break-all font-mono text-sm text-slate-600">
              {result.embedUrl}
            </div>
          </div>

          {/* Result 2: Full Iframe Code */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Full Iframe Code</h3>
              <CopyButton textToCopy={result.iframeCode} label="Copy Code" />
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 font-mono text-sm text-slate-600 overflow-x-auto whitespace-pre-wrap">
              {result.iframeCode}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Preview</h3>
            <div className="flex justify-center bg-slate-50 p-6 rounded-lg border border-slate-200 border-dashed">
              <iframe 
                src={result.embedUrl} 
                height="600" 
                width="504" 
                frameBorder="0" 
                allowFullScreen 
                title="Embedded post preview"
                className="max-w-full bg-white shadow-sm"
              ></iframe>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">
              Note: Preview height may vary depending on content length. Adjust the <code>height</code> attribute in your code as needed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
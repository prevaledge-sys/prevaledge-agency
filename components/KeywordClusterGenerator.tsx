import React, { useState, useContext } from 'react';
import { generateKeywordClusters } from '../services/geminiService';
import { trackEvent } from '../services/analyticsService';
import { SiteDataContext } from '../data/siteDataContext';
import type { KeywordCluster } from '../types';
import Button from './ui/Button';
import Tooltip from './ui/Tooltip';
import InfoIcon from './icons/InfoIcon';
import LoadingSpinner from './ui/LoadingSpinner';

const KeywordClusterGenerator: React.FC = () => {
  const { logAiToolUsage } = useContext(SiteDataContext);
  const [seedKeyword, setSeedKeyword] = useState<string>('');
  const [results, setResults] = useState<KeywordCluster[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seedKeyword.trim()) {
      setError('Please enter a seed keyword to generate clusters.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults(null);

    try {
      logAiToolUsage('keywordClusterGenerator');
      trackEvent('generate_keyword_clusters', {
        category: 'engagement',
        label: seedKeyword,
      });
      const keywordClusters = await generateKeywordClusters(seedKeyword);
      setResults(keywordClusters);
    } catch (err: any) {
      setError('An unexpected error occurred while generating keyword clusters. Please try again or contact support if the issue persists.');
      trackEvent('generate_keyword_clusters_failure', {
        category: 'error',
        label: err.message || 'Unknown keyword cluster error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="keyword-cluster-generator" className="py-20 my-16 relative" aria-labelledby="keyword-cluster-heading">
      <div className="absolute top-8 right-8 z-20">
        <Tooltip text="Generates relevant keyword clusters and long-tail keywords to help you build topical authority and improve SEO.">
          <InfoIcon className="w-6 h-6 text-slate-500 hover:text-blue-400 transition-colors cursor-help" />
        </Tooltip>
      </div>
      <div className="text-center">
        <h2 id="keyword-cluster-heading" className="text-4xl font-bold mb-4">
          AI-Powered <span className="text-blue-400">Keyword Cluster</span> Generator
        </h2>
        <p className="max-w-3xl mx-auto text-slate-400 mb-12">
          Elevate your SEO strategy. Enter a primary keyword, and our AI will generate relevant topic clusters to help you build topical authority.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={seedKeyword}
            onChange={(e) => setSeedKeyword(e.target.value)}
            placeholder="e.g., 'content marketing'"
            className="flex-grow bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            disabled={isLoading}
            aria-label="Seed Keyword"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Clusters'}
          </Button>
        </form>

        <div 
          className="min-h-[400px] relative bg-slate-900/70 border border-slate-800 rounded-lg flex flex-col"
          aria-live="polite"
          aria-busy={isLoading}
        >
          {isLoading && <LoadingSpinner size="lg" />}

          {error && (
            <div role="alert" className="flex items-center justify-center h-full text-red-400 text-center p-4">
              {error}
            </div>
          )}
          
          {!isLoading && results && (
            <div className="h-full max-h-[600px] overflow-y-auto p-6 space-y-6 animate-fade-in">
              {results.map((cluster, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <h3 className="text-lg font-bold text-blue-300 mb-3">{cluster.clusterTitle}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cluster.keywords.map(keyword => (
                       <span key={keyword} className="px-2 py-1 text-xs text-slate-300 bg-slate-700/50 rounded-md">
                         {keyword}
                       </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && !results && !error && (
            <div className="flex items-center justify-center h-full text-slate-500 text-center p-8">
              <p>Your generated keyword clusters will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KeywordClusterGenerator;
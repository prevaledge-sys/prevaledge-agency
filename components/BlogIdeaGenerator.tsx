import React, { useState, useContext } from 'react';
import { generateBlogIdeas } from '../services/geminiService';
import { trackEvent } from '../services/analyticsService';
import { SiteDataContext } from '../data/siteDataContext';
import type { BlogIdea } from '../types';
import Button from './ui/Button';
import Tooltip from './ui/Tooltip';
import InfoIcon from './icons/InfoIcon';
import LoadingSpinner from './ui/LoadingSpinner';

const BlogIdeaGenerator: React.FC = () => {
  const { logAiToolUsage } = useContext(SiteDataContext);
  const [topic, setTopic] = useState<string>('');
  const [results, setResults] = useState<BlogIdea[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic to generate ideas.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults(null);

    try {
      logAiToolUsage('blogIdeaGenerator');
      trackEvent('generate_blog_ideas', {
        category: 'engagement',
        label: topic,
      });
      const blogIdeas = await generateBlogIdeas(topic);
      setResults(blogIdeas);
    } catch (err: any) {
      setError('An unexpected error occurred while generating blog ideas. Please try again or contact support if the issue persists.');
      trackEvent('generate_blog_ideas_failure', {
        category: 'error',
        label: err.message || 'Unknown blog idea error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="blog-idea-generator" className="py-20 relative" aria-labelledby="blog-idea-heading">
      <div className="absolute top-8 right-8 z-20">
        <Tooltip text="Provides a list of creative, SEO-friendly blog post titles, hooks, and keywords for any given topic.">
          <InfoIcon className="w-6 h-6 text-slate-500 hover:text-blue-400 transition-colors cursor-help" />
        </Tooltip>
      </div>
      <div className="text-center">
        <h2 id="blog-idea-heading" className="text-4xl font-bold mb-4">
          AI-Powered <span className="text-blue-400">Blog Idea</span> Generator
        </h2>
        <p className="max-w-3xl mx-auto text-slate-400 mb-12">
          Never run out of content ideas again. Enter a topic or industry, and get a list of creative, SEO-friendly blog post titles.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'sustainable fashion' or 'B2B marketing trends'"
            className="flex-grow bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            disabled={isLoading}
            aria-label="Blog topic"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Get Ideas'}
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
            <div className="h-full max-h-[500px] overflow-y-auto p-6 space-y-6 animate-fade-in">
              {results.map((idea, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <h3 className="text-lg font-bold text-blue-300 mb-2">{idea.title}</h3>
                  <p className="text-slate-300 italic mb-3">"{idea.hook}"</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold text-slate-400 mr-2">Keywords:</span>
                    {idea.keywords.map(keyword => (
                       <span key={keyword} className="px-2 py-1 text-xs text-purple-300 bg-purple-900/50 border border-purple-700/50 rounded-full">
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
              <p>Your generated blog ideas will appear here...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogIdeaGenerator;
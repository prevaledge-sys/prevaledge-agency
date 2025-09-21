import React, { useState, useContext } from 'react';
import { generateDigitalStrategy } from '../services/geminiService';
import { trackEvent } from '../services/analyticsService';
import { SiteDataContext } from '../data/siteDataContext';
import Button from './ui/Button';
import Tooltip from './ui/Tooltip';
import InfoIcon from './icons/InfoIcon';
import LoadingSpinner from './ui/LoadingSpinner';

const AIGenerator: React.FC = () => {
  const { logAiToolUsage } = useContext(SiteDataContext);
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setIsStreaming(true);
    setError('');
    setResult('');

    try {
      // Internal and external analytics tracking
      logAiToolUsage('strategyGenerator');
      trackEvent('generate_strategy', {
        category: 'engagement',
        label: `Strategy generated for: ${prompt.substring(0, 50)}...`
      });
      
      const stream = generateDigitalStrategy(prompt);
      for await (const chunk of stream) {
        setResult((prevResult) => prevResult + chunk);
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again or contact support if the problem persists.');
      trackEvent('generate_strategy_failure', {
        category: 'error',
        label: err.message || 'Unknown stream error',
      });
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };
  
  const formatResult = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-blue-400 mt-4 mb-2">{line.substring(4)}</h3>;
      }
      // Return a non-breaking space for empty lines to maintain paragraph spacing
      return <p key={index} className="mb-2 text-slate-300">{line || '\u00A0'}</p>; 
    });
  };

  return (
    <section id="ai-generator" className="py-20 relative" aria-labelledby="ai-generator-heading">
      <div className="absolute top-8 right-8 z-20">
        <Tooltip text="Generates a comprehensive digital marketing strategy based on your business idea.">
          <InfoIcon className="w-6 h-6 text-slate-500 hover:text-blue-400 transition-colors cursor-help" />
        </Tooltip>
      </div>
      <div className="text-center">
        <h2 id="ai-generator-heading" className="text-4xl font-bold mb-4">
          Generate Your <span className="text-blue-400">Digital Strategy</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-400 mb-8">
          Have a business idea? Let our expert AI generate an innovative digital strategy for you in seconds.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A sustainable drone delivery service for urban areas'"
            className="flex-grow bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            disabled={isLoading}
            aria-label="Your business idea"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </form>

        <div 
          className="mt-8 min-h-[200px] bg-slate-900/70 border border-slate-800 rounded-lg p-6 relative"
          aria-live="polite"
          aria-busy={isLoading}
        >
          {isLoading && !result && <LoadingSpinner size="lg" />}
          {error && <div role="alert" className="text-red-400 text-center">{error}</div>}
          
          <div className="prose prose-invert max-w-none">
            {result && formatResult(result)}
            {isStreaming && <span className="blinking-cursor"></span>}
          </div>
          
          {!isLoading && !result && !error && (
            <p className="text-slate-500 text-center">Your strategy will appear here...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIGenerator;
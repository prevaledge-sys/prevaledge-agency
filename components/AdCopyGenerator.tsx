import React, { useState, useContext } from 'react';
import { generateAdCopy } from '../services/geminiService';
import { trackEvent } from '../services/analyticsService';
import { SiteDataContext } from '../data/siteDataContext';
import type { AdCopyResult } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import Tooltip from './ui/Tooltip';
import InfoIcon from './icons/InfoIcon';
import LoadingSpinner from './ui/LoadingSpinner';

const AdCopyGenerator: React.FC = () => {
  const { logAiToolUsage } = useContext(SiteDataContext);
  const [formData, setFormData] = useState({
    productName: '',
    targetAudience: '',
    keyFeatures: '',
    tone: 'Professional',
  });
  const [results, setResults] = useState<AdCopyResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName || !formData.targetAudience || !formData.keyFeatures) {
      setError('All fields are required.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults(null);

    try {
      logAiToolUsage('adCopyGenerator');
      trackEvent('generate_ad_copy', {
        category: 'engagement',
        label: formData.productName,
        tone: formData.tone,
      });
      const adCopyResult = await generateAdCopy(
        formData.productName,
        formData.targetAudience,
        formData.keyFeatures,
        formData.tone
      );
      setResults(adCopyResult);
    } catch (err: any) {
      setError('An unexpected error occurred while generating ad copy. Please try again or contact support if the issue persists.');
      trackEvent('generate_ad_copy_failure', {
        category: 'error',
        label: err.message || 'Unknown ad copy error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = "w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow";

  const tones = ['Professional', 'Friendly', 'Urgent', 'Luxury', 'Playful', 'Inspirational'];

  return (
    <section id="ad-copy-generator" className="py-20 relative" aria-labelledby="ad-copy-heading">
      <div className="absolute top-8 right-8 z-20">
        <Tooltip text="Creates compelling headlines and descriptions for your ad campaigns based on your product, audience, and tone.">
          <InfoIcon className="w-6 h-6 text-slate-500 hover:text-blue-400 transition-colors cursor-help" />
        </Tooltip>
      </div>
      <div className="text-center">
        <h2 id="ad-copy-heading" className="text-4xl font-bold mb-4">
          AI-Powered <span className="text-blue-400">Ad Copy</span> Generator
        </h2>
        <p className="max-w-3xl mx-auto text-slate-400 mb-12">
          Struggling with writer's block? Describe your product and let our AI generate compelling ad copy variations in seconds.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-slate-300 mb-2">Product/Service Name</label>
              <input type="text" name="productName" id="productName" value={formData.productName} onChange={handleChange} className={inputClasses} placeholder="e.g., QuantumLeap SaaS" />
            </div>
            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
              <input type="text" name="targetAudience" id="targetAudience" value={formData.targetAudience} onChange={handleChange} className={inputClasses} placeholder="e.g., B2B data analysts" />
            </div>
            <div>
              <label htmlFor="keyFeatures" className="block text-sm font-medium text-slate-300 mb-2">Key Features/Benefits</label>
              <textarea name="keyFeatures" id="keyFeatures" rows={3} value={formData.keyFeatures} onChange={handleChange} className={inputClasses} placeholder="e.g., Real-time analytics, Interactive dashboards" />
            </div>
            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-slate-300 mb-2">Tone of Voice</label>
              <select name="tone" id="tone" value={formData.tone} onChange={handleChange} className={inputClasses}>
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="text-center pt-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Ad Copy'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Results Panel */}
        <div className="min-h-[620px] relative bg-slate-900/70 border border-slate-800 rounded-lg flex flex-col">
          {isLoading && <LoadingSpinner size="lg" />}

          {error && (
            <div role="alert" className="flex items-center justify-center h-full text-red-400 text-center p-4">
              {error}
            </div>
          )}
          
          {!isLoading && results && (
            <div className="h-full max-h-[620px] overflow-y-auto p-6 space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-blue-400 mb-3">Headlines</h3>
                <ul className="space-y-2">
                  {results.headlines.map((headline, index) => (
                    <li key={`h-${index}`} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-md">
                      <span className="text-slate-200">{headline}</span>
                      <button onClick={() => handleCopy(headline)} className="text-slate-400 hover:text-white transition-colors p-1" aria-label="Copy headline">
                        {copiedText === headline ? (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
               <div>
                <h3 className="text-lg font-bold text-blue-400 mb-3">Descriptions</h3>
                <ul className="space-y-2">
                  {results.descriptions.map((desc, index) => (
                     <li key={`d-${index}`} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-md">
                      <span className="text-slate-300">{desc}</span>
                       <button onClick={() => handleCopy(desc)} className="text-slate-400 hover:text-white transition-colors p-1" aria-label="Copy description">
                        {copiedText === desc ? (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {!isLoading && !results && !error && (
            <div className="flex items-center justify-center h-full text-slate-500 text-center p-8">
              <p>Your generated ad copy will appear here...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdCopyGenerator;
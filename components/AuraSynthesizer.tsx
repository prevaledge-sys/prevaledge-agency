import React, { useState, useContext } from 'react';
import Button from './ui/Button';
import AuraVisualizer from './AuraVisualizer';
import Tooltip from './ui/Tooltip';
import InfoIcon from './icons/InfoIcon';
import { SiteDataContext } from '../data/siteDataContext';

const AuraSynthesizer: React.FC = () => {
  const { logAiToolUsage } = useContext(SiteDataContext);
  const [inputText, setInputText] = useState<string>('');
  const [seed, setSeed] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      setSeed(inputText.trim());
      logAiToolUsage('auraSynthesizer');
    }
  };

  const closeVisualizer = () => {
    setSeed('');
  };

  return (
    <section id="aura-synthesizer" className="py-20 text-center relative" aria-labelledby="aura-heading">
      <div className="absolute top-8 right-8 z-20">
        <Tooltip text="Creates a unique, generative art piece based on your brand name, visualizing its digital essence.">
          <InfoIcon className="w-6 h-6 text-slate-500 hover:text-blue-400 transition-colors cursor-help" />
        </Tooltip>
      </div>
      <h2 id="aura-heading" className="text-4xl font-bold mb-4">
        Visualize Your <span className="text-blue-400">Brand Essence</span>
      </h2>
      <p className="max-w-2xl mx-auto text-slate-400 mb-8">
        Every brand has a unique digital signature. Enter your name or your brand's name to see a generative art piece representing its unique essence.
      </p>

      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., 'Prevaledge' or your brand name"
            className="flex-grow bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            aria-label="Your name or brand name"
          />
          <Button type="submit">
            Visualize
          </Button>
        </form>
      </div>

      {seed && <AuraVisualizer seed={seed} onClose={closeVisualizer} />}
    </section>
  );
};

export default AuraSynthesizer;
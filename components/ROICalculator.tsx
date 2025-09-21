import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Button from './ui/Button';
import Card from './ui/Card';
import CalculatorIcon from './icons/CalculatorIcon';
import { trackEvent } from '../services/analyticsService';
import { SiteDataContext } from '../data/siteDataContext';
import Tooltip from './ui/Tooltip';
import InfoIcon from './icons/InfoIcon';

// Custom hook for animating numbers
const useAnimatedNumber = (endValue: number, duration: number = 1000) => {
  const [currentValue, setCurrentValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out function
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.floor(easedProgress * endValue);
      setCurrentValue(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [endValue, duration]);

  return currentValue;
};

const currencies = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'RUB', name: 'Russian Ruble' },
  { code: 'KRW', name: 'South Korean Won' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'NOK', name: 'Norwegian Krone' },
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'HKD', name: 'Hong Kong Dollar' },
  { code: 'NZD', name: 'New Zealand Dollar' },
  { code: 'SEK', name: 'Swedish Krona' },
  { code: 'ZAR', name: 'South African Rand' },
  { code: 'TRY', name: 'Turkish Lira' },
  { code: 'PLN', name: 'Polish Złoty' },
  { code: 'THB', name: 'Thai Baht' },
  { code: 'IDR', name: 'Indonesian Rupiah' },
  { code: 'HUF', name: 'Hungarian Forint' },
  { code: 'CZK', name: 'Czech Koruna' },
  { code: 'ILS', name: 'Israeli New Shekel' },
  { code: 'CLP', name: 'Chilean Peso' },
  { code: 'PHP', name: 'Philippine Peso' },
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'COP', name: 'Colombian Peso' },
  { code: 'SAR', name: 'Saudi Riyal' },
  { code: 'MYR', name: 'Malaysian Ringgit' },
];


const ROICalculator: React.FC = () => {
  const { logAiToolUsage } = useContext(SiteDataContext);
  const [formData, setFormData] = useState({
    monthlyVisitors: '10000',
    conversionRate: '2.5',
    avgSaleValue: '150',
    estimatedImprovement: '20',
  });
  
  const [currency, setCurrency] = useState('USD');
  
  const [results, setResults] = useState<{
    additionalRevenue: number;
    yearlyAdditionalRevenue: number;
  } | null>(null);

  const [hasCalculatedOnce, setHasCalculatedOnce] = useState(false);

  const calculateAndSetResults = useCallback(() => {
    const visitors = parseFloat(formData.monthlyVisitors) || 0;
    const currentCR = parseFloat(formData.conversionRate) / 100 || 0;
    const saleValue = parseFloat(formData.avgSaleValue) || 0;
    const improvement = parseFloat(formData.estimatedImprovement) / 100 || 0;

    if (!visitors || !currentCR || !saleValue) {
      setResults(null);
      return;
    }

    const currentConversions = visitors * currentCR;
    const currentRevenue = currentConversions * saleValue;

    const newCR = currentCR * (1 + improvement);
    const newConversions = visitors * newCR;
    const newRevenue = newConversions * saleValue;

    const additionalRevenue = newRevenue - currentRevenue;
    const yearlyAdditionalRevenue = additionalRevenue * 12;

    setResults({ additionalRevenue, yearlyAdditionalRevenue });
  }, [formData]);

  // Effect for live-updating the results
  useEffect(() => {
    if (hasCalculatedOnce) {
      calculateAndSetResults();
    }
  }, [hasCalculatedOnce, calculateAndSetResults]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResults(null); // Reset results when form data changes
    setHasCalculatedOnce(false); // Require button press again
    const { name, value } = e.target;
    // Allow only numbers and a single decimal point
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateAndSetResults();
    setHasCalculatedOnce(true); // Enable live updates

    logAiToolUsage('roiCalculator');
    // Calculate value for analytics synchronously
    const visitors = parseFloat(formData.monthlyVisitors) || 0;
    const currentCR = parseFloat(formData.conversionRate) / 100 || 0;
    const saleValue = parseFloat(formData.avgSaleValue) || 0;
    const improvement = parseFloat(formData.estimatedImprovement) / 100 || 0;
    const currentConversions = visitors * currentCR;
    const currentRevenue = currentConversions * saleValue;
    const newCR = currentCR * (1 + improvement);
    const newConversions = visitors * newCR;
    const newRevenue = newConversions * saleValue;
    const yearlyAdditionalRevenue = (newRevenue - currentRevenue) * 12;

    trackEvent('calculate_roi', {
        category: 'engagement',
        value: Math.round(yearlyAdditionalRevenue)
    });
  };

  const formatCurrency = (value: number, selectedCurrency: string) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: selectedCurrency, 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    }).format(value);
  };
  
  const AnimatedResult = ({ value, currency }: { value: number, currency: string }) => {
    const animatedValue = useAnimatedNumber(value);
    return <>{formatCurrency(animatedValue, currency)}</>;
  };

  const inputClasses = "w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow";

  return (
    <section id="roi-calculator" className="py-20 relative" aria-labelledby="roi-heading">
      <div className="absolute top-8 right-8 z-20">
        <Tooltip text="Estimates your potential revenue growth by calculating the ROI of improving your website's conversion rate.">
          <InfoIcon className="w-6 h-6 text-slate-500 hover:text-blue-400 transition-colors cursor-help" />
        </Tooltip>
      </div>
      <div className="text-center">
        <h2 id="roi-heading" className="text-4xl font-bold mb-4">
          Calculate Your Potential <span className="text-blue-400">ROI</span>
        </h2>
        <p className="max-w-3xl mx-auto text-slate-400 mb-12">
          Use our simple calculator to estimate the potential revenue growth from partnering with Prevaledge to optimize your digital strategy.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Form Inputs */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="monthlyVisitors" className="block text-sm font-medium text-slate-300 mb-2">Avg. Monthly Website Visitors</label>
              <input type="text" inputMode="decimal" name="monthlyVisitors" id="monthlyVisitors" value={formData.monthlyVisitors} onChange={handleTextChange} className={inputClasses} />
            </div>
            <div>
              <label htmlFor="conversionRate" className="block text-sm font-medium text-slate-300 mb-2">Current Conversion Rate (%)</label>
              <input type="text" inputMode="decimal" name="conversionRate" id="conversionRate" value={formData.conversionRate} onChange={handleTextChange} className={inputClasses} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="avgSaleValue" className="block text-sm font-medium text-slate-300 mb-2">Average Sale Value</label>
                    <input type="text" inputMode="decimal" name="avgSaleValue" id="avgSaleValue" value={formData.avgSaleValue} onChange={handleTextChange} className={inputClasses} />
                </div>
                <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
                    <select id="currency" name="currency" value={currency} onChange={handleCurrencyChange} className={`${inputClasses} h-[50px]`}>
                        {currencies.map(c => (
                          <option key={c.code} value={c.code}>
                            {c.name} ({c.code})
                          </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
              <label htmlFor="estimatedImprovement" className="block text-sm font-medium text-slate-300 mb-2">Estimated Conversion Improvement (%)</label>
              <input type="range" name="estimatedImprovement" id="estimatedImprovement" min="5" max="50" step="5" value={formData.estimatedImprovement} onChange={handleSliderChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
              <div className="text-center font-bold text-blue-400 mt-2 text-lg">{formData.estimatedImprovement}%</div>
            </div>
            <div className="text-center pt-4">
              <Button type="submit">Calculate Potential ROI</Button>
            </div>
          </form>
        </Card>

        {/* Results */}
        <div className="text-center min-h-[300px] flex flex-col justify-center">
          {results ? (
            <div className="animate-fade-in">
              <CalculatorIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Potential Growth</h3>
              <p className="text-slate-400 mb-6">Based on a {formData.estimatedImprovement}% conversion rate improvement.</p>
              
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <p className="text-sm uppercase text-slate-400">Additional Monthly Revenue</p>
                    <p className="text-3xl font-bold text-blue-400">
                        <AnimatedResult value={results.additionalRevenue} currency={currency} />
                    </p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <p className="text-sm uppercase text-slate-400">Potential Yearly Revenue Growth</p>
                    <p className="text-4xl font-extrabold text-green-400">
                        <AnimatedResult value={results.yearlyAdditionalRevenue} currency={currency} />
                    </p>
                </div>
                <div className="text-sm text-slate-500 pt-4">
                    *This is an estimate for illustrative purposes only. Actual results may vary.
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500">
              <CalculatorIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p>Enter your business metrics and click 'Calculate' to see your potential return on investment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
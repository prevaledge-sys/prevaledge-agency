import React, { useState, useRef, useContext } from 'react';
import type { ServicePricing } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import AnimateOnScroll from './ui/AnimateOnScroll';
import CheckIcon from './icons/CheckIcon';
import { SiteDataContext } from '../data/siteDataContext';

const PricingSection: React.FC = () => {
  const { servicePricingData } = useContext(SiteDataContext);
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const activeService = servicePricingData[activeTab];
  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % servicePricingData.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + servicePricingData.length) % servicePricingData.length;
    }

    if (newIndex !== index) {
      setActiveTab(newIndex);
      tabsRef.current[newIndex]?.focus();
    }
  };

  return (
    <section id="pricing" className="py-20" aria-labelledby="pricing-heading">
      <AnimateOnScroll>
        <div className="text-center">
          <h2 id="pricing-heading" className="text-4xl font-bold mb-4">
            Plans & <span className="text-blue-400">Pricing</span>
          </h2>
          <p className="max-w-3xl mx-auto text-slate-400 mb-12">
            Transparent, flexible pricing for every stage of your business. Find the perfect plan for the service you need.
          </p>
        </div>
      </AnimateOnScroll>

      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <AnimateOnScroll delay={200}>
          <div role="tablist" aria-label="Service pricing plans" className="flex flex-wrap justify-center gap-2 mb-12">
            {servicePricingData.map(({ serviceTitle, icon: Icon }, index) => (
              <button
                key={serviceTitle}
                ref={(el) => { tabsRef.current[index] = el; }}
                id={`tab-${slugify(serviceTitle)}`}
                role="tab"
                aria-controls={`panel-${slugify(serviceTitle)}`}
                aria-selected={activeTab === index}
                onClick={() => setActiveTab(index)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`
                  flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full
                  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-blue-500
                  ${activeTab === index 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/70'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {serviceTitle}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Pricing Cards */}
        {activeService && (
          <div 
            key={activeService.serviceTitle} 
            id={`panel-${slugify(activeService.serviceTitle)}`}
            role="tabpanel"
            aria-labelledby={`tab-${slugify(activeService.serviceTitle)}`}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {activeService.plans.map((plan, index) => (
              <AnimateOnScroll key={plan.name} delay={index * 150}>
                <Card isPopular={plan.isPopular} className="flex flex-col h-full">
                  {plan.isPopular && (
                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase z-10">
                      Most Popular
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-center text-white mb-2">{plan.name}</h3>
                    <p className="text-4xl font-extrabold text-center my-4">
                      {plan.price}
                      {plan.priceDetail && <span className="text-lg font-medium text-slate-400">{plan.priceDetail}</span>}
                    </p>
                    <p className="text-slate-400 text-center min-h-[48px] mb-6">{plan.description}</p>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-1" />
                          <span className="text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto">
                    <Button href="#contact" variant={plan.isPopular ? 'primary' : 'secondary'} className="w-full">
                      {plan.name === 'Scale' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </div>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;

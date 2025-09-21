import React, { useContext } from 'react';
import type { Service } from '../types';
import Card from './ui/Card';
import AnimateOnScroll from './ui/AnimateOnScroll';
import { SiteDataContext } from '../data/siteDataContext';

const ServicesSection: React.FC = () => {
  const { services } = useContext(SiteDataContext);
  return (
    <section id="services" className="py-20" aria-labelledby="services-heading">
      <AnimateOnScroll>
        <h2 id="services-heading" className="text-4xl font-bold text-center mb-12">
          Our <span className="text-blue-400">Services</span>
        </h2>
      </AnimateOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <AnimateOnScroll key={service.title} delay={index * 100}>
            <Card>
              <div className="flex justify-center mb-4">
                <service.icon 
                  aria-hidden="true"
                  className="
                    w-12 h-12 text-blue-400 
                    transition-all duration-500 ease-out 
                    group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]
                  "
                />
              </div>
              <h3 className="text-2xl font-bold text-center text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-center">{service.description}</p>
            </Card>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
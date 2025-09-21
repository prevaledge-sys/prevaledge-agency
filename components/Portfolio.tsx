import React, { useState, useRef, useContext } from 'react';
import type { Project } from '../types';
import PortfolioModal from './PortfolioModal';
import AnimateOnScroll from './ui/AnimateOnScroll';
import { SiteDataContext } from '../data/siteDataContext';

const PortfolioSection: React.FC = () => {
  const { projects } = useContext(SiteDataContext);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const openModal = (project: Project) => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
    lastFocusedElement.current?.focus();
  };

  return (
    <>
      <section id="portfolio" className="py-20" aria-labelledby="portfolio-heading">
        <AnimateOnScroll>
          <div className="text-center">
            <h2 id="portfolio-heading" className="text-4xl font-bold mb-4">
              Our <span className="text-blue-400">Work</span>
            </h2>
            <p className="max-w-3xl mx-auto text-slate-400 mb-12">
              We partner with ambitious brands to create digital experiences that drive results. Explore some of our recent projects.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.title} delay={index * 100}>
              <button
                onClick={() => openModal(project)}
                className="text-left cursor-pointer group block bg-slate-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-800 hover:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 h-full"
                aria-label={`View details for ${project.title}`}
              >
                <div className="relative">
                  <img src={project.image} alt={`A visual preview of the ${project.title} project.`} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">{project.category}</h3>
                  <h2 className="text-xl font-bold text-white mt-2 mb-3 truncate group-hover:text-blue-300 transition-colors">{project.title}</h2>
                  <p className="text-slate-400 text-sm h-10">{project.description}</p>
                </div>
              </button>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
      <PortfolioModal project={selectedProject} onClose={closeModal} />
    </>
  );
};

export default PortfolioSection;
import React, { useEffect, useRef } from 'react';
import type { Project } from '../types';

interface PortfolioModalProps {
  project: Project | null;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      
      // Focus trapping
      if (event.key === 'Tab' && modalRef.current && project) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) { // Shift+Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      // Focus the first focusable element (the close button) when the modal opens
      setTimeout(() => {
        (modalRef.current?.querySelector('button') as HTMLElement)?.focus();
      }, 100); // Small delay to allow for transition
      document.addEventListener('keydown', handleKeyDown);
    } else {
        document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      <div
        ref={modalRef}
        className="relative max-w-4xl w-11/12 max-h-[90vh] bg-slate-900/80 backdrop-blur-xl border border-blue-500/50 rounded-2xl shadow-2xl shadow-blue-900/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close project details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="grid md:grid-cols-2 h-full">
          <div className="relative hidden md:block">
            <img src={project.image.replace('600/400', '800/600')} alt={project.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent"></div>
          </div>

          <div className="overflow-y-auto">
            <img src={project.image.replace('600/400', '800/600')} alt={project.title} className="w-full h-56 object-cover md:hidden" />
            <div className="p-8 md:p-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">{project.category}</h3>
              <h2 id="portfolio-modal-title" className="text-3xl lg:text-4xl font-bold text-white mt-2 mb-4">{project.title}</h2>
              <p className="text-slate-300 mb-6">{project.detailedDescription}</p>

              <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs text-purple-300 bg-purple-900/50 border border-purple-700 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
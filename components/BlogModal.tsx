import React, { useEffect, useRef } from 'react';
import type { BlogPost } from '../types';
import TwitterIcon from './icons/TwitterIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import FacebookIcon from './icons/FacebookIcon';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      // Basic focus trapping
      if (event.key === 'Tab' && modalRef.current && post) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
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

    if (post) {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
      
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        // The first focusable element is the close button.
        (modalRef.current?.querySelector('button') as HTMLElement)?.focus();
      }, 100);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;
  
  const renderTextWithBold = (line: string) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) =>
      index % 2 === 1 ? <strong key={index} className="font-semibold text-slate-100">{part}</strong> : part
    );
  };

  const formatContent = (text: string) => {
    const blocks = text.split('\n\n').filter(block => block.trim() !== '');
    
    const finalElements: React.ReactNode[] = [];
  
    blocks.forEach((block, blockIndex) => {
      const lines = block.split('\n');
      let nonListLines: string[] = [];
      let listItems: {type: 'ul'|'ol', content: string}[] = [];
  
      // Separate lines into paragraphs/headings and list items
      lines.forEach(line => {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('- ')) {
              listItems.push({type: 'ul', content: line});
          } else if (trimmedLine.match(/^\d+\.\s/)) {
              listItems.push({type: 'ol', content: line});
          } else {
              nonListLines.push(line);
          }
      });
  
      // Render non-list parts (paragraphs, headings)
      if (nonListLines.length > 0) {
        const nonListContent = nonListLines.join(' '); // Join with space for single paragraph
        const trimmedContent = nonListContent.trim();
        if (trimmedContent.startsWith('### ')) {
          finalElements.push(<h3 key={`${blockIndex}-h3`} className="text-xl lg:text-2xl font-bold text-blue-400 mt-6 mb-3">{trimmedContent.substring(4)}</h3>);
        } else if (trimmedContent.startsWith('#### ')) {
          finalElements.push(<h4 key={`${blockIndex}-h4`} className="text-lg lg:text-xl font-semibold text-white mt-4 mb-2">{trimmedContent.substring(5)}</h4>);
        } else if (trimmedContent) { // Avoid creating empty paragraphs
          finalElements.push(
            <p key={`${blockIndex}-p`} className="text-slate-300 mb-4 leading-relaxed">
              {renderTextWithBold(nonListContent)}
            </p>
          );
        }
      }
      
      // Render list part
      if (listItems.length > 0) {
        const listType = listItems[0].type; // Assume all items in a block are same type
        if(listType === 'ul') {
          finalElements.push(
              <ul key={`${blockIndex}-ul`} className="list-disc list-inside space-y-2 mb-4 pl-4 text-slate-300">
              {listItems.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderTextWithBold(item.content.trim().replace(/^- \s*/, ''))}</li>
              ))}
              </ul>
          );
        } else { // ol
          finalElements.push(
              <ol key={`${blockIndex}-ol`} className="list-decimal list-inside space-y-2 mb-4 pl-4 text-slate-300">
              {listItems.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderTextWithBold(item.content.trim().replace(/^\d+\.\s/, ''))}</li>
              ))}
              </ol>
          );
        }
      }
    });
  
    return finalElements;
  };

  const siteUrl = 'https://prevaledge.com';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
    >
      <div
        ref={modalRef}
        className="relative max-w-4xl w-11/12 max-h-[90vh] bg-slate-900/80 backdrop-blur-xl border border-blue-500/50 rounded-2xl shadow-2xl shadow-blue-900/50 overflow-hidden grid grid-rows-[auto_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 border-b border-slate-800 relative">
            <h2 id="blog-modal-title" className="text-2xl lg:text-4xl font-bold text-white pr-12">{post.title}</h2>
            <p className="text-slate-400 mt-2">By <span className="text-slate-300">{post.author}</span> on <span className="text-slate-300">{post.date}</span></p>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close blog post"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div ref={contentRef} className="overflow-y-auto">
          <article className="p-6 md:p-8">
            <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded-lg mb-8" />
            <div className="max-w-none">
              {formatContent(post.content)}
            </div>
            
            {/* Social Sharing Section */}
            <div className="mt-12 pt-8 border-t border-slate-800/50">
                <h4 className="text-lg font-bold text-center text-slate-200 mb-4">Share this Article</h4>
                <div className="flex justify-center items-center gap-8">
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                        <TwitterIcon className="w-8 h-8" />
                    </a>
                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                        <LinkedInIcon className="w-8 h-8" />
                    </a>
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110">
                        <FacebookIcon className="w-8 h-8" />
                    </a>
                </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
import React, { useState, useRef, useContext } from 'react';
import type { BlogPost } from '../types';
import BlogModal from './BlogModal';
import AnimateOnScroll from './ui/AnimateOnScroll';
import { SiteDataContext } from '../data/siteDataContext';


const BlogSection: React.FC = () => {
  const { blogPosts } = useContext(SiteDataContext);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const openModal = (post: BlogPost) => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
    lastFocusedElement.current?.focus();
  };

  return (
    <>
      <section id="blog" className="py-20" aria-labelledby="blog-heading">
        <AnimateOnScroll>
          <div className="text-center">
            <h2 id="blog-heading" className="text-4xl font-bold mb-4">
              From the <span className="text-blue-400">Prevaledge Blog</span>
            </h2>
            <p className="max-w-3xl mx-auto text-slate-400 mb-12">
              Insights, strategies, and news from the forefront of digital innovation.
            </p>
          </div>
        </AnimateOnScroll>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <AnimateOnScroll key={post.slug} delay={index * 100}>
              <button 
                onClick={() => openModal(post)} 
                className="text-left cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg h-full"
                aria-label={`Read blog post: ${post.title}`}
              >
                <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-800 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-blue-500/50 group-hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"/>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-blue-400 mb-2">{post.date}</p>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors flex-grow">{post.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{post.excerpt}</p>
                     <p className="text-xs text-slate-500">By {post.author}</p>
                  </div>
                </div>
              </button>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
      <BlogModal post={selectedPost} onClose={closeModal} />
    </>
  );
};

export default BlogSection;

import React, { useState, useEffect } from 'react';
import type { BlogPost, NewBlogPost } from '../../types';
import Button from '../ui/Button';
import SparklesIcon from '../icons/SparklesIcon';
import AIImageGenerator from './AIImageGenerator';
import { generateBlogPostDraft, improveText, generateExcerpt, generateSeoMetadata } from '../../services/geminiService';
import { inputClass, labelClass } from './ui/formStyles';
import SeoIcon from '../icons/SeoIcon';


interface BlogFormProps {
  post: BlogPost | null;
  onSave: (postData: NewBlogPost, originalItem: BlogPost | null) => void;
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewBlogPost>({
    title: '',
    author: '',
    image: '',
    excerpt: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
  });

  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [isImprovingContent, setIsImprovingContent] = useState(false);
  const [isGeneratingExcerpt, setIsGeneratingExcerpt] = useState(false);
  const [isGeneratingSeo, setIsGeneratingSeo] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        author: post.author,
        image: post.image,
        excerpt: post.excerpt,
        content: post.content,
        metaTitle: post.metaTitle || '',
        metaDescription: post.metaDescription || '',
        focusKeyword: post.focusKeyword || '',
      });
    } else {
      setFormData({
        title: '',
        author: '',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop', // Default image
        excerpt: '',
        content: '',
        metaTitle: '',
        metaDescription: '',
        focusKeyword: '',
      });
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, post);
  };
  
  const handleGenerateDraft = async () => {
    if (!formData.title) {
      setAiError('Please enter a title to generate a draft.');
      return;
    }
    setAiError('');
    setIsGeneratingDraft(true);
    try {
      const content = await generateBlogPostDraft(formData.title);
      setFormData(prev => ({ ...prev, content }));
    } catch(e) {
      setAiError('Failed to generate draft. Please try again.');
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const handleImproveContent = async () => {
      if (!formData.content) {
          setAiError('There is no content to improve.');
          return;
      };
      setAiError('');
      setIsImprovingContent(true);
      try {
          const improvedContent = await improveText(formData.content);
          setFormData(prev => ({ ...prev, content: improvedContent }));
      } catch(e) { 
          setAiError('Failed to improve content. Please try again.');
      } finally { 
          setIsImprovingContent(false); 
      }
  };

  const handleGenerateExcerpt = async () => {
      if (!formData.content) {
          setAiError('Please add content before generating an excerpt.');
          return;
      };
      setAiError('');
      setIsGeneratingExcerpt(true);
      try {
          const excerpt = await generateExcerpt(formData.content);
          setFormData(prev => ({ ...prev, excerpt }));
      } catch(e) { 
          setAiError('Failed to generate excerpt. Please try again.');
      } finally { 
          setIsGeneratingExcerpt(false);
      }
  };

  const handleGenerateSeo = async () => {
    if (!formData.content || !formData.focusKeyword) {
        setAiError('Please provide content and a focus keyword to generate SEO metadata.');
        return;
    }
    setAiError('');
    setIsGeneratingSeo(true);
    try {
        const { metaTitle, metaDescription } = await generateSeoMetadata(formData.content, formData.focusKeyword);
        setFormData(prev => ({ ...prev, metaTitle, metaDescription }));
    } catch(e) {
        setAiError('Failed to generate SEO data. Please try again.');
    } finally {
        setIsGeneratingSeo(false);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">
            {post ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className={labelClass}>Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="author" className={labelClass}>Author</label>
                    <input type="text" name="author" id="author" value={formData.author} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                    <label htmlFor="image" className={labelClass}>Image URL</label>
                    <input type="url" name="image" id="image" value={formData.image} onChange={handleChange} className={inputClass} required />
                    <AIImageGenerator 
                        onImageGenerated={(base64) => setFormData(prev => ({ ...prev, image: base64 }))}
                        promptSuggestion={formData.title} 
                    />
                </div>
            </div>

            {/* AI Tools */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 my-4 space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-blue-400" />
                AI Content Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button type="button" variant="secondary" onClick={handleGenerateDraft} disabled={isGeneratingDraft || !formData.title}>
                  {isGeneratingDraft ? 'Generating...' : 'Generate Draft'}
                </Button>
                <Button type="button" variant="secondary" onClick={handleImproveContent} disabled={isImprovingContent || !formData.content}>
                  {isImprovingContent ? 'Improving...' : 'Improve Content'}
                </Button>
                <Button type="button" variant="secondary" onClick={handleGenerateExcerpt} disabled={isGeneratingExcerpt || !formData.content}>
                  {isGeneratingExcerpt ? 'Generating...' : 'Generate Excerpt'}
                </Button>
              </div>
              {aiError && <p className="text-red-400 text-sm text-center mt-2">{aiError}</p>}
            </div>

            <div>
                <label htmlFor="content" className={labelClass}>Content (Markdown Supported)</label>
                <textarea name="content" id="content" rows={12} value={formData.content} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
                <label htmlFor="excerpt" className={labelClass}>Excerpt</label>
                <textarea name="excerpt" id="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} className={inputClass} required />
            </div>

            {/* SEO Section */}
            <fieldset className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 my-4 space-y-4">
                <legend className="text-lg font-semibold text-white px-2 flex items-center gap-2">
                    <SeoIcon className="w-5 h-5 text-blue-400" />
                    SEO Optimization
                </legend>
                
                <div>
                    <label htmlFor="focusKeyword" className={labelClass}>Focus Keyword</label>
                    <input type="text" name="focusKeyword" id="focusKeyword" value={formData.focusKeyword} onChange={handleChange} className={inputClass} />
                </div>

                <Button type="button" variant="secondary" onClick={handleGenerateSeo} disabled={isGeneratingSeo || !formData.content || !formData.focusKeyword}>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  {isGeneratingSeo ? 'Generating...' : 'Generate SEO Meta Title & Description'}
                </Button>
                
                <div>
                    <label htmlFor="metaTitle" className={labelClass}>Meta Title</label>
                    <input type="text" name="metaTitle" id="metaTitle" value={formData.metaTitle} onChange={handleChange} className={inputClass} />
                    <p className="text-xs text-slate-400 mt-1">Recommended: 50-60 characters. Current: {formData.metaTitle?.length || 0}</p>
                </div>

                <div>
                    <label htmlFor="metaDescription" className={labelClass}>Meta Description</label>
                    <textarea name="metaDescription" id="metaDescription" rows={3} value={formData.metaDescription} onChange={handleChange} className={inputClass} />
                    <p className="text-xs text-slate-400 mt-1">Recommended: 140-160 characters. Current: {formData.metaDescription?.length || 0}</p>
                </div>
            </fieldset>

            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">{post ? 'Save Changes' : 'Create Post'}</Button>
            </div>
        </form>
    </div>
  );
};

export default BlogForm;
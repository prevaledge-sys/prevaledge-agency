
import React, { useState, useEffect } from 'react';
import type { Project, NewProject } from '../../types';
import Button from '../ui/Button';
import AIImageGenerator from './AIImageGenerator';
import { inputClass, labelClass } from './ui/formStyles';

interface ProjectFormProps {
  project: Project | null;
  onSave: (projectData: NewProject, originalItem: Project | null) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<NewProject, 'techStack'> & { techStack: string }>({
    title: '',
    category: '',
    image: '',
    description: '',
    detailedDescription: '',
    techStack: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        image: project.image,
        description: project.description,
        detailedDescription: project.detailedDescription,
        techStack: project.techStack.join(', '),
      });
    } else {
      setFormData({
        title: '',
        category: '',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop',
        description: '',
        detailedDescription: '',
        techStack: '',
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techStackArray = formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean);
    const projectData: NewProject = {
      ...formData,
      techStack: techStackArray,
    };
    onSave(projectData, project);
  };
  
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">
            {project ? 'Edit Project' : 'Create New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="title" className={labelClass}>Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                    <label htmlFor="category" className={labelClass}>Category</label>
                    <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className={inputClass} required />
                </div>
            </div>
            <div>
                <label htmlFor="image" className={labelClass}>Image URL</label>
                <input type="url" name="image" id="image" value={formData.image} onChange={handleChange} className={inputClass} required />
                <AIImageGenerator 
                    onImageGenerated={(base64) => setFormData(prev => ({ ...prev, image: base64 }))}
                    promptSuggestion={formData.title} 
                />
            </div>
            <div>
                <label htmlFor="description" className={labelClass}>Short Description (for card view)</label>
                <textarea name="description" id="description" rows={2} value={formData.description} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
                <label htmlFor="detailedDescription" className={labelClass}>Detailed Description (for modal view)</label>
                <textarea name="detailedDescription" id="detailedDescription" rows={4} value={formData.detailedDescription} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
                <label htmlFor="techStack" className={labelClass}>Tech Stack (comma-separated)</label>
                <input type="text" name="techStack" id="techStack" value={formData.techStack} onChange={handleChange} className={inputClass} placeholder="e.g., React, Node.js, TypeScript" required />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">{project ? 'Save Changes' : 'Create Project'}</Button>
            </div>
        </form>
    </div>
  );
};

export default ProjectForm;
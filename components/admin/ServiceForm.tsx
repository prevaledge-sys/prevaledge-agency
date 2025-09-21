import React, { useState, useEffect } from 'react';
import type { Service, NewService } from '../../types';
import Button from '../ui/Button';
import { inputClass, labelClass } from './ui/formStyles';

interface ServiceFormProps {
  service: Service; // Not nullable, since we are only editing
  onSave: (serviceData: NewService, originalId: string) => void;
  onCancel: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewService>({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
      });
    }
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, service.id);
  };
  
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">
            Edit Service: <span className="text-blue-400">{service.title}</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className={labelClass}>Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
                <label htmlFor="description" className={labelClass}>Description</label>
                <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} className={inputClass} required />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
    </div>
  );
};

export default ServiceForm;
import React, { useState, useEffect } from 'react';
import type { TeamMember, NewTeamMember } from '../../types';
import Button from '../ui/Button';
import { inputClass, labelClass } from './ui/formStyles';

interface TeamFormProps {
  member: TeamMember | null;
  onSave: (memberData: NewTeamMember, originalItem: TeamMember | null) => void;
  onCancel: () => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ member, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NewTeamMember>({
    name: '',
    title: '',
    bio: '',
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        title: member.title,
        bio: member.bio,
      });
    } else {
      setFormData({
        name: '',
        title: '',
        bio: '',
      });
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, member);
  };
  
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-lg p-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">
            {member ? 'Edit Team Member' : 'Create New Team Member'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className={labelClass}>Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                    <label htmlFor="title" className={labelClass}>Job Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required />
                </div>
            </div>
            <div>
                <label htmlFor="bio" className={labelClass}>Biography</label>
                <textarea name="bio" id="bio" rows={4} value={formData.bio} onChange={handleChange} className={inputClass} required />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">{member ? 'Save Changes' : 'Create Member'}</Button>
            </div>
        </form>
    </div>
  );
};

export default TeamForm;
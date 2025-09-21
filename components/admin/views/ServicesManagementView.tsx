import React, { useContext, useState, useEffect } from 'react';
import { SiteDataContext } from '../../../data/siteDataContext';
import type { Service, NewService } from '../../../types';
import Button from '../../ui/Button';
import ServiceForm from '../ServiceForm';
import EditIcon from '../../icons/EditIcon';
import Toast from '../../ui/Toast';
import LoadingSpinner from '../../ui/LoadingSpinner';

const ServicesManagementView: React.FC = () => {
  const { services, updateService } = useContext(SiteDataContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsFormVisible(true);
  };

  const handleSave = async (serviceData: NewService, originalId: string) => {
    setIsLoading(true);
    setFeedback(null);
    try {
        await updateService(originalId, serviceData);
        setFeedback({ type: 'success', message: 'Service updated successfully!' });
        setIsFormVisible(false);
        setEditingService(null);
    } catch (e) {
        setFeedback({ type: 'error', message: 'Failed to save service. Please try again.'});
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
      setIsFormVisible(false);
      setEditingService(null);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
       {feedback && (
        <Toast
          message={feedback.message}
          type={feedback.type}
          onClose={() => setFeedback(null)}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Services</h1>
      </div>
      <p className="text-slate-400 mb-6 -mt-4">Update the titles and descriptions for the services offered. Icons, adding, or deleting services must be done in the codebase for now.</p>
      
      <div className="relative">
        {isLoading && <LoadingSpinner size="md" className="z-20" />}
        {isFormVisible && editingService ? (
            <ServiceForm service={editingService} onSave={handleSave} onCancel={handleCancel} />
        ) : (
            <div className="bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                    <tr>
                    <th scope="col" className="px-6 py-3">Service Title</th>
                    <th scope="col" className="px-6 py-3">Description</th>
                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                    <tr key={service.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        {service.title}
                        </th>
                        <td className="px-6 py-4 max-w-md truncate">{service.description}</td>
                        <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-4">
                            <button onClick={() => handleEdit(service)} className="font-medium text-blue-400 hover:text-blue-300" aria-label={`Edit ${service.title}`}>
                            <EditIcon className="w-5 h-5" />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManagementView;
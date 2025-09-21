import React, { useContext, useState, useEffect } from 'react';
import { SiteDataContext } from '../../../data/siteDataContext';
import type { PricingPlan, NewPricingPlan } from '../../../types';
import Button from '../../ui/Button';
import PricingPlanForm from '../PricingPlanForm';
import EditIcon from '../../icons/EditIcon';
import TrashIcon from '../../icons/TrashIcon';
import PlusIcon from '../../icons/PlusIcon';
import Toast from '../../ui/Toast';
import LoadingSpinner from '../../ui/LoadingSpinner';

const PricingManagementView: React.FC = () => {
  const { servicePricingData, addPricingPlan, updatePricingPlan, deletePricingPlan } = useContext(SiteDataContext);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleCreateNew = (serviceId: string) => {
    setEditingPlan(null);
    setCurrentServiceId(serviceId);
    setIsFormVisible(true);
  };

  const handleEdit = (plan: PricingPlan, serviceId: string) => {
    setEditingPlan(plan);
    setCurrentServiceId(serviceId);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingPlan(null);
    setCurrentServiceId(null);
  };

  const handleSave = async (planData: NewPricingPlan) => {
    if (!currentServiceId) return;

    setIsLoading(true);
    setFeedback(null);
    try {
      if (editingPlan) {
        await updatePricingPlan(currentServiceId, editingPlan.id, planData);
        setFeedback({ type: 'success', message: 'Plan updated successfully!' });
      } else {
        await addPricingPlan(currentServiceId, planData);
        setFeedback({ type: 'success', message: 'Plan created successfully!' });
      }
      handleCancel();
    } catch (e) {
      setFeedback({ type: 'error', message: 'Failed to save plan. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (plan: PricingPlan, serviceId: string) => {
    if (window.confirm(`Are you sure you want to delete the "${plan.name}" plan? This action cannot be undone.`)) {
      setIsLoading(true);
      setFeedback(null);
      try {
        await deletePricingPlan(serviceId, plan.id);
        setFeedback({ type: 'success', message: 'Plan deleted successfully!' });
      } catch (e) {
        setFeedback({ type: 'error', message: 'Failed to delete plan. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
      {feedback && <Toast message={feedback.message} type={feedback.type} onClose={() => {}} />}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Plans & Pricing</h1>
      </div>
      
      {isLoading && <LoadingSpinner size="md" />}

      {isFormVisible ? (
        <PricingPlanForm plan={editingPlan} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div className="space-y-10 animate-fade-in">
          {servicePricingData.map(service => (
            <div key={service.id}>
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                      <service.icon className="w-6 h-6 text-blue-400" />
                      {service.serviceTitle}
                  </h2>
                  <Button onClick={() => handleCreateNew(service.id)} variant="secondary">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add New Plan
                  </Button>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Plan Name</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Popular</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.plans.map(plan => (
                        <tr key={plan.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                          <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{plan.name}</th>
                          <td className="px-6 py-4">{plan.price} {plan.priceDetail}</td>
                          <td className="px-6 py-4">
                            {plan.isPopular && <span className="text-xs font-bold text-blue-400 bg-blue-900/50 px-2 py-1 rounded-full">Yes</span>}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-4">
                              <button onClick={() => handleEdit(plan, service.id)} className="font-medium text-blue-400 hover:text-blue-300" aria-label={`Edit ${plan.name}`}>
                                <EditIcon className="w-5 h-5" />
                              </button>
                              <button onClick={() => handleDelete(plan, service.id)} className="font-medium text-red-500 hover:text-red-400" aria-label={`Delete ${plan.name}`}>
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PricingManagementView;
import React, { useContext } from 'react';
import { SiteDataContext } from '../../../data/siteDataContext';
import type { TeamMember, NewTeamMember } from '../../../types';
import Button from '../../ui/Button';
import TeamForm from '../TeamForm';
import EditIcon from '../../icons/EditIcon';
import TrashIcon from '../../icons/TrashIcon';
import PlusIcon from '../../icons/PlusIcon';
import Toast from '../../ui/Toast';
import LoadingSpinner from '../../ui/LoadingSpinner';
import { useCrudManager } from '../../../hooks/useCrudManager';

const TeamManagementView: React.FC = () => {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useContext(SiteDataContext);

  const {
    isFormVisible,
    editingItem,
    isLoading,
    feedback,
    handleCreateNew,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancel,
  } = useCrudManager<TeamMember, NewTeamMember>(addTeamMember, updateTeamMember, deleteTeamMember);

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
       {feedback && (
        <Toast
          message={feedback.message}
          type={feedback.type}
          onClose={() => {}}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Team Members</h1>
        {!isFormVisible && (
            <Button onClick={handleCreateNew}>
                <PlusIcon className="w-5 h-5 mr-2" />
                Add New Member
            </Button>
        )}
      </div>
      
       <p className="text-slate-400 mb-6 -mt-4">Update the team members on your site. The icon is static and cannot be changed from this panel.</p>

      <div className="relative">
        {isLoading && <LoadingSpinner size="md" className="z-20" />}
        {isFormVisible ? (
            <TeamForm 
              member={editingItem} 
              onSave={(data, item) => handleSave(data, item, 'team member')} 
              onCancel={handleCancel} 
            />
        ) : (
            <div className="bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-300">
                <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                    <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        {member.name}
                        </th>
                        <td className="px-6 py-4">{member.title}</td>
                        <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-4">
                            <button onClick={() => handleEdit(member)} className="font-medium text-blue-400 hover:text-blue-300" aria-label={`Edit ${member.name}`}>
                            <EditIcon className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleDelete(member, 'team member')} className="font-medium text-red-500 hover:text-red-400" aria-label={`Delete ${member.name}`}>
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
        )}
      </div>
    </div>
  );
};

export default TeamManagementView;
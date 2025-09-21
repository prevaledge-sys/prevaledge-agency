import React, { useContext } from 'react';
import { SiteDataContext } from '../../../data/siteDataContext';
import PostIcon from '../../icons/PostIcon';
import AgentIcon from '../../icons/AgentIcon';
import ProjectIcon from '../../icons/ProjectIcon';
import UsersIcon from '../../icons/UsersIcon';
import MessageSquareIcon from '../../icons/MessageSquareIcon';
import InboxIcon from '../../icons/InboxIcon';
import TrashIcon from '../../icons/TrashIcon';
import Button from '../../ui/Button';
import type { AdminView } from '../../../types';


const StatCard: React.FC<{ title: string; value: number; icon: React.FC<any> }> = ({ title, value, icon: Icon }) => (
    <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-6 flex items-center gap-6">
        <div className="bg-slate-800 p-4 rounded-full">
            <Icon className="w-8 h-8 text-blue-400" />
        </div>
        <div>
            <p className="text-slate-400 text-sm">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
    </div>
);

interface DashboardViewProps {
  setActiveView: (view: AdminView) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ setActiveView }) => {
  const { blogPosts, services, projects, teamMembers, testimonials, contactSubmissions, setContactSubmissions } = useContext(SiteDataContext);

  const handleDeleteSubmission = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        const response = await fetch(`/php-backend/delete_submission.php?id=${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setContactSubmissions(prevSubs => prevSubs.filter(sub => sub.id !== id));
      } catch (err) {
        console.error("Failed to delete submission:", err);
        alert('Failed to delete submission.');
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Blog Posts" value={blogPosts.length} icon={PostIcon} />
        <StatCard title="Portfolio Projects" value={projects.length} icon={ProjectIcon} />
        <StatCard title="Contact Submissions" value={contactSubmissions.length} icon={InboxIcon} />
        <StatCard title="Total Services" value={services.length} icon={AgentIcon} />
        <StatCard title="Team Members" value={teamMembers.length} icon={UsersIcon} />
        <StatCard title="Testimonials" value={testimonials.length} icon={MessageSquareIcon} />
      </div>

       <div className="mt-8 bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden">
            <div className="p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Recent Contact Submissions</h2>
                {contactSubmissions.length > 0 && (
                    <button 
                        onClick={() => setActiveView('analytics')} 
                        className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        View All &rarr;
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Organization</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Message</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactSubmissions.length > 0 ? (
                            contactSubmissions.slice(0, 5).map(submission => (
                                <tr key={submission.id} className="border-t border-slate-800 hover:bg-slate-800/30">
                                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{submission.name}</th>
                                    <td className="px-6 py-4">{submission.organization}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{submission.submittedAt.toLocaleDateString()}</td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className="line-clamp-2">{submission.message}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                      <Button variant="danger" onClick={() => handleDeleteSubmission(submission.id)} className="p-2"><TrashIcon className="w-5 h-5" /></Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-slate-500">
                                    No recent submissions.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default DashboardView;
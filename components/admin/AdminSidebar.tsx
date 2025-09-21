import React, { useContext } from 'react';
import BrainCircuitIcon from '../icons/BrainCircuitIcon';
import DashboardIcon from '../icons/DashboardIcon';
import PostIcon from '../icons/PostIcon';
import AgentIcon from '../icons/AgentIcon';
import LogoutIcon from '../icons/LogoutIcon';
import ProjectIcon from '../icons/ProjectIcon';
import UsersIcon from '../icons/UsersIcon';
import MessageSquareIcon from '../icons/MessageSquareIcon';
import BarChartIcon from '../icons/BarChartIcon';
import PriceTagIcon from '../icons/PriceTagIcon';
import FileTextIcon from '../icons/FileTextIcon';
import ClipboardCopyIcon from '../icons/ClipboardCopyIcon';
import { RouterContext, AdminView } from '../../types';
import { SiteDataContext } from '../../data/siteDataContext';

interface AdminSidebarProps {
  activeView: AdminView;
  setActiveView: (view: AdminView) => void;
  onLogout: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, setActiveView, onLogout, isSidebarOpen, setIsSidebarOpen }) => {
    
    const { navigate } = useContext(RouterContext);
    const { hasNewSubmission, clearNewSubmission } = useContext(SiteDataContext);
    
    const handleNavClick = (view: AdminView) => {
        setActiveView(view);
        setIsSidebarOpen(false);
        if (view === 'analytics') {
            clearNewSubmission();
        }
    }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChartIcon },
    { id: 'invoicing', label: 'Invoice Generator', icon: FileTextIcon },
    { id: 'quotations', label: 'Quote Generator', icon: ClipboardCopyIcon },
    { id: 'documentHistory', label: 'Document History', icon: FileTextIcon },
    { id: 'blog', label: 'Manage Blog', icon: PostIcon },
    { id: 'projects', label: 'Manage Projects', icon: ProjectIcon },
    { id: 'services', label: 'Manage Services', icon: AgentIcon },
    { id: 'pricing', label: 'Manage Pricing', icon: PriceTagIcon },
    { id: 'team', label: 'Manage Team', icon: UsersIcon },
    { id: 'testimonials', label: 'Manage Testimonials', icon: MessageSquareIcon },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-slate-800">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center gap-2 text-xl font-bold transition-colors duration-300 text-slate-100 hover:text-blue-400">
          <BrainCircuitIcon className="w-8 h-8 text-blue-400" />
          <span>Prevaledge</span>
        </a>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => {
          const isActive = activeView === item.id;
          const showIndicator = item.id === 'analytics' && hasNewSubmission;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as AdminView)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 relative ${
                isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.label}</span>
              {showIndicator && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors duration-200"
        >
          <LogoutIcon className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile-only backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      ></div>
      
      {/* Unified Sidebar for both mobile and desktop */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50 
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:flex-shrink-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default AdminSidebar;
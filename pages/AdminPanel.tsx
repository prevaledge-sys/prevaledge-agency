import React, { useState } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboardLayout from '../components/admin/AdminDashboardLayout';
import DashboardView from '../components/admin/views/DashboardView';
import BlogManagementView from '../components/admin/views/BlogManagementView';
import ProjectManagementView from '../components/admin/views/ProjectManagementView';
import ServicesManagementView from '../components/admin/views/ServicesManagementView';
import TeamManagementView from '../components/admin/views/TeamManagementView';
import TestimonialManagementView from '../components/admin/views/TestimonialManagementView';
import AnalyticsView from '../components/admin/views/AnalyticsView';
import PricingManagementView from '../components/admin/views/PricingManagementView';
import InvoiceGeneratorView from '../components/admin/views/InvoiceGeneratorView';
import QuotationGeneratorView from '../components/admin/views/QuotationGeneratorView';
import DocumentHistoryView from '../components/admin/views/DocumentHistoryView';
import type { AdminView } from '../types';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<AdminView>('dashboard');

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'blog':
        return <BlogManagementView />;
      case 'projects':
        return <ProjectManagementView />;
      case 'services':
        return <ServicesManagementView />;
      case 'team':
        return <TeamManagementView />;
      case 'testimonials':
        return <TestimonialManagementView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'pricing':
        return <PricingManagementView />;
      case 'invoicing':
        return <InvoiceGeneratorView />;
      case 'quotations':
        return <QuotationGeneratorView />;
      case 'documentHistory':
        return <DocumentHistoryView />;
      case 'dashboard':
      default:
        return <DashboardView setActiveView={setActiveView} />;
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AdminDashboardLayout 
      onLogout={handleLogout}
      activeView={activeView}
      setActiveView={setActiveView}
    >
      {renderContent()}
    </AdminDashboardLayout>
  );
};

export default AdminPanel;
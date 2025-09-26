import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { 
    BlogPost, Service, Project, TeamMember, Testimonial, ServicePricing, NewBlogPost, NewProject, NewService, NewTeamMember, NewTestimonial,
    ContactSubmission, AIToolName, AIToolUsage, PricingPlan, NewPricingPlan
} from '../types';
import { 
    initialBlogPosts, 
    initialServices,
    initialProjects,
    initialTeamMembers,
    initialTestimonials,
    initialServicePricingData
} from './siteData';
import NeuralSignatureIcon from '../components/icons/NeuralSignatureIcon';

interface SiteDataContextType {
  blogPosts: BlogPost[];
  services: Service[];
  projects: Project[];
  teamMembers: TeamMember[];
  testimonials: Testimonial[];
  servicePricingData: ServicePricing[];
  contactSubmissions: ContactSubmission[];
  aiToolUsage: AIToolUsage;
  hasNewSubmission: boolean;
  clearNewSubmission: () => void;
  addBlogPost: (post: NewBlogPost) => Promise<void>;
  updateBlogPost: (slug: string, post: NewBlogPost) => Promise<void>;
  deleteBlogPost: (slug: string) => Promise<void>;
  addProject: (project: NewProject) => Promise<void>;
  updateProject: (id: string, project: NewProject) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateService: (id: string, service: NewService) => Promise<void>;
  addTeamMember: (member: NewTeamMember) => Promise<void>;
  updateTeamMember: (id: string, member: NewTeamMember) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  addTestimonial: (testimonial: NewTestimonial) => Promise<void>;
  updateTestimonial: (id: string, testimonial: NewTestimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  addPricingPlan: (serviceId: string, plan: NewPricingPlan) => Promise<void>;
  updatePricingPlan: (serviceId: string, planId: string, plan: NewPricingPlan) => Promise<void>;
  deletePricingPlan: (serviceId: string, planId: string) => Promise<void>;
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => Promise<void>;
  logAiToolUsage: (toolName: AIToolName) => void;
}

export const SiteDataContext = createContext<SiteDataContextType>({
  blogPosts: [],
  services: [],
  projects: [],
  teamMembers: [],
  testimonials: [],
  servicePricingData: [],
  contactSubmissions: [],
  aiToolUsage: {} as AIToolUsage,
  hasNewSubmission: false,
  clearNewSubmission: () => {},
  addBlogPost: async () => {},
  updateBlogPost: async () => {},
  deleteBlogPost: async () => {},
  addProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
  updateService: async () => {},
  addTeamMember: async () => {},
  updateTeamMember: async () => {},
  deleteTeamMember: async () => {},
  addTestimonial: async () => {},
  updateTestimonial: async () => {},
  deleteTestimonial: async () => {},
  addPricingPlan: async () => {},
  updatePricingPlan: async () => {},
  deletePricingPlan: async () => {},
  addContactSubmission: async () => {},
  logAiToolUsage: () => {},
});

const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

export const SiteDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/team');
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);
  const [servicePricingData, setServicePricingData] = useState<ServicePricing[]>([]);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch('/api/pricing');
        if (response.ok) {
          const data = await response.json();
          setServicePricingData(data);
        }
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      }
    };

    fetchPricingData();
  }, []);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [hasNewSubmission, setHasNewSubmission] = useState(false);
  const [aiToolUsage, setAiToolUsage] = useState<AIToolUsage>({
      strategyGenerator: 0,
      websiteAnalyzer: 0,
      adCopyGenerator: 0,
      socialPostGenerator: 0,
      blogIdeaGenerator: 0,
      keywordClusterGenerator: 0,
      roiCalculator: 0,
      auraSynthesizer: 0,
      brandSonifier: 0,
  });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/contact');
        if (response.ok) {
          const data = await response.json();
          const submissionsWithDates = data.map((submission: any) => ({
            ...submission,
            submittedAt: new Date(submission.submittedAt),
          }));
          setContactSubmissions(submissionsWithDates);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const addContactSubmission = async (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>): Promise<void> => {
    const newSubmission: ContactSubmission = {
      id: Date.now(),
      submittedAt: new Date(),
      ...submission,
    };
    setContactSubmissions(prevSubmissions => [newSubmission, ...prevSubmissions]);
    setHasNewSubmission(true);
    return Promise.resolve();
  };

  const clearNewSubmission = () => {
    setHasNewSubmission(false);
  };

  const logAiToolUsage = (toolName: AIToolName): void => {
      setAiToolUsage(prev => ({
          ...prev,
          [toolName]: (prev[toolName] || 0) + 1,
      }));
  };


  // --- Blog Post Management ---
  const addBlogPost = async (post: NewBlogPost): Promise<void> => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (response.ok) {
        const newPost = await response.json();
        setBlogPosts(prevPosts => [newPost, ...prevPosts]);
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  };

  const updateBlogPost = async (slug: string, updatedPostData: NewBlogPost): Promise<void> => {
    try {
      const response = await fetch(`/api/blog/${slug}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPostData),
        });
      if (response.ok) {
        setBlogPosts(prevPosts =>
          prevPosts.map(p => (p.slug === slug ? { ...p, ...updatedPostData } : p))
        );
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const deleteBlogPost = async (slug: string): Promise<void> => {
    try {
      const response = await fetch(`/api/blog/${slug}`,
        {
          method: 'DELETE',
        });
      if (response.ok) {
        setBlogPosts(prevPosts => prevPosts.filter(post => post.slug !== slug));
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  // --- Project Management ---
  const addProject = async (project: NewProject): Promise<void> => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      if (response.ok) {
        const newProject = await response.json();
        setProjects(prevProjects => [newProject, ...prevProjects]);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const updateProject = async (id: string, updatedProjectData: NewProject): Promise<void> => {
    try {
      const response = await fetch(`/api/projects/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProjectData),
        });
      if (response.ok) {
        setProjects(prevProjects =>
          prevProjects.map(p => (p.id === id ? { id, ...updatedProjectData } : p))
        );
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/projects/${id}`,
        {
          method: 'DELETE',
        });
      if (response.ok) {
        setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // --- Service Management ---
  const updateService = async (id: string, updatedServiceData: NewService): Promise<void> => {
    try {
      const response = await fetch(`/api/services/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedServiceData),
        });
      if (response.ok) {
        setServices(prevServices =>
          prevServices.map(s => (s.id === id ? { ...s, ...updatedServiceData } : s))
        );
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  // --- Team Member Management ---
  const addTeamMember = async (member: NewTeamMember): Promise<void> => {
    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(member),
      });
      if (response.ok) {
        const newMember = await response.json();
        setTeamMembers(prev => [newMember, ...prev]);
      }
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const updateTeamMember = async (id: string, updatedMemberData: NewTeamMember): Promise<void> => {
    try {
      const response = await fetch(`/api/team/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedMemberData),
        });
      if (response.ok) {
        setTeamMembers(prev =>
          prev.map(m => (m.id === id ? { ...m, ...updatedMemberData } : m))
        );
      }
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  const deleteTeamMember = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/team/${id}`,
        {
          method: 'DELETE',
        });
      if (response.ok) {
        setTeamMembers(prev => prev.filter(m => m.id !== id));
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  // --- Testimonial Management ---
  const addTestimonial = async (testimonial: NewTestimonial): Promise<void> => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonial),
      });
      if (response.ok) {
        const newTestimonial = await response.json();
        setTestimonials(prev => [newTestimonial, ...prev]);
      }
    } catch (error) {
      console.error('Error adding testimonial:', error);
    }
  };

  const updateTestimonial = async (id: string, updatedData: NewTestimonial): Promise<void> => {
    try {
      const response = await fetch(`/api/testimonials/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
      if (response.ok) {
        setTestimonials(prev =>
          prev.map(t => (t.id === id ? { id, ...updatedData } : t))
        );
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const deleteTestimonial = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/testimonials/${id}`,
        {
          method: 'DELETE',
        });
      if (response.ok) {
        setTestimonials(prev => prev.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  // --- Pricing Plan Management ---
  const addPricingPlan = async (serviceId: string, plan: NewPricingPlan): Promise<void> => {
    try {
      const response = await fetch('/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...plan, serviceId }),
      });
      if (response.ok) {
        const newPlan = await response.json();
        setServicePricingData(prevData =>
          prevData.map(service =>
            service.id === serviceId
              ? { ...service, plans: [...service.plans, newPlan] }
              : service
          )
        );
      }
    } catch (error) {
      console.error('Error adding pricing plan:', error);
    }
  };

  const updatePricingPlan = async (serviceId: string, planId: string, updatedPlanData: NewPricingPlan): Promise<void> => {
    try {
      const response = await fetch(`/api/pricing/${planId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPlanData),
        });
      if (response.ok) {
        setServicePricingData(prevData =>
          prevData.map(service => {
            if (service.id === serviceId) {
              const updatedPlans = service.plans.map(plan =>
                plan.id === planId ? { id: planId, ...updatedPlanData } : plan
              );
              return { ...service, plans: updatedPlans };
            }
            return service;
          })
        );
      }
    } catch (error) {
      console.error('Error updating pricing plan:', error);
    }
  };

  const deletePricingPlan = async (serviceId: string, planId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/pricing/${planId}`,
        {
          method: 'DELETE',
        });
      if (response.ok) {
        setServicePricingData(prevData =>
          prevData.map(service => {
            if (service.id === serviceId) {
              const filteredPlans = service.plans.filter(plan => plan.id !== planId);
              return { ...service, plans: filteredPlans };
            }
            return service;
          })
        );
      }
    } catch (error) {
      console.error('Error deleting pricing plan:', error);
    }
  };

  return (
    <SiteDataContext.Provider value={{
      blogPosts,
      services,
      projects,
      teamMembers,
      testimonials,
      servicePricingData,
      contactSubmissions,
      aiToolUsage,
      hasNewSubmission,
      clearNewSubmission,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      addProject,
      updateProject,
      deleteProject,
      updateService,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addPricingPlan,
      updatePricingPlan,
      deletePricingPlan,
      addContactSubmission,
      logAiToolUsage,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};
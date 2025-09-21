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
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [servicePricingData, setServicePricingData] = useState<ServicePricing[]>(initialServicePricingData);
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
        const response = await fetch('/php-backend/contact.php');
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
    return new Promise(resolve => {
        setTimeout(() => {
            const newSlug = slugify(post.title);
            const isSlugUsed = blogPosts.some(p => p.slug === newSlug);
            const finalSlug = isSlugUsed ? `${newSlug}-${Date.now()}` : newSlug;

            const newPost: BlogPost = {
                ...post,
                slug: finalSlug,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            };
            setBlogPosts(prevPosts => [newPost, ...prevPosts]);
            resolve();
        }, 500); // Simulate network delay
    });
  };

  const updateBlogPost = async (slug: string, updatedPostData: NewBlogPost): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            setBlogPosts(prevPosts =>
              prevPosts.map(p => (p.slug === slug ? { ...p, ...updatedPostData } : p))
            );
            resolve();
        }, 500);
    });
  };

  const deleteBlogPost = async (slug: string): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            setBlogPosts(prevPosts => prevPosts.filter(post => post.slug !== slug));
            resolve();
        }, 500);
    });
  };

  // --- Project Management ---
  const addProject = async (project: NewProject): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newProject: Project = {
                ...project,
                id: `proj-${Date.now()}`,
            };
            setProjects(prevProjects => [newProject, ...prevProjects]);
            resolve();
        }, 500);
    });
  };

  const updateProject = async (id: string, updatedProjectData: NewProject): Promise<void> => {
      return new Promise(resolve => {
          setTimeout(() => {
              setProjects(prevProjects =>
                  prevProjects.map(p => (p.id === id ? { id, ...updatedProjectData } : p))
              );
              resolve();
          }, 500);
      });
  };

  const deleteProject = async (id: string): Promise<void> => {
      return new Promise(resolve => {
          setTimeout(() => {
              setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
              resolve();
          }, 500);
      });
  };

  // --- Service Management ---
  const updateService = async (id: string, updatedServiceData: NewService): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            setServices(prevServices =>
              prevServices.map(s => (s.id === id ? { ...s, ...updatedServiceData } : s))
            );
            resolve();
        }, 500);
    });
  };

  // --- Team Member Management ---
  const addTeamMember = async (member: NewTeamMember): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newMember: TeamMember = {
                ...member,
                id: `team-${Date.now()}`,
                icon: NeuralSignatureIcon, // Icon is static for now
            };
            setTeamMembers(prev => [newMember, ...prev]);
            resolve();
        }, 500);
    });
  };

  const updateTeamMember = async (id: string, updatedMemberData: NewTeamMember): Promise<void> => {
      return new Promise(resolve => {
          setTimeout(() => {
              setTeamMembers(prev =>
                  prev.map(m => (m.id === id ? { ...m, ...updatedMemberData } : m))
              );
              resolve();
          }, 500);
      });
  };

  const deleteTeamMember = async (id: string): Promise<void> => {
      return new Promise(resolve => {
          setTimeout(() => {
              setTeamMembers(prev => prev.filter(m => m.id !== id));
              resolve();
          }, 500);
      });
  };

  // --- Testimonial Management ---
  const addTestimonial = async (testimonial: NewTestimonial): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newTestimonial: Testimonial = {
                ...testimonial,
                id: `test-${Date.now()}`,
            };
            setTestimonials(prev => [newTestimonial, ...prev]);
            resolve();
        }, 500);
    });
  };

  const updateTestimonial = async (id: string, updatedData: NewTestimonial): Promise<void> => {
      return new Promise(resolve => {
          setTimeout(() => {
              setTestimonials(prev =>
                  prev.map(t => (t.id === id ? { id, ...updatedData } : t))
              );
              resolve();
          }, 500);
      });
  };

  const deleteTestimonial = async (id: string): Promise<void> => {
      return new Promise(resolve => {
          setTimeout(() => {
              setTestimonials(prev => prev.filter(t => t.id !== id));
              resolve();
          }, 500);
      });
  };

  // --- Pricing Plan Management ---
  const addPricingPlan = async (serviceId: string, plan: NewPricingPlan): Promise<void> => {
      return new Promise(resolve => {
          setTimeout(() => {
              const newPlan: PricingPlan = {
                  ...plan,
                  id: `plan-${Date.now()}`,
              };
              setServicePricingData(prevData =>
                  prevData.map(service =>
                      service.id === serviceId
                          ? { ...service, plans: [...service.plans, newPlan] }
                          : service
                  )
              );
              resolve();
          }, 500);
      });
  };

  const updatePricingPlan = async (serviceId: string, planId: string, updatedPlanData: NewPricingPlan): Promise<void> => {
      return new Promise(resolve => {
          setTimeout(() => {
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
              resolve();
          }, 500);
      });
  };

  const deletePricingPlan = async (serviceId: string, planId: string): Promise<void> => {
      return new Promise(resolve => {
          setTimeout(() => {
              setServicePricingData(prevData =>
                  prevData.map(service => {
                      if (service.id === serviceId) {
                          const filteredPlans = service.plans.filter(plan => plan.id !== planId);
                          return { ...service, plans: filteredPlans };
                      }
                      return service;
                  })
              );
              resolve();
          }, 500);
      });
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
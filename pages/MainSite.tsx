import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Header from '../components/Header';
import Hero from '../components/Hero';
import NewsTicker from '../components/NewsTicker';
import ServicesSection from '../components/Services';
import About from '../components/About';
import PricingSection from '../components/Pricing';
import PortfolioSection from '../components/Portfolio';
import TestimonialsSection from '../components/Testimonials';
import TeamSection from '../components/Team';
import BlogSection from '../components/Blog';
import AIGenerator from '../components/AIGenerator';
import ROICalculator from '../components/ROICalculator';
import AdCopyGenerator from '../components/AdCopyGenerator';
import SocialPostGenerator from '../components/SocialPostGenerator';
import BlogIdeaGenerator from '../components/BlogIdeaGenerator';
import KeywordClusterGenerator from '../components/KeywordClusterGenerator';
import Holoscan from '../components/Holoscan';
import AuraSynthesizer from '../components/AuraSynthesizer';
import BrandSonifier from '../components/BrandSonifier';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AnimateOnScroll from '../components/ui/AnimateOnScroll';

interface MainSiteProps {
  route: string;
}

const MainSite: React.FC<MainSiteProps> = ({ route }) => {
  useEffect(() => {
    const hash = route.split('#')[1];
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [route]);

  return (
    <div className="bg-slate-950 text-white font-sans animate-content-fade-in">
      <ParticleBackground />
      <Header />
      
      <main id="top" className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <NewsTicker />
          <ServicesSection />
          <About />
          <PricingSection />
          <PortfolioSection />
          <TestimonialsSection />
          <TeamSection />
          <BlogSection />
        </div>
        
        {/* AI Toolkit Section */}
        <section id="ai-toolkit" className="bg-slate-900/40 py-20 mt-20" aria-labelledby="toolkit-heading">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <AnimateOnScroll>
                <div className="text-center">
                  <h2 id="toolkit-heading" className="text-4xl font-bold mb-4">
                    Explore Our Free <span className="text-blue-400">AI Toolkit</span>
                  </h2>
                  <p className="max-w-3xl mx-auto text-slate-400 mb-16">
                    Experience the power of our technology firsthand. Use our suite of free AI-powered tools to enhance your marketing and creative efforts.
                  </p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll><AIGenerator /></AnimateOnScroll>
              <AnimateOnScroll><Holoscan /></AnimateOnScroll>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
                <AnimateOnScroll><AdCopyGenerator /></AnimateOnScroll>
                <AnimateOnScroll><SocialPostGenerator /></AnimateOnScroll>
              </div>
              <AnimateOnScroll><BlogIdeaGenerator /></AnimateOnScroll>
              <AnimateOnScroll><KeywordClusterGenerator /></AnimateOnScroll>
              <AnimateOnScroll><ROICalculator /></AnimateOnScroll>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
                <AnimateOnScroll><AuraSynthesizer /></AnimateOnScroll>
                <AnimateOnScroll><BrandSonifier /></AnimateOnScroll>
              </div>
           </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Contact />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainSite;
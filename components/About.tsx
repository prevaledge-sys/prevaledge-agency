import React from 'react';
import CheckIcon from './icons/CheckIcon';
import ProcessFlowIcon from './icons/ProcessFlowIcon';
import AnimateOnScroll from './ui/AnimateOnScroll';
import MapPinIcon from './icons/MapPinIcon';
import PhoneIcon from './icons/PhoneIcon';
import MailIcon from './icons/MailIcon';

const About: React.FC = () => {
  const approachPoints = [
    { title: 'Data-Driven Strategy', description: 'We don\'t guess; we measure. Every decision is backed by comprehensive data analysis, ensuring our strategies are not just creative but also effective and measurable.' },
    { title: 'Collaborative Partnership', description: 'Your goals become our goals. We integrate seamlessly with your team, fostering open communication and operating as a true extension of your business.' },
    { title: 'Technological Foresight', description: 'We live on the cutting edge. From custom AI agents to the latest in web performance, we leverage forward-thinking technology to give you a competitive advantage.' },
  ];

  return (
    <section id="about" className="py-20 overflow-hidden" aria-labelledby="about-heading">
      <AnimateOnScroll>
        <div className="text-center">
          <h2 id="about-heading" className="text-4xl font-bold mb-4">
            The Prevaledge <span className="text-blue-400">Difference</span>
          </h2>
          <p className="max-w-3xl mx-auto text-slate-400 mb-16">
            We are architects of digital transformation, your strategic partner in navigating the complexities of the modern digital landscape. At Prevaledge, we fuse the analytical precision of data science with the boundless potential of human creativity to build resilient, high-growth brands.
          </p>
        </div>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <AnimateOnScroll>
          <div className="relative flex justify-center p-4">
            <ProcessFlowIcon className="w-full max-w-lg h-auto" />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <div className="space-y-8">
            {approachPoints.map((point) => (
              <div key={point.title} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
                    <CheckIcon className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">{point.title}</h3>
                  <p className="mt-1 text-slate-400">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll delay={400}>
        <div className="mt-24 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl p-8">
          <div className="flex flex-col items-center">
            <MapPinIcon className="w-8 h-8 text-blue-400 mb-3" aria-hidden="true" />
            <h4 className="font-semibold text-white">Our Office</h4>
            <p className="text-sm text-slate-400">C 1 To 26 Vardhman Grandeur, Andheri West Mumbai, India 400058</p>
          </div>
          <div className="flex flex-col items-center">
            <PhoneIcon className="w-8 h-8 text-blue-400 mb-3" aria-hidden="true" />
            <h4 className="font-semibold text-white">Call Us</h4>
            <p className="text-sm text-slate-400">+91 9455573671</p>
          </div>
          <div className="flex flex-col items-center">
            <MailIcon className="w-8 h-8 text-blue-400 mb-3" aria-hidden="true" />
            <h4 className="font-semibold text-white">Email Us</h4>
            <p className="text-sm text-slate-400">info@prevaledge.com</p>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default About;
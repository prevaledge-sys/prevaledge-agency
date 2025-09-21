import React, { useState, useContext } from 'react';
import Button from './ui/Button';
import AnimateOnScroll from './ui/AnimateOnScroll';
import { trackEvent } from '../services/analyticsService';
import { SiteDataContext } from '../data/siteDataContext';

const Contact: React.FC = () => {
  const { addContactSubmission } = useContext(SiteDataContext);
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', contactNumber: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.organization || !formData.email || !formData.contactNumber || !formData.message) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/php-backend/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        addContactSubmission(formData);
        setIsSubmitted(true);
        trackEvent('submit_contact_form', {
          category: 'conversion',
          label: `Contact form submitted by ${formData.organization}`
        });
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 text-center" aria-labelledby="contact-submitted-heading">
        <AnimateOnScroll>
          <h2 id="contact-submitted-heading" className="text-4xl font-bold mb-4">
            Message <span className="text-blue-400">Received</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400">
            Your message has been sent successfully. Our strategists will review your inquiry and respond within one business day. Thank you for contacting Prevaledge.
          </p>
        </AnimateOnScroll>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20" aria-labelledby="contact-heading">
      <AnimateOnScroll>
        <div className="text-center">
          <h2 id="contact-heading" className="text-4xl font-bold mb-4">
            Get in <span className="text-blue-400">Touch</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 mb-8">
            Ready to build your brand's future? Send us a message to get started.
          </p>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={200}>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input-futuristic w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 transition-all duration-300"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-slate-400 mb-2">Organization</label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="form-input-futuristic w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 transition-all duration-300"
                  autoComplete="organization"
                  required
                />
              </div>
               <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input-futuristic w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 transition-all duration-300"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-slate-400 mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="form-input-futuristic w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 transition-all duration-300"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="form-input-futuristic w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-300 transition-all duration-300"
                placeholder="Describe your project or goals..."
                required
              ></textarea>
            </div>
            {error && <div role="alert" className="text-red-400 text-center mb-4">{error}</div>}
            <div className="text-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default Contact;
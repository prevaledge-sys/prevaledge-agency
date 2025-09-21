import React from 'react';
import Button from './ui/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-500">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
            <p>&copy; {currentYear} Prevaledge. All rights reserved.</p>
            <Button href="/privacy-policy" variant="link">
                Privacy Policy
            </Button>
            <span className="hidden sm:inline">|</span>
            <Button href="/terms-and-conditions" variant="link">
                Terms & Conditions
            </Button>
        </div>
        <p className="text-xs mt-4">Pioneering the digital frontier of today.</p>
      </div>
    </footer>
  );
};

export default Footer;
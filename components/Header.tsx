import React, { useState, useEffect, useContext } from 'react';
import { RouterContext } from '../types';
import BrainCircuitIcon from './icons/BrainCircuitIcon';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { navigate, route } = useContext(RouterContext);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Work' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];
  
  const aiToolLinks = [
      { href: '#ai-generator', label: 'Strategy Generator' },
      { href: '#holoscan', label: 'Website Analyzer' },
      { href: '#ad-copy-generator', label: 'Ad Copy Generator' },
      { href: '#social-post-generator', label: 'Social Post Generator' },
      { href: '#blog-idea-generator', label: 'Blog Idea Generator' },
      { href: '#keyword-cluster-generator', label: 'Keyword Cluster Tool' },
      { href: '#roi-calculator', label: 'ROI Calculator' },
      { href: '#aura-synthesizer', label: 'Brand Visualizer' },
      { href: '#brand-sonifier', label: 'Sonic Identity' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const currentPathName = route.split('#')[0];
      const isSubPage = currentPathName !== '/' && currentPathName !== '';
      const isAnchorLink = href.startsWith('#');

      // If on a sub-page (e.g., /privacy-policy) and clicking an anchor link (e.g., #services)
      if (isSubPage && isAnchorLink) {
        // Navigate to the main page first, then the anchor will be handled by MainSite's useEffect
        navigate(`/${href}`);
      } else {
        // For all other cases (e.g., on main page clicking anchor, or any page clicking a full path)
        navigate(href);
      }
    }
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-slate-950/50 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#top" onClick={handleLinkClick} className="flex items-center gap-2 text-xl font-bold transition-colors duration-300 text-slate-100 hover:text-blue-400">
            <BrainCircuitIcon className={`w-8 h-8 transition-colors duration-300 ${isScrolled ? 'text-blue-400' : 'text-slate-100'}`} />
            <span>Prevaledge</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, navLinks.length -1).map(link => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={handleLinkClick}
                className={`transition-colors duration-300 ${isScrolled ? 'text-slate-300 hover:text-blue-400' : 'text-slate-200 hover:text-white'}`}
              >
                {link.label}
              </a>
            ))}
            {/* AI Tools Dropdown */}
            <div 
                className="relative" 
                onMouseEnter={() => setIsDropdownOpen(true)} 
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                <button className={`flex items-center gap-1 transition-colors duration-300 focus:outline-none ${isScrolled ? 'text-slate-300 hover:text-blue-400' : 'text-slate-200 hover:text-white'}`}>
                    <span>AI Tools</span>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-lg shadow-2xl animate-fade-in">
                        <div className="p-2">
                            {aiToolLinks.map(link => (
                                <a key={link.href} href={link.href} onClick={handleLinkClick} className="block px-4 py-2 text-slate-300 hover:bg-blue-500/20 hover:text-white rounded-md transition-colors">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
             <a 
                href={navLinks[navLinks.length - 1].href}
                onClick={handleLinkClick}
                className={`transition-colors duration-300 ${isScrolled ? 'text-slate-300 hover:text-blue-400' : 'text-slate-200 hover:text-white'}`}
              >
                {navLinks[navLinks.length - 1].label}
              </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg pb-4">
          <nav className="flex flex-col items-center gap-2 px-4">
            {navLinks.slice(0, navLinks.length - 1).map(link => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={handleLinkClick}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2 text-lg w-full text-center hover:bg-slate-800 rounded-md"
              >
                {link.label}
              </a>
            ))}
            {/* Mobile AI Tools Accordion */}
            <div className="w-full">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex justify-between items-center w-full text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2 text-lg text-center hover:bg-slate-800 rounded-md px-4">
                    <span>AI Tools</span>
                    <svg className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isDropdownOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                        {aiToolLinks.map(link => (
                             <a key={link.href} href={link.href} onClick={handleLinkClick} className="block text-slate-400 hover:text-blue-300 transition-colors duration-300 py-2 text-base w-full text-center hover:bg-slate-800 rounded-md">
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
             <a 
                href={navLinks[navLinks.length - 1].href}
                onClick={handleLinkClick}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2 text-lg w-full text-center hover:bg-slate-800 rounded-md"
              >
                {navLinks[navLinks.length - 1].label}
              </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
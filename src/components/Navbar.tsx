
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = true }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 lg:px-10',
        {
          'py-6': !isScrolled,
          'py-4 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm': isScrolled,
          'bg-transparent': transparent && !isScrolled,
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center"
        >
          <a href="/" className="text-2xl font-medium">
            PROMO<span className="text-blue-500">3D</span>
          </a>
        </motion.div>

        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex items-center space-x-8"
        >
          {['Products', 'Features', 'Showcase', 'Pricing'].map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </motion.nav>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:flex items-center"
        >
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </motion.div>

        <button 
          onClick={toggleMobileMenu} 
          className="flex md:hidden flex-col items-center justify-center w-10 h-10 space-y-1.5 z-50"
          aria-label="Toggle menu"
        >
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-current block transition-transform"
          />
          <motion.span 
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-current block transition-opacity"
          />
          <motion.span 
            animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-current block transition-transform"
          />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-6 text-lg">
              {['Products', 'Features', 'Showcase', 'Pricing'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

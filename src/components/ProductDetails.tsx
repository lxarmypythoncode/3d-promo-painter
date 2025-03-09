
import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, slideInRight } from '@/utils/animations';

const tabItems = [
  {
    id: 'overview',
    label: 'Overview',
    content: {
      heading: 'Smart Product Showcase',
      description: 'Our 3D product showcase platform helps you create immersive shopping experiences that drive customer engagement and boost conversion rates.',
      features: [
        'Interactive 3D product visualization',
        'Customizable product configurations',
        'Detailed product specifications',
        'Seamless e-commerce integration',
      ],
      image: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d87?q=80&w=1200&auto=format&fit=crop',
    }
  },
  {
    id: 'features',
    label: 'Features',
    content: {
      heading: 'Powerful Features',
      description: 'From interactive animations to AR/VR support, our platform provides all the tools you need to create stunning product showcases.',
      features: [
        '360-degree product rotation',
        'Exploded view animations',
        'Part highlighting and labeling',
        'Real-time shadows and lighting',
      ],
      image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1200&auto=format&fit=crop',
    }
  },
  {
    id: 'performance',
    label: 'Performance',
    content: {
      heading: 'Optimized Performance',
      description: 'Our platform is built with performance in mind, ensuring smooth 3D experiences across all devices and connection speeds.',
      features: [
        'Optimized 3D model loading',
        'Progressive rendering for low bandwidth',
        'Responsive design for all devices',
        'Fast loading times with caching',
      ],
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
    }
  }
];

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const activeContent = tabItems.find((tab) => tab.id === activeTab)?.content;
  
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden" id="showcase">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
        >
          Product Details
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-12 max-w-2xl text-balance"
        >
          Showcase Products with Incredible Detail
        </motion.h2>
        
        {/* Tab navigation */}
        <div className="flex flex-wrap mb-8 border-b border-gray-200 dark:border-gray-800">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-all relative ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">{activeContent?.heading}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-balance">
              {activeContent?.description}
            </p>
            
            <ul className="space-y-3">
              {activeContent?.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <svg className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            key={`${activeTab}-image`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
            <img 
              src={activeContent?.image} 
              alt={activeContent?.heading}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

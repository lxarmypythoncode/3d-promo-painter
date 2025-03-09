
import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/utils/useScrollAnimation';
import { modelAnimations, fadeIn, fadeInUp, staggerContainer } from '@/utils/animations';

interface ModelViewerProps {
  modelPath?: string;
  scale?: number;
}

// Sample 3D model component
const Model = ({ modelPath = "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf", scale = 1 }: ModelViewerProps) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      const animation = modelAnimations.breathe(time);
      ref.current.scale.set(
        animation.scale[0] * scale,
        animation.scale[1] * scale,
        animation.scale[2] * scale
      );
    }
  });
  
  return <primitive ref={ref} object={scene} scale={scale} />;
};

// Color selector component
const ColorSelector = ({ colors, activeColor, onChange }: { colors: string[], activeColor: string, onChange: (color: string) => void }) => {
  return (
    <div className="flex items-center space-x-3 mt-6">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Color:</p>
      <div className="flex space-x-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full transition-transform ${activeColor === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-110'}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={`Select ${color} color`}
          />
        ))}
      </div>
    </div>
  );
};

const ProductViewer = () => {
  const [activeColor, setActiveColor] = useState('#1E88E5');
  const [activeView, setActiveView] = useState('3d');
  const colors = ['#1E88E5', '#43A047', '#E53935', '#FFB300', '#5E35B1'];
  const { ref, controls, variants } = useScrollAnimation();
  
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900" id="products">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeIn} className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            Interactive Demo
          </motion.span>
          
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Experience Your Product in 3D
          </motion.h2>
          
          <motion.p variants={fadeIn} className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-balance">
            Allow customers to interact with your products from every angle. Our 3D viewer creates an immersive shopping experience that increases conversion rates.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-[400px] md:h-[500px] relative group"
          >
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <button
                onClick={() => setActiveView('3d')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeView === '3d' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                3D View
              </button>
              <button
                onClick={() => setActiveView('front')}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  activeView === 'front' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                Front View
              </button>
            </div>
            
            <div className="w-full h-full">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <Suspense fallback={null}>
                  <Stage environment="city" shadows adjustCamera intensity={0.5}>
                    <Model scale={activeView === 'front' ? 0.8 : 1} />
                  </Stage>
                  {activeView === '3d' && <OrbitControls enableZoom={false} autoRotate={false} />}
                </Suspense>
              </Canvas>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/90 to-white/0 dark:from-gray-800/90 dark:to-gray-800/0 backdrop-blur-sm"></div>
          </motion.div>
          
          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Premium Laptop Pro</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The ultimate productivity machine with stunning display, powerful performance, and all-day battery life.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <span className="font-medium">High-performance processor</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <span className="font-medium">Stunning Retina display</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                    <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>
                  </svg>
                </div>
                <span className="font-medium">All-day battery life</span>
              </div>
            </div>
            
            <ColorSelector colors={colors} activeColor={activeColor} onChange={setActiveColor} />
            
            <div className="pt-4">
              <p className="text-3xl font-bold mb-6">$1,299.00</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20">
                  Add to Cart
                </button>
                <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductViewer;

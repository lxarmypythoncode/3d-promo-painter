
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Float, ContactShadows, Environment, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { modelAnimations } from '@/utils/animations';

// Fallback component while 3D model loads
const ModelLoading = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Default 3D model component (until you add a real model)
const WatchModel = (props: any) => {
  const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/apple-watch/model.gltf");
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (modelRef.current) {
      const animation = modelAnimations.float(time);
      modelRef.current.rotation.y = animation.rotation[1];
      modelRef.current.position.y = animation.position[1];
    }
  });
  
  return <primitive ref={modelRef} object={scene} {...props} />;
};

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black -z-10"></div>
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-10 pt-24 lg:py-0 items-center">
        {/* Left column - Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center lg:text-left"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
          >
            Premium Showcase
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-balance"
          >
            Showcase Your Product in <span className="text-blue-600 dark:text-blue-400">Stunning 3D</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 text-balance"
          >
            Create immersive product demonstrations that convert. Our 3D promotional platform brings your products to life.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Try Demo
            </button>
            <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 focus:ring-offset-2">
              Learn More
            </button>
          </motion.div>
        </motion.div>
        
        {/* Right column - 3D model */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative"
        >
          <div className="model-container w-full h-full">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Suspense fallback={null}>
                <PresentationControls
                  global
                  zoom={0.8}
                  rotation={[0, -Math.PI / 4, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                  <Float rotationIntensity={0.3}>
                    <WatchModel scale={4} position={[0, 0, 0]} />
                  </Float>
                </PresentationControls>
                <Environment preset="city" />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.4} />
              </Suspense>
            </Canvas>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -z-10 top-1/4 left-1/3 w-24 h-24 rounded-full bg-pink-400/20 dark:bg-pink-600/20 blur-2xl"></div>
          <div className="absolute -z-10 bottom-1/4 right-1/3 w-32 h-32 rounded-full bg-purple-400/15 dark:bg-purple-600/20 blur-2xl"></div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-700 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;


import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Onboarding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Column - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:px-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-loopvibes-teal">Loop</span>
              <span className="text-loopvibes-coral">Vibes</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              The next generation platform for creating and sharing short, looping videos with the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/sign-in">
                <Button size="lg" className="w-full sm:w-auto group">
                  Sign In
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/sign-up">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-loopvibes-teal flex items-center justify-center text-white text-xs">✓</div>
                <p className="text-gray-700 dark:text-gray-300">Create stunning looping videos</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-loopvibes-coral flex items-center justify-center text-white text-xs">✓</div>
                <p className="text-gray-700 dark:text-gray-300">Share with a vibrant community</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-loopvibes-purple flex items-center justify-center text-white text-xs">✓</div>
                <p className="text-gray-700 dark:text-gray-300">Discover trending content</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right Column - Image */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-loopvibes-teal/10 to-loopvibes-purple/10 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-loopvibes-teal/20 to-loopvibes-purple/20 backdrop-blur-sm z-10"></div>
            <img 
              src="/placeholder.svg" 
              alt="LoopVibes App" 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-20">
              <p className="text-white text-lg font-medium">Start your creative journey today</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4 px-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2023 LoopVibes. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Onboarding;

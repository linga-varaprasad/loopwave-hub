
import React, { useState, useEffect } from 'react';
import { ArrowUpCircle, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoCard from '@/components/video/VideoCard';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { videos } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Share Your Loop With The World
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-gray-300 opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Create, discover, and share captivating looping videos
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/upload">
                  <motion.button 
                    className="btn-primary neon-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Upload className="mr-2 h-5 w-5" /> Upload Video
                  </motion.button>
                </Link>
                <Link to="/explore">
                  <motion.button 
                    className="btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Trending
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </section>
        
        {/* Featured Videos */}
        <section className="py-12 md:py-16 bg-background transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Featured Loops
              </motion.h2>
              <ThemeToggle />
            </div>
            
            <motion.div 
              className="masonry-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {videos.slice(0, 4).map((video) => (
                <motion.div key={video.id} variants={itemVariants}>
                  <VideoCard
                    id={video.id}
                    videoSrc={video.videoSrc}
                    thumbnailSrc={video.thumbnailSrc}
                    title={video.title}
                    username={video.username}
                    userAvatar={video.userAvatar}
                    likes={video.likes}
                    comments={video.comments}
                    className="mb-4 glass-card rounded-xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Trending Section */}
        <section className="py-12 md:py-16 bg-muted dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Trending Now
            </motion.h2>
            
            <motion.div 
              className="masonry-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {videos.slice(4).map((video) => (
                <motion.div key={video.id} variants={itemVariants}>
                  <VideoCard
                    id={video.id}
                    videoSrc={video.videoSrc}
                    thumbnailSrc={video.thumbnailSrc}
                    title={video.title}
                    username={video.username}
                    userAvatar={video.userAvatar}
                    likes={video.likes}
                    comments={video.comments}
                    className="mb-4 glass-card rounded-xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-loopvibes-teal text-white dark:bg-gray-800 dark:border-t dark:border-gray-700 transition-colors duration-300">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Ready to share your creative loops?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join our community of creators and start sharing your looping videos today.
            </motion.p>
            <Link to="/upload">
              <motion.button 
                className="bg-white text-loopvibes-teal px-8 py-3 rounded-md font-medium 
                           hover:bg-gray-100 transition-colors duration-300 shadow-lg
                           dark:bg-gray-900 dark:text-loopvibes-teal dark:hover:bg-gray-800"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Floating Upload Button */}
      <motion.div 
        className="fixed bottom-24 right-6 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Link to="/upload">
          <motion.button
            className="bg-loopvibes-teal text-white p-3 rounded-full shadow-lg neon-button"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 2, repeat: Infinity } }}
          >
            <Upload size={24} />
          </motion.button>
        </Link>
      </motion.div>
      
      {/* Scroll to Top Button */}
      <motion.button
        className={cn(
          "fixed bottom-6 right-6 bg-loopvibes-teal/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-20",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUpCircle size={24} />
      </motion.button>
    </div>
  );
};

export default Index;

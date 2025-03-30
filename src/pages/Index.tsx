
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpCircle, Upload } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { videos } from '@/data/mockData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [loadedVideos, setLoadedVideos] = useState(6);
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Simulate counting animation for stats
  const [counts, setCounts] = useState({ followers: 0, likes: 0, views: 0 });

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

  useEffect(() => {
    if (activeTab === 'profile') {
      const interval = setInterval(() => {
        setCounts(prev => {
          const newFollowers = Math.min(prev.followers + 5, 1250);
          const newLikes = Math.min(prev.likes + 100, 24600);
          const newViews = Math.min(prev.views + 500, 103500);
          
          if (newFollowers === 1250 && newLikes === 24600 && newViews === 103500) {
            clearInterval(interval);
          }
          
          return { followers: newFollowers, likes: newLikes, views: newViews };
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Load more videos on scroll
  const loadMoreVideos = () => {
    if (loadedVideos < videos.length) {
      setLoadedVideos(prev => Math.min(prev + 2, videos.length));
      toast.success("More videos loaded!");
    }
  };

  // Toggle like for a video
  const toggleLike = (id: string) => {
    setLikedVideos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    if (!likedVideos[id]) {
      toast.success("Added to liked videos");
    } else {
      toast.info("Removed from liked videos");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Define theme-based classes
  const isDark = theme === 'dark';
  const cardClass = isDark 
    ? 'bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700' 
    : 'bg-white bg-opacity-70 backdrop-blur-md border border-gray-200';
  const buttonClass = isDark
    ? 'bg-purple-600 hover:bg-purple-500 text-white'
    : 'bg-loopvibes-teal hover:bg-loopvibes-teal/90 text-white';
  const glowClass = isDark
    ? 'shadow-lg shadow-purple-500/30'
    : 'shadow-lg shadow-loopvibes-teal/30';

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      {/* Main content area */}
      <main className="flex-grow">
        {/* Tab navigation */}
        <div className="flex justify-center mb-6 mt-20">
          <div className={`${cardClass} rounded-full p-1 flex glass-card`}>
            {['home', 'upload', 'profile'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                  activeTab === tab 
                    ? isDark 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                      : 'bg-loopvibes-teal text-white shadow-lg shadow-loopvibes-teal/30'
                    : 'hover:bg-opacity-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Home Tab - Video Feed */}
        {activeTab === 'home' && (
          <div className="px-4 max-w-6xl mx-auto">
            {/* Masonry Grid for Videos */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {videos.slice(0, loadedVideos).map((video) => (
                <motion.div 
                  key={video.id}
                  className={`${cardClass} rounded-xl overflow-hidden glass-card ${glowClass}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnailSrc} 
                      alt={video.title}
                      className="w-full h-48 object-cover transition-all duration-300 hover:brightness-110"
                    />
                    
                    {/* Video overlay with play icon */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-20 p-3 rounded-full backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{video.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          @{video.username}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            toggleLike(video.id);
                          }} 
                          className="transition-transform duration-300 hover:scale-125 focus:outline-none"
                        >
                          {likedVideos[video.id] ? (
                            <span className="text-red-500 text-xl">❤️</span>
                          ) : (
                            <span className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>🤍</span>
                          )}
                        </button>
                        <span className="text-xs mt-1">
                          {likedVideos[video.id] ? video.likes + 1 : video.likes}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-3">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {Math.floor(video.likes / 10)}k views
                      </span>
                      
                      <button 
                        className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-loopvibes-teal hover:text-loopvibes-teal/80'} text-xs flex items-center transition-all duration-300 hover:scale-110`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Loop
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Load more button */}
            {loadedVideos < videos.length && (
              <div className="flex justify-center mt-8 mb-6">
                <motion.button 
                  onClick={loadMoreVideos}
                  className={`${buttonClass} px-6 py-3 rounded-full transition-all duration-300 ${glowClass}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More
                </motion.button>
              </div>
            )}
          </div>
        )}
        
        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="px-4 max-w-xl mx-auto">
            <motion.div 
              className={`${cardClass} p-6 rounded-xl ${glowClass}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-6 text-center">Upload Your Video</h2>
              
              {/* 3D Upload Box */}
              <motion.div 
                className={`
                  border-2 border-dashed ${isDark ? 'border-purple-500' : 'border-loopvibes-teal'} 
                  rounded-xl p-10 text-center upload-box-3d
                  transition-all duration-300
                  ${isDark ? 'hover:bg-purple-900 hover:bg-opacity-20' : 'hover:bg-loopvibes-teal/10'}
                `}
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 mb-4 ${isDark ? 'text-purple-400' : 'text-loopvibes-teal'} floating`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  
                  <p className="text-lg font-medium mb-2">Drag & Drop Your Video</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                    Or click to browse files
                  </p>
                  
                  <motion.button 
                    className={`${buttonClass} ${glowClass} px-6 py-3 rounded-full transition-all duration-300 neon-button`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/upload')}
                  >
                    Select File
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Video Settings */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Video Settings</h3>
                
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Title
                  </label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-gray-800 text-white border border-gray-700 focus:border-purple-500' 
                        : 'bg-white text-gray-800 border border-gray-300 focus:border-loopvibes-teal'
                    } focus:outline-none transition-colors duration-300`}
                    placeholder="Give your video a catchy title"
                  />
                </div>
                
                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea 
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-gray-800 text-white border border-gray-700 focus:border-purple-500' 
                        : 'bg-white text-gray-800 border border-gray-300 focus:border-loopvibes-teal'
                    } focus:outline-none transition-colors duration-300`}
                    rows={3}
                    placeholder="Tell viewers about your video"
                  />
                </div>
                
                {/* AI Filters Section */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">AI-powered Filters</h3>
                  
                  <div className="flex overflow-x-auto space-x-3 pb-2">
                    {['Vibrant', 'Noir', 'Retro', 'Cinematic', 'Dreamy'].map(filter => (
                      <motion.div 
                        key={filter}
                        className={`flex-shrink-0 ${
                          isDark 
                            ? 'bg-gray-800 hover:bg-gray-700' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        } rounded-lg p-3 cursor-pointer transition-colors duration-300`}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-blue-500 rounded mb-2"></div>
                        <p className="text-xs text-center">{filter}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <motion.button 
                  className={`w-full ${buttonClass} ${glowClass} py-3 rounded-full transition-all duration-300 font-medium neon-button`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/upload')}
                >
                  Publish Video
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="px-4 max-w-4xl mx-auto">
            <motion.div 
              className={`${cardClass} rounded-xl overflow-hidden ${glowClass}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Profile Header */}
              <div className={`h-48 relative ${isDark ? 'bg-gradient-to-r from-purple-900 to-blue-900' : 'bg-gradient-to-r from-blue-100 to-purple-100'}`}>
                <div className="absolute -bottom-16 left-6 flex items-end">
                  <div className={`relative ${isDark ? 'border-gray-900' : 'border-white'} border-4 rounded-full`}>
                    <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      CV
                    </div>
                    <div className={`absolute inset-0 rounded-full ${isDark ? 'animate-pulse bg-purple-500' : 'animate-pulse bg-loopvibes-teal'} opacity-20`}></div>
                  </div>
                  
                  <div className="ml-4 mb-4">
                    <h2 className="text-2xl font-bold">CreativeVibes</h2>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>@creativeperson</p>
                  </div>
                </div>
              </div>
              
              {/* Profile stats */}
              <div className="mt-20 px-6 pb-6">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    {label: 'Followers', value: counts.followers.toLocaleString()},
                    {label: 'Total Likes', value: counts.likes.toLocaleString()},
                    {label: 'Views', value: counts.views.toLocaleString()}
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-4 text-center`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <p className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-loopvibes-teal'}`}>
                        {stat.value}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Videos Grid */}
                <h3 className="text-xl font-bold mb-4">My Videos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {videos.slice(0, 8).map((video) => (
                    <motion.div 
                      key={video.id}
                      className="rounded-lg overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <img 
                        src={video.thumbnailSrc} 
                        alt={video.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className={`p-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <p className="text-sm font-medium truncate">{video.title}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {Math.floor(video.likes / 10)}k views
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
      
      {/* Floating Upload Button */}
      <motion.div 
        className="fixed bottom-24 right-6 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Link to="/upload">
          <motion.button
            className={`${isDark ? 'bg-purple-600' : 'bg-loopvibes-teal'} text-white p-3 rounded-full shadow-lg neon-button`}
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
          `fixed bottom-6 right-6 ${isDark ? 'bg-purple-600/80' : 'bg-loopvibes-teal/80'} text-white p-3 rounded-full shadow-lg transition-all duration-300 z-20`,
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUpCircle size={24} />
      </motion.button>
      
      {/* Bottom navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 ${cardClass} py-3 px-4 z-50 glass-card`}>
        <div className="flex justify-around max-w-md mx-auto">
          {[
            {name: 'Home', icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
              </svg>
            ), path: '/'},
            {name: 'Explore', icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            ), path: '/explore'},
            {name: 'Upload', icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            ), path: '/upload'},
            {name: 'Profile', icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            ), path: '/profile'}
          ].map(item => (
            <motion.button 
              key={item.name}
              onClick={() => {
                if (item.name.toLowerCase() === 'home' || item.name.toLowerCase() === 'profile' || item.name.toLowerCase() === 'upload') {
                  setActiveTab(item.name.toLowerCase());
                } else {
                  navigate(item.path);
                }
              }}
              className={`flex flex-col items-center justify-center transition-all duration-300 ${
                activeTab === item.name.toLowerCase()
                  ? isDark 
                    ? 'text-purple-500' 
                    : 'text-loopvibes-teal'
                  : isDark
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </nav>
      
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={toggleTheme}
          className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'} p-2 rounded-full transition-all duration-300`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
};

export default Index;

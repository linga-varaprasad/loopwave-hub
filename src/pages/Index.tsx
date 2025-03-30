
import React, { useState, useEffect } from 'react';
import { ArrowUpCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoCard from '@/components/video/VideoCard';
import { videos } from '@/data/mockData';
import { cn } from '@/lib/utils';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Share Your Loop With The World
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-slide-up opacity-90">
                Create, discover, and share captivating looping videos
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
                <button className="btn-primary">
                  Upload Video
                </button>
                <button className="btn-secondary">
                  Explore Trending
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </section>
        
        {/* Featured Videos */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Featured Loops
            </h2>
            
            <div className="masonry-grid">
              {videos.slice(0, 4).map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  videoSrc={video.videoSrc}
                  thumbnailSrc={video.thumbnailSrc}
                  title={video.title}
                  username={video.username}
                  userAvatar={video.userAvatar}
                  likes={video.likes}
                  comments={video.comments}
                  className="mb-4"
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Trending Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Trending Now
            </h2>
            
            <div className="masonry-grid">
              {videos.slice(4).map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  videoSrc={video.videoSrc}
                  thumbnailSrc={video.thumbnailSrc}
                  title={video.title}
                  username={video.username}
                  userAvatar={video.userAvatar}
                  likes={video.likes}
                  comments={video.comments}
                  className="mb-4"
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-loopvibes-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to share your creative loops?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our community of creators and start sharing your looping videos today.
            </p>
            <button className="bg-white text-loopvibes-teal px-8 py-3 rounded-md font-medium 
                             hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Get Started
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Scroll to Top Button */}
      <button
        className={cn(
          "fixed bottom-6 right-6 bg-loopvibes-teal/80 text-white p-2 rounded-full shadow-lg transition-all duration-300",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        onClick={scrollToTop}
      >
        <ArrowUpCircle size={28} />
      </button>
    </div>
  );
};

export default Index;

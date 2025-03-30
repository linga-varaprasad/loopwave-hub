
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import VideoCard from '@/components/video/VideoCard';
import { videos } from '@/data/mockData';
import { cn } from '@/lib/utils';
import PageHeader from '@/components/layout/PageHeader';

const categories = [
  "All",
  "Animation",
  "Nature",
  "Urban",
  "Sports",
  "Food",
  "Fashion",
  "Travel",
  "Art"
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  
  // Filter videos based on search query and active category
  useEffect(() => {
    let result = [...videos];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        video => 
          video.title.toLowerCase().includes(query) || 
          video.description.toLowerCase().includes(query) ||
          video.username.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter (simplified since we don't have real categories in our mock data)
    if (activeCategory !== 'All') {
      // In a real app, videos would have category data
      // For now, let's just filter randomly based on the video ID for demonstration
      result = result.filter(video => {
        const id = parseInt(video.id);
        
        switch(activeCategory) {
          case 'Animation':
            return id % 8 === 1;
          case 'Nature':
            return id % 8 === 2 || id % 8 === 3;
          case 'Urban':
            return id % 8 === 4;
          case 'Sports':
            return id % 8 === 5;
          case 'Food':
            return id % 8 === 6;
          case 'Fashion':
            return id % 8 === 7;
          case 'Travel':
            return id % 8 === 0;
          case 'Art':
            return id % 8 === 5 || id % 8 === 2;
          default:
            return true;
        }
      });
    }
    
    setFilteredVideos(result);
  }, [searchQuery, activeCategory]);
  
  return (
    <div className="min-h-screen bg-white">
      <main className="flex-grow">
        <PageHeader 
          title="Explore"
          description="Discover popular content from around the world"
        />
        
        {/* Search Bar */}
        <div className="container mx-auto px-4">
          <div className="relative mb-8 max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-loopvibes-teal/50"
            />
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  "px-4 py-2 rounded-full transition-colors duration-200",
                  activeCategory === category
                    ? "bg-loopvibes-teal text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Videos Grid */}
          {filteredVideos.length > 0 ? (
            <div className="masonry-grid animate-fade-in">
              {filteredVideos.map((video) => (
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
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-xl font-medium mb-2">No videos found</h3>
              <p className="text-gray-500">
                We couldn't find any videos matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;

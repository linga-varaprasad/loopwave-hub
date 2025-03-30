
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarDays, Users, Eye } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoCard from '@/components/video/VideoCard';
import UserAvatar from '@/components/ui/UserAvatar';
import { userProfile } from '@/data/mockData';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const Profile = () => {
  const [profile, setProfile] = useState(userProfile);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');
  const [followerCount, setFollowerCount] = useState(profile.followers);
  
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [viewsCounter, setViewsCounter] = useState(0);
  const [followersCounter, setFollowersCounter] = useState(0);
  const [followingCounter, setFollowingCounter] = useState(0);
  
  // Animate counters on component mount
  useEffect(() => {
    if (!countersAnimated) {
      // Animate view count
      const viewsDuration = 2000; // 2 seconds
      const viewsInterval = 20; // Update every 20ms
      const viewsIncrement = Math.ceil(profile.totalViews / (viewsDuration / viewsInterval));
      
      const viewsTimer = setInterval(() => {
        setViewsCounter(prev => {
          const newCount = prev + viewsIncrement;
          if (newCount >= profile.totalViews) {
            clearInterval(viewsTimer);
            return profile.totalViews;
          }
          return newCount;
        });
      }, viewsInterval);
      
      // Animate followers count
      const followersDuration = 1500; // 1.5 seconds
      const followersInterval = 20; // Update every 20ms
      const followersIncrement = Math.ceil(profile.followers / (followersDuration / followersInterval));
      
      const followersTimer = setInterval(() => {
        setFollowersCounter(prev => {
          const newCount = prev + followersIncrement;
          if (newCount >= profile.followers) {
            clearInterval(followersTimer);
            return profile.followers;
          }
          return newCount;
        });
      }, followersInterval);
      
      // Animate following count
      const followingDuration = 1200; // 1.2 seconds
      const followingInterval = 20; // Update every 20ms
      const followingIncrement = Math.ceil(profile.following / (followingDuration / followingInterval));
      
      const followingTimer = setInterval(() => {
        setFollowingCounter(prev => {
          const newCount = prev + followingIncrement;
          if (newCount >= profile.following) {
            clearInterval(followingTimer);
            return profile.following;
          }
          return newCount;
        });
      }, followingInterval);
      
      setCountersAnimated(true);
      
      return () => {
        clearInterval(viewsTimer);
        clearInterval(followersTimer);
        clearInterval(followingTimer);
      };
    }
  }, [countersAnimated, profile]);
  
  const handleFollow = () => {
    if (isFollowing) {
      setFollowerCount(prev => prev - 1);
    } else {
      setFollowerCount(prev => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 md:h-64 bg-gray-200 w-full">
            <img 
              src={profile.coverPhoto} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Profile Info */}
          <div className="container mx-auto px-4">
            <div className="relative -mt-12 sm:-mt-16 pb-6 border-b">
              <div className="flex flex-col sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="sm:mr-6">
                  <UserAvatar 
                    src={profile.avatar} 
                    alt={profile.displayName} 
                    size="xl"
                    className="ring-4 ring-white"
                  />
                </div>
                
                {/* User Details */}
                <div className="mt-4 sm:mt-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                      <p className="text-gray-600">@{profile.username}</p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                      <Button
                        onClick={handleFollow}
                        className={isFollowing ? 
                          "bg-gray-200 text-gray-800 hover:bg-gray-300" : 
                          "bg-loopvibes-teal text-white hover:bg-loopvibes-teal/90"}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-700">{profile.bio}</p>
                  
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <CalendarDays size={16} className="mr-1" />
                    <span>Joined {format(new Date(profile.joinedDate), 'MMMM yyyy')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-gray-50 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-loopvibes-teal">
                  {viewsCounter.toLocaleString()}
                </div>
                <div className="flex items-center justify-center text-gray-600 mt-1">
                  <Eye size={16} className="mr-1" />
                  <span>Views</span>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-loopvibes-teal">
                  {followersCounter.toLocaleString()}
                </div>
                <div className="flex items-center justify-center text-gray-600 mt-1">
                  <Users size={16} className="mr-1" />
                  <span>Followers</span>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-loopvibes-teal">
                  {followingCounter.toLocaleString()}
                </div>
                <div className="text-gray-600 mt-1">Following</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <div className="container mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'videos' ? 'text-loopvibes-teal border-b-2 border-loopvibes-teal' : 'text-gray-600'}`}
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'liked' ? 'text-loopvibes-teal border-b-2 border-loopvibes-teal' : 'text-gray-600'}`}
              onClick={() => setActiveTab('liked')}
            >
              Liked
            </button>
          </div>
          
          {/* Content */}
          <div>
            {activeTab === 'videos' && (
              <div>
                {profile.videos.length > 0 ? (
                  <div className="masonry-grid">
                    {profile.videos.map((video) => (
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
                  <div className="text-center py-12">
                    <p className="text-gray-500">No videos uploaded yet</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'liked' && (
              <div className="text-center py-12">
                <p className="text-gray-500">Liked videos will appear here</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;

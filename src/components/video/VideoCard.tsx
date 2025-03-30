
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  id: string;
  videoSrc: string;
  thumbnailSrc: string;
  title: string;
  username: string;
  userAvatar?: string;
  likes: number;
  comments: number;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  videoSrc,
  thumbnailSrc,
  title,
  username,
  userAvatar,
  likes,
  comments,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => console.log('Video play error:', err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div 
      className={cn(
        "video-card group relative rounded-lg overflow-hidden",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/video/${id}`} className="block aspect-[3/4] relative">
        {/* Thumbnail/Video Container */}
        <div className="w-full h-full bg-gray-100">
          {/* Thumbnail (shown when not hovered) */}
          <img 
            src={thumbnailSrc} 
            alt={title} 
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isHovered ? 'opacity-0' : 'opacity-100'
            )} 
          />
          
          {/* Video (shown when hovered) */}
          <video 
            ref={videoRef}
            src={videoSrc}
            className={cn(
              "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300",
              isHovered ? 'opacity-100' : 'opacity-0'
            )} 
            loop
            muted
            playsInline
          />
        </div>

        {/* Overlay with stats */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-medium truncate">{title}</h3>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              {userAvatar ? (
                <img src={userAvatar} alt={username} className="w-6 h-6 rounded-full" />
              ) : (
                <UserCircle size={20} className="text-white" />
              )}
              <span className="text-white text-sm">{username}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-white text-xs">
                <Heart size={16} className="mr-1" />
                <span>{likes}</span>
              </div>
              <div className="flex items-center text-white text-xs">
                <MessageCircle size={16} className="mr-1" />
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;


import React, { useState } from 'react';
import { Heart, Share2, MessageCircle, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface VideoActionsProps {
  videoId: string;
  initialLikes: number;
  initialComments: number;
  vertical?: boolean;
  className?: string;
}

const VideoActions: React.FC<VideoActionsProps> = ({
  videoId,
  initialLikes,
  initialComments,
  vertical = false,
  className
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [saved, setSaved] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (liked) {
      setLikes(prev => prev - 1);
      setLiked(false);
      toast.info('Removed like');
    } else {
      setLikes(prev => prev + 1);
      setLiked(true);
      toast.success('Added to liked videos');
    }
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // In a real app this would open a share dialog
    // For now, let's just simulate copying to clipboard
    navigator.clipboard.writeText(`https://loopvibes.app/video/${videoId}`);
    toast.success('Link copied to clipboard!');
  };
  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    
    setSaved(!saved);
    toast.success(saved ? 'Removed from saved videos' : 'Added to saved videos');
  };

  const containerClass = cn(
    "flex items-center gap-2",
    vertical ? "flex-col" : "flex-row",
    className
  );
  
  const buttonClass = cn(
    "flex items-center gap-1 transition-all duration-200 p-2 rounded-full",
    vertical ? "flex-col" : "flex-row"
  );

  return (
    <div className={containerClass}>
      <button 
        className={cn(
          buttonClass,
          "like-btn",
          liked ? "text-loopvibes-coral" : "text-gray-700 hover:text-loopvibes-coral"
        )}
        onClick={handleLike}
      >
        <Heart className="heart-icon" size={vertical ? 24 : 20} fill={liked ? "currentColor" : "none"} />
        {!vertical && <span className="text-sm font-medium">{likes}</span>}
        {vertical && <span className="text-xs">{likes}</span>}
      </button>
      
      <button 
        className={cn(
          buttonClass,
          "hover:text-loopvibes-purple text-gray-700"
        )}
      >
        <MessageCircle size={vertical ? 24 : 20} />
        {!vertical && <span className="text-sm font-medium">{initialComments}</span>}
        {vertical && <span className="text-xs">{initialComments}</span>}
      </button>
      
      <button 
        className={cn(
          buttonClass,
          "share-btn hover:text-loopvibes-teal text-gray-700"
        )}
        onClick={handleShare}
      >
        <Share2 className="share-icon" size={vertical ? 24 : 20} />
        {vertical && <span className="text-xs">Share</span>}
      </button>
      
      <button 
        className={cn(
          buttonClass,
          saved ? "text-loopvibes-purple" : "text-gray-700 hover:text-loopvibes-purple"
        )}
        onClick={handleSave}
      >
        <Bookmark size={vertical ? 24 : 20} fill={saved ? "currentColor" : "none"} />
        {vertical && <span className="text-xs">Save</span>}
      </button>
    </div>
  );
};

export default VideoActions;

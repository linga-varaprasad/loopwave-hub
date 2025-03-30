
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserCircle, CalendarDays, Eye } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoPlayer from '@/components/video/VideoPlayer';
import VideoActions from '@/components/video/VideoActions';
import UserAvatar from '@/components/ui/UserAvatar';
import VideoCard from '@/components/video/VideoCard';
import { getVideoById, getCommentsByVideoId, videos } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [video, setVideo] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  
  useEffect(() => {
    if (id) {
      // Fetch video details
      const videoData = getVideoById(id);
      if (videoData) {
        setVideo(videoData);
        
        // Fetch comments
        const videoComments = getCommentsByVideoId(id);
        setComments(videoComments);
        
        // Get related videos (excluding the current one)
        const related = videos.filter(v => v.id !== id).slice(0, 3);
        setRelatedVideos(related);
      } else {
        // Handle video not found
        toast({
          title: "Video not found",
          description: "The video you requested doesn't exist",
          variant: "destructive"
        });
      }
    }
  }, [id, toast]);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // In a real app, this would send the comment to the server
    const newCommentObj = {
      id: `c${comments.length + 1}`,
      videoId: id || '',
      userId: 'currentUser',
      username: 'currentUser',
      userAvatar: null,
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully"
    });
  };
  
  if (!video) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Loading video...</h1>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="mb-6">
              <VideoPlayer 
                videoSrc={video.videoSrc} 
                className="w-full rounded-lg overflow-hidden max-h-[70vh]"
              />
            </div>
            
            {/* Video Information */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
              
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Eye size={16} />
                  <span>{video.views.toLocaleString()} views</span>
                  <span>•</span>
                  <CalendarDays size={16} />
                  <span>{formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}</span>
                </div>
                
                <VideoActions 
                  videoId={video.id}
                  initialLikes={video.likes}
                  initialComments={video.comments}
                />
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center space-x-3">
                  {video.userAvatar ? (
                    <UserAvatar src={video.userAvatar} alt={video.username} />
                  ) : (
                    <UserCircle size={40} className="text-gray-400" />
                  )}
                  
                  <div>
                    <h3 className="font-medium">{video.username}</h3>
                    <p className="text-sm text-gray-500">Creator</p>
                  </div>
                </div>
                
                <Button variant="outline" className="hover:bg-loopvibes-teal/10 border-loopvibes-teal text-loopvibes-teal">
                  Follow
                </Button>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-700">{video.description}</p>
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex space-x-3">
                  <UserAvatar size="sm" />
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loopvibes-teal/50"
                    />
                    <div className="flex justify-end mt-2">
                      <Button 
                        type="submit" 
                        disabled={!newComment.trim()}
                        className="bg-loopvibes-teal hover:bg-loopvibes-teal/90"
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              
              {/* Comments List */}
              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3 animate-fade-in">
                      {comment.userAvatar ? (
                        <UserAvatar src={comment.userAvatar} alt={comment.username} size="sm" />
                      ) : (
                        <UserCircle size={32} className="text-gray-400" />
                      )}
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{comment.username}</h4>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-1">{comment.content}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <button className="text-xs text-gray-500 hover:text-loopvibes-teal">Like ({comment.likes})</button>
                          <button className="text-xs text-gray-500 hover:text-loopvibes-teal">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-6">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar - Related Videos */}
          <div>
            <h2 className="text-xl font-bold mb-4">Related Videos</h2>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <Link key={relatedVideo.id} to={`/video/${relatedVideo.id}`} className="block">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-40 h-24 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={relatedVideo.thumbnailSrc} 
                        alt={relatedVideo.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium mb-1 line-clamp-2">{relatedVideo.title}</h3>
                      <p className="text-sm text-gray-500">{relatedVideo.username}</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                        <span>{relatedVideo.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(relatedVideo.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideoDetail;

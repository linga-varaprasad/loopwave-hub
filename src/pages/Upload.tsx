
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UploadZone from '@/components/ui/UploadZone';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Set a default title based on the filename
    const fileName = file.name.split('.')[0];
    setVideoTitle(fileName.replace(/-|_/g, ' '));
  };
  
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a video file to upload",
        variant: "destructive"
      });
      return;
    }
    
    if (!videoTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your video",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate upload process
    setIsUploading(true);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate processing time
        setTimeout(() => {
          setIsUploading(false);
          
          toast({
            title: "Upload complete!",
            description: "Your video has been uploaded successfully",
          });
          
          // Redirect to the home page (in a real app, this would go to the new video)
          navigate('/');
        }, 1500);
      }
    }, 200);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Upload Your Loop</h1>
          
          <form onSubmit={handleUpload} className="space-y-8">
            {/* Upload Zone */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-medium mb-4">Select Video</h2>
              <UploadZone onFileSelect={handleFileSelect} />
            </div>
            
            {/* Video Details */}
            <div className={`bg-white rounded-lg shadow-sm border p-6 transition-opacity duration-300 ${selectedFile ? 'opacity-100' : 'opacity-50'}`}>
              <h2 className="text-xl font-medium mb-4">Video Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loopvibes-teal/50"
                    placeholder="Enter a title for your video"
                    maxLength={100}
                    disabled={!selectedFile}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {videoTitle.length}/100 characters
                  </p>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-loopvibes-teal/50"
                    placeholder="Describe your video (optional)"
                    rows={4}
                    maxLength={500}
                    disabled={!selectedFile}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {videoDescription.length}/500 characters
                  </p>
                </div>
              </div>
            </div>
            
            {/* Upload Progress (shown when uploading) */}
            {isUploading && (
              <div className="bg-white rounded-lg shadow-sm border p-6 animate-fade-in">
                <h2 className="text-xl font-medium mb-4">Uploading...</h2>
                
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-loopvibes-teal transition-all duration-500"
                    />
                  </div>
                  <p className="text-center text-gray-600">{uploadProgress}% complete</p>
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!selectedFile || !videoTitle.trim() || isUploading}
                className="bg-loopvibes-teal hover:bg-loopvibes-teal/90 px-8 py-2 text-white font-medium rounded-md"
              >
                {isUploading ? 'Uploading...' : 'Upload Video'}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;

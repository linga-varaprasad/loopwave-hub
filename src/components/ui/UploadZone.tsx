
import React, { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelect,
  accept = "video/mp4,video/quicktime,video/webm",
  maxSize = 100, // 100MB default
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    const fileType = file.type;
    const validTypes = accept.split(',');
    if (!validTypes.includes(fileType)) {
      setError(`Invalid file type. Allowed: ${accept}`);
      return false;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={accept}
        className="hidden"
      />
      
      {!selectedFile ? (
        <div
          className={cn(
            "upload-zone flex flex-col items-center justify-center p-10 text-center",
            isDragging && "dragging"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <Upload size={48} className="text-loopvibes-teal/70 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Drag and drop your video here
          </h3>
          <p className="text-gray-500 mb-4">
            or click to browse your files
          </p>
          <Button 
            variant="outline" 
            className="border-loopvibes-teal text-loopvibes-teal hover:bg-loopvibes-teal/10"
            onClick={(e) => {
              e.stopPropagation();
              triggerFileInput();
            }}
          >
            Select Video
          </Button>
          <p className="text-xs text-gray-400 mt-4">
            Supported formats: MP4, MOV, WebM (Max {maxSize}MB)
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-4 animate-fade-in">
          <div className="flex items-center">
            <FileText size={24} className="text-loopvibes-teal mr-3" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 truncate">{selectedFile.name}</h4>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-700"
              onClick={removeSelectedFile}
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-sm text-red-500 animate-slide-up">
          {error}
        </div>
      )}
    </div>
  );
};

export default UploadZone;

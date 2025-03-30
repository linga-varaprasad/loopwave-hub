
import React from 'react';
import { UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt = 'User Avatar',
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  };

  return (
    <div className={cn(
      "rounded-full overflow-hidden flex-shrink-0 bg-gray-100",
      sizeClasses[size],
      className
    )}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        <UserCircle 
          size={iconSizes[size]} 
          className="w-full h-full text-gray-400" 
        />
      )}
    </div>
  );
};

export default UserAvatar;

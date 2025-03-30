
import React from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showStatus?: boolean;
  statusPosition?: 'top-right' | 'bottom-right';
  statusColor?: 'green' | 'yellow' | 'red' | 'blue' | 'purple';
  statusBorderColor?: string;
  withRing?: boolean;
  ringColor?: string;
  animate?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt = 'User',
  size = 'md',
  className,
  showStatus = false,
  statusPosition = 'bottom-right',
  statusColor = 'green',
  statusBorderColor,
  withRing = false,
  ringColor,
  animate = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };
  
  const statusSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };
  
  const statusPositionClasses = {
    'top-right': 'top-0 right-0',
    'bottom-right': 'bottom-0 right-0',
  };
  
  const statusColorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };
  
  const AvatarWrapper = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3 },
    whileHover: { scale: 1.05 },
  } : {};

  return (
    <AvatarWrapper
      className={cn(
        'relative rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
        sizeClasses[size],
        className
      )}
      {...animationProps}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        <User className={cn(
          'text-gray-500 dark:text-gray-400',
          size === 'sm' && 'w-4 h-4',
          size === 'md' && 'w-5 h-5',
          size === 'lg' && 'w-7 h-7',
          size === 'xl' && 'w-10 h-10',
        )} />
      )}
      
      {withRing && (
        <div className={cn(
          'absolute inset-0 border-2 rounded-full',
          ringColor || 'border-loopvibes-teal dark:border-loopvibes-teal'
        )}></div>
      )}
      
      {showStatus && (
        <div 
          className={cn(
            'absolute rounded-full border-2',
            statusPositionClasses[statusPosition],
            statusSizeClasses[size],
            statusColorClasses[statusColor],
            statusBorderColor || 'border-white dark:border-gray-800'
          )}
        ></div>
      )}
    </AvatarWrapper>
  );
};

export default UserAvatar;

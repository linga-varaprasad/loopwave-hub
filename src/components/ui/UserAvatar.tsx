
import React from 'react';
import { UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  pulse?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt = 'User Avatar',
  size = 'md',
  className,
  pulse = false
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
    <motion.div 
      className={cn(
        "rounded-full overflow-hidden flex-shrink-0",
        pulse ? "ring-2 ring-offset-2 ring-offset-background" : "bg-gray-100 dark:bg-gray-800",
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      animate={pulse ? {
        boxShadow: ["0 0 0 0px rgba(56, 178, 172, 0.2)", "0 0 0 4px rgba(56, 178, 172, 0)"],
      } : {}}
      transition={pulse ? {
        repeat: Infinity,
        duration: 1.5,
        repeatType: "loop"
      } : {}}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        <UserCircle 
          size={iconSizes[size]} 
          className="w-full h-full text-gray-400 dark:text-gray-600" 
        />
      )}
    </motion.div>
  );
};

export default UserAvatar;

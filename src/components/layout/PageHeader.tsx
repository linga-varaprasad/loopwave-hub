
import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actions }) => {
  return (
    <motion.div 
      className="mb-8 py-6 border-b dark:border-gray-800"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && (
              <p className="mt-1 text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            {actions}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageHeader;

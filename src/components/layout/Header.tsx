
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Upload, Home, Compass, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/ui/UserAvatar';
import ThemeToggle from '@/components/ui/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle logout
  const handleLogout = () => {
    if (window.logoutUser) {
      window.logoutUser();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.span 
              className="text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-loopvibes-teal">Loop</span>
              <span className="text-loopvibes-coral">Vibes</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-loopvibes-teal/50 transition-all duration-300"
              />
            </div>
            
            <nav className="flex items-center space-x-6">
              <NavLink to="/" Icon={Home} label="Home" isActive={location.pathname === '/'} />
              <NavLink to="/explore" Icon={Compass} label="Explore" isActive={location.pathname === '/explore'} />
              <NavLink to="/upload" Icon={Upload} label="Upload" isActive={location.pathname === '/upload'} />
              <NavLink to="/profile" Icon={User} label="Profile" isActive={location.pathname === '/profile'} />
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 w-10 h-10">
                    <UserAvatar size="sm" animate showStatus />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Navigation Icon */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button className="p-2" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0 overflow-hidden"
        )}>
          <div className="container mx-auto px-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-loopvibes-teal/50"
              />
            </div>
            
            <nav className="flex flex-col space-y-4 pt-2">
              <MobileNavLink to="/" Icon={Home} label="Home" onClick={toggleMenu} isActive={location.pathname === '/'} />
              <MobileNavLink to="/explore" Icon={Compass} label="Explore" onClick={toggleMenu} isActive={location.pathname === '/explore'} />
              <MobileNavLink to="/upload" Icon={Upload} label="Upload" onClick={toggleMenu} isActive={location.pathname === '/upload'} />
              <MobileNavLink to="/profile" Icon={User} label="Profile" onClick={toggleMenu} isActive={location.pathname === '/profile'} />
            </nav>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={handleLogout}
                className="flex items-center p-2 w-full text-left text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
              >
                <LogOut size={20} className="mr-3" />
                <span className="text-base font-medium">Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Desktop Navigation Link
interface NavLinkProps {
  to: string;
  Icon: React.FC<{ size?: number | string }>;
  label: string;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, Icon, label, isActive }) => (
  <Link 
    to={to} 
    className={`flex items-center transition-colors duration-200 ${
      isActive 
        ? 'text-loopvibes-teal dark:text-loopvibes-teal' 
        : 'text-gray-600 dark:text-gray-400 hover:text-loopvibes-teal dark:hover:text-loopvibes-teal'
    }`}
  >
    <Icon size={20} />
    <span className="ml-1 text-sm font-medium">{label}</span>
  </Link>
);

// Mobile Navigation Link
interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, Icon, label, onClick, isActive }) => (
  <Link 
    to={to} 
    className={`flex items-center p-2 ${
      isActive 
        ? 'text-loopvibes-teal dark:text-loopvibes-teal bg-gray-50 dark:bg-gray-800' 
        : 'text-gray-600 dark:text-gray-400 hover:text-loopvibes-teal dark:hover:text-loopvibes-teal hover:bg-gray-50 dark:hover:bg-gray-800'
    } rounded-md transition-colors duration-200`}
    onClick={onClick}
  >
    <Icon size={20} />
    <span className="ml-2 text-base font-medium">{label}</span>
  </Link>
);

export default Header;

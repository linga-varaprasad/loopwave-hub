
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Upload, Home, Compass, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-loopvibes-teal">LoopVibes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-loopvibes-teal/50"
              />
            </div>
            
            <nav className="flex items-center space-x-6">
              <NavLink to="/" Icon={Home} label="Home" />
              <NavLink to="/explore" Icon={Compass} label="Explore" />
              <NavLink to="/upload" Icon={Upload} label="Upload" />
              <NavLink to="/profile" Icon={User} label="Profile" />
            </nav>
          </div>

          {/* Mobile Navigation Icon */}
          <button className="md:hidden p-2" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute left-0 right-0 bg-white border-b border-gray-200 shadow-md transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0 overflow-hidden"
        )}>
          <div className="container mx-auto px-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-loopvibes-teal/50"
              />
            </div>
            
            <nav className="flex flex-col space-y-4 pt-2">
              <MobileNavLink to="/" Icon={Home} label="Home" onClick={toggleMenu} />
              <MobileNavLink to="/explore" Icon={Compass} label="Explore" onClick={toggleMenu} />
              <MobileNavLink to="/upload" Icon={Upload} label="Upload" onClick={toggleMenu} />
              <MobileNavLink to="/profile" Icon={User} label="Profile" onClick={toggleMenu} />
            </nav>
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
}

const NavLink: React.FC<NavLinkProps> = ({ to, Icon, label }) => (
  <Link to={to} className="flex items-center text-gray-600 hover:text-loopvibes-teal transition-colors duration-200">
    <Icon size={20} />
    <span className="ml-1 text-sm font-medium">{label}</span>
  </Link>
);

// Mobile Navigation Link
interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, Icon, label, onClick }) => (
  <Link 
    to={to} 
    className="flex items-center p-2 text-gray-600 hover:text-loopvibes-teal hover:bg-gray-50 rounded-md transition-colors duration-200"
    onClick={onClick}
  >
    <Icon size={20} />
    <span className="ml-2 text-base font-medium">{label}</span>
  </Link>
);

export default Header;

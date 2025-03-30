
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-bold text-loopvibes-teal">LoopVibes</Link>
            <p className="mt-2 text-gray-600 text-sm">
              Share your looping moments with the world.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterLinkGroup title="Product">
              <FooterLink to="/explore">Explore</FooterLink>
              <FooterLink to="/trending">Trending</FooterLink>
              <FooterLink to="/featured">Featured</FooterLink>
            </FooterLinkGroup>
            
            <FooterLinkGroup title="Company">
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterLinkGroup>
            
            <FooterLinkGroup title="Legal">
              <FooterLink to="/terms">Terms</FooterLink>
              <FooterLink to="/privacy">Privacy</FooterLink>
              <FooterLink to="/copyright">Copyright</FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LoopVibes. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-gray-500 text-sm flex items-center">
              Made with <Heart size={14} className="mx-1 text-loopvibes-coral" /> for creators everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkGroupProps {
  title: string;
  children: React.ReactNode;
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
    <ul className="space-y-2">{children}</ul>
  </div>
);

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-600 text-sm hover:text-loopvibes-teal transition-colors duration-200">
      {children}
    </Link>
  </li>
);

export default Footer;

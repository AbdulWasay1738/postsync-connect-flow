
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-postsync-backgroundAlt py-12 mt-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Postsync" className="w-8 h-8" />
              <span className="font-inter font-semibold text-xl text-postsync-text">Postsync</span>
            </Link>
            <p className="mt-4 text-sm text-postsync-muted max-w-md">
              Modern social media management platform for seamless cross-platform publishing, 
              analytics, and team collaboration.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-postsync-muted hover:text-postsync-primary transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-postsync-muted hover:text-postsync-primary transition-colors">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-postsync-muted hover:text-postsync-primary transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-postsync-muted hover:text-postsync-primary transition-colors">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-inter text-sm font-semibold text-postsync-text">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-sm text-postsync-muted hover:text-postsync-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-postsync-muted hover:text-postsync-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-postsync-muted hover:text-postsync-primary transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-postsync-muted hover:text-postsync-primary transition-colors">
                  AI Features
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-inter text-sm font-semibold text-postsync-text">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-sm text-postsync-muted hover:text-postsync-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-postsync-muted hover:text-postsync-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-postsync-muted hover:text-postsync-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <a href="mailto:contact@postsync.io" className="text-sm text-postsync-muted hover:text-postsync-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-postsync-muted">
              © {currentYear} Postsync. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="#" className="text-xs text-postsync-muted hover:text-postsync-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-xs text-postsync-muted hover:text-postsync-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-xs text-postsync-muted hover:text-postsync-primary transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

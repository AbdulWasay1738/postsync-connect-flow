
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = isAuthenticated ? [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Calendar', path: '/calendar' },
    { title: 'Analytics', path: '/analytics' },
    { title: 'Create', path: '/create' },
    { title: 'Settings', path: '/settings' },
  ] : [
    { title: 'Features', path: '/#features' },
    { title: 'How It Works', path: '/#how-it-works' },
    { title: 'Pricing', path: '/pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <Container>
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Postsync" className="w-10 h-10" />
              <span className="font-inter font-semibold text-xl text-postsync-text">Postsync</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium font-ibm transition-colors',
                    isActive(link.path) 
                      ? 'text-postsync-primary bg-blue-50' 
                      : 'text-postsync-text hover:text-postsync-primary hover:bg-blue-50'
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4 ml-4">
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="text-postsync-muted hover:text-postsync-text"
                >
                  Log out
                </Button>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'block px-4 py-3 rounded-md text-base font-medium font-ibm transition-colors',
                  isActive(link.path)
                    ? 'text-postsync-primary bg-blue-50'
                    : 'text-postsync-text hover:text-postsync-primary hover:bg-blue-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4">
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start text-postsync-muted hover:text-postsync-text"
                >
                  Log out
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button asChild className="w-full justify-center">
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

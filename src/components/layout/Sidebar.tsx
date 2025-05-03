
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/components/ThemeProvider';
import { 
  LayoutDashboard, 
  CalendarDays, 
  BarChart3, 
  PlusCircle, 
  Settings, 
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = isAuthenticated ? [
    { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { title: 'Calendar', path: '/calendar', icon: <CalendarDays size={20} /> },
    { title: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
    { title: 'Create Post', path: '/create', icon: <PlusCircle size={20} /> },
    { title: 'AI Captions', path: '/ai-captions', icon: <Sparkles size={20} /> },
    { title: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ] : [];

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={cn(
        "sidebar transition-all duration-300 border-r bg-sidebar border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Logo section */}
        <div className={cn(
          "p-4 flex items-center border-b border-sidebar-border",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-postsync-primary to-postsync-secondary rounded-md p-1 flex items-center justify-center w-8 h-8">
                <span className="text-white font-bold">PS</span>
              </div>
              <span className="font-inter font-semibold text-xl text-sidebar-foreground">Postsync</span>
            </Link>
          )}
          {collapsed && (
            <div className="bg-gradient-to-r from-postsync-primary to-postsync-secondary rounded-md p-1 flex items-center justify-center w-8 h-8">
              <span className="text-white font-bold">PS</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        {/* Navigation links */}
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-md transition-colors",
                  collapsed ? "justify-center" : "space-x-3",
                  isActive(link.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <span className="text-current">{link.icon}</span>
                {!collapsed && <span>{link.title}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className={cn(
          "absolute bottom-0 w-full p-4 border-t border-sidebar-border",
          collapsed ? "flex justify-center" : ""
        )}>
          <div className={cn(
            "flex items-center",
            collapsed ? "flex-col space-y-4" : "justify-between w-full"
          )}>
            <Button 
              variant="ghost" 
              size={collapsed ? "icon" : "default"} 
              onClick={toggleTheme}
              className="text-sidebar-foreground"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              {!collapsed && <span className="ml-2">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>}
            </Button>
            
            {!collapsed && (
              <Button 
                variant="ghost" 
                size="default"
                onClick={logout}
                className="text-sidebar-foreground"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            )}
            
            {collapsed && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={logout}
                className="text-sidebar-foreground"
              >
                <LogOut size={18} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;

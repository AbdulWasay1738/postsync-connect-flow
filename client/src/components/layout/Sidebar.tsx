
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
  Moon,
  User,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  const { isAuthenticated, logout, user } = useAuth();
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
    { title: 'Competitor Analysis', path: '/competitor-analysis', icon: <Users size={20} /> },
    { title: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ] : [];

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={cn(
        "sidebar transition-all duration-300 border-r bg-sidebar border-sidebar-border relative z-10",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Logo section */}
        <div className={cn(
          "p-4 flex items-center border-b border-sidebar-border",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="PostSync Logo" className="h-9 w-9" />
              <span className="font-inter font-semibold text-lg">Postsync</span>
            </Link>
          )}
          {collapsed && (
            <img src="/logo.svg" alt="PostSync Logo" className="h-8 w-8" />
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
        <div className="py-4 flex-grow">
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

        {/* Theme toggle and User Profile */}
        <div className="absolute bottom-0 w-full border-t border-sidebar-border">
          {/* Theme toggle */}
          <div className={cn(
            "p-4",
            collapsed ? "flex justify-center" : ""
          )}>
            <Button 
              variant="ghost" 
              size={collapsed ? "icon" : "default"} 
              onClick={toggleTheme}
              className="text-sidebar-foreground w-full justify-start"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              {!collapsed && <span className="ml-2">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>}
            </Button>
          </div>
          
          {/* User details section */}
          <Separator />
          <div className={cn(
            "p-4",
            collapsed ? "flex justify-center" : ""
          )}>
            {!collapsed ? (
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" alt="User" />
                  <AvatarFallback>
                    <User size={18} />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground truncate">sarah@example.com</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={logout}
                  className="text-sidebar-foreground"
                  title="Logout"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80" alt="User" />
                  <AvatarFallback>
                    <User size={18} />
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={logout}
                  className="text-sidebar-foreground"
                  title="Logout"
                >
                  <LogOut size={16} />
                </Button>
              </div>
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

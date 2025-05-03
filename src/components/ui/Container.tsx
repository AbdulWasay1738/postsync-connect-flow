
import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  fullWidth = false
}) => {
  return (
    <div className={cn(
      'px-4 sm:px-6 w-full mx-auto',
      fullWidth ? 'max-w-full' : 'max-w-7xl',
      className
    )}>
      {children}
    </div>
  );
};

export default Container;

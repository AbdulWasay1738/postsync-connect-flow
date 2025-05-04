
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Container className="flex-1 flex flex-col items-center justify-center py-16">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <img src="/logo.svg" alt="Postsync" className="w-16 h-16 mx-auto" />
          </div>
          <h1 className="text-5xl font-bold font-inter mb-4 text-postsync-text">404</h1>
          <p className="text-xl mb-8 text-postsync-muted">
            Oops! The page you're looking for doesn't exist.
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full bg-postsync-primary hover:bg-blue-700">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;

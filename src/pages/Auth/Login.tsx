
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      await login(data.email, data.password);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-postsync-primary items-center justify-center p-8">
        <div className="max-w-md">
          <div className="text-white mb-8">
            <h2 className="text-3xl font-bold font-inter mb-4">Welcome back!</h2>
            <p className="text-white/80">
              Log in to access your dashboard, manage your social media posts, and track your performance.
            </p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNvY2lhbCUyMG1lZGlhfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
            alt="Social Media Management" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center md:hidden">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Postsync" className="w-10 h-10" />
              <span className="font-inter font-semibold text-xl text-postsync-text">Postsync</span>
            </Link>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-inter">Log in to Postsync</CardTitle>
              <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm mb-4">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", { 
                      required: "Email is required", 
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={errors.email ? "border-red-300" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-postsync-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", { 
                      required: "Password is required", 
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    className={errors.password ? "border-red-300" : ""}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="rememberMe"
                    {...register("rememberMe")}
                    className="h-4 w-4 rounded border-gray-300 text-postsync-primary focus:ring-postsync-primary" 
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-postsync-muted">
                    Remember me for 30 days
                  </Label>
                </div>
                
                <Button type="submit" className="w-full bg-postsync-primary hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-postsync-muted">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" disabled className="w-full">
                    {/* 🔌 BACKEND_HOOK: socialLogin('google') */}
                    Google
                  </Button>
                  <Button variant="outline" type="button" disabled className="w-full">
                    {/* 🔌 BACKEND_HOOK: socialLogin('facebook') */}
                    Facebook
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-postsync-muted">
                Don't have an account?{" "}
                <Link to="/signup" className="text-postsync-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-postsync-muted hover:text-postsync-text">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

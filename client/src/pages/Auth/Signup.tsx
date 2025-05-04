
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const Signup = () => {
  const { isAuthenticated, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authContext = useAuth();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>();
  const password = watch('password', '');
  
  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
  
    try {
      setError(null);
      setIsLoading(true);
      await signup(data.name, data.email, data.password); // ← calls backend
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-accent/5">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/3a811bac-42bd-406d-b2d9-32f2ab53de2c.png" alt="Postsync Logo" className="h-16" />
          </Link>
        </div>
        
        <Card className="border-border/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-inter">Create an account</CardTitle>
            <CardDescription>Sign up for your Postsync account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm mb-4">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  {...register("name", { 
                    required: "Name is required" 
                  })}
                  className={errors.name ? "border-red-300" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { 
                    required: "Password is required", 
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                  className={errors.password ? "border-red-300" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords don't match"
                  })}
                  className={errors.confirmPassword ? "border-red-300" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="agreeToTerms"
                  {...register("agreeToTerms", { required: true })}
                  className="h-4 w-4 mt-1 rounded border-gray-300 text-postsync-primary focus:ring-postsync-primary" 
                />
                <Label htmlFor="agreeToTerms" className="text-sm text-postsync-muted">
                  I agree to the <Link to="/terms" className="text-postsync-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-postsync-primary hover:underline">Privacy Policy</Link>
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">You must agree to the terms</p>
              )}
              
              <Button type="submit" className="w-full bg-postsync-primary hover:bg-postsync-secondary transition-colors" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-postsync-muted dark:bg-card">Or continue with</span>
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
              Already have an account?{" "}
              <Link to="/login" className="text-postsync-primary font-medium hover:underline">
                Log in
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
  );
};

export default Signup;

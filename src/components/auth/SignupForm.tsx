
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GraduationCap, Eye, EyeOff, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type UserRole = 'admin' | 'teacher' | 'student';

type PasswordRequirement = {
  regex: RegExp;
  label: string;
  met: boolean;
};

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirement[]>([
    { regex: /.{8,}/, label: 'At least 8 characters', met: false },
    { regex: /[A-Z]/, label: 'At least one uppercase letter', met: false },
    { regex: /[a-z]/, label: 'At least one lowercase letter', met: false },
    { regex: /[0-9]/, label: 'At least one number', met: false },
    { regex: /[^A-Za-z0-9]/, label: 'At least one special character', met: false },
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check password against requirements
    const updatedRequirements = passwordRequirements.map(req => ({
      ...req,
      met: req.regex.test(password)
    }));
    setPasswordRequirements(updatedRequirements);
  }, [password]);

  const allRequirementsMet = passwordRequirements.every(req => req.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    if (!allRequirementsMet) {
      toast({
        title: "Password requirements not met",
        description: "Please ensure your password meets all requirements",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created successfully",
        description: "Please check your email to confirm your account",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: `${window.location.origin}/dashboard`,
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: "Google sign up failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-black/50 border-orange-500/20">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <GraduationCap className="h-12 w-12 text-orange-500" />
        </div>
        <CardTitle className="text-2xl text-center text-white">Sign up for OccxLearn</CardTitle>
        <CardDescription className="text-center text-gray-400">
          Create an account to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role" className="text-gray-200">Register as</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as UserRole)}
            >
              <SelectTrigger className="bg-black/80 border-gray-700 text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-gray-700 text-white">
                <SelectItem value="student" className="hover:bg-orange-500/20">Student</SelectItem>
                <SelectItem value="teacher" className="hover:bg-orange-500/20">Teacher</SelectItem>
                <SelectItem value="admin" className="hover:bg-orange-500/20">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@school.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/80 border-gray-700 text-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="bg-black/80 border-gray-700 text-white"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            
            {(passwordFocused || password) && (
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-400 mb-1">Password requirements:</p>
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-xs">
                    {req.met ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-red-500" />
                    )}
                    <span className={req.met ? "text-green-500" : "text-gray-400"}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-200">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-black/80 border-gray-700 text-white"
                required
              />
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600" 
            disabled={isLoading || !allRequirementsMet || password !== confirmPassword}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full border-gray-700 text-white hover:bg-orange-500/10" 
          onClick={handleGoogleSignup}
          disabled={isLoading}
        >
          <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Sign up with Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </div>
        <p className="text-xs text-gray-500 text-center">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;

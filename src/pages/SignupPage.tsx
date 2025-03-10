
import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';
import { GraduationCap } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <header className="border-b bg-white py-4 px-4">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-orange-500">OccxLearn</span>
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          &copy; 2025 OccxLearn. All rights reserved. Developed by OCS
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;

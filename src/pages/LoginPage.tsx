
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { GraduationCap } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <header className="border-b bg-white py-4 px-4">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">OccxLear</span>
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} OccxLear. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;


import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { X } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <X className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-foreground">OccxLearn</span>
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border">
        <div className="container mx-auto">
          &copy; 2025 OccxLearn. All rights reserved. Developed by OCS
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;

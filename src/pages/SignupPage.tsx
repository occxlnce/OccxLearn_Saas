
import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';
import { X } from 'lucide-react';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="glassmorphism-nav py-4 px-4">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <X className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold text-white">OccxLearn</span>
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center p-4"
           style={{
             backgroundImage: "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15), transparent 70%)"
           }}>
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-gray-400 border-t border-white/10">
        <div className="container mx-auto">
          &copy; 2025 OccxLearn. All rights reserved. Developed by OCS
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;

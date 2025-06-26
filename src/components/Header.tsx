
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TalentMatch AI
              </h1>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <a href="#" className="text-gray-900 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors">
                About Us
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 px-2 py-1 text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
              Login
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-700 font-medium">
            Your Smart Career Matchmaker: Let AI Find the Perfect Fit
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;

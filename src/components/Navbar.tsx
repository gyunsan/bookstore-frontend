import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-serif text-2xl font-bold text-primary">
            Bookstore
          </Link>

          <div className="flex space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <BookOpen size={20} />
              <span>Books</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
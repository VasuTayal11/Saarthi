// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                Saarthi AI
              </h1>
              <p className="text-gray-600 text-sm">Your intelligent PDF companion with Hindi explanations</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full border border-primary-200">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-primary-700 font-semibold text-sm">AI Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
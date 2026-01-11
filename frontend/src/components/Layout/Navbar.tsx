import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full border-b border-charcoal-50 bg-charcoal-200/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">QR</span>
            </div>
            <h1 className="text-2xl font-bold text-white">QR Generator & Scanner</h1>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;

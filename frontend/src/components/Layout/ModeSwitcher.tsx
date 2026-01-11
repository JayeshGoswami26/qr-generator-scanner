import React from 'react';
import { motion } from 'framer-motion';
import { type AppMode } from '../../types';

interface ModeSwitcherProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, onModeChange }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-charcoal-200 p-1.5 rounded-xl border border-charcoal-50 inline-flex gap-2">
        <motion.button
          onClick={() => onModeChange('generate')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-8 py-3 rounded-lg font-semibold transition-colors ${
            mode === 'generate'
              ? 'text-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {mode === 'generate' && (
            <motion.div
              layoutId="activeMode"
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg shadow-lg"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">Generate QR</span>
        </motion.button>
        
        <motion.button
          onClick={() => onModeChange('scan')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-8 py-3 rounded-lg font-semibold transition-colors ${
            mode === 'scan'
              ? 'text-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {mode === 'scan' && (
            <motion.div
              layoutId="activeMode"
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg shadow-lg"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">Scan QR</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ModeSwitcher;

import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';

const ScannedDataView: React.FC = () => {
  const { scannedData, isValid, error, loading } = useSelector((state: RootState) => state.scan);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 bg-red-600/20 border border-red-600/50 rounded-xl text-red-400"
      >
        <h3 className="font-semibold mb-2">Error</h3>
        <p>{error}</p>
      </motion.div>
    );
  }

  if (!scannedData || !isValid) {
    return (
      <div className="text-center p-12 text-gray-500">
        <p>Scan a QR code to view its data</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold text-white mb-4">Scanned Data</h3>
      <div className="grid gap-3">
        {Object.entries(scannedData).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-charcoal-100 p-4 rounded-lg border border-charcoal-50 hover:border-indigo-500 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-indigo-400 font-medium text-sm uppercase tracking-wide min-w-[120px]">
                {key}:
              </span>
              <span className="text-white font-medium break-words">
                {value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ScannedDataView;

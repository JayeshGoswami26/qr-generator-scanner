import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { DownloadIcon } from '../../icons';

const QRDisplay: React.FC = () => {
  const { qrCode, data, loading } = useSelector((state: RootState) => state.qr);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!qrCode) {
    return null;
  }

  const handleDownload = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Use data from Redux state (already validated JSON)
  const jsonString = JSON.stringify(data);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center space-y-6"
    >
      <div className="bg-white p-6 rounded-2xl shadow-2xl">
        <QRCodeSVG
          value={jsonString}
          size={300}
          level="M"
          bgColor="#FFFFFF"
          fgColor="#000000"
        />
      </div>

      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
      >
        <DownloadIcon />
        Download QR Code
      </motion.button>

      <div className="mt-4 p-4 bg-charcoal-100 rounded-lg border border-charcoal-50 max-w-md">
        <p className="text-sm text-gray-400 mb-2">QR Code Data:</p>
        <pre className="text-xs text-gray-300 overflow-auto">
          {jsonString}
        </pre>
      </div>
    </motion.div>
  );
};

export default QRDisplay;

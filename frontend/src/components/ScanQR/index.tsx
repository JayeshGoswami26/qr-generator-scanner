import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CameraScanner from './CameraScanner';
import ImageUpload from './ImageUpload';
import ScannedDataView from './ScannedDataView';

type ScanMethod = 'camera' | 'upload';

const ScanQR: React.FC = () => {
  const [scanMethod, setScanMethod] = useState<ScanMethod>('camera');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Scan QR Code</h2>
        <p className="text-gray-400">Use your camera or upload an image to scan QR codes</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-charcoal-200 p-6 rounded-xl border border-charcoal-50 shadow-xl">
            <div className="flex gap-2 mb-4 bg-charcoal-100 p-1 rounded-lg">
              <button
                onClick={() => setScanMethod('camera')}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                  scanMethod === 'camera'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Camera
              </button>
              <button
                onClick={() => setScanMethod('upload')}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                  scanMethod === 'upload'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Upload Image
              </button>
            </div>

            {scanMethod === 'camera' ? <CameraScanner /> : <ImageUpload />}
          </div>
        </div>

        <div className="bg-charcoal-200 p-6 rounded-xl border border-charcoal-50 shadow-xl">
          <ScannedDataView />
        </div>
      </div>
    </motion.div>
  );
};

export default ScanQR;

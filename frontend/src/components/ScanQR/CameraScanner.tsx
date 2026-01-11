import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode/esm';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setScannedData, setError, setLoading } from '../../store/slices/scanSlice';
import { validateScannedData } from '../../services/api';
import { CameraIcon } from '../../icons';

const CameraScanner: React.FC = () => {
  const dispatch = useDispatch();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const startScanning = async () => {
    try {
      dispatch(setLoading(true));
      const html5QrCode = new Html5Qrcode('reader');
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          try {
            const result = await validateScannedData(decodedText);
            dispatch(setScannedData(result));
            stopScanning();
          } catch (error: any) {
            dispatch(setError(error.response?.data?.error || 'Failed to validate scanned data'));
            stopScanning();
          }
        },
        () => {
          // Ignore scanning errors (just keep scanning)
        }
      );

      setIsScanning(true);
      setHasPermission(true);
      dispatch(setLoading(false));
    } catch (error: any) {
      console.error('Error starting camera:', error);
      setHasPermission(false);
      dispatch(setLoading(false));
      dispatch(setError('Failed to access camera. Please ensure you have granted camera permissions.'));
    }
  };

  const stopScanning = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current?.clear();
          setIsScanning(false);
        })
        .catch((err) => {
          console.error('Error stopping scanner:', err);
        });
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="w-full">
      {!isScanning && hasPermission !== false && (
        <motion.button
          onClick={startScanning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <CameraIcon />
          Start Camera Scanner
        </motion.button>
      )}

      {isScanning && (
        <div className="space-y-4">
          <div id="reader" className="w-full bg-black rounded-lg overflow-hidden" style={{ minHeight: '300px' }}></div>
          <motion.button
            onClick={stopScanning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Stop Scanning
          </motion.button>
        </div>
      )}

      {hasPermission === false && (
        <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400">
          Camera permission denied. Please allow camera access and try again.
        </div>
      )}
    </div>
  );
};

export default CameraScanner;

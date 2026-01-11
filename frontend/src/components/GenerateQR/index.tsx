import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { type RootState } from '../../store/store';
import { generateQRCode } from '../../services/api';
import { setLoading, setQRCode, setError, resetQR } from '../../store/slices/qrSlice';
import KeyValueForm from './KeyValueForm';
import QRDisplay from './QRDisplay';

const GenerateQR: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, qrCode, error } = useSelector((state: RootState) => state.qr);

  const handleGenerate = async () => {
    // Validate that we have at least one key-value pair
    const hasValidData = Object.keys(data).some(key => key.trim() !== '' && data[key].trim() !== '');
    
    if (!hasValidData) {
      dispatch(setError('Please add at least one valid key-value pair'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(resetQR());

    try {
      const response = await generateQRCode(data);
      dispatch(setQRCode(response));
    } catch (error: any) {
      dispatch(setError(error.response?.data?.error || 'Failed to generate QR code'));
    }
  };

  const handleReset = () => {
    dispatch(resetQR());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Generate QR Code</h2>
        <p className="text-gray-400">Add key-value pairs to encode in your QR code</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-charcoal-200 p-6 rounded-xl border border-charcoal-50 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Data Input</h3>
            <KeyValueForm />
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={handleGenerate}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Generating...' : 'Generate QR Code'}
            </motion.button>
            
            {qrCode && (
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-charcoal-100 hover:bg-charcoal-50 text-gray-300 rounded-lg font-medium transition-colors border border-charcoal-50"
              >
                Reset
              </motion.button>
            )}
          </div>
        </div>

          <div className="bg-charcoal-200 p-6 rounded-xl border border-charcoal-50 shadow-xl flex items-center justify-center min-h-[400px]">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 w-full"
            >
              <h3 className="font-semibold mb-2">Error</h3>
              <p>{error}</p>
            </motion.div>
          )}
          {!error && <QRDisplay />}
        </div>
      </div>
    </motion.div>
  );
};

export default GenerateQR;

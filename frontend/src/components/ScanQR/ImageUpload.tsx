import React, { useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode/esm';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setScannedData, setError, setLoading } from '../../store/slices/scanSlice';
import { validateScannedData } from '../../services/api';
import { UploadIcon } from '../../icons';

const ImageUpload: React.FC = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileScan = async (file: File) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(''));

      const html5QrCode = new Html5Qrcode('upload-reader');

      const decodedText = await html5QrCode.scanFile(file, false);
      
      // Clean up the scanner instance
      await html5QrCode.clear();
      
      const result = await validateScannedData(decodedText);
      dispatch(setScannedData(result));
    } catch (error: any) {
      console.error('Error scanning file:', error);
      if (error.message?.includes('No QR code found')) {
        dispatch(setError('No QR code found in the image. Please try another image.'));
      } else {
        dispatch(setError(error.response?.data?.error || 'Failed to scan QR code from image'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileScan(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileScan(file);
    } else {
      dispatch(setError('Please upload a valid image file'));
    }
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-charcoal-50 bg-charcoal-100 hover:border-indigo-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon />
          <p className="mt-4 text-gray-300">
            <span className="text-indigo-400 font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </motion.div>
      </div>
      
      <div id="upload-reader" style={{ display: 'none' }}></div>
    </div>
  );
};

export default ImageUpload;

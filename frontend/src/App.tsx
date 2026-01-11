import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type AppMode } from './types';
import Navbar from './components/Layout/Navbar';
import ModeSwitcher from './components/Layout/ModeSwitcher';
import GenerateQR from './components/GenerateQR';
import ScanQR from './components/ScanQR';
import { useDispatch } from 'react-redux';
import { resetQR } from './store/slices/qrSlice';
import { resetScan } from './store/slices/scanSlice';

function App() {
  const [mode, setMode] = useState<AppMode>('generate');
  const dispatch = useDispatch();

  const handleModeChange = (newMode: AppMode) => {
    if (newMode !== mode) {
      // Reset both states when switching modes
      dispatch(resetQR());
      dispatch(resetScan());
      setMode(newMode);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal-900 via-charcoal-200 to-charcoal-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ModeSwitcher mode={mode} onModeChange={handleModeChange} />
        
        <AnimatePresence mode="wait">
          {mode === 'generate' ? (
            <motion.div
              key="generate"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <GenerateQR />
            </motion.div>
          ) : (
            <motion.div
              key="scan"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ScanQR />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;

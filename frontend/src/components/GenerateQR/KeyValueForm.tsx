import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { type RootState } from '../../store/store';
import { updateDataKey, removeDataKey } from '../../store/slices/qrSlice';
import { PlusIcon, TrashIcon } from '../../icons';

interface KeyValuePair {
  key: string;
  value: string;
}

const KeyValueForm: React.FC = () => {
  const dispatch = useDispatch();
  const qrData = useSelector((state: RootState) => state.qr.data);
  const [pairs, setPairs] = useState<KeyValuePair[]>(
    Object.keys(qrData).length > 0
      ? Object.entries(qrData).map(([key, value]) => ({ key, value }))
      : [{ key: '', value: '' }]
  );

  const handleAddPair = () => {
    setPairs([...pairs, { key: '', value: '' }]);
  };

  const handleRemovePair = (index: number) => {
    if (pairs.length > 1) {
      const updatedPairs = pairs.filter((_, i) => i !== index);
      setPairs(updatedPairs);
      if (pairs[index].key) {
        dispatch(removeDataKey(pairs[index].key));
      }
    }
  };

  const handleKeyChange = (index: number, newKey: string) => {
    const oldKey = pairs[index].key;
    const updatedPairs = [...pairs];
    updatedPairs[index].key = newKey;
    setPairs(updatedPairs);

    if (oldKey) {
      dispatch(removeDataKey(oldKey));
    }
    if (newKey && pairs[index].value) {
      dispatch(updateDataKey({ key: newKey, value: pairs[index].value }));
    }
  };

  const handleValueChange = (index: number, newValue: string) => {
    const updatedPairs = [...pairs];
    updatedPairs[index].value = newValue;
    setPairs(updatedPairs);

    if (pairs[index].key) {
      dispatch(updateDataKey({ key: pairs[index].key, value: newValue }));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <AnimatePresence>
          {pairs.map((pair, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex gap-3 items-start"
            >
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Key
                  </label>
                  <input
                    type="text"
                    value={pair.key}
                    onChange={(e) => handleKeyChange(index, e.target.value)}
                    placeholder="e.g., name"
                    className="w-full px-4 py-2 bg-charcoal-100 border border-charcoal-50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={pair.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    placeholder="e.g., marble stone"
                    className="w-full px-4 py-2 bg-charcoal-100 border border-charcoal-50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              {pairs.length > 1 && (
                <button
                  onClick={() => handleRemovePair(index)}
                  className="mt-7 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                  title="Remove"
                >
                  <TrashIcon />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={handleAddPair}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        <PlusIcon />
        Add Key-Value Pair
      </motion.button>
    </div>
  );
};

export default KeyValueForm;

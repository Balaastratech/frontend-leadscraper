import React from "react";
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiAlertCircle, FiInfo, FiRotateCcw } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { clearToast } from '../../store/uiSlice';

export const ToastContainer = () => {
  const toast = useSelector(state => state.ui.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch(clearToast()), toast.duration || 5000);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;

  const icons = {
    success: <FiCheck className="text-green-500 mt-0.5" />,
    error: <FiX className="text-red-500 mt-0.5" />,
    warning: <FiAlertCircle className="text-yellow-500 mt-0.5" />,
    info: <FiInfo className="text-blue-500 mt-0.5" />,
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 right-4 z-50 min-w-[300px] max-w-[400px]"
      >
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-start gap-3">
          <div className="flex-shrink-0">{icons[toast.type] || icons.info}</div>
          <div className="flex-1 text-sm text-gray-800">{toast.message}</div>
          
          {toast.undoCallback && (
            <button
              onClick={() => {
                toast.undoCallback();
                dispatch(clearToast());
              }}
              className="flex-shrink-0 text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
            >
              <FiRotateCcw size={14} /> Undo
            </button>
          )}
          
          <button
            onClick={() => dispatch(clearToast())}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <FiX size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
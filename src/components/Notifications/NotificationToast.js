import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const icons = {
  success: <FaCheckCircle className="w-6 h-6 text-green-500" />,
  error: <FaTimesCircle className="w-6 h-6 text-red-500" />,
  warning: <FaExclamationCircle className="w-6 h-6 text-yellow-500" />,
  info: <FaInfoCircle className="w-6 h-6 text-blue-500" />
};

const bgColors = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200'
};

const buttonColors = {
  success: 'text-green-600 hover:bg-green-100',
  error: 'text-red-600 hover:bg-red-100',
  warning: 'text-yellow-600 hover:bg-yellow-100',
  info: 'text-blue-600 hover:bg-blue-100'
};

const NotificationToast = ({ notification, onClose }) => {
  const handleActionClick = (action) => {
    action.onClick();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 max-w-md p-4 rounded-lg shadow-lg border ${bgColors[notification.type]} z-50`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {icons[notification.type]}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
          <p className="text-gray-600 mt-1">{notification.message}</p>
          
          {notification.actions && (
            <div className="flex gap-2 mt-3">
              {notification.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleActionClick(action)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${buttonColors[notification.type]}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {!notification.actions && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimesCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationToast; 
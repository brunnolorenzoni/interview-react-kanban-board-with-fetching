import { toast, ToastOptions } from 'react-toastify';

export default function useNotifications(toastId: string) {
  const handleToast = (message: string, options: ToastOptions): void => {
    toast(message, {
      toastId,
      ...options,
    });
  };

  const success = (message: string, options: ToastOptions = {}) => {
    handleToast(message, {
      type: 'success',
      ...options,
    });
  };

  const error = (message: string, options: ToastOptions = {}) => {
    handleToast(message, {
      type: 'error',
      ...options,
    });
  };

  const warn = (message: string, options: ToastOptions = {}) => {
    handleToast(message, {
      type: 'warning',
      ...options,
    });
  };

  const info = (message: string, options: ToastOptions = {}) => {
    handleToast(message, {
      type: 'info',
      ...options,
    });
  };

  return { toast, success, error, warn, info };
}

import { toast, ToastOptions } from "react-toastify";

type ToastId = string | undefined;

export default function useNotifications(toastId: ToastId) {
  const handleToast = (message: string, options: ToastOptions): void => {
    toast(message, {
      toastId: toastId,
      ...options,
    });
  };

  const success = (message: string, options: ToastOptions = {}) => {
    handleToast(message, {
      type: "success",
      ...options,
    });
  };

  const error = (message: string, options: ToastOptions = {}) => {
    handleToast(message, {
      type: "error",
      ...options,
    });
  };

  const warn = (message: string, options: ToastOptions = {}) => {
    handleToast(message, {
      type: "warning",
      ...options,
    });
  };

  const info = (message: string, options: ToastOptions = {}) => {
    handleToast(message, {
      type: "info",
      ...options,
    });
  };

  const close = (toastId: ToastId) => {
    toast.dismiss(toastId);
  };

  return { toast, success, error, warn, info, close };
}

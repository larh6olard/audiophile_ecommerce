import { useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

const Alert = ({ message, onClose, duration = 3000 }: ToastProps) => {

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-60 flex justify-center px-4 sm:top-8">
      <div
        role="alert"
        aria-live="assertive"
        className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-lg bg-black px-4 py-3 text-white shadow-xl sm:max-w-md sm:px-5 sm:py-4"
      >
        <ShoppingCart className="h-5 w-5 shrink-0 text-[#D87D4A]" />

        <p className="flex-1 text-sm font-medium">{message}</p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 cursor-pointer text-gray-400 transition-colors hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Alert;

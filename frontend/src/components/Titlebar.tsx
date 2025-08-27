import { useEffect, useState } from "react";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";

declare global {
  interface Window {
    api: {
      minimize: () => void;
      close: () => void;
      maximize: () => void;
      unmaximize: () => void;
      checkMaximized: () => void;
      onMaximizedStatus: (callback: (status: boolean) => void) => void;
    };
  }
}

const Titlebar = () => {
  const [isMax, setIsMax] = useState(false);

  useEffect(() => {
    // Ask for initial window state
    window.api.checkMaximized();

    // Subscribe to maximize/unmaximize updates
    window.api.onMaximizedStatus((status) => setIsMax(status));
  }, []);

  return (
    <div className="titlebar bg-neutral-600 text-white fixed top-0 left-0 right-0 flex items-center justify-between p-1">
      <span className="font-mono font-bold">LockIn</span>
      <div
        className="flex justify-center items-center gap-3 px-2"
        style={{ marginLeft: "auto" }}
      >
        {/* Minimize */}
        <button
          className="bg-green-400 text-slate-700 flex justify-center items-center rounded-full p-[2px]"
          onClick={() => window.api.minimize()}
        >
          <Minus size={14} />
        </button>

        {/* Maximize / Restore toggle */}
        {isMax ? (
          <button
            className="bg-green-400 text-slate-700 flex justify-center items-center rounded-full p-[2px]"
            onClick={() => window.api.unmaximize()}
          >
            <Minimize2 size={14} />
          </button>
        ) : (
          <button
            className="bg-green-400 text-slate-700 flex justify-center items-center rounded-full p-[2px]"
            onClick={() => window.api.maximize()}
          >
            <Maximize2 size={14} />
          </button>
        )}

        {/* Close */}
        <button
          className="bg-red-500 text-white flex justify-center items-center rounded-full h-fit"
          onClick={() => window.api.close()}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Titlebar;

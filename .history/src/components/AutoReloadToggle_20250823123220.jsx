import { useEffect, useRef, useState } from "react";

const AutoReloadToggle = ({ intervalSec = 30, className = "" }) => {
  const [enabled, setEnabled] = useState(
    () => localStorage.getItem("autoReload") === "1"
  );
  const intervalRef = useRef(null);

  useEffect(() => {
    // start or stop interval when enabled changes
    if (enabled) {
      localStorage.setItem("autoReload", "1");
      // clear existing just in case
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        // full reload
        window.location.reload();
      }, intervalSec * 1000);
    } else {
      localStorage.removeItem("autoReload");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, intervalSec]);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "autoReload") {
        setEnabled(e.newValue === "1");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <button
      onClick={() => setEnabled((v) => !v)}
      className={`${className} text-sm px-2 py-1 rounded-md border border-gray-700 hover:bg-zinc-800 transition-colors duration-150`}
      title={`Auto reload every ${intervalSec}s`}
    >
      {enabled ? "Auto Reload: On" : "Auto Reload: Off"}
    </button>
  );
};

export default AutoReloadToggle;

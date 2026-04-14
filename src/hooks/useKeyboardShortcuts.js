import { useEffect } from "react";

export const useKeyboardShortcuts = ({ onToggleTheme, inputRef }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K → focus input
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef?.current?.focus();
      }

      // Ctrl/Cmd + Shift + L → toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "L") {
        e.preventDefault();
        onToggleTheme?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggleTheme, inputRef]);
};

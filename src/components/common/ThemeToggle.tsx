import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeToggleProps {
  variant?: 'dropdown' | 'compact' | 'pill';
  className?: string;
  id?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'dropdown',
  className = '',
  id = 'theme-toggle-btn',
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center opacity-70 ${className}`}
        aria-hidden="true"
      >
        <span className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  if (variant === 'compact') {
    return (
      <button
        id={id}
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={`relative p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 transition-all duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Current: ${theme === 'system' ? 'System' : isDark ? 'Dark' : 'Light'}. Click to toggle.`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Moon className="w-4 h-4 text-cyan-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Sun className="w-4 h-4 text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 shadow-xs ${className}`}
        role="group"
        aria-label="Theme selection"
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
            theme === 'light'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-pressed={theme === 'light'}
        >
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
            theme === 'dark'
              ? 'bg-slate-800 text-white shadow-xs font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-pressed={theme === 'dark'}
        >
          <Moon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Dark</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('system')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
            theme === 'system'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-pressed={theme === 'system'}
        >
          <Laptop className="w-3.5 h-3.5 text-blue-500" />
          <span>System</span>
        </button>
      </div>
    );
  }

  // Default: Radix UI Dropdown Menu with full accessibility
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          id={id}
          type="button"
          className={`relative flex items-center justify-center w-9 h-9 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100/90 hover:bg-slate-200/90 dark:bg-surface-elevated/90 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all duration-200 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer active:scale-95 ${className}`}
          aria-label="Toggle Theme"
          title={`Theme: ${theme || 'system'}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="dark-icon"
                initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Moon className="w-4 h-4 text-cyan-400" />
              </motion.div>
            ) : (
              <motion.div
                key="light-icon"
                initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Sun className="w-4 h-4 text-amber-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-[150px] p-1.5 rounded-xl bg-white dark:bg-[#111726] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-xl animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <DropdownMenu.Label className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400">
            Theme Preference
          </DropdownMenu.Label>

          <DropdownMenu.Item
            onClick={() => setTheme('light')}
            className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg cursor-pointer transition-colors outline-none select-none ${
              theme === 'light'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light (Snow)</span>
            </div>
            {theme === 'light' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => setTheme('dark')}
            className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg cursor-pointer transition-colors outline-none select-none ${
              theme === 'dark'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dark (Deep)</span>
            </div>
            {theme === 'dark' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => setTheme('system')}
            className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg cursor-pointer transition-colors outline-none select-none ${
              theme === 'system'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-blue-500" />
              <span>System Default</span>
            </div>
            {theme === 'system' && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

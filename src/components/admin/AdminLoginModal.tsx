import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Shield, KeyRound, Mail, X, Loader2, Lock } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, loginAdmin } = usePortfolio();
  
  const [email, setEmail] = useState('soth.vannakrothchansokhomal@gmail.com');
  const [pin, setPin] = useState('admin123');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await loginAdmin(email, pin);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#0e1422] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400 mb-3 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Admin Portal</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in to manage projects, review inquiries, and update portfolio settings.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-surface-elevated border border-slate-200 dark:border-white/10 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none transition-colors font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Security PIN / Passcode</span>
            </label>
            <input
              type="password"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-slate-50 dark:bg-surface-elevated border border-slate-200 dark:border-white/10 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none transition-colors font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md shadow-blue-600/25 transition-all mt-4 cursor-pointer active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                <span>Unlock Admin Dashboard</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

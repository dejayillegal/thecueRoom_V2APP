'use client';

import { useEffect, useState } from 'react';
import { signInSchema, signUpSchema, forgotPasswordSchema, type SignInForm, type SignUpForm, type ForgotPasswordForm } from '@/lib/schemas';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type TabType = 'signin' | 'signup' | 'forgot';

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
      setActiveTab('signin');
    }
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  const validateForm = () => {
    try {
      setErrors({});

      if (activeTab === 'signin') {
        signInSchema.parse({ email, password });
      } else if (activeTab === 'signup') {
        signUpSchema.parse({ email, password, confirmPassword });
      } else if (activeTab === 'forgot') {
        forgotPasswordSchema.parse({ email });
      }

      return true;
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (activeTab === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Handle successful sign in
        onClose();
      } else if (activeTab === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // Handle successful sign up
        alert('Please check your email for verification link');
        onClose();
      } else if (activeTab === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        alert('Password reset email sent');
        onClose();
      }
    } catch (error: any) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLink = async () => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Magic link sent to your email');
      onClose();
    } catch (error: any) {
      setErrors({ general: error.message });
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (error: any) {
      setErrors({ general: error.message });
    }
  };

  const handleAppleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'apple' });
      if (error) throw error;
    } catch (error: any) {
      setErrors({ general: error.message });
    }
  };

  const handleSignIn = async (data: SignInForm) => {
    try {
      setErrors({});
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      if (authData.user) {
        onClose();
        window.location.reload(); // Refresh to update auth state
      }
    } catch (error: any) {
      setErrors({ general: error.message });
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-4xl rounded-lg border border-neutral-800 bg-neutral-950 shadow-2xl">
        <div className="grid gap-0 md:grid-cols-2">
          {/* Form Section */}
          <div className="p-8">
            <h2 id="auth-modal-title" className="sr-only">Authentication</h2>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('signin')}
                className={`rounded px-3 py-1.5 text-sm font-bold transition-colors ${
                  activeTab === 'signin'
                    ? 'bg-[#D1FF3D] text-black'
                    : 'border border-neutral-700 text-neutral-200 hover:border-neutral-600'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className={`rounded px-3 py-1.5 text-sm transition-colors ${
                  activeTab === 'signup'
                    ? 'bg-[#D1FF3D] text-black font-bold'
                    : 'border border-neutral-700 text-neutral-200 hover:border-neutral-600'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('forgot')}
                className={`rounded px-3 py-1.5 text-sm transition-colors ${
                  activeTab === 'forgot'
                    ? 'bg-[#D1FF3D] text-black font-bold'
                    : 'border border-neutral-700 text-neutral-200 hover:border-neutral-600'
                }`}
              >
                Forgot
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="rounded border border-red-600 bg-red-950/50 p-3 text-sm text-red-300">
                  {errors.general}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded border bg-neutral-900 p-3 text-white placeholder-neutral-500 focus:border-lime-300 focus:outline-none focus:ring-1 focus:ring-lime-300 ${
                    errors.email ? 'border-red-500' : 'border-neutral-700'
                  }`}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              {activeTab !== 'forgot' && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full rounded border bg-neutral-900 p-3 text-white placeholder-neutral-500 focus:border-lime-300 focus:outline-none focus:ring-1 focus:ring-lime-300 ${
                      errors.password ? 'border-red-500' : 'border-neutral-700'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                </div>
              )}

              {activeTab === 'signup' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full rounded border bg-neutral-900 p-3 text-white placeholder-neutral-500 focus:border-lime-300 focus:outline-none focus:ring-1 focus:ring-lime-300 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-neutral-700'
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                </div>
              )}

              {activeTab === 'signin' && (
                <div className="text-sm text-neutral-400">
                  Use a strong password.{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-lime-300 hover:text-lime-200 underline"
                  >
                    Forgot Password
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded bg-[#D1FF3D] px-6 py-2 font-semibold text-black hover:bg-[#C2D629] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Loading...' : 'Continue'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded border border-neutral-700 px-6 py-2 text-neutral-200 hover:border-neutral-600 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {/* Alternative Auth Methods */}
              <div className="border-t border-neutral-800 pt-6">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">
                  OR CONTINUE WITH
                </p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleEmailLink}
                    className="w-full rounded border border-neutral-700 px-4 py-3 text-left text-sm text-neutral-200 hover:border-neutral-600 hover:bg-neutral-900 transition-colors flex items-center gap-3"
                  >
                    <span className="text-neutral-400">✉</span>
                    Continue with Email Link
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="w-full rounded border border-neutral-700 px-4 py-3 text-left text-sm text-neutral-200 hover:border-neutral-600 hover:bg-neutral-900 transition-colors flex items-center gap-3"
                  >
                    <span className="text-neutral-400">G</span>
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    onClick={handleAppleAuth}
                    className="w-full rounded border border-neutral-700 px-4 py-3 text-left text-sm text-neutral-200 hover:border-neutral-600 hover:bg-neutral-900 transition-colors flex items-center gap-3"
                  >
                    <span className="text-neutral-400">🍎</span>
                    Continue with Apple
                  </button>
                </div>

                <div className="mt-4 p-3 rounded border border-neutral-800 bg-neutral-900/30 text-sm text-neutral-400 flex items-center gap-2">
                  <span className="text-neutral-500">●</span>
                  Popup closed is a silent no-op.
                </div>
              </div>
            </form>
          </div>

          {/* Info Section */}
          <div className="border-l border-neutral-800 bg-neutral-900/30 p-8">
            <h3 className="font-bold text-white mb-4">Welcome to thecueRoom</h3>
            <div className="space-y-3 text-sm text-neutral-300">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></span>
                <span>Invite-first platform. Approved members get access to the gated dashboard.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></span>
                <span>Reduced motion respected.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></span>
                <span>WCAG AA contrast on dark.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></span>
                <span>Scam-free, AI-verified community.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></span>
                <span>Access: Cover Art, Memes, News, Gigs.</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-800 text-xs text-neutral-400">
              By continuing you agree to our Terms and Privacy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
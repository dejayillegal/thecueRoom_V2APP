'use client';

import { useEffect, useState } from 'react';
import { codeVerificationSchema, type CodeVerificationForm } from '@/lib/schemas';

interface CodeModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  onVerifySuccess: () => void;
}

export default function CodeModal({ open, onClose, email, onVerifySuccess }: CodeModalProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      setCode('');
      setErrors({});
      setCountdown(120);
      setCanResend(false);
    }
  }, [open]);

  // Countdown timer
  useEffect(() => {
    if (!open || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open, countdown]);

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

  const formatCountdown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const validateForm = () => {
    try {
      setErrors({});
      codeVerificationSchema.parse({ code });
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
      // Simulate code verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock verification logic
      if (code === '123456') {
        onVerifySuccess();
        onClose();
      } else {
        setErrors({ code: 'Invalid verification code' });
      }
    } catch (error: any) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      // Simulate resending code
      await new Promise(resolve => setTimeout(resolve, 500));
      setCountdown(120);
      setCanResend(false);
      alert('New verification code sent');
    } catch (error: any) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUseBackupCode = () => {
    alert('Backup code functionality not implemented');
  };

  const handleSendSMS = () => {
    alert('SMS functionality not implemented');
  };

  const handleUseDifferentAccount = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <div 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="code-modal-title"
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-4xl rounded-lg border border-neutral-800 bg-neutral-950 shadow-2xl">
        <div className="grid gap-0 md:grid-cols-2">
          {/* Form Section */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                className="rounded bg-lime-300 px-3 py-1.5 text-sm font-bold text-black"
              >
                Code
              </button>
              <button
                type="button"
                onClick={handleUseDifferentAccount}
                className="rounded border border-neutral-700 px-3 py-1.5 text-sm text-neutral-200 hover:border-neutral-600 transition-colors"
              >
                Backup
              </button>
            </div>

            <h2 id="code-modal-title" className="text-xl font-bold text-white mb-2">
              Verify Your Identity
            </h2>
            <p className="text-sm text-neutral-400 mb-6">
              We sent a 6-digit code to your email. Enter it below to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="rounded border border-red-600 bg-red-950/50 p-3 text-sm text-red-300">
                  {errors.general}
                </div>
              )}

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-neutral-300 mb-1">
                  6-digit code
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`w-full rounded border bg-neutral-900 p-3 text-white text-center text-lg font-mono tracking-widest placeholder-neutral-500 focus:border-lime-300 focus:outline-none focus:ring-1 focus:ring-lime-300 ${
                    errors.code ? 'border-red-500' : 'border-neutral-700'
                  }`}
                  placeholder="000000"
                  maxLength={6}
                  required
                />
                {errors.code && <p className="mt-1 text-sm text-red-400">{errors.code}</p>}
              </div>

              <div className="flex items-center gap-4 text-sm text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-neutral-600 rounded-full"></span>
                  <span>{formatCountdown(countdown)}</span>
                </div>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="text-lime-300 hover:text-lime-200 underline disabled:opacity-50"
                  >
                    Resend
                  </button>
                ) : (
                  <span>Didn&apos;t get it?</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="rounded bg-lime-300 px-6 py-2 font-semibold text-black hover:bg-lime-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
                <button
                  type="button"
                  onClick={handleUseDifferentAccount}
                  className="rounded border border-neutral-700 px-6 py-2 text-neutral-200 hover:border-neutral-600 transition-colors"
                >
                  Use Different Account
                </button>
              </div>

              {/* Other Options */}
              <div className="border-t border-neutral-800 pt-6">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">
                  OTHER OPTIONS
                </p>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleUseBackupCode}
                    className="w-full rounded border border-neutral-700 px-4 py-3 text-left text-sm text-neutral-200 hover:border-neutral-600 hover:bg-neutral-900 transition-colors flex items-center gap-3"
                  >
                    <span className="text-neutral-400">🔑</span>
                    Use backup code
                  </button>
                  <button
                    type="button"
                    onClick={handleSendSMS}
                    className="w-full rounded border border-neutral-700 px-4 py-3 text-left text-sm text-neutral-200 hover:border-neutral-600 hover:bg-neutral-900 transition-colors flex items-center gap-3"
                  >
                    <span className="text-neutral-400">📱</span>
                    Send SMS
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-neutral-400">
                  For security, codes expire after 10 minutes.
                </div>
              </div>
            </form>
          </div>

          {/* Info Section */}
          <div className="border-l border-neutral-800 bg-neutral-900/30 p-8">
            <h3 className="font-bold text-white mb-4">Security Check</h3>
            <div className="space-y-3 text-sm text-neutral-300">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></span>
                <span>Two-step verification keeps the community scam-free and invites protected.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></span>
                <span>Codes are single-use and device bound.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></span>
                <span>We never ask for your password in messages.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 bg-lime-300 rounded-full mt-2 flex-shrink-0"></span>
                <span>Trouble? Contact support@thecueroom.io</span>
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
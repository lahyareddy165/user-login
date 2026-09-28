import React, { useState } from 'react';
import { X, KeyRound, CheckCircle2, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { StudentAccount } from '../../types/student';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentAccount[];
  onPasswordResetSuccess: (username: string, newPass: string) => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  students,
  onPasswordResetSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [identifier, setIdentifier] = useState('');
  const [matchedStudent, setMatchedStudent] = useState<StudentAccount | null>(null);
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cleanId = identifier.trim().toLowerCase();
    const found = students.find((s) => {
      const u = s.username.toLowerCase();
      const sid = s.studentId.toLowerCase();
      const em = s.email.toLowerCase();
      const fn = s.fullName.toLowerCase();
      return (
        cleanId === u ||
        cleanId === sid ||
        cleanId === em ||
        cleanId === fn ||
        cleanId === fn.split(' ')[0] ||
        cleanId === u.replace('.', '') ||
        cleanId === u.split('.')[0] ||
        sid.includes(cleanId)
      );
    });

    if (found) {
      setMatchedStudent(found);
      const testCode = '742918';
      setGeneratedCode(testCode);
      setStep(2);
    } else {
      setError('No student account found with this ID or email. Try "elena.vance", "marcus.chen", or "STU-2024-8842".');
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cleanCode = code.trim();
    if (cleanCode === generatedCode || cleanCode === '123456' || /^\d{6}$/.test(cleanCode)) {
      setStep(3);
    } else {
      setError('Invalid security code. Please check the code sent to your academic email or click "Autofill Code".');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (matchedStudent) {
      onPasswordResetSuccess(matchedStudent.username, newPassword);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        setIdentifier('');
        setCode('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      }, 1800);
    }
  };

  const handleModalClose = () => {
    setStep(1);
    setIdentifier('');
    setCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 text-slate-100">
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-800/60 text-sky-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Reset Student Password</h3>
            <p className="text-xs text-slate-400">Academic identity verification</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 text-xs bg-rose-950/50 border border-rose-800 text-rose-300 rounded-lg">
            {error}
          </div>
        )}

        {isSuccess ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-semibold text-white">Password Updated!</h4>
            <p className="text-xs text-slate-300">
              Your password has been successfully reset. You can now log in immediately.
            </p>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleLookup} className="space-y-4">
            <p className="text-xs text-slate-300">
              Enter your Student ID (e.g. <span className="font-mono text-sky-300">STU-2024-8842</span>), institutional username (<span className="font-mono text-sky-300">elena.vance</span>), or university email.
            </p>

            <div>
              <label htmlFor="student-id-input" className="block text-xs font-medium text-slate-300 mb-1.5">
                Student ID or University Email
              </label>
              <input
                id="student-id-input"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. elena.vance or STU-2024-8842"
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIdentifier('elena.vance')}
                className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
              >
                Fill Elena's ID
              </button>
              <button
                type="button"
                onClick={() => setIdentifier('marcus.chen')}
                className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
              >
                Fill Marcus's ID
              </button>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="p-3 bg-slate-800/60 border border-slate-700 rounded-lg flex items-start gap-3">
              <Mail className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
              <div className="text-xs">
                <span className="text-slate-400">Security code dispatched to: </span>
                <span className="text-white font-medium">{matchedStudent?.email}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="security-code-input" className="text-xs font-medium text-slate-300">
                  Enter 6-Digit Security Code
                </label>
                <button
                  type="button"
                  onClick={() => setCode(generatedCode)}
                  className="text-[11px] text-sky-400 hover:underline"
                >
                  Autofill Code ({generatedCode})
                </button>
              </div>
              <input
                id="security-code-input"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6-digit code"
                maxLength={6}
                className="w-full px-3.5 py-2.5 font-mono text-center tracking-widest text-lg bg-slate-800/80 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500"
                required
              />
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Verify Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Identity confirmed for {matchedStudent?.fullName}</span>
            </div>

            <div>
              <label htmlFor="new-password-input" className="block text-xs font-medium text-slate-300 mb-1.5">
                Create New Password
              </label>
              <input
                id="new-password-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                required
              />
            </div>

            <div>
              <label htmlFor="confirm-password-input" className="block text-xs font-medium text-slate-300 mb-1.5">
                Confirm New Password
              </label>
              <input
                id="confirm-password-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                required
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
              >
                Save New Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

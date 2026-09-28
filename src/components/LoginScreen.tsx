import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  GraduationCap, 
  Sparkles, 
  Building, 
  AlertCircle,
  PhoneCall,
  Check
} from 'lucide-react';
import { StudentAccount } from '../types/student';
import campusImg from '../assets/images/university_campus_library_1790582074302.jpg';

interface LoginScreenProps {
  students: StudentAccount[];
  onLoginSuccess: (student: StudentAccount) => void;
  onOpenForgotPassword: () => void;
  onOpenActivateAccount: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  students,
  onLoginSuccess,
  onOpenForgotPassword,
  onOpenActivateAccount,
}) => {
  const [username, setUsername] = useState(
    () => localStorage.getItem('oakridge_saved_username') || 'elena.vance'
  );
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [activePreset, setActivePreset] = useState<string>('elena.vance');

  const handlePresetSelect = (stu: StudentAccount) => {
    setUsername(stu.username);
    setPassword(stu.password);
    setActivePreset(stu.username);
    setErrorMessage('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanUser = username.trim().toLowerCase();
      const matched = students.find(
        (s) =>
          (s.username.toLowerCase() === cleanUser ||
           s.studentId.toLowerCase() === cleanUser ||
           s.email.toLowerCase() === cleanUser) &&
          s.password === password
      );

      if (matched) {
        if (rememberMe) {
          localStorage.setItem('oakridge_saved_username', cleanUser);
        } else {
          localStorage.removeItem('oakridge_saved_username');
        }
        onLoginSuccess(matched);
      } else {
        setErrorMessage(
          'Invalid student credentials. Please verify your Student ID/Username and password, or use a quick demo account above.'
        );
      }
    }, 650);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        
        {/* Left Collegiate Brand & Campus Showcase (5 cols on lg) */}
        <div className="relative lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between overflow-hidden bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Campus photo backdrop with dark contrast scrim */}
          <div className="absolute inset-0 z-0">
            <img
              src={campusImg}
              alt="Oakridge University Campus Library"
              className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60" />
          </div>

          {/* Top Brand Header */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-indigo-600/30">
                OU
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
                  Oakridge University
                </h1>
                <p className="text-[11px] font-mono text-indigo-300">ESTABLISHED 1884</p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Official Student Portal
              </p>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                Portal Access & Academic Workspace
              </p>
            </div>
          </div>

          {/* Middle Collegiate Quote */}
          <div className="relative z-10 my-8 p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 backdrop-blur-md space-y-2">
            <p className="text-xs italic text-slate-200 leading-relaxed">
              "Dedicated to rigorous inquiry, scholarly excellence, and purposeful innovation."
            </p>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-700/60">
              <span>Fall Term 2026</span>
              <span className="text-emerald-400 font-semibold">● Portal Operational</span>
            </div>
          </div>

          {/* Bottom Security / Trust Markers */}
          <div className="relative z-10 space-y-2 pt-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>FERPA Compliant Student Data Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-indigo-400" />
              <span>University Central IT & Identity Management</span>
            </div>
          </div>
        </div>

        {/* Right Form Area (7 cols on lg) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-slate-900">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Student Sign In
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your university credentials to access enrolled classes, grades, and records.
                </p>
              </div>
            </div>

            {/* Quick 1-Click Demo Accounts Selector */}
            <div className="mb-6 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Quick Demo Student Accounts
                </span>
                <span className="text-[10px] text-indigo-300 font-mono">1-Click Fill</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {students.map((stu) => {
                  const isCurrent = activePreset === stu.username;
                  return (
                    <button
                      key={stu.id}
                      type="button"
                      onClick={() => handlePresetSelect(stu)}
                      className={`px-3 py-2 rounded-lg text-left text-xs transition-all border ${
                        isCurrent
                          ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-xs'
                          : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold truncate">{stu.fullName}</div>
                      <div className="text-[10px] text-slate-400 truncate">{stu.major.split(' ')[1] || 'Undergrad'}</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-400 pt-1">
                Preset password for all demo accounts: <code className="text-indigo-300 font-mono">password123</code>
              </p>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-lg bg-rose-950/60 border border-rose-800 text-xs text-rose-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="student-username"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Student Username or ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="student-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. elena.vance or STU-2024-8842"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="student-password"
                    className="text-xs font-medium text-slate-300"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={onOpenForgotPassword}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="student-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter student password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-800/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  />
                  <span>Remember my Student ID</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Login Help</span>
                </button>
              </div>

              {/* Collapsible IT Help Information */}
              {showHelpDropdown && (
                <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-2">
                  <p className="font-semibold text-white">Campus IT Helpdesk</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    First-time logging in? Use your matriculation ID or activate below. If locked out after 5 consecutive failed attempts, contact the IT service desk:
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-700 font-mono text-indigo-300">
                    <span>Phone: +1 (555) 019-4820</span>
                    <span>Hours: 8:00 AM - 8:00 PM EST</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-indigo-950 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating Student...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Student Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Onboarding & Registration CTA */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>New or Transfer Student?</span>
            <button
              onClick={onOpenActivateAccount}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Activate University Account →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

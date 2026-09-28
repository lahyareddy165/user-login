import React, { useState } from 'react';
import { User, Shield, KeyRound, CheckCircle2, AlertCircle, Mail, Phone, Building } from 'lucide-react';
import { StudentAccount } from '../../types/student';

interface ProfileSettingsViewProps {
  student: StudentAccount;
  onUpdatePassword: (newPass: string) => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  student,
  onUpdatePassword,
}) => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (currentPass !== student.password) {
      setPasswordMsg({ text: 'Current password does not match records.', isError: true });
      return;
    }
    if (newPass.length < 6) {
      setPasswordMsg({ text: 'New password must be at least 6 characters.', isError: true });
      return;
    }
    if (newPass !== confirmPass) {
      setPasswordMsg({ text: 'New passwords do not match.', isError: true });
      return;
    }

    onUpdatePassword(newPass);
    setPasswordMsg({ text: 'Student portal password updated successfully.', isError: false });
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">Student Profile & Security Settings</h2>
        <p className="text-xs text-slate-400">Institutional record details and portal credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academic & Personal Identity Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              Academic Identity & Department Records
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">Official Student Name</span>
                <p className="text-sm font-semibold text-white mt-0.5">{student.fullName}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">University Student ID</span>
                <p className="text-sm font-mono font-semibold text-indigo-300 mt-0.5">{student.studentId}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">Institutional Email</span>
                <p className="text-sm font-mono text-slate-200 mt-0.5">{student.email}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400">Portal Username</span>
                <p className="text-sm font-mono text-slate-200 mt-0.5">{student.username}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 sm:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Department / Division</span>
                <p className="text-sm font-semibold text-white mt-0.5">{student.department}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 sm:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">Degree & Concentration</span>
                <p className="text-sm font-medium text-slate-200 mt-0.5">{student.major}</p>
              </div>
            </div>
          </div>

          {/* Change Password Panel */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-400" />
              Change Student Password
            </h3>

            {passwordMsg && (
              <div
                className={`p-3 text-xs rounded-lg border flex items-center gap-2 ${
                  passwordMsg.isError
                    ? 'bg-rose-950/50 border-rose-800 text-rose-300'
                    : 'bg-emerald-950/50 border-emerald-800 text-emerald-300'
                }`}
              >
                {passwordMsg.isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Enter existing password"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors"
              >
                Update Portal Password
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Advisor & Contacts */}
        <div className="space-y-6">
          {/* Assigned Academic Advisor */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-white">Faculty Academic Advisor</h3>
            <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
              <p className="font-semibold text-white text-sm">{student.advisor.name}</p>
              <div className="space-y-1 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-mono text-[11px]">{student.advisor.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{student.advisor.office}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-white">Registered Emergency Contact</h3>
            <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1 text-xs">
              <p className="font-semibold text-white">{student.emergencyContact.name}</p>
              <p className="text-slate-400">{student.emergencyContact.relation}</p>
              <p className="font-mono text-indigo-300 pt-1">{student.emergencyContact.phone}</p>
            </div>
          </div>

          {/* Security & Access Logs */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm space-y-2 text-xs">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Active Session Security
            </h3>
            <p className="text-slate-400 text-[11px]">
              Current session verified via Oakridge Identity Single Sign-On (SSO).
            </p>
            <div className="pt-2 text-[11px] space-y-1 text-slate-400">
              <div className="flex justify-between">
                <span>Protocol:</span>
                <span className="font-mono text-slate-300">TLS 1.3 / OAuth 2.0</span>
              </div>
              <div className="flex justify-between">
                <span>IP Address:</span>
                <span className="font-mono text-slate-300">198.51.100.24 (Campus Wifi)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

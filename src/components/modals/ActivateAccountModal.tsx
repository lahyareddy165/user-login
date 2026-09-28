import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import { StudentAccount } from '../../types/student';
import avatarImg from '../../assets/images/student_avatar_portrait_1790582088232.jpg';

interface ActivateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentRegistered: (newStudent: StudentAccount) => void;
}

export const ActivateAccountModal: React.FC<ActivateAccountModalProps> = ({
  isOpen,
  onClose,
  onStudentRegistered,
}) => {
  const [appId, setAppId] = useState('');
  const [fullName, setFullName] = useState('');
  const [desiredUsername, setDesiredUsername] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('B.S. Artificial Intelligence & Cognitive Systems');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    const cleanUsername = desiredUsername.trim().toLowerCase().replace(/\s+/g, '.');
    const newStudent: StudentAccount = {
      id: `stu-${Date.now()}`,
      username: cleanUsername,
      password: password,
      studentId: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: fullName.trim(),
      email: `${cleanUsername}@oakridge.edu`,
      avatarUrl: avatarImg,
      major: major,
      department: 'College of Computing & Informatics',
      degreeLevel: 'Undergraduate',
      academicYear: 'Freshman (Year 1)',
      semester: 'Fall Term 2026',
      gpa: 4.0,
      creditsCompleted: 0,
      totalCreditsRequired: 120,
      academicStanding: 'Matriculated Regular',
      advisor: {
        name: 'Prof. Diane Foster',
        email: 'd.foster@oakridge.edu',
        office: 'North Science Hub, Room 102',
      },
      emergencyContact: {
        name: 'Family Primary Contact',
        relation: 'Parent / Guardian',
        phone: '+1 (555) 431-7788',
      },
    };

    onStudentRegistered(newStudent);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Activate Student Portal</h3>
            <p className="text-xs text-slate-400">Incoming & First-Year Student Onboarding</p>
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
            <h4 className="text-base font-semibold text-white">Academic Account Activated!</h4>
            <p className="text-xs text-slate-300">
              Your institutional credentials are set. You may now log in to Oakridge Portal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label htmlFor="admission-id-input" className="block text-xs font-medium text-slate-300 mb-1">
                Admission Application or Enrolment ID
              </label>
              <input
                id="admission-id-input"
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="e.g. ADM-2026-9041"
                className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                required
              />
            </div>

            <div>
              <label htmlFor="full-name-input" className="block text-xs font-medium text-slate-300 mb-1">
                Full Legal Name
              </label>
              <input
                id="full-name-input"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Liam Sterling"
                className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                required
              />
            </div>

            <div>
              <label htmlFor="desired-username-input" className="block text-xs font-medium text-slate-300 mb-1">
                Desired Student Username
              </label>
              <input
                id="desired-username-input"
                type="text"
                value={desiredUsername}
                onChange={(e) => setDesiredUsername(e.target.value)}
                placeholder="e.g. liam.sterling"
                className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                required
              />
            </div>

            <div>
              <label htmlFor="new-password-setup-input" className="block text-xs font-medium text-slate-300 mb-1">
                Create Secure Password
              </label>
              <input
                id="new-password-setup-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                required
              />
            </div>

            <div>
              <label htmlFor="degree-program-select" className="block text-xs font-medium text-slate-300 mb-1">
                Degree Program
              </label>
              <select
                id="degree-program-select"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="B.S. Artificial Intelligence & Cognitive Systems">B.S. Artificial Intelligence & Cognitive Systems</option>
                <option value="B.S. Computer Science & Software Engineering">B.S. Computer Science & Software Engineering</option>
                <option value="B.S. Mechanical & Aerospace Engineering">B.S. Mechanical & Aerospace Engineering</option>
                <option value="B.S. Biomedical Sciences & Biochemistry">B.S. Biomedical Sciences & Biochemistry</option>
                <option value="B.A. Economics & Quantitative Finance">B.A. Economics & Quantitative Finance</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Activate Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { X, Award, Shield, Check, Printer, Download } from 'lucide-react';
import { StudentAccount } from '../../types/student';

interface StudentIdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentAccount;
}

export const StudentIdCardModal: React.FC<StudentIdCardModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-white">Digital Student Credential</h3>
          <p className="text-xs text-slate-400">Official digital smart card verified by Registrar</p>
        </div>

        {/* Realistic Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-700/80 p-5 shadow-inner">
          {/* Subtle watermark background emblem */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Award className="w-48 h-48 text-indigo-300" />
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                OU
              </div>
              <div>
                <p className="text-xs font-bold tracking-wider text-slate-100">OAKRIDGE UNIVERSITY</p>
                <p className="text-[10px] text-indigo-300">Office of the University Registrar</p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
              <Check className="w-3 h-3" /> ACTIVE STUDENT
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-24 h-28 rounded-lg overflow-hidden border-2 border-indigo-400/40 bg-slate-800 shrink-0">
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1 text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Full Name</p>
                <p className="text-sm font-semibold text-white">{student.fullName || 'Elena Vance'}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Student ID</p>
                  <p className="font-mono text-xs font-semibold text-indigo-300">{student.studentId || 'STU-2024-8842'}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Degree Level</p>
                  <p className="font-medium text-slate-200">{student.degreeLevel || 'Undergraduate'}</p>
                </div>
              </div>
              <div className="pt-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-400">Academic Program</p>
                <p className="text-xs font-medium text-slate-300 truncate max-w-[240px]">{student.major || 'Computer Science'}</p>
              </div>
            </div>
          </div>

          {/* Barcode section */}
          <div className="mt-5 pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1 h-7">
                {[4, 2, 6, 3, 7, 2, 5, 8, 3, 2, 6, 4, 8, 3, 5, 2, 7, 4, 3, 6, 2, 5, 4, 8, 2, 6].map((w, i) => (
                  <div
                    key={i}
                    style={{ width: `${w * 0.75}px` }}
                    className="h-full bg-slate-300 rounded-xs opacity-90"
                  />
                ))}
              </div>
              <p className="font-mono text-[9px] text-slate-400 tracking-widest">{student.studentId} · VALID THRU 08/2027</p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>NFC / RFID Active</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 text-xs rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print ID</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Printer, Download, Award, FileText, CheckCircle2 } from 'lucide-react';
import { StudentAccount, GradeItem } from '../../types/student';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentAccount;
  grades: GradeItem[];
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  isOpen,
  onClose,
  student,
  grades,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-xl shadow-2xl p-6 sm:p-8 my-8 font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Collegiate Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-950 uppercase">Oakridge University</h2>
              <p className="text-xs text-slate-600">Office of the University Registrar · Official Academic Record</p>
              <p className="text-[11px] text-slate-500">Accredited by Higher Learning Commission</p>
            </div>
            <div className="text-right text-xs">
              <span className="inline-block px-2.5 py-1 font-mono text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded">
                OFFICIAL TRANSCRIPT
              </span>
              <p className="text-[10px] text-slate-500 mt-1">Generated: Sep 28, 2026</p>
            </div>
          </div>
        </div>

        {/* Student Biographical Data */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Student Name</span>
            <p className="font-semibold text-slate-900">{student.fullName || 'Elena Vance'}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Student ID</span>
            <p className="font-mono font-semibold text-slate-900">{student.studentId || 'STU-2024-8842'}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Degree & Major</span>
            <p className="font-medium text-slate-900 truncate">{student.major || 'B.S. Computer Science'}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500">Academic Standing</span>
            <p className="font-semibold text-emerald-700">{student.academicStanding || "Dean's Honors List"}</p>
          </div>
        </div>

        {/* Course Grades Table */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Completed Coursework & Evaluations</h4>
          <table className="w-full text-xs border border-slate-200 divide-y divide-slate-200">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="py-2 px-3 text-left font-semibold">Course Code</th>
                <th className="py-2 px-3 text-left font-semibold">Course Description</th>
                <th className="py-2 px-3 text-center font-semibold">Term</th>
                <th className="py-2 px-3 text-center font-semibold">Credits</th>
                <th className="py-2 px-3 text-center font-semibold">Score</th>
                <th className="py-2 px-3 text-center font-semibold">Grade</th>
                <th className="py-2 px-3 text-right font-semibold">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
              {grades.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="py-2 px-3 font-semibold text-slate-900">{item.courseCode}</td>
                  <td className="py-2 px-3 font-sans text-slate-700">{item.courseName}</td>
                  <td className="py-2 px-3 text-center font-sans text-slate-600">{item.term}</td>
                  <td className="py-2 px-3 text-center tabular-nums">{item.credits}</td>
                  <td className="py-2 px-3 text-center tabular-nums">{item.numericScore}%</td>
                  <td className="py-2 px-3 text-center font-bold text-slate-950">{item.grade}</td>
                  <td className="py-2 px-3 text-right tabular-nums">{item.gradePoints.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Cumulative Totals */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-100 rounded-lg text-xs gap-4 mb-6">
          <div className="space-y-0.5">
            <p className="text-slate-600">Total Credits Earned: <span className="font-mono font-bold text-slate-900">{student.creditsCompleted} / {student.totalCreditsRequired}</span></p>
            <p className="text-slate-600">Graduation Evaluation: <span className="font-medium text-emerald-800">On Track</span></p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Cumulative GPA</span>
              <span className="font-mono text-2xl font-bold text-slate-950 tabular-nums">{student.gpa.toFixed(2)}</span>
              <span className="text-[10px] text-slate-500 block">Scale: 4.00 Max</span>
            </div>
            <div className="w-16 h-16 rounded-full border-2 border-indigo-900/20 flex flex-col items-center justify-center p-1 text-center bg-white shadow-xs">
              <Award className="w-5 h-5 text-indigo-700" />
              <span className="text-[8px] font-bold text-slate-700 uppercase leading-tight">Registrar Seal</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <p className="text-[11px] text-slate-500 italic">This electronic document is certified with digital cryptographic integrity.</p>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Transcript</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

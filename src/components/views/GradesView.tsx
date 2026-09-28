import React from 'react';
import { Award, FileSpreadsheet, ArrowUpRight, CheckCircle, BarChart3 } from 'lucide-react';
import { GradeItem, StudentAccount } from '../../types/student';

interface GradesViewProps {
  grades: GradeItem[];
  student: StudentAccount;
  onOpenTranscript: () => void;
}

export const GradesView: React.FC<GradesViewProps> = ({ grades, student, onOpenTranscript }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Grades & Academic Transcript</h2>
          <p className="text-xs text-slate-400">Official course grade evaluations & cumulative credits</p>
        </div>
        <button
          onClick={onOpenTranscript}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>View Official Signed Transcript</span>
        </button>
      </div>

      {/* GPA & Standing Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Cumulative GPA</span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-white tabular-nums">{student.gpa.toFixed(2)}</span>
            <span className="text-xs text-slate-400 font-mono">/ 4.00</span>
          </div>
          <p className="text-xs text-emerald-400 flex items-center gap-1 pt-1 font-medium">
            <CheckCircle className="w-3.5 h-3.5" /> {student.academicStanding}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Credits Completed</span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-white tabular-nums">{student.creditsCompleted}</span>
            <span className="text-xs text-slate-400 font-mono">of {student.totalCreditsRequired} Required</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: `${(student.creditsCompleted / student.totalCreditsRequired) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Term Academic Honours</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-indigo-300">Dean's List</span>
          </div>
          <p className="text-xs text-slate-400 pt-1">
            Qualifies for Department Honors Distinction at graduation.
          </p>
        </div>
      </div>

      {/* Historical Course Grades Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Course History & Final Grade Records</h3>
          <span className="text-xs text-slate-400 font-mono">{grades.length} Recorded Courses</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Course Code</th>
                <th className="py-3 px-4 text-left font-semibold">Course Title</th>
                <th className="py-3 px-4 text-center font-semibold">Term</th>
                <th className="py-3 px-4 text-center font-semibold">Credits</th>
                <th className="py-3 px-4 text-center font-semibold">Score</th>
                <th className="py-3 px-4 text-center font-semibold">Letter Grade</th>
                <th className="py-3 px-4 text-right font-semibold">Grade Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
              {grades.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400">{item.courseCode}</td>
                  <td className="py-3 px-4 font-sans text-white">{item.courseName}</td>
                  <td className="py-3 px-4 text-center font-sans text-slate-400">{item.term}</td>
                  <td className="py-3 px-4 text-center tabular-nums">{item.credits}</td>
                  <td className="py-3 px-4 text-center tabular-nums">{item.numericScore}%</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded font-bold bg-slate-800 text-white border border-slate-700">
                      {item.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums text-slate-300 font-bold">
                    {item.gradePoints.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

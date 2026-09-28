import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  IdCard, 
  FileSpreadsheet, 
  BookOpen, 
  ChevronRight,
  MapPin,
  Bell
} from 'lucide-react';
import { StudentAccount, Course, ScheduleEvent, CampusNotice, Assignment } from '../../types/student';

interface OverviewViewProps {
  student: StudentAccount;
  courses: Course[];
  schedule: ScheduleEvent[];
  notices: CampusNotice[];
  onOpenIdCard: () => void;
  onOpenTranscript: () => void;
  onNavigateToCourses: () => void;
  onNavigateToSchedule: () => void;
  onSubmitAssignmentClick: (assignment: Assignment) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  student,
  courses,
  schedule,
  notices,
  onOpenIdCard,
  onOpenTranscript,
  onNavigateToCourses,
  onNavigateToSchedule,
  onSubmitAssignmentClick,
}) => {
  // Collect all pending assignments across courses
  const pendingAssignments: Assignment[] = [];
  courses.forEach((c) => {
    c.assignments.forEach((a) => {
      if (a.status === 'pending') {
        pendingAssignments.push(a);
      }
    });
  });

  // Filter schedule for Monday/Wednesday (sample current day representation)
  const todaysClasses = schedule.filter((s) => s.day === 'Mon');

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-indigo-400/40 bg-slate-800 shrink-0">
              <img
                src={student.avatarUrl}
                alt={student.fullName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Welcome back, {student.fullName.split(' ')[0]}
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                  {student.studentId}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {student.major} · <span className="text-slate-400">{student.academicYear}</span>
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span>{student.semester}</span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">{student.academicStanding}</span>
                <span>·</span>
                <span>Advisor: {student.advisor.name}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-slate-800/40 border border-slate-700/60 rounded-xl p-3 shrink-0">
            <div className="text-center px-3 border-r border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Cumulative GPA</span>
              <span className="font-mono text-xl font-bold text-white tabular-nums">{student.gpa.toFixed(2)}</span>
              <span className="text-[10px] text-emerald-400 block font-medium">Top 5%</span>
            </div>
            <div className="text-center px-3 border-r border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Credits Done</span>
              <span className="font-mono text-xl font-bold text-white tabular-nums">{student.creditsCompleted}</span>
              <span className="text-[10px] text-slate-400 block font-mono">of {student.totalCreditsRequired} cr</span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Courses Enrolled</span>
              <span className="font-mono text-xl font-bold text-indigo-300 tabular-nums">{courses.length}</span>
              <span className="text-[10px] text-slate-400 block">14 Total Cr</span>
            </div>
          </div>
        </div>

        {/* Quick Action Ribbon */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2.5">
          <button
            onClick={onOpenIdCard}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-1.5"
          >
            <IdCard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Digital Student ID</span>
          </button>
          <button
            onClick={onOpenTranscript}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-sky-400" />
            <span>Official Academic Transcript</span>
          </button>
          <button
            onClick={onNavigateToCourses}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Course Syllabi & Portals</span>
          </button>
          <button
            onClick={onNavigateToSchedule}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Full Class Timetable</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Schedule & Assignments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Classes */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-white">Today's Academic Schedule</h2>
                <p className="text-xs text-slate-400">Monday timetable schedule</p>
              </div>
              <button
                onClick={onNavigateToSchedule}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
              >
                <span>View Full Week</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {todaysClasses.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/80 gap-3 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 font-mono text-xs shrink-0">
                      <Clock className="w-4 h-4 mb-0.5 text-indigo-400" />
                      <span>{item.startTime}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{item.courseCode}</span>
                        <span className="text-xs text-slate-400">· {item.courseName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                          {item.room}
                        </span>
                        <span>·</span>
                        <span>{item.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-800/50">
                      In-Person
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Submissions / Tasks */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-white">Pending Assignments & Problem Sets</h2>
                <p className="text-xs text-slate-400">Submit homework before deadline for full credit</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">
                {pendingAssignments.length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {pendingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/80 gap-3 hover:border-slate-600 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-indigo-300">
                        {assignment.courseCode}
                      </span>
                      <span className="text-sm font-medium text-white">{assignment.title}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Due: <span className="text-amber-400 font-medium">{assignment.dueDate}</span> · Max Points: {assignment.maxPoints} pts
                    </p>
                  </div>
                  <button
                    onClick={() => onSubmitAssignmentClick(assignment)}
                    className="self-end sm:self-center px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors"
                  >
                    Submit Work
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Campus Announcements & Quick Resources */}
        <div className="space-y-6">
          {/* Important Notices */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-semibold text-white">Campus Notices</h2>
            </div>

            <div className="space-y-3.5">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/70 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                      {notice.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-white leading-snug">{notice.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{notice.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Helpdesk Card */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-white mb-2">Student Academic Services</h2>
            <p className="text-xs text-slate-400 mb-4">
              Need assistance with course registration, degree auditing, or financial aid?
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-800/60 border border-slate-700/70 flex justify-between items-center">
                <span className="text-slate-300">Office of Registrar</span>
                <span className="font-mono text-indigo-300 text-[11px]">reg@oakridge.edu</span>
              </div>
              <div className="p-2.5 rounded bg-slate-800/60 border border-slate-700/70 flex justify-between items-center">
                <span className="text-slate-300">IT Helpdesk Support</span>
                <span className="font-mono text-indigo-300 text-[11px]">+1 (555) 019-4820</span>
              </div>
              <div className="p-2.5 rounded bg-slate-800/60 border border-slate-700/70 flex justify-between items-center">
                <span className="text-slate-300">Library Research Desk</span>
                <span className="font-mono text-indigo-300 text-[11px]">lib-ref@oakridge.edu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

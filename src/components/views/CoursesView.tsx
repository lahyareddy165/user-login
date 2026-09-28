import React, { useState } from 'react';
import { BookOpen, User, MapPin, Calendar, CheckCircle2, Clock, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Course, Assignment } from '../../types/student';

interface CoursesViewProps {
  courses: Course[];
  onSubmitAssignment: (assignment: Assignment) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ courses, onSubmitAssignment }) => {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(courses[0]?.id || null);

  const toggleCourse = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">Enrolled Courses & Syllabi</h2>
          <p className="text-xs text-slate-400">Fall Term 2026 · 4 Active Academic Enrollments</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Total Credits: 14.0
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {courses.map((course) => {
          const isExpanded = expandedCourseId === course.id;

          return (
            <div
              key={course.id}
              className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm transition-all"
            >
              {/* Course Header Bar */}
              <div
                onClick={() => toggleCourse(course.id)}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center shrink-0 w-20">
                    <span className="font-mono text-xs font-bold text-indigo-400 block">{course.code}</span>
                    <span className="text-[10px] text-slate-400 font-mono block">{course.credits} Credits</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-white">{course.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <User className="w-3.5 h-3.5 text-indigo-400" />
                        {course.instructor}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {course.room}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {course.scheduleDays} ({course.scheduleTime})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end md:self-center">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Standing</span>
                    <div className="flex items-baseline gap-1.5 justify-end">
                      <span className="font-mono text-base font-bold text-emerald-400">{course.currentGrade}</span>
                      <span className="text-xs font-mono text-slate-400 tabular-nums">({course.currentPercentage}%)</span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Attendance</span>
                    <span className="font-mono text-sm font-semibold text-slate-200 tabular-nums">{course.attendanceRate}%</span>
                  </div>
                  <button
                    className="p-1 rounded text-slate-400 hover:text-white"
                    aria-label={isExpanded ? 'Collapse course details' : 'Expand course details'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Details: Syllabus & Assignments */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800 space-y-5 bg-slate-900/50">
                  {/* Syllabus Brief */}
                  <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-indigo-400" /> Course Syllabus Summary
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{course.syllabusSummary}</p>
                  </div>

                  {/* Course Assignments */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      Course Assignments & Project Deliverables
                    </h4>

                    <div className="space-y-2.5">
                      {course.assignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-800/70 border border-slate-700/80 gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-white">{assignment.title}</span>
                              {assignment.status === 'graded' && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Graded ({assignment.earnedPoints}/{assignment.maxPoints})
                                </span>
                              )}
                              {assignment.status === 'submitted' && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/50 flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> Submitted · Under Review
                                </span>
                              )}
                              {assignment.status === 'pending' && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50">
                                  Pending Turn-in
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400">
                              Due: <span className="text-slate-300 font-medium">{assignment.dueDate}</span>
                              {assignment.feedback && (
                                <span className="block text-[11px] text-indigo-300 italic mt-0.5">
                                  Instructor Feedback: "{assignment.feedback}"
                                </span>
                              )}
                            </p>
                          </div>

                          <div className="shrink-0 self-end sm:self-center">
                            {assignment.status === 'pending' ? (
                              <button
                                onClick={() => onSubmitAssignment(assignment)}
                                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors"
                              >
                                Turn In Work
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400 font-mono">Recorded</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

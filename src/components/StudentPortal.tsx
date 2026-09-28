import React, { useState } from 'react';
import { 
  LogOut, 
  Bell, 
  Check, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  User, 
  Menu, 
  X,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { 
  StudentAccount, 
  Course, 
  ScheduleEvent, 
  GradeItem, 
  CampusNotice, 
  StudentNotification, 
  Assignment 
} from '../types/student';
import { OverviewView } from './views/OverviewView';
import { CoursesView } from './views/CoursesView';
import { ScheduleView } from './views/ScheduleView';
import { GradesView } from './views/GradesView';
import { ProfileSettingsView } from './views/ProfileSettingsView';
import { StudentIdCardModal } from './modals/StudentIdCardModal';
import { TranscriptModal } from './modals/TranscriptModal';
import { SubmitAssignmentModal } from './modals/SubmitAssignmentModal';

interface StudentPortalProps {
  student: StudentAccount;
  courses: Course[];
  schedule: ScheduleEvent[];
  grades: GradeItem[];
  notices: CampusNotice[];
  notifications: StudentNotification[];
  onLogout: () => void;
  onUpdatePassword: (newPass: string) => void;
  onSubmitAssignment: (assignmentId: string, submissionName: string) => void;
  onMarkNotificationsRead: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  courses,
  schedule,
  grades,
  notices,
  notifications,
  onLogout,
  onUpdatePassword,
  onSubmitAssignment,
  onMarkNotificationsRead,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'schedule' | 'grades' | 'profile'>('overview');
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [selectedAssignmentForSubmit, setSelectedAssignmentForSubmit] = useState<Assignment | null>(null);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-6 nav links) - Zone 3 (Primary actions) */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Brand title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('overview')}
              className="text-left flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-xs">
                OU
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
                Oakridge University
              </span>
            </button>
            <span className="hidden md:inline-block text-xs font-mono text-slate-500 pl-2 border-l border-slate-700">
              Student Portal
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
            <button
              onClick={() => setActiveTab('overview')}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${
                activeTab === 'overview' ? 'text-white border-indigo-500 font-semibold' : 'border-transparent'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${
                activeTab === 'courses' ? 'text-white border-indigo-500 font-semibold' : 'border-transparent'
              }`}
            >
              Courses ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${
                activeTab === 'schedule' ? 'text-white border-indigo-500 font-semibold' : 'border-transparent'
              }`}
            >
              Class Schedule
            </button>
            <button
              onClick={() => setActiveTab('grades')}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${
                activeTab === 'grades' ? 'text-white border-indigo-500 font-semibold' : 'border-transparent'
              }`}
            >
              Grades & Transcripts
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`hover:text-white transition-colors pb-1 border-b-2 ${
                activeTab === 'profile' ? 'text-white border-indigo-500 font-semibold' : 'border-transparent'
              }`}
            >
              Account & Security
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Notifications, Student identity, Logout) */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotificationsDropdown(!showNotificationsDropdown);
                  if (unreadCount > 0) {
                    onMarkNotificationsRead();
                  }
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
                aria-label="Student notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-900" />
                )}
              </button>

              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="font-semibold text-white">Notifications</span>
                    <span className="text-[11px] text-slate-400 font-mono">Academic Updates</span>
                  </div>
                  <div className="space-y-2.5 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2 rounded bg-slate-800/60 border border-slate-700/60 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-300">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Student Avatar & Sign Out */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 text-left group"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-indigo-500/40 bg-slate-800 shrink-0">
                  <img
                    src={student.avatarUrl}
                    alt={student.fullName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hidden sm:block text-xs">
                  <p className="font-medium text-white group-hover:text-indigo-300 transition-colors leading-tight truncate max-w-[110px]">
                    {student.fullName}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 leading-tight">
                    {student.studentId}
                  </p>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
                title="Log out of student portal"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 px-4 py-3 bg-slate-900/98 space-y-2 text-xs">
            <button
              onClick={() => {
                setActiveTab('overview');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-lg ${
                activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => {
                setActiveTab('courses');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-lg ${
                activeTab === 'courses' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Courses ({courses.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('schedule');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-lg ${
                activeTab === 'schedule' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Class Schedule
            </button>
            <button
              onClick={() => {
                setActiveTab('grades');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-lg ${
                activeTab === 'grades' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Grades & Transcripts
            </button>
            <button
              onClick={() => {
                setActiveTab('profile');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-lg ${
                activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Account & Security
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'overview' && (
          <OverviewView
            student={student}
            courses={courses}
            schedule={schedule}
            notices={notices}
            onOpenIdCard={() => setShowIdCardModal(true)}
            onOpenTranscript={() => setShowTranscriptModal(true)}
            onNavigateToCourses={() => setActiveTab('courses')}
            onNavigateToSchedule={() => setActiveTab('schedule')}
            onSubmitAssignmentClick={(assignment) => setSelectedAssignmentForSubmit(assignment)}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesView
            courses={courses}
            onSubmitAssignment={(assignment) => setSelectedAssignmentForSubmit(assignment)}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView schedule={schedule} />
        )}

        {activeTab === 'grades' && (
          <GradesView
            grades={grades}
            student={student}
            onOpenTranscript={() => setShowTranscriptModal(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSettingsView
            student={student}
            onUpdatePassword={onUpdatePassword}
          />
        )}
      </main>

      {/* Collegiate Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Oakridge University · Division of Academic Information Technology</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Academic Honor Code</span>
            <span>·</span>
            <span>FERPA Privacy Policy</span>
            <span>·</span>
            <span>Campus IT Support Desk</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <StudentIdCardModal
        isOpen={showIdCardModal}
        onClose={() => setShowIdCardModal(false)}
        student={student}
      />

      <TranscriptModal
        isOpen={showTranscriptModal}
        onClose={() => setShowTranscriptModal(false)}
        student={student}
        grades={grades}
      />

      <SubmitAssignmentModal
        isOpen={Boolean(selectedAssignmentForSubmit)}
        onClose={() => setSelectedAssignmentForSubmit(null)}
        assignment={selectedAssignmentForSubmit}
        onSubmitted={onSubmitAssignment}
      />
    </div>
  );
};

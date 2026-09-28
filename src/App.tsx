import React, { useState, useEffect } from 'react';
import { 
  StudentAccount, 
  Course, 
  ScheduleEvent, 
  GradeItem, 
  CampusNotice, 
  StudentNotification 
} from './types/student';
import { 
  INITIAL_STUDENTS, 
  INITIAL_COURSES, 
  INITIAL_SCHEDULE, 
  INITIAL_GRADES, 
  INITIAL_NOTICES, 
  INITIAL_NOTIFICATIONS 
} from './data/mockStudentData';
import { LoginScreen } from './components/LoginScreen';
import { StudentPortal } from './components/StudentPortal';
import { ForgotPasswordModal } from './components/modals/ForgotPasswordModal';
import { ActivateAccountModal } from './components/modals/ActivateAccountModal';

export default function App() {
  // Load persistent students list
  const [students, setStudents] = useState<StudentAccount[]>(() => {
    try {
      const saved = localStorage.getItem('oakridge_students_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_STUDENTS;
  });

  // Current logged in student
  const [currentStudent, setCurrentStudent] = useState<StudentAccount | null>(() => {
    try {
      const activeSession = localStorage.getItem('oakridge_current_session');
      if (activeSession) {
        const studentObj = JSON.parse(activeSession);
        return studentObj;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem('oakridge_courses_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_COURSES;
  });

  const [schedule] = useState<ScheduleEvent[]>(INITIAL_SCHEDULE);
  const [grades] = useState<GradeItem[]>(INITIAL_GRADES);
  const [notices] = useState<CampusNotice[]>(INITIAL_NOTICES);
  const [notifications, setNotifications] = useState<StudentNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals for login screen
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync students state to localStorage
  useEffect(() => {
    localStorage.setItem('oakridge_students_data', JSON.stringify(students));
  }, [students]);

  // Sync courses state to localStorage
  useEffect(() => {
    localStorage.setItem('oakridge_courses_data', JSON.stringify(courses));
  }, [courses]);

  const handleLogin = (student: StudentAccount) => {
    setCurrentStudent(student);
    localStorage.setItem('oakridge_current_session', JSON.stringify(student));
    showToast(`Signed in successfully as ${student.fullName}`);
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    localStorage.removeItem('oakridge_current_session');
    showToast('Signed out of student portal');
  };

  const handlePasswordReset = (username: string, newPass: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.username.toLowerCase() === username.toLowerCase() ? { ...s, password: newPass } : s))
    );
    showToast(`Password successfully reset for ${username}. You can now sign in.`);
  };

  const handleActivateNewStudent = (newStudent: StudentAccount) => {
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Account activated for ${newStudent.fullName}. You may now log in.`);
  };

  const handleUpdatePasswordFromProfile = (newPass: string) => {
    if (!currentStudent) return;
    const updated = { ...currentStudent, password: newPass };
    setCurrentStudent(updated);
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    localStorage.setItem('oakridge_current_session', JSON.stringify(updated));
    showToast('Your portal password has been updated.');
  };

  const handleSubmitAssignment = (assignmentId: string, submissionName: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((crs) => ({
        ...crs,
        assignments: crs.assignments.map((asg) =>
          asg.id === assignmentId
            ? {
                ...asg,
                status: 'submitted' as const,
                submissionDate: new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }),
              }
            : asg
        ),
      }))
    );

    // Add notification
    const newNotif: StudentNotification = {
      id: `notif-${Date.now()}`,
      title: 'Submission Confirmed',
      message: `File "${submissionName}" was uploaded and recorded for course evaluation.`,
      timestamp: 'Just now',
      read: false,
      type: 'assignment',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast('Assignment submitted successfully!');
  };

  const handleResetDemoData = () => {
    localStorage.removeItem('oakridge_students_data');
    localStorage.removeItem('oakridge_courses_data');
    localStorage.removeItem('oakridge_current_session');
    localStorage.removeItem('oakridge_saved_username');
    setStudents(INITIAL_STUDENTS);
    setCourses(INITIAL_COURSES);
    setCurrentStudent(null);
    showToast('Reset all demo data to default accounts.');
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl text-xs font-medium text-white flex items-center gap-2 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {currentStudent ? (
        <StudentPortal
          student={currentStudent}
          courses={courses}
          schedule={schedule}
          grades={grades}
          notices={notices}
          notifications={notifications}
          onLogout={handleLogout}
          onUpdatePassword={handleUpdatePasswordFromProfile}
          onSubmitAssignment={handleSubmitAssignment}
          onMarkNotificationsRead={handleMarkNotificationsRead}
          onResetDemoData={handleResetDemoData}
        />
      ) : (
        <LoginScreen
          students={students}
          onLoginSuccess={handleLogin}
          onOpenForgotPassword={() => setShowForgotModal(true)}
          onOpenActivateAccount={() => setShowActivateModal(true)}
          onResetDemoData={handleResetDemoData}
        />
      )}

      {/* Forgot Password Flow Modal */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        students={students}
        onPasswordResetSuccess={handlePasswordReset}
      />

      {/* Activate Student Account Modal */}
      <ActivateAccountModal
        isOpen={showActivateModal}
        onClose={() => setShowActivateModal(false)}
        onStudentRegistered={handleActivateNewStudent}
      />
    </div>
  );
}

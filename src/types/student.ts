export interface StudentAccount {
  id: string;
  username: string;
  password: string; // stored for demo verification
  studentId: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  major: string;
  department: string;
  degreeLevel: string;
  academicYear: string;
  semester: string;
  gpa: number;
  creditsCompleted: number;
  totalCreditsRequired: number;
  academicStanding: string;
  advisor: {
    name: string;
    email: string;
    office: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  room: string;
  scheduleDays: string;
  scheduleTime: string;
  color: string;
  attendanceRate: number;
  currentGrade: string;
  currentPercentage: number;
  syllabusSummary: string;
  assignments: Assignment[];
}

export interface Assignment {
  id: string;
  courseCode: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  maxPoints: number;
  earnedPoints?: number;
  submissionDate?: string;
  feedback?: string;
}

export interface ScheduleEvent {
  id: string;
  courseCode: string;
  courseName: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  startTime: string; // "09:00"
  endTime: string;   // "10:30"
  room: string;
  instructor: string;
  color: string;
}

export interface GradeItem {
  id: string;
  courseCode: string;
  courseName: string;
  term: string;
  credits: number;
  grade: string;
  numericScore: number;
  gradePoints: number;
}

export interface CampusNotice {
  id: string;
  title: string;
  date: string;
  category: 'Academic' | 'Registrar' | 'Campus Life' | 'Financial';
  summary: string;
  isImportant?: boolean;
}

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'grade' | 'assignment' | 'alert' | 'system';
}

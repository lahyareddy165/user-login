import { StudentAccount, Course, ScheduleEvent, GradeItem, CampusNotice, StudentNotification } from '../types/student';
import avatarImg from '../assets/images/student_avatar_portrait_1790582088232.jpg';

export const INITIAL_STUDENTS: StudentAccount[] = [
  {
    id: 'stu-1',
    username: 'elena.vance',
    password: 'password123',
    studentId: 'STU-2024-8842',
    fullName: 'Elena Vance',
    email: 'elena.vance@oakridge.edu',
    avatarUrl: avatarImg,
    major: 'B.S. Computer Science & Software Engineering',
    department: 'Department of Electrical Engineering & Computer Sciences',
    degreeLevel: 'Undergraduate',
    academicYear: 'Junior (Year 3)',
    semester: 'Fall Term 2026',
    gpa: 3.84,
    creditsCompleted: 78,
    totalCreditsRequired: 120,
    academicStanding: "Dean's Honors List",
    advisor: {
      name: 'Dr. Aris Thorne',
      email: 'a.thorne@oakridge.edu',
      office: 'Turing Hall, Room 412'
    },
    emergencyContact: {
      name: 'Claire Vance',
      relation: 'Parent / Guardian',
      phone: '+1 (555) 349-2180'
    }
  },
  {
    id: 'stu-2',
    username: 'marcus.chen',
    password: 'password123',
    studentId: 'STU-2023-4190',
    fullName: 'Marcus Chen',
    email: 'marcus.chen@oakridge.edu',
    avatarUrl: avatarImg,
    major: 'B.S. Mechanical & Aerospace Engineering',
    department: 'School of Engineering & Applied Sciences',
    degreeLevel: 'Undergraduate',
    academicYear: 'Senior (Year 4)',
    semester: 'Fall Term 2026',
    gpa: 3.72,
    creditsCompleted: 104,
    totalCreditsRequired: 128,
    academicStanding: 'Good Standing',
    advisor: {
      name: 'Prof. Helen Ross',
      email: 'h.ross@oakridge.edu',
      office: 'Franklin Tech Center, Room 204'
    },
    emergencyContact: {
      name: 'David Chen',
      relation: 'Parent / Guardian',
      phone: '+1 (555) 892-4411'
    }
  },
  {
    id: 'stu-3',
    username: 'sophia.patel',
    password: 'password123',
    studentId: 'STU-2025-1109',
    fullName: 'Sophia Patel',
    email: 'sophia.patel@oakridge.edu',
    avatarUrl: avatarImg,
    major: 'B.S. Biomedical Sciences & Biochemistry',
    department: 'College of Natural Sciences & Medicine',
    degreeLevel: 'Undergraduate',
    academicYear: 'Sophomore (Year 2)',
    semester: 'Fall Term 2026',
    gpa: 3.91,
    creditsCompleted: 45,
    totalCreditsRequired: 120,
    academicStanding: "Dean's Honors List",
    advisor: {
      name: 'Dr. Evelyn Morales',
      email: 'e.morales@oakridge.edu',
      office: 'Curie Life Sciences, Room 318'
    },
    emergencyContact: {
      name: 'Anita Patel',
      relation: 'Mother',
      phone: '+1 (555) 723-9099'
    }
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs-1',
    code: 'CS 340',
    name: 'Algorithms & Computational Complexity',
    instructor: 'Prof. Julian Vance',
    credits: 4,
    room: 'Turing Hall 201',
    scheduleDays: 'Mon, Wed, Fri',
    scheduleTime: '09:00 - 10:15 AM',
    color: 'border-l-indigo-500 bg-indigo-950/20 text-indigo-300',
    attendanceRate: 96,
    currentGrade: 'A',
    currentPercentage: 94.5,
    syllabusSummary: 'Divide and conquer algorithms, dynamic programming, network flow, NP-completeness, and randomized approximation strategies.',
    assignments: [
      {
        id: 'asg-1',
        courseCode: 'CS 340',
        title: 'Problem Set 3: Dynamic Programming on DAGs',
        dueDate: 'Tomorrow, 11:59 PM',
        status: 'pending',
        maxPoints: 100
      },
      {
        id: 'asg-2',
        courseCode: 'CS 340',
        title: 'Midterm Algorithmic Synthesis Project',
        dueDate: 'Oct 14, 2026',
        status: 'pending',
        maxPoints: 150
      },
      {
        id: 'asg-3',
        courseCode: 'CS 340',
        title: 'Problem Set 2: Graph Reductions & Flows',
        dueDate: 'Sep 21, 2026',
        status: 'graded',
        maxPoints: 100,
        earnedPoints: 98,
        submissionDate: 'Sep 20, 2026',
        feedback: 'Superb formal induction proofs for capacity scaling theorem.'
      }
    ]
  },
  {
    id: 'crs-2',
    code: 'CS 412',
    name: 'Distributed Database Systems',
    instructor: 'Dr. Maya Lin',
    credits: 3,
    room: 'Hopper Science 104',
    scheduleDays: 'Tue, Thu',
    scheduleTime: '11:00 - 12:20 PM',
    color: 'border-l-sky-500 bg-sky-950/20 text-sky-300',
    attendanceRate: 92,
    currentGrade: 'A-',
    currentPercentage: 91.8,
    syllabusSummary: 'Raft consensus protocols, multi-version concurrency control (MVCC), distributed transactions, two-phase commits, and LSM storage engines.',
    assignments: [
      {
        id: 'asg-4',
        courseCode: 'CS 412',
        title: 'Lab 2: Raft Leader Election & Heartbeat Simulation',
        dueDate: 'Oct 4, 2026',
        status: 'pending',
        maxPoints: 80
      },
      {
        id: 'asg-5',
        courseCode: 'CS 412',
        title: 'Lab 1: Write-Ahead Logging & Crash Recovery',
        dueDate: 'Sep 18, 2026',
        status: 'graded',
        maxPoints: 80,
        earnedPoints: 78,
        submissionDate: 'Sep 17, 2026',
        feedback: 'Clean recovery mechanism. Minor edge case missed on dirty read rollback.'
      }
    ]
  },
  {
    id: 'crs-3',
    code: 'MATH 280',
    name: 'Applied Linear Algebra & Vector Spaces',
    instructor: 'Prof. David K. Sterling',
    credits: 4,
    room: 'Euler Hall 308',
    scheduleDays: 'Mon, Wed',
    scheduleTime: '01:30 - 03:00 PM',
    color: 'border-l-emerald-500 bg-emerald-950/20 text-emerald-300',
    attendanceRate: 100,
    currentGrade: 'A',
    currentPercentage: 96.0,
    syllabusSummary: 'Vector spaces, linear transformations, spectral decomposition, Singular Value Decomposition (SVD), and applications in dimensionality reduction.',
    assignments: [
      {
        id: 'asg-6',
        courseCode: 'MATH 280',
        title: 'Homework 4: SVD & Principal Component Projections',
        dueDate: 'Oct 07, 2026',
        status: 'pending',
        maxPoints: 50
      },
      {
        id: 'asg-7',
        courseCode: 'MATH 280',
        title: 'Quiz 2: Orthogonal Complements & Projections',
        dueDate: 'Sep 24, 2026',
        status: 'graded',
        maxPoints: 50,
        earnedPoints: 49,
        submissionDate: 'Sep 24, 2026',
        feedback: 'Flawless Gram-Schmidt orthogonalization computation.'
      }
    ]
  },
  {
    id: 'crs-4',
    code: 'PHIL 215',
    name: 'Ethics of Artificial Intelligence & Autonomy',
    instructor: 'Dr. Rebecca Alcott',
    credits: 3,
    room: 'Aristotle Humanities 112',
    scheduleDays: 'Tue, Thu',
    scheduleTime: '02:00 - 03:20 PM',
    color: 'border-l-amber-500 bg-amber-950/20 text-amber-300',
    attendanceRate: 94,
    currentGrade: 'A-',
    currentPercentage: 90.2,
    syllabusSummary: 'Algorithmic bias, moral responsibility in autonomous decisions, alignment, privacy jurisprudence, and governance frameworks.',
    assignments: [
      {
        id: 'asg-8',
        courseCode: 'PHIL 215',
        title: 'Midterm Essay: Utilitarian Limits in Automated Triage',
        dueDate: 'Oct 12, 2026',
        status: 'pending',
        maxPoints: 100
      }
    ]
  }
];

export const INITIAL_SCHEDULE: ScheduleEvent[] = [
  {
    id: 'sch-1',
    courseCode: 'CS 340',
    courseName: 'Algorithms & Complexity',
    day: 'Mon',
    startTime: '09:00',
    endTime: '10:15',
    room: 'Turing Hall 201',
    instructor: 'Prof. Julian Vance',
    color: 'bg-indigo-950/40 border-indigo-700/60 text-indigo-200'
  },
  {
    id: 'sch-2',
    courseCode: 'MATH 280',
    courseName: 'Applied Linear Algebra',
    day: 'Mon',
    startTime: '13:30',
    endTime: '15:00',
    room: 'Euler Hall 308',
    instructor: 'Prof. David Sterling',
    color: 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
  },
  {
    id: 'sch-3',
    courseCode: 'CS 412',
    courseName: 'Distributed Database Systems',
    day: 'Tue',
    startTime: '11:00',
    endTime: '12:20',
    room: 'Hopper Science 104',
    instructor: 'Dr. Maya Lin',
    color: 'bg-sky-950/40 border-sky-700/60 text-sky-200'
  },
  {
    id: 'sch-4',
    courseCode: 'PHIL 215',
    courseName: 'Ethics in AI & Autonomy',
    day: 'Tue',
    startTime: '14:00',
    endTime: '15:20',
    room: 'Aristotle Humanities 112',
    instructor: 'Dr. Rebecca Alcott',
    color: 'bg-amber-950/40 border-amber-700/60 text-amber-200'
  },
  {
    id: 'sch-5',
    courseCode: 'CS 340',
    courseName: 'Algorithms & Complexity',
    day: 'Wed',
    startTime: '09:00',
    endTime: '10:15',
    room: 'Turing Hall 201',
    instructor: 'Prof. Julian Vance',
    color: 'bg-indigo-950/40 border-indigo-700/60 text-indigo-200'
  },
  {
    id: 'sch-6',
    courseCode: 'MATH 280',
    courseName: 'Applied Linear Algebra',
    day: 'Wed',
    startTime: '13:30',
    endTime: '15:00',
    room: 'Euler Hall 308',
    instructor: 'Prof. David Sterling',
    color: 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
  },
  {
    id: 'sch-7',
    courseCode: 'CS 412',
    courseName: 'Distributed Database Systems',
    day: 'Thu',
    startTime: '11:00',
    endTime: '12:20',
    room: 'Hopper Science 104',
    instructor: 'Dr. Maya Lin',
    color: 'bg-sky-950/40 border-sky-700/60 text-sky-200'
  },
  {
    id: 'sch-8',
    courseCode: 'PHIL 215',
    courseName: 'Ethics in AI & Autonomy',
    day: 'Thu',
    startTime: '14:00',
    endTime: '15:20',
    room: 'Aristotle Humanities 112',
    instructor: 'Dr. Rebecca Alcott',
    color: 'bg-amber-950/40 border-amber-700/60 text-amber-200'
  },
  {
    id: 'sch-9',
    courseCode: 'CS 340',
    courseName: 'Algorithms & Complexity',
    day: 'Fri',
    startTime: '09:00',
    endTime: '10:15',
    room: 'Turing Hall 201',
    instructor: 'Prof. Julian Vance',
    color: 'bg-indigo-950/40 border-indigo-700/60 text-indigo-200'
  }
];

export const INITIAL_GRADES: GradeItem[] = [
  {
    id: 'grd-1',
    courseCode: 'CS 220',
    courseName: 'Data Structures & OOP',
    term: 'Spring 2026',
    credits: 4,
    grade: 'A',
    numericScore: 96,
    gradePoints: 4.0
  },
  {
    id: 'grd-2',
    courseCode: 'CS 250',
    courseName: 'Computer Architecture & Systems',
    term: 'Spring 2026',
    credits: 4,
    grade: 'A-',
    numericScore: 91,
    gradePoints: 3.7
  },
  {
    id: 'grd-3',
    courseCode: 'MATH 240',
    courseName: 'Discrete Mathematics & Logic',
    term: 'Spring 2026',
    credits: 3,
    grade: 'A',
    numericScore: 95,
    gradePoints: 4.0
  },
  {
    id: 'grd-4',
    courseCode: 'PHYS 150',
    courseName: 'Electromagnetism & Wave Physics',
    term: 'Spring 2026',
    credits: 4,
    grade: 'B+',
    numericScore: 88,
    gradePoints: 3.3
  },
  {
    id: 'grd-5',
    courseCode: 'CS 110',
    courseName: 'Introduction to Computing & Python',
    term: 'Fall 2025',
    credits: 4,
    grade: 'A',
    numericScore: 98,
    gradePoints: 4.0
  },
  {
    id: 'grd-6',
    courseCode: 'MATH 180',
    courseName: 'Calculus II: Analytic Sequences',
    term: 'Fall 2025',
    credits: 4,
    grade: 'A',
    numericScore: 94,
    gradePoints: 4.0
  }
];

export const INITIAL_NOTICES: CampusNotice[] = [
  {
    id: 'ntc-1',
    title: 'Fall Term Add / Drop Course Period Deadline',
    date: 'Oct 05, 2026',
    category: 'Registrar',
    summary: 'The official deadline to add or drop standard semester courses without academic transcript penalty is Friday, October 5th at 5:00 PM EST.',
    isImportant: true
  },
  {
    id: 'ntc-2',
    title: 'Annual Engineering & Science Career Fair Registration',
    date: 'Oct 12, 2026',
    category: 'Campus Life',
    summary: 'Over 120 technology and engineering firms will be recruiting on campus in the Great Hall. Preregister via your student portal to receive priority recruiter badge check-in.',
    isImportant: false
  },
  {
    id: 'ntc-3',
    title: 'Library Extended Hours & Research Consultation',
    date: 'Sep 25, 2026',
    category: 'Academic',
    summary: 'The Main Quad Library is now operating 24 hours Monday through Thursday. Specialized data science and reference consultation desks are open daily.',
    isImportant: false
  },
  {
    id: 'ntc-4',
    title: 'Student Health & Wellness Immunization Verification',
    date: 'Sep 20, 2026',
    category: 'Campus Life',
    summary: 'All enrolled undergraduate and graduate students must ensure their seasonal health verification is updated in the Student Health Portal by October 15th.',
    isImportant: false
  }
];

export const INITIAL_NOTIFICATIONS: StudentNotification[] = [
  {
    id: 'notif-1',
    title: 'Grade Posted: Problem Set 2',
    message: 'Prof. Julian Vance has submitted your evaluation for CS 340 Problem Set 2 (Score: 98/100).',
    timestamp: '2 hours ago',
    read: false,
    type: 'grade'
  },
  {
    id: 'notif-2',
    title: 'Assignment Reminder',
    message: 'CS 340: Problem Set 3 is due tomorrow at 11:59 PM.',
    timestamp: '5 hours ago',
    read: false,
    type: 'assignment'
  },
  {
    id: 'notif-3',
    title: 'Tuition Receipt Available',
    message: 'Fall 2026 semester payment confirmation is now archived and available in Financial Services.',
    timestamp: '1 day ago',
    read: true,
    type: 'system'
  }
];

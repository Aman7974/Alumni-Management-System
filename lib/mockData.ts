export type Role = 'Admin' | 'Alumni' | 'Student';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  email: string;
  batch?: string; // e.g., "2015"
  bio?: string;
  skills?: string[];
  interests?: string[];
  education?: string;
  department?: string;
  company?: string;
  jobTitle?: string;
  mentoringAvailable?: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // Full-time, Internship, etc.
  postedBy: string; // User ID
  postedAt: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendees: string[]; // User IDs
}

export interface ForumPost {
  id: string;
  title: string;
  author: string; // User ID
  date: string;
  content: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoLink: string;
  contributors: string[]; // User IDs
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
}

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    role: 'Admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    email: 'admin@college.edu',
  },
  {
    id: 'u2',
    name: 'Agastya Kumar Yadav',
    role: 'Student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Agastya',
    email: '22cs3046@rgipt.ac.in',
    batch: '2026',
    bio: 'I am a 3rd year student studying in rgipt. love to participate in hackathons and solve complex problems. Also i do competative programming. I also won smart india hackathon in the past year.',
    skills: ['C++', 'Python', 'javascript', 'node', 'html', 'css', 'java', 'solana', 'brupsuit'],
    interests: ['blockchain', 'Web Development', 'CyberSecurity', 'Competative Programming', 'Hackathons'],
    education: 'btech',
  },
  {
    id: 'u3',
    name: 'John Doe',
    role: 'Alumni',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    email: 'john@example.com',
    batch: '2015',
    company: 'Tech Corp',
    jobTitle: 'Senior Engineer',
    mentoringAvailable: true,
  },
  {
    id: 'u4',
    name: 'Kari Garcia',
    role: 'Alumni',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kari',
    email: 'kari@example.com',
    batch: '2015',
    department: 'IDD',
    mentoringAvailable: false,
  },
  {
    id: 'u5',
    name: 'Scott Pace',
    role: 'Alumni',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Scott',
    email: 'scott@example.com',
    batch: '2015',
    department: 'IT',
    mentoringAvailable: true,
  },
];

export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'Forensic psychologist',
    company: 'Ferguson-Rodriguez',
    location: 'Lake Williamport',
    type: 'Full-time',
    postedBy: 'u3',
    postedAt: '2023-10-15',
    description: 'Ball their expert picture. Hot security specific me contain. Determine magazine perform yet. Blood compare seat effect why responsibility.',
  },
  {
    id: 'j2',
    title: 'Maintenance engineer',
    company: 'Simpson, Shepard and Williams',
    location: 'Port Bryan',
    type: 'Full-time',
    postedBy: 'u4',
    postedAt: '2023-10-20',
    description: 'Central perform whatever speech natural shoulder. Myself office ok unit key billion. Yard pay nothing at energy. Safe along collection itself room. Can establish more strong.',
  },
];

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Quality-focused 5thgeneration Local Area Network',
    date: '2025-08-19T10:29:15.000Z',
    location: 'Harrisberg',
    description: 'Player build task bed notice wish prepare. Themselves to end treat field own single music. Past energy news would force answer fast.',
    attendees: ['u2'],
  },
  {
    id: 'e2',
    title: 'Synergized mission-critical success',
    date: '2025-08-11T05:42:01.000Z',
    location: 'Sandersbury',
    description: 'Probably run phone such. Under consider write mean seek manager price. Relate however pretty five team next. Home her budget message. Close place face occur here. Defense about it.',
    attendees: [],
  },
];

export const mockForums: ForumPost[] = [
  {
    id: 'f1',
    title: 'How to learn React?',
    author: 'u3',
    date: '2023-10-01',
    content: 'I\'m new to React and looking for resources to get started. Any recommendations?',
    category: 'Learning',
  },
  {
    id: 'f2',
    title: 'Best practices for state management',
    author: 'u4',
    date: '2023-10-02',
    content: 'What are some best practices for managing state in a large React application?',
    category: 'Discussion',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Alumni Network Platform',
    description: 'Building an open source alumni platform for universities.',
    tags: ['React', 'Node.js', 'MongoDB'],
    repoLink: 'https://github.com/example/alumni-platform',
    contributors: ['u2', 'u3'],
  }
];

export const mockCampaigns: DonationCampaign[] = [
  {
    id: 'd1',
    title: 'New Library Computers',
    description: 'Help us upgrade the computers in the main campus library.',
    goal: 10000,
    raised: 4500,
  },
  {
    id: 'd2',
    title: 'CS Scholarship Fund',
    description: 'Annual scholarship fund for outstanding computer science students.',
    goal: 50000,
    raised: 25000,
  }
];

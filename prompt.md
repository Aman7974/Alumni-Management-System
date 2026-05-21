You are an expert Full-Stack Software Engineer and Solutions Architect. Your task is to build a comprehensive, production-ready "Centralized Alumni Management System" from scratch. The application must feature high-fidelity UI, realistic state management, and clear role-based access control (RBAC) for three primary roles: Administrators, Alumni, and Current Students.

### TECH STACK PREFERENCE
- Frontend: Next.js, Tailwind CSS for styling, Lucide React for iconography.
- UI Components: Accessible, clean, modern component structure (inspired by Shadcn UI design principles).
- Backend/Data State: Use a robust mock database/context layer (or neon db postgres) to ensure fully working CRUD operations, filtering, and real-time state persistence across pages.

---

### 1. CORE SYSTEM ARCHITECTURE & FEATURES

#### A. Authentication & Onboarding
- Implement a role-based login/signup system (Admin, Alumni, Student).
- Custom onboarding profiles based on role:
  - Students: Major, graduation year, current skills, interests.
  - Alumni: Graduation year (batch), current company, industry, job title, skills, mentoring availability toggle.

#### B. Intelligent Dashboard
- Dynamic, tailored dashboard layouts for each user role.
- Incorporate a personalized recommendation engine card (simulating AI suggestions based on matching user skills to available jobs, mentors, or open-source projects).
- Include a fixed/collapsible assistant chatbot widget to help users navigate features and simulate smart query handling.

#### C. Smart Directory (Alumni & Student Search)
- A highly filterable registry showing profiles grid/list views.
- Filters: Batch-wise section (graduation year), company name, technical skills, industry.
- Actions: Direct "Message" action trigger creating an active chat session between students and alumni.

#### D. Mentorship & Meeting Scheduler
- Alumni Panel: A dashboard tab to toggle availability times/slots.
- Student Panel: A booking layout displaying available alumni mentors, calendar slot selections, and a "Book Session" confirmation workflow.

#### E. Job & Internship Hub
- Job board layout displaying current job openings, requirements, and hiring company.
- Alumni can post new opportunities with custom metadata tags (Title, Company, Location, Package/Stipend, Skills Required).
- Students can apply directly or click an "Ask for Referral" action which drafts a message template to the posting alum.

#### F. Open-Source & Project Collaboration Portal
- A repository page for college/community projects where alumni and students co-develop.
- Features: Project title, description, repository link placeholder, tech stack badges, and a "Join Project Team" contributor mechanism.

#### G. Event Management & Calendar
- A dedicated page showing upcoming webinars, hackathons, and physical networking meetups.
- Interactive monthly/weekly calendar component marking upcoming events.
- RSVP capability tracking guest lists and user notifications.

#### H. Secure Donation & Fund Tracker
- A fundraising dashboard where alumni can financially back departmental hardware, student scholarships, or campus events.
- Features: Active crowdfunding campaigns with progress bars (Funds Raised vs. Goal Amount) and a simulated safe checkout modal overlay.

---

### 2. UI/UX & ENGINEERING REQUIREMENTS
- Navigation: Responsive sidebar with a sticky profile header and layout shifting optimized for mobile viewports.
- State Management: Use React Context or unified state triggers so that posting a job, scheduling a mentor slot, or making a donation immediately updates the respective UI screens dynamically.
- Aesthetic: Clean minimalist design utilizing a professional corporate color palette (e.g., slate grays, deep blues, and crisp accents) with subtle hover animations and loaders.

### 3. OUTPUT SPECIFICATION
Generate the complete directory structure, setup configurations, and fully written components without placeholders or shortcuts. Ensure that clicking navigation links correctly mounts and transitions between all modules smoothly. Let's build the entire system now.


take the reference from this link
https://youtu.be/jWUx1pUrmBQ
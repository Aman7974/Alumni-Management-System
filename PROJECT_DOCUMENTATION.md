# 📘 Centralized Alumni Management System — Master Documentation

## Project Title
**Centralized Alumni Management System (CAMS)**

## Institution
Rajiv Gandhi Institute of Petroleum Technology (RGIPT)

## Version
v1.0.0

---

## 📌 Table of Contents

1. [Problem Statement](#-problem-statement)
2. [Project Overview](#-project-overview)
3. [Tech Stack](#-tech-stack)
4. [System Architecture](#-system-architecture)
5. [Database Schema](#-database-schema)
6. [Authentication & Authorization](#-authentication--authorization)
7. [User Roles & Access Control](#-user-roles--access-control)
8. [Module-Wise Feature Breakdown](#-module-wise-feature-breakdown)
9. [AI Chatbot Integration](#-ai-chatbot-integration)
10. [API Endpoints](#-api-endpoints)
11. [Deployment](#-deployment)
12. [Environment Variables](#-environment-variables)
13. [How to Run Locally](#-how-to-run-locally)
14. [Demo Credentials](#-demo-credentials)
15. [Future Scope](#-future-scope)

---

## 🎯 Problem Statement

Educational institutions struggle to maintain an active and meaningful relationship with their alumni after graduation. Key challenges include:

- **Disconnected Networks**: Alumni lose touch with their alma mater and fellow graduates.
- **Missed Mentorship Opportunities**: Current students lack a structured way to connect with experienced professionals.
- **Poor Event Participation**: No centralized system to organize and publicize alumni events.
- **Lost Placement Opportunities**: Job referrals and openings shared by alumni don't reach the right students.
- **Fundraising Difficulty**: Institutions have no efficient platform to manage donation campaigns.
- **No Collaboration Hub**: Alumni and students cannot easily collaborate on open-source or community projects.

**CAMS solves all of these problems** by providing a single, unified, role-based web platform where students, alumni, and administrators can connect, collaborate, and contribute.

---

## 🏗 Project Overview

The Centralized Alumni Management System is a **full-stack web application** designed to bridge the gap between an educational institution and its alumni network. It provides:

- A **role-based dashboard** for personalized experiences (Student, Alumni, Admin)
- An **alumni directory** organized by graduation batch
- A **mentorship matching system** connecting students with industry professionals
- A **job board** for posting and discovering career opportunities
- **Discussion forums** for knowledge sharing and community engagement
- **Event management** with RSVP functionality
- **Donation campaigns** with real-time fundraising progress tracking
- **Open-source project collaboration** hub
- An **AI-powered chatbot** (Groq/LLaMA) for platform navigation assistance
- **User profile management** with skills, interests, education, and bio

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | Next.js 16.2.6 (App Router) | Server-side rendering, routing, API routes |
| **UI Library** | React 19.2.4 | Component-based user interface |
| **Language** | TypeScript 5 | Type-safe development |
| **Styling** | Tailwind CSS 4 | Utility-first CSS framework |
| **Animation** | Framer Motion 12 | Smooth micro-animations and transitions |
| **Icons** | Lucide React | Modern SVG icon library |
| **Authentication** | NextAuth.js 4 | Credential-based login with session management |
| **ORM** | Prisma 7.8.0 | Type-safe database queries and migrations |
| **Database** | Neon PostgreSQL (Serverless) | Cloud-hosted PostgreSQL database |
| **DB Adapter** | @prisma/adapter-pg | PostgreSQL driver adapter for Prisma |
| **Password Hashing** | bcryptjs | Secure password hashing |
| **AI Chatbot** | Groq API (LLaMA 4 Scout) | AI-powered assistant for platform help |
| **Deployment** | Vercel | Serverless hosting with CI/CD from GitHub |
| **Utilities** | clsx, tailwind-merge, date-fns | Class merging, date formatting |

---

## 🏛 System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT (Browser)                  │
│  ┌───────────┐  ┌───────────┐  ┌────────────────┐  │
│  │  Next.js   │  │  React    │  │  Tailwind CSS  │  │
│  │  App Router│  │  Components│ │  + Framer Motion│ │
│  └─────┬─────┘  └─────┬─────┘  └────────────────┘  │
│        │              │                              │
│  ┌─────▼──────────────▼─────┐                       │
│  │   AppContext (Global State│                       │
│  │   + Server Actions)       │                       │
│  └─────────────┬─────────────┘                       │
└────────────────┼─────────────────────────────────────┘
                 │
    ┌────────────▼────────────┐
    │    Next.js API Routes   │
    │  ┌──────┐  ┌──────────┐ │
    │  │/auth │  │/api/chat  │ │
    │  └──┬───┘  └────┬─────┘ │
    └─────┼───────────┼───────┘
          │           │
    ┌─────▼───┐  ┌────▼─────┐
    │NextAuth │  │ Groq API │
    │Sessions │  │ (LLaMA)  │
    └─────┬───┘  └──────────┘
          │
    ┌─────▼───────────────┐
    │   Prisma ORM        │
    │   (with PG Adapter) │
    └─────────┬───────────┘
              │
    ┌─────────▼───────────┐
    │   Neon PostgreSQL   │
    │   (Serverless DB)   │
    └─────────────────────┘
```

---

## 🗃 Database Schema

### Models

| Model | Description |
|---|---|
| **User** | Stores all users (students, alumni, admins) with profile details |
| **Job** | Job postings linked to the alumni/admin who posted them |
| **Event** | Campus/alumni events with date, location, description |
| **EventAttendee** | Many-to-many link between Users and Events (RSVPs) |
| **ForumPost** | Discussion threads with title, content, category, author |
| **Project** | Open-source projects with tags and repository links |
| **ProjectContributor** | Many-to-many link between Users and Projects |
| **DonationCampaign** | Fundraising campaigns with goal and amount raised |

### User Model Fields

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | String | Full name |
| `email` | String (unique) | Login email |
| `password` | String (hashed) | Bcrypt-hashed password |
| `role` | Enum (ADMIN, ALUMNI, STUDENT) | Access role |
| `avatar` | String (URL) | Profile picture |
| `batch` | String | Graduation year (e.g., "2015") |
| `bio` | String | Personal biography |
| `skills` | String[] | Technical skills array |
| `interests` | String[] | Personal interests array |
| `education` | String | Educational qualification |
| `department` | String | Department (CSE, IT, IDD, etc.) |
| `company` | String | Current employer |
| `jobTitle` | String | Current position |
| `mentoringAvailable` | Boolean | Whether available as a mentor |

---

## 🔐 Authentication & Authorization

### Authentication Method
- **NextAuth.js** with **Credentials Provider**
- Password verification using **bcryptjs** comparison
- Session-based authentication with JWT strategy

### Login Flow
1. User enters email and password on the login page (`/login`)
2. NextAuth validates credentials against the database
3. On success, a session is created and the user is redirected to the dashboard (`/`)
4. On failure, an error message is displayed

### Session Data
The session contains: `user.id`, `user.name`, `user.email`, `user.role`

---

## 👥 User Roles & Access Control

The application supports **three roles**, each with distinct capabilities:

### 🟣 Admin

| Feature | Access Level |
|---|---|
| Dashboard | Full system overview with user count and campaign stats |
| AI Suggestion | Platform analytics and system management suggestions |
| Alumni Directory | Full read access to all batches |
| Events | View, RSVP |
| Forums | Create posts, view all discussions |
| Mentorship | N/A (Admin-focused) |
| Placement | Post job opportunities, view all listings |
| Open Source | View projects, join teams |
| Donations | View and manage all campaigns |
| Profiles | View any user's profile |

### 🟢 Alumni

| Feature | Access Level |
|---|---|
| Dashboard | Personalized mentorship suggestions |
| AI Suggestion | Mentorship requests from students in their field |
| Alumni Directory | View batch-mates and other batches |
| Events | View, RSVP to events |
| Forums | Create posts, engage in discussions |
| Mentorship | **Toggle availability** as a mentor; manage mentoring status |
| Placement | **Post job opportunities** for students |
| Open Source | View projects, submit projects, join teams |
| Donations | Donate to campaigns |
| Profile | Full profile with company, job title, skills |

### 🔵 Student

| Feature | Access Level |
|---|---|
| Dashboard | Personalized job recommendations based on skills |
| AI Suggestion | Skill-matched job opportunities from the board |
| Alumni Directory | Browse alumni by batch for networking |
| Events | View events, **RSVP** to attend |
| Forums | Create posts, ask questions, engage in discussions |
| Mentorship | **Browse available mentors**, book 1:1 sessions |
| Placement | View job listings, **Apply Now**, **Ask for Referral** |
| Open Source | View projects, join collaborative teams |
| Donations | Donate to campaigns |
| Profile | View/manage profile with skills, interests, education |

### Role Comparison Matrix

| Feature | Student | Alumni | Admin |
|---|:---:|:---:|:---:|
| View Dashboard | ✅ | ✅ | ✅ |
| AI Suggestions | Jobs | Mentees | System Stats |
| Browse Batches | ✅ | ✅ | ✅ |
| RSVP Events | ✅ | ✅ | ✅ |
| Create Forum Posts | ✅ | ✅ | ✅ |
| Post Jobs | ❌ | ✅ | ✅ |
| Apply to Jobs | ✅ | ❌ | ❌ |
| Ask for Referral | ✅ | ❌ | ❌ |
| Be a Mentor | ❌ | ✅ | ❌ |
| Book Mentor Session | ✅ | ❌ | ❌ |
| Donate | ✅ | ✅ | ✅ |
| AI Chatbot | ✅ | ✅ | ✅ |
| View Profiles | ✅ | ✅ | ✅ |

---

## 📦 Module-Wise Feature Breakdown

### 1. 🏠 Dashboard (`/`)
- **Personalized welcome banner** with role-specific messaging
- **AI Suggestion Card** — context-aware recommendations:
  - Students → matched job opportunities
  - Alumni → mentorship requests
  - Admin → system statistics (user count, campaigns)
- **Quick stats** — total alumni, events, forum posts
- **Recent forum discussions** preview
- **Upcoming events** with quick links

### 2. 🔑 Login Page (`/login`)
- Secure credential-based authentication
- Glassmorphic card design with gradient background
- **Quick Demo Access** buttons to instantly fill credentials for:
  - Admin (`admin@college.edu`)
  - Student (`22cs3046@rgipt.ac.in`)
  - Alumni (`john@example.com`)
- All demo accounts use password: `password123`

### 3. 👨‍🎓 Alumni Directory / Batches (`/batches`)
- Grid of batch cards (2015–2023)
- Click any batch to view its alumni members
- Each batch detail page (`/batches/[year]`) displays:
  - Alumni cards with avatar, name, department
  - Search/filter functionality by name or department
  - LinkedIn and Chat quick links

### 4. 📅 Events & Calendar (`/events`)
- All upcoming events displayed in a card grid
- Each event shows: title, date badge, time, location, attendee count
- **RSVP Now / Cancel RSVP** toggle button
- **Filter tabs**: "All Events" vs "My RSVPs"

### 5. 💬 Forums (`/forums`)
- Thread-based discussion forum
- Each post displays: author avatar, name, date, category badge, content
- **Create New Post** sidebar form with title and content
- All roles can create and view posts

### 6. 🧑‍🏫 Mentorship (`/mentorship`)
- **Student View**: Browse available mentors (alumni with `mentoringAvailable: true`)
  - Click a mentor to see their profile (name, job title, company, batch, department)
  - **Book Session** panel with date and time slot selection
  - Confirm booking with one click
- **Alumni View**: Mentorship Dashboard
  - Toggle availability status (Available / Unavailable)

### 7. 💼 Placement & Job Board (`/placement`)
- All job listings displayed as cards with title, company, location, type, posted date
- **Students can**:
  - View job descriptions
  - Click **"Apply Now"** to submit applications
  - Click **"Ask for Referral"** to request alumni referrals
- **Alumni/Admin can**:
  - Click **"Post a Job"** to create new listings
  - Fill in job title, company, location, type (Full-time/Internship/Part-time/Contract), and description

### 8. 💰 Donations & Fundraising (`/donation`)
- Active donation campaigns displayed as cards
- Each campaign shows: title, description, raised amount, goal, and progress bar
- **Donate to Campaign** flow:
  - Select a campaign → Choose amount ($25, $50, $100, $500) → Confirm Donation
  - Real-time progress bar updates

### 9. 🔓 Open Source Collaboration (`/opensource`)
- Community and college projects listed with:
  - Title, description, tech tags, contributor count
  - **View Repository** link (GitHub)
  - **Join Team** button
- **Submit Project** button for new contributions

### 10. 👤 User Profile (`/profile`)
- Detailed profile page with gradient banner and large avatar
- Sections: Bio, Skills (badge chips), Education, Current Role (job title + company), Interests
- Can view any user's profile via `/profile?id=<userId>`
- Social link icons (GitHub, LinkedIn, Portfolio)

---

## 🤖 AI Chatbot Integration

### Technology
- **Provider**: Groq Cloud API
- **Model**: `meta-llama/llama-4-scout-17b-16e-instruct` (LLaMA 4 Scout)
- **API Endpoint**: `https://api.groq.com/openai/v1/chat/completions`

### Architecture
```
User → ChatbotWidget (Frontend)
         → POST /api/chat (Next.js API Route)
              → Groq API (Server-side, API key secured)
                   → AI Response → User
```

### Features
- Floating chat bubble widget (bottom-right corner of every page)
- Full conversation history maintained per session
- System prompt: Acts as an Alumni Portal assistant helping with navigation, finding mentors, events, etc.
- Animated loading dots while waiting for AI response
- **Auto-scroll** to latest messages
- Input disabled during response generation to prevent double-sends

### Security
- The Groq API key is stored server-side only (in `.env`)
- The frontend never sees the API key — all requests proxy through `/api/chat`

---

## 🌐 API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/[...nextauth]` | NextAuth authentication endpoints |
| POST | `/api/chat` | AI chatbot proxy to Groq API |

### Server Actions (via `lib/actions.ts`)
- `getUsers()` — Fetch all users from database
- `getJobs()` — Fetch all job postings with author info
- `getEvents()` — Fetch all events with attendees
- `getForumPosts()` — Fetch all forum posts with authors
- `addForumPost()` — Create a new forum discussion
- `addJob()` — Create a new job posting
- `rsvpEvent()` — RSVP to an event (toggle)
- `getProjects()` — Fetch open-source projects
- `getCampaigns()` — Fetch donation campaigns
- `donate()` — Process a donation to a campaign

---

## 🚀 Deployment

### Platform: Vercel

- **Auto-deploy** on push to `main` branch on GitHub
- **Build command**: `npm run build`
- **Postinstall**: `prisma generate` (auto-generates Prisma client during build)
- **Database**: Neon PostgreSQL (serverless, connection pooling enabled)

### Repository
`https://github.com/Aman7974/Alumni-Management-System.git`

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `GROQ_API_KEY` | Groq Cloud API key for AI chatbot |
| `NEXTAUTH_SECRET` | Secret key for NextAuth session encryption |
| `NEXTAUTH_URL` | Base URL of the application (e.g., `http://localhost:3000`) |

---

## 💻 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/Aman7974/Alumni-Management-System.git
cd Alumni-Management-System

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env file with DATABASE_URL, GROQ_API_KEY, NEXTAUTH_SECRET, NEXTAUTH_URL

# 4. Generate Prisma client
npx prisma generate

# 5. Run database migrations
npx prisma db push

# 6. Seed the database with demo data
npx prisma db seed

# 7. Start the development server
npm run dev

# App will be available at http://localhost:3000
```

---

## 🔓 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@college.edu` | `password123` |
| **Student** | `22cs3046@rgipt.ac.in` | `password123` |
| **Alumni** | `john@example.com` | `password123` |

---

## 🔮 Future Scope

- **Real-time Chat**: Direct messaging between students and alumni using WebSockets
- **Email Notifications**: Automated emails for event reminders, mentorship requests, and job alerts
- **Analytics Dashboard**: Admin-level insights with charts (events attendance trends, donation graphs, user growth)
- **Resume Builder**: AI-assisted resume creation for students
- **Mobile App**: React Native companion application
- **Calendar Integration**: Sync events with Google Calendar / Outlook
- **Video Mentorship**: Built-in video calling for mentorship sessions
- **Alumni Verification**: Automated verification workflow for new alumni registrations
- **Advanced AI Recommendations**: ML-based job matching using user skills and alumni career trajectories
- **Multi-language Support**: Internationalization (i18n) for wider accessibility

---

## 📄 License

This project is developed as an academic project for RGIPT.

---

*Generated on: May 23, 2026*
*Author: Agastya Kumar Yadav (22CS3046)*

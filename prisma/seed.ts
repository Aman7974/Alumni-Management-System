import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config({ path: '.env' });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('Seeding database...');
  const passwordHash = await bcrypt.hash('password123', 10);

  // Admin User
  await prisma.user.upsert({
    where: { email: 'admin@college.edu' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@college.edu',
      password: passwordHash,
      role: Role.ADMIN,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
  });

  // Student User
  await prisma.user.upsert({
    where: { email: '22cs3046@rgipt.ac.in' },
    update: {},
    create: {
      name: 'Agastya Kumar Yadav',
      email: '22cs3046@rgipt.ac.in',
      password: passwordHash,
      role: Role.STUDENT,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Agastya',
      batch: '2026',
      bio: 'I am a 3rd year student studying in rgipt. love to participate in hackathons and solve complex problems. Also i do competative programming. I also won smart india hackathon in the past year.',
      skills: ['C++', 'Python', 'javascript', 'node', 'html', 'css', 'java', 'solana', 'brupsuit'],
      interests: ['blockchain', 'Web Development', 'CyberSecurity', 'Competative Programming', 'Hackathons'],
      education: 'btech',
    },
  });

  // Alumni User
  await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password: passwordHash,
      role: Role.ALUMNI,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      batch: '2015',
      company: 'Tech Corp',
      jobTitle: 'Senior Engineer',
      mentoringAvailable: true,
    },
  });

  // Seed some Jobs
  const adminUser = await prisma.user.findUnique({ where: { email: 'admin@college.edu' } });
  const alumniUser = await prisma.user.findUnique({ where: { email: 'john@example.com' } });

  if (alumniUser) {
    await prisma.job.upsert({
      where: { id: 'seed-job-1' },
      update: {},
      create: {
        id: 'seed-job-1',
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        type: 'Full-Time',
        description: 'Build modern web UIs using React and Next.js.',
        postedById: alumniUser.id,
      },
    });
    await prisma.job.upsert({
      where: { id: 'seed-job-2' },
      update: {},
      create: {
        id: 'seed-job-2',
        title: 'Backend Intern',
        company: 'StartupXYZ',
        location: 'Bangalore',
        type: 'Internship',
        description: 'Work on scalable Node.js services.',
        postedById: alumniUser.id,
      },
    });
  }

  // Seed Events
  await prisma.event.upsert({
    where: { id: 'seed-event-1' },
    update: {},
    create: {
      id: 'seed-event-1',
      title: 'Annual Alumni Meet 2026',
      date: new Date('2026-08-15'),
      location: 'RGIPT Campus, Jais',
      description: 'Reconnect with your batchmates and network with industry leaders.',
    },
  });
  await prisma.event.upsert({
    where: { id: 'seed-event-2' },
    update: {},
    create: {
      id: 'seed-event-2',
      title: 'Hackathon 2026',
      date: new Date('2026-09-20'),
      location: 'Online',
      description: 'A 24-hour hackathon open to all students and alumni.',
    },
  });

  // Seed Projects
  await prisma.project.upsert({
    where: { id: 'seed-proj-1' },
    update: {},
    create: {
      id: 'seed-proj-1',
      title: 'Alumni Portal v2',
      description: 'Open source revamp of the college alumni portal.',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
      repoLink: 'https://github.com/rgipt/alumni-portal',
    },
  });

  // Seed Donation Campaigns
  await prisma.donationCampaign.upsert({
    where: { id: 'seed-campaign-1' },
    update: {},
    create: {
      id: 'seed-campaign-1',
      title: 'Library Renovation Fund',
      description: 'Help us build a modern digital library for all students.',
      goal: 500000,
      raised: 125000,
    },
  });
  await prisma.donationCampaign.upsert({
    where: { id: 'seed-campaign-2' },
    update: {},
    create: {
      id: 'seed-campaign-2',
      title: 'Scholarship for Merit Students',
      description: 'Support deserving students with financial aid.',
      goal: 200000,
      raised: 80000,
    },
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

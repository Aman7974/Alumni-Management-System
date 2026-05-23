import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('Seeding the database...');

  // 1. Create Users
  const passwordHash = await bcrypt.hash('password123', 10);

  // Profile User
  const agastya = await prisma.user.upsert({
    where: { email: '22cs3046@rgipt.ac.in' },
    update: {},
    create: {
      name: 'Agastya Kumar Yadav',
      email: '22cs3046@rgipt.ac.in',
      password: passwordHash,
      role: 'STUDENT',
      batch: '2026',
      bio: 'I am a 3rd year student studing in rgipt . love to participate in hackathons and solove complex problems. Also i do competative programming . i also won smart india hackathon in the past year.',
      education: 'btech',
      skills: ['C++', 'Python', 'javascript', 'node', 'html', 'css', 'java', 'solana', 'brupsuit'],
      interests: ['blockchain', 'Web Development', 'CyberSecurity', 'Competative Programming', 'Hackathons'],
    },
  });

  // Authors for Forums
  const john = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: { name: 'John Doe', email: 'john@example.com', password: passwordHash, role: 'ALUMNI' },
  });

  const jane = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: { name: 'Jane Smith', email: 'jane@example.com', password: passwordHash, role: 'ALUMNI' },
  });

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { name: 'Alice Johnson', email: 'alice@example.com', password: passwordHash, role: 'ALUMNI' },
  });

  // 2015 Alumni Directory Batch
  const alumni2015 = [
    { name: 'Kari Garcia', email: 'kari@example.com', department: 'IDD', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kari', mentoringAvailable: true, jobTitle: 'Senior Developer', company: 'Google' },
    { name: 'Scott Pace', email: 'scott@example.com', department: 'IT', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Scott', mentoringAvailable: false, jobTitle: 'Product Manager', company: 'Microsoft' },
    { name: 'Rodney Avery', email: 'rodney@example.com', department: 'IT', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rodney', mentoringAvailable: true, jobTitle: 'Frontend Engineer', company: 'Meta' },
    { name: 'Susan Briggs', email: 'susan@example.com', department: 'IDD', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Susan', mentoringAvailable: false },
    { name: 'Alexis Sanchez', email: 'alexis@example.com', department: 'IT', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alexis', mentoringAvailable: true, jobTitle: 'Data Scientist', company: 'Amazon' },
    { name: 'Charles Hernandez', email: 'charles@example.com', department: 'IDD', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Charles', mentoringAvailable: false },
    { name: 'Cassandra Anderson', email: 'cassandra@example.com', department: 'CSE', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cassandra', mentoringAvailable: true, jobTitle: 'Backend Engineer', company: 'Netflix' },
    { name: 'Mary Moore', email: 'mary@example.com', department: 'CSE', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Mary', mentoringAvailable: false },
    { name: 'Andrea Greene', email: 'andrea@example.com', department: 'EV', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Andrea', mentoringAvailable: false },
  ];

  for (const alumni of alumni2015) {
    await prisma.user.upsert({
      where: { email: alumni.email },
      update: {
        mentoringAvailable: alumni.mentoringAvailable,
        jobTitle: alumni.jobTitle,
        company: alumni.company,
      },
      create: {
        name: alumni.name,
        email: alumni.email,
        password: passwordHash,
        role: 'ALUMNI',
        batch: '2015',
        department: alumni.department,
        avatar: alumni.avatar,
        mentoringAvailable: alumni.mentoringAvailable,
        jobTitle: alumni.jobTitle,
        company: alumni.company,
      },
    });
  }

  // Generate more alumni for batches 2016-2023
  const departments = ['CSE', 'IT', 'IDD', 'ECE', 'ME', 'CE', 'CHE'];
  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Tesla', 'SpaceX', 'TCS', 'Infosys', 'Wipro'];
  const jobTitles = ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer', 'System Analyst', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Cloud Architect'];

  for (let year = 2016; year <= 2023; year++) {
    for (let i = 1; i <= 6; i++) {
      const name = `Alumni ${year} ${i}`;
      const email = `alumni${year}_${i}@example.com`;
      const department = departments[Math.floor(Math.random() * departments.length)];
      const company = companies[Math.floor(Math.random() * companies.length)];
      const jobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      const mentoringAvailable = Math.random() > 0.5;

      await prisma.user.upsert({
        where: { email },
        update: {
          mentoringAvailable,
          jobTitle,
          company,
        },
        create: {
          name,
          email,
          password: passwordHash,
          role: 'ALUMNI',
          batch: year.toString(),
          department,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name.replace(/ /g, '')}`,
          mentoringAvailable,
          jobTitle,
          company,
        },
      });
    }
  }

  // 2. Create Forums
  const forums = [
    {
      title: 'How to learn React?',
      content: "I'm new to React and looking for resources to get started. Any recommendations?",
      category: 'General',
      authorId: john.id,
      createdAt: new Date('2023-10-01'),
    },
    {
      title: 'Best practices for state management',
      content: 'What are some best practices for managing state in a large React application?',
      category: 'General',
      authorId: jane.id,
      createdAt: new Date('2023-10-02'),
    },
    {
      title: 'React vs Angular',
      content: 'Can someone explain the key differences between React and Angular?',
      category: 'General',
      authorId: alice.id,
      createdAt: new Date('2023-10-03'),
    },
  ];

  for (const forum of forums) {
    // Basic check if title exists to avoid duplicate seed runs throwing errors
    const exists = await prisma.forumPost.findFirst({ where: { title: forum.title } });
    if (!exists) {
      await prisma.forumPost.create({
        data: forum,
      });
    }
  }

  // 3. Create Jobs
  const jobs = [
    {
      title: 'Forensic psychologist',
      company: 'Ferguson-Rodriguez - Lake Williamport',
      location: 'Lake Williamport',
      type: 'Full-time',
      description: 'Ball their expert picture. Hot security specific me contain. Determine magazine perform yet. Blood compare seat effect why responsibility.',
      postedById: john.id,
    },
    {
      title: 'Maintenance engineer',
      company: 'Simpson, Shepard and Williams - Port Bryan',
      location: 'Port Bryan',
      type: 'Full-time',
      description: 'Central perform whatever speech natural shoulder. Myself office ok unit key billion. Yard pay nothing at energy. Safe along collection itself room. Can establish more strong.',
      postedById: jane.id,
    },
  ];

  for (const job of jobs) {
    const exists = await prisma.job.findFirst({ where: { title: job.title } });
    if (!exists) {
      await prisma.job.create({
        data: job,
      });
    }
  }

  // 4. Create Events
  const events = [
    {
      title: 'Quality-focused 5thgeneration Local Area Network',
      date: new Date('2025-08-19T10:29:15.000Z'),
      location: 'Harrisberg',
      description: 'Player build task bed notice wish prepare. Themselves to end treat field own single music. Past energy news would force answer fast.',
    },
    {
      title: 'Synergized mission-critical success',
      date: new Date('2025-08-11T05:42:01.000Z'),
      location: 'Sandersbury',
      description: 'Probably run phone such. Under consider write mean seek manager price. Relate however pretty five team next. Home her budget message. Close place face occur here. Defense about it.',
    },
  ];

  for (const event of events) {
    const exists = await prisma.event.findFirst({ where: { title: event.title } });
    if (!exists) {
      await prisma.event.create({
        data: event,
      });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { diagrams, type Diagram } from "@/lib/diagrams";
import { GH_USER } from "@/lib/github";

export const profile = {
  name: "Akash Kishan Karri",
  role: "full-stack developer",
  email: "akashkishankarri1@gmail.com",
  phone: "+91-8374849797",
  github: `https://github.com/${GH_USER}`,
  linkedin: "https://linkedin.com/in/akashkishankarri",
  location: "Visakhapatnam, India",
};

export const stats = [
  { value: 9.74, decimals: 2, prefix: "", suffix: " / 10", label: "CGPA", icon: "graduation", fill: 97 },
  { value: 100, decimals: 0, prefix: "+", suffix: "", label: "Community members led", icon: "users", fill: 80 },
  { value: 90, decimals: 0, prefix: "", suffix: "K+", label: "Records managed & automated", icon: "database", fill: 90 },
  { value: 200, decimals: 0, prefix: "+", suffix: "", label: "Students mentored", icon: "mentor", fill: 85 },
];

export type Category = "Web" | "AI / ML" | "Tools";

export type Project = {
  slug: string;
  title: string;
  short: string; // card-sized name
  summary: string; // one line for lists
  category: Category;
  year: string;
  role: string;
  featured?: boolean;
  bullets: string[];
  tags: string[];
  photos: string[]; // screenshots in /public/projects; empty = the diagram is the cover
  thumb?: string; // preview image when there are no screenshots
  details: string;
  repos: string[]; // GitHub repo names, first one is the primary
  diagram: Diagram;
  tint: string; // accent behind the project's screenshots
  liveUrl?: string;
};

export const categories: Category[] = ["Web", "AI / ML", "Tools"];

export const projects: Project[] = [
  {
    slug: "ideasprint-portal",
    title: "TMCG IdeaSprint 4.0 Portal",
    short: "IdeaSprint Portal",
    summary: "The registration and operations portal for GITAM's IdeaSprint 4.0 hackathon, built with TMCG and MDC.",
    category: "Web",
    year: "2026",
    role: "Team of 4 · full-stack",
    featured: true,
    bullets: [
      "Built the end-to-end portal for IdeaSprint 4.0, an intra-campus innovation event run by TMCG and MDC across GITAM's Visakhapatnam, Hyderabad and Bengaluru campuses.",
      "Team registration wizard with unique-team, email, registration-number and phone checks, generated team and participant IDs, and Google sign-in limited to GITAM accounts through Supabase.",
      "Role-based dashboards for Super Admin, campus SPOCs, team leads and members: approvals, attendance, NOC and slide-deck uploads, problem statements, exit forms, ID cards and broadcast notifications.",
    ],
    tags: ["Next.js 16", "TypeScript", "Supabase", "Postgres", "GSAP"],
    photos: ["/projects/ideasprint1.jpg", "/projects/ideasprint2.jpg", "/projects/ideasprint3.jpg", "/projects/ideasprint4.jpg"],
    details:
      "IdeaSprint 4.0 runs a 100-minute assessment and an 18-hour build hackathon on each campus before a grand finale, and every part of that used to be spreadsheets and forms. The portal digitises it: a public site with the timeline, rounds and prizes; a guided team registration that enforces team-size and uniqueness rules; and dashboards where SPOCs see only their own teams while admins run approvals, attendance and documents. It is a Next.js 16 app on Vercel with Supabase for auth, Postgres and file storage, built by a team of four.",
    repos: ["mdcgitam/tmcg-ideasprint-portal"],
    diagram: diagrams.ideasprint,
    tint: "#E3B341",
    liveUrl: "https://tmcg-ideasprint-portal.vercel.app",
  },
  {
    slug: "attendance-system",
    title: "Deep Learning-Based Attendance System",
    short: "Face Attendance",
    summary: "Face-recognition attendance with FaceNet embeddings, a FastAPI backend and a React dashboard.",
    category: "AI / ML",
    year: "2026",
    role: "Solo · ML + full-stack",
    featured: true,
    bullets: [
      "Built an automated attendance system using FaceNet and OpenCV for deep-learning facial recognition and identity verification.",
      "Developed workflows for face detection, object recognition, and OCR-based extraction to reduce manual attendance operations.",
      "Explored pretrained Hugging Face models for vision and multimodal tasks; evaluated outputs on practical input conditions.",
    ],
    tags: ["Python", "FastAPI", "FaceNet", "OpenCV", "React", "Firebase"],
    photos: ["/projects/dl1-clean.jpg", "/projects/dl2-clean.jpg", "/projects/dl3-clean.jpg"],
    details:
      "Built as a hands-on exploration of applying deep learning to a genuinely tedious problem - manual attendance. The pipeline runs face detection first, then passes crops through FaceNet to generate embeddings and match them against a registered set of faces, with OpenCV handling the camera feed and preprocessing. The FastAPI backend ships as a Docker container to a Hugging Face Space through GitHub Actions, while the React frontend on Vercel gives admins a live-camera scanner and members their own attendance view.",
    repos: ["DL_Backend", "DL_Frontend"],
    diagram: diagrams.attendance,
    tint: "#3B82F6",
    liveUrl: "https://dl-attendance.vercel.app",
  },
  {
    slug: "cxr-platform",
    title: "CXR Official Website & Inventory Management Platform",
    short: "CXR Platform",
    summary: "Three.js site and real-time equipment inventory for GITAM's AR/VR/XR student body.",
    category: "Web",
    year: "2026",
    role: "Web dev intern · full-stack",
    featured: true,
    bullets: [
      "Developed and deployed the official website for CXR, GITAM's AR/VR/MR/XR student body, with interactive 3D experiences using Three.js.",
      "Integrated Firebase Authentication, Cloud Firestore, and automated email notifications for request submission, approvals, issuance, and returns.",
      "Built an admin dashboard to monitor inventory, issued assets, user details, request history, and equipment availability in real time.",
    ],
    tags: ["React", "Three.js", "Firebase", "Cloud Functions"],
    photos: ["/projects/cxr1-clean.jpg", "/projects/cxr2-clean.jpg", "/projects/cxr3-clean.jpg"],
    details:
      "Went beyond a typical informational site by building interactive Three.js scenes to actually showcase CXR's AR/VR/MR work rather than just describing it. The inventory side handles the operational half - Firebase Authentication for access control, Firestore for real-time equipment status, and a Cloud Function that emails people at each stage of a request (submitted, approved, issued, returned) so nothing gets lost in manual follow-ups.",
    repos: ["CXRRRR"],
    diagram: diagrams.cxr,
    tint: "#14B8A6",
    liveUrl: "https://cxrrrr.vercel.app",
  },
  {
    slug: "mdc-website",
    title: "MDC Official Website",
    short: "MDC Website",
    summary: "The official site and admin dashboard for Meta Developer Communities, GITAM.",
    category: "Web",
    year: "2026",
    role: "Lead developer",
    featured: true,
    bullets: [
      "Developed and deployed the official website for Meta Developer Communities (MDC), GITAM - the primary platform for community activities and announcements.",
      "Built responsive, reusable React components with Firebase integration for event management, team profiles, and content updates.",
      "Designed an admin dashboard enabling organizers to manage events, announcements, and website content, reducing manual updates and improving operational efficiency.",
    ],
    tags: ["React", "Tailwind CSS", "Framer Motion", "Firebase"],
    photos: ["/projects/mdc1.jpg", "/projects/mdc2.jpg", "/projects/mdc3.jpg", "/projects/mdc4.jpg"],
    details:
      "The site is the front door for MDC's activities - event pages, team profiles, and announcements that used to be managed manually. Built the whole thing with reusable React components wired to Firebase so organizers could add or update an event without touching code, plus an admin dashboard scoped to just the people who run the community, keeping account management simple while giving them real control over content.",
    repos: ["MDC_official_demo"],
    diagram: diagrams.mdc,
    tint: "#6366F1",
    liveUrl: "https://mdcgitam.in",
  },
  {
    slug: "prodvis",
    title: "ProdVis-AI Paraphraser",
    short: "ProdVis-AI",
    summary: "A streaming AI paraphraser with uploadable, switchable skills.",
    category: "AI / ML",
    year: "2026",
    role: "Solo · frontend + API design",
    bullets: [
      "Built a React 19 + Tailwind 4 chat interface that streams model output token by token using the Fetch ReadableStream API.",
      "Designed a pluggable skills system: upload a skill as a .zip, list what is installed, and switch each one on or off from a sidebar.",
      "Added one-click copy of results, auto-scrolling chat and a generation lock that stops duplicate requests.",
    ],
    tags: ["React 19", "Tailwind 4", "Streaming", "LLM", "Vite"],
    photos: ["/projects/prodvis1.jpg"],
    details:
      "ProdVis started as a paraphrasing tool and turned into an experiment in how an LLM app should feel. Instead of waiting for a full response, the frontend reads the response body as a stream and paints each chunk as it arrives. The sidebar treats prompts as installable skills - zip files the backend stores and toggles - so the same chat can change behaviour without a redeploy.",
    repos: ["ProdVis"],
    diagram: diagrams.prodvis,
    tint: "#A855F7",
  },
  {
    slug: "shiftflow",
    title: "ShiftFlow Roster Generator",
    short: "ShiftFlow",
    summary: "Generates fair three-shift rosters for any team and date range, then exports CSV.",
    category: "Tools",
    year: "2026",
    role: "Solo",
    bullets: [
      "Wrote a rotation algorithm that fills three shifts with three people each, every day, while giving everyone one off day per 7-day block.",
      "Made every cell editable: click to cycle an assignment, and validation instantly flags uncovered shifts or missing off days.",
      "Shipped as a single dependency-free HTML file with CSV export, so anyone can run it offline.",
    ],
    tags: ["JavaScript", "Algorithms", "HTML / CSS"],
    photos: ["/projects/shift1.jpg", "/projects/shift2.jpg"],
    details:
      "Built for a real scheduling headache: planning who works which shift without anyone being overworked. You enter a date range and a list of names, and ShiftFlow rotates people through shifts A, B and C so every shift has three people, with the rest held as reserves. Manual edits are first-class - the validator re-checks coverage after every change - and the finished roster downloads as a CSV.",
    repos: ["Rooster-Generator"],
    diagram: diagrams.shiftflow,
    tint: "#F27059",
  },
  {
    slug: "vital-vault",
    title: "Vital Vault",
    short: "Vital Vault",
    summary: "A lend-and-rent marketplace for GITAM students' calculators, lab aprons and laptops.",
    category: "Web",
    year: "2025",
    role: "Solo",
    bullets: [
      "Built a campus marketplace where GITAM students can lend or rent essentials like calculators, lab aprons and laptops.",
      "Separate lender and renter portals with item listings, pricing, time slots and a booking flow that marks items as rented.",
      "GITAM-only registration, a session guard on every page and rental notifications for lenders.",
    ],
    tags: ["JavaScript", "HTML / CSS", "localStorage"],
    photos: ["/projects/vv1.jpg", "/projects/vv2.jpg", "/projects/vv3.jpg"],
    details:
      "An early project built around a problem every first-year knows: needing a scientific calculator or a lab apron for one day. Vital Vault lets students list what they own with a price and availability window, and lets others browse and book it. It is a plain HTML, CSS and JavaScript app with state in the browser - a small, complete product loop that taught me how much a booking flow has to handle.",
    repos: ["Vital-Vault"],
    diagram: diagrams.vitalVault,
    tint: "#EAB308",
  },
  {
    slug: "relative-grading",
    title: "Relative Grading Tool",
    short: "Relative Grading",
    summary: "A Java Swing app that grades a class on a curve and charts the distribution.",
    category: "Tools",
    year: "2025",
    role: "Solo",
    bullets: [
      "Reads a class's marks from CSV and computes the mean and standard deviation of the cohort.",
      "Assigns grades relative to class performance instead of fixed cut-offs, then writes the results back to CSV.",
      "Draws an interactive Swing bar chart of the grade distribution; click a bar to see the students in it.",
    ],
    tags: ["Java", "Swing", "OOP"],
    photos: [],
    thumb: "/projects/grading-diagram.jpg",
    details:
      "A practice in object-oriented design: Person and Student model the data, a Grading interface defines the contract, and GradingSystem implements loading, statistics and grade assignment. The GradeVisualizer panel turns the result into a clickable chart, which made it much easier to sanity-check whether a curve was fair.",
    repos: ["RelativeGradingTool"],
    diagram: diagrams.grading,
    tint: "#94A3B8",
  },
];

export const previewOf = (p: Project) => p.photos[0] ?? p.thumb ?? null;

export { repoUrl } from "@/lib/github";

export const skillGroups = [
  { label: "Languages", items: ["Java", "Python", "C/C++", "SQL", "JavaScript", "HTML/CSS"] },
  { label: "Frameworks", items: ["React.js", "Three.js", "FastAPI"] },
  { label: "Backend & Cloud", items: ["Firebase", "Firestore", "Firebase Auth", "Vercel"] },
  { label: "Developer Tools", items: ["Git", "GitHub", "Docker", "VS Code", "Postman"] },
  { label: "Libraries", items: ["OpenCV", "NumPy", "Pandas", "Matplotlib"] },
  { label: "Core Concepts", items: ["DSA", "DBMS", "Operating Systems", "Computer Networks", "OOP", "REST APIs"] },
];

export const leadership = [
  {
    when: "Apr 2025 - Jun 2027",
    title: "Member → Vice President",
    org: "MDC, GITAM University",
    logo: "/projects/mdclogo.webp",
    location: "Visakhapatnam, India",
    desc: "Joined as a member in Apr 2025, built the club's official website, and was elected Vice President for Jun 2026 – Jun 2027. Now help lead a 100+ student community.",
    details: [
      "Apr 2025 – Jun 2026, Member: built and deployed MDC's official website, with an admin dashboard so organizers could publish events without touching code.",
      "Jun 2026 – Jun 2027, Vice President: co-lead MDC's direction with the leadership team - planning the event calendar, workshops, and hackathons.",
      "Mentor members on software development fundamentals: Git workflows, building for the web, and how to actually ship a project instead of leaving it half-built.",
      "Ran the campaign and materials behind MDC's leadership elections, including the pitch deck for the VP candidacy.",
    ],
  },
];

export const internships = [
  {
    when: "May 2026 - Jul 2026",
    title: "Associate Software Engineering Intern",
    org: "Accenture",
    logo: "/projects/accenture.png",
    location: "Hyderabad, India",
    desc: "Supported Oracle APEX, FCCS, and EPBCS applications through maintenance, configuration, user support, data-quality checks, and issue investigation.",
    details: [
      "Worked within Accenture's enterprise performance management practice, supporting live Oracle EPM applications used for financial planning and consolidation.",
      "Handled day-to-day maintenance and configuration changes across FCCS (consolidation) and EPBCS (planning & budgeting) modules.",
      "Investigated data - quality issues flagged by business users, tracing them back to source configurations or integration jobs.",
      "Provided user support, translating functional requests into configuration changes within Oracle APEX.",
    ],
  },
  {
    when: "Jan 2026 - May 2026",
    title: "Web Development Intern",
    org: "CXR, GITAM University",
    logo: "/projects/cxr.jpeg",
    location: "Visakhapatnam, India",
    desc: "Developed a React and Firebase inventory-reservation platform; designed booking workflows to handle concurrency and real-time data challenges.",
    details: [
      "Built the reservation core of CXR's inventory platform, where multiple users could request the same AR/VR equipment for overlapping time slots.",
      "Designed booking logic around Firestore's real-time listeners to prevent double-booking without heavy locking.",
      "Worked closely with CXR's admin team to shape approval and issuance workflows around how the equipment was actually used day to day.",
    ],
  },
  {
    when: "Jun 2025 - Sep 2025",
    title: "Data Management Intern",
    org: "DoER, GITAM University",
    logo: "/projects/doer.jpeg",
    location: "Visakhapatnam, India",
    desc: "Managed records for 90,000+ individuals using Excel, Google Sheets, and Python; reduced manual effort by 40% through automation and validation.",
    details: [
      "Owned data hygiene for a records set covering 90,000+ individuals, cleaning and validating entries that had accumulated inconsistencies over time.",
      "Wrote Python scripts to automate repetitive validation and formatting tasks that had previously been done by hand in Excel and Google Sheets.",
      "That automation work cut manual effort by roughly 40%, freeing up time for higher-value data checks.",
    ],
  },
  {
    when: "Jan 2025 - Mar 2026",
    title: "Subject Matter Expert",
    org: "Chitti, GITAM University Startup",
    logo: "/projects/chitti.jpeg",
    location: "Visakhapatnam, India",
    desc: "Mentored 200+ students in DBMS, Operating Systems, DSA, and Computer Networks.",
    details: [
      "Acted as a subject matter expert for core CS courses, helping 200+ students work through DBMS, Operating Systems, DSA, and Computer Networks concepts.",
      "Focused on the topics students found hardest to self-study - indexing and normalization in DBMS, concurrency in OS, and graph/DP patterns in DSA.",
    ],
  },
];

export const education = [
  { when: "Aug 2023 - May 2027", school: "GITAM University, Visakhapatnam", degree: "B.Tech in Computer Science and Engineering", score: "9.74 CGPA", percent: 97, level: "Undergraduate" },
  { when: "Aug 2021 - May 2023", school: "FIITJEE, Visakhapatnam", degree: "Intermediate (MPC)", score: "88%", percent: 88, level: "Higher Secondary" },
  { when: "Jul 2020 - Apr 2021", school: "Sri Chaitanya School, Visakhapatnam", degree: "Secondary School Certificate (SSC)", score: "96%", percent: 96, level: "Secondary" },
];

export const achievements = [
  {
    mark: "// winner",
    title: "GDG WOW 2025 Hackathon",
    desc: 'Developed "Pathway to Placements," a placement-preparation resource platform for engineering students.',
  },
];

export const certifications = [
  "ServiceNow Certified System Administrator (CSA)",
  "ServiceNow Certified Application Developer (CAD)",
];

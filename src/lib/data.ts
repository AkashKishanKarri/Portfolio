export const profile = {
  name: "Akash Kishan Karri",
  role: "full-stack developer",
  email: "akashkishankarri1@gmail.com",
  phone: "+91-8374849797",
  github: "https://github.com/AkashKishanKarri",
  linkedin: "https://linkedin.com/in/akashkishankarri",
  location: "Visakhapatnam, India",
};

export const stats = [
  { value: 9.74, decimals: 2, prefix: "", suffix: " / 10", label: "CGPA", icon: "graduation", fill: 97 },
  { value: 100, decimals: 0, prefix: "+", suffix: "", label: "Community members led", icon: "users", fill: 80 },
  { value: 90, decimals: 0, prefix: "", suffix: "K+", label: "Records managed & automated", icon: "database", fill: 90 },
  { value: 200, decimals: 0, prefix: "+", suffix: "", label: "Students mentored", icon: "mentor", fill: 85 },
];

// Each project gets a small photo stack. Photos are placeholders —
// drop real screenshots into /public/projects/<folder>/ and update
// the paths below (see README for the exact naming convention).
export type Project = {
  slug: string;
  title: string;
  bullets: string[];
  tags: string[];
  photos: string[];
  details: string;
  liveUrl?: string;
  docsUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "attendance-system",
    title: "Deep Learning-Based Attendance System",
    bullets: [
      "Built an automated attendance system using FaceNet and OpenCV for deep-learning facial recognition and identity verification.",
      "Developed workflows for face detection, object recognition, and OCR-based extraction to reduce manual attendance operations.",
      "Explored pretrained Hugging Face models for vision and multimodal tasks; evaluated outputs on practical input conditions.",
    ],
    tags: ["Python", "OpenCV", "FaceNet", "OCR", "Hugging Face"],
    photos: [
      "/projects/dl1.png",
      "/projects/dl2.png",
      "/projects/dl3.png",
    ],
    details:
      "Built as a hands-on exploration of applying deep learning to a genuinely tedious problem - manual attendance. The pipeline runs face detection first, then passes crops through FaceNet to generate embeddings and match them against a registered set of faces, with OpenCV handling the camera feed and preprocessing. Added OCR as a fallback path for ID-card-based verification, and spent a good chunk of the project testing pretrained Hugging Face vision models to see how they held up against imperfect lighting and camera angles rather than clean, lab-condition inputs.",
    liveUrl: "https://dl-attendance.vercel.app",
    docsUrl: "https://github.com/AkashKishanKarri/DL_Backend/blob/main/README.md",
  },
  {
    slug: "mdc-website",
    title: "MDC Official Website",
    bullets: [
      "Developed and deployed the official website for Meta Developer Communities (MDC), GITAM - the primary platform for community activities and announcements.",
      "Built responsive, reusable React components with Firebase integration for event management, team profiles, and content updates.",
      "Designed an admin dashboard enabling organizers to manage events, announcements, and website content, reducing manual updates and improving operational efficiency.",
    ],
    tags: ["React.js", "Firebase", "JavaScript", "Vercel"],
    photos: [
      "/projects/mdc1.png",
      "/projects/mdc2.png",
      "/projects/mdc3.png",
    ],
    details:
      "The site is the front door for MDC's activities - event pages, team profiles, and announcements that used to be managed manually. Built the whole thing with reusable React components wired to Firebase so organizers could add or update an event without touching code, plus an admin dashboard scoped to just the people who run the community, keeping account management simple while giving them real control over content.",
    liveUrl: "https://mdcgitam.in",
    docsUrl: "https://github.com/AkashKishanKarri/MDC_official_demo/blob/main/README.md",
  },
  {
    slug: "cxr-platform",
    title: "CXR Official Website & Inventory Management Platform",
    bullets: [
      "Developed and deployed the official website for CXR, GITAM's AR/VR/MR/XR student body, with interactive 3D experiences using Three.js.",
      "Integrated Firebase Authentication, Cloud Firestore, and automated email notifications for request submission, approvals, issuance, and returns.",
      "Built an admin dashboard to monitor inventory, issued assets, user details, request history, and equipment availability in real time.",
    ],
    tags: ["React.js", "Three.js", "Firebase"],
    photos: [
      "/projects/cxr1.png",
      "/projects/cxr2.png",
      "/projects/cxr3.png",
    ],
    details:
      "Went beyond a typical informational site by building interactive Three.js scenes to actually showcase CXR's AR/VR/MR work rather than just describing it. The inventory side handles the operational half - Firebase Authentication for access control, Firestore for real-time equipment status, and automated emails at each stage of a request (submitted, approved, issued, returned) so nothing gets lost in manual follow-ups.",
    liveUrl: "https://cxrrrr.vercel.app",
    docsUrl: "https://github.com/AkashKishanKarri/CXRRRR/blob/main/README.md",
  },
];

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
    when: "Jun 2026 - Present",
    title: "Vice President",
    org: "MDC, GITAM University",
    logo: "/projects/mdclogo.webp",
    location: "Visakhapatnam, India",
    desc: "Lead a technical community of 100+ students and mentor members in software development, Git, React, and project delivery.",
    details: [
      "Co-lead MDC's day-to-day direction alongside the rest of the leadership team - planning the event calendar, workshops, and hackathons for a 50+ member community.",
      "Mentor members directly on software development fundamentals: Git workflows, React basics, and how to actually ship a project instead of leaving it half-built.",
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

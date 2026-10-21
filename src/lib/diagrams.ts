// Architecture diagrams in the spirit of gitdiagram.com: each box is a real file or
// service in the repo, and clicking a box opens that file on GitHub.
// Coordinates live on a 960-unit-wide canvas; boxes default to 160 x 58.

export type NodeKind = "client" | "server" | "data" | "ext" | "code";

export type DNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w?: number;
  kind: NodeKind;
  path?: string; // file inside the repo
  repo?: string; // overrides the diagram's repo for this node
};

export type DGroup = { label: string; ids: string[] };
export type DEdge = { from: string; to: string; label?: string };
export type Diagram = { repo: string; nodes: DNode[]; groups: DGroup[]; edges: DEdge[] };

const attendance: Diagram = {
  repo: "DL_Backend",
  nodes: [
    { id: "login", label: "Login", sub: "src/Login.jsx", x: 40, y: 60, kind: "client", repo: "DL_Frontend", path: "src/Login.jsx" },
    { id: "enrollUi", label: "Enroll Camera", sub: "src/EnrollCamera.jsx", x: 220, y: 60, kind: "client", repo: "DL_Frontend", path: "src/EnrollCamera.jsx" },
    { id: "admin", label: "Admin Dashboard", sub: "mark & edit attendance", x: 400, y: 60, kind: "client", repo: "DL_Frontend", path: "src/AdminDashboard.jsx" },
    { id: "member", label: "Member Dashboard", sub: "own attendance", x: 580, y: 60, kind: "client", repo: "DL_Frontend", path: "src/MemberDashboard.jsx" },
    { id: "register", label: "Register", sub: "src/Register.jsx", x: 760, y: 60, kind: "client", repo: "DL_Frontend", path: "src/Register.jsx" },
    { id: "tpl", label: "enroll_camera.html", sub: "capture template", x: 180, y: 220, kind: "code", path: "templates/enroll_camera.html" },
    { id: "api", label: "main.py", sub: "FastAPI · REST routes", x: 420, y: 220, kind: "server", path: "main.py" },
    { id: "face", label: "face_recognition.py", sub: "MTCNN + FaceNet", x: 680, y: 220, w: 200, kind: "server", path: "face_recognition.py" },
    { id: "auth", label: "Firebase Auth", sub: "admins & members", x: 40, y: 380, kind: "data", repo: "DL_Frontend", path: "src/firebase.js" },
    { id: "members", label: "members", sub: "Firestore · embeddings", x: 300, y: 380, kind: "data", path: "firebase_config.py" },
    { id: "att", label: "attendance", sub: "Firestore · records", x: 520, y: 380, kind: "data", path: "firebase_config.py" },
    { id: "ci", label: "GitHub Actions", sub: "push → HF Space (Docker)", x: 760, y: 380, kind: "ext", path: ".github/workflows/deploy.yml" },
  ],
  groups: [
    { label: "React frontend · Vercel", ids: ["login", "enrollUi", "admin", "member", "register"] },
    { label: "FastAPI backend · Hugging Face Space", ids: ["tpl", "api", "face"] },
    { label: "Firebase", ids: ["auth", "members", "att"] },
    { label: "CI / CD", ids: ["ci"] },
  ],
  edges: [
    { from: "login", to: "auth", label: "sign in" },
    { from: "enrollUi", to: "tpl", label: "webcam frames" },
    { from: "tpl", to: "api", label: "/enroll" },
    { from: "admin", to: "api", label: "POST /recognize" },
    { from: "member", to: "api", label: "GET /attendance" },
    { from: "api", to: "face", label: "embed + match" },
    { from: "api", to: "members", label: "read / write" },
    { from: "api", to: "att", label: "save · update" },
    { from: "ci", to: "face", label: "deploy" },
  ],
};

const cxr: Diagram = {
  repo: "CXRRRR",
  nodes: [
    { id: "home", label: "Home", sub: "Three.js hero scene", x: 40, y: 60, kind: "client", path: "src/pages/Home.jsx" },
    { id: "req", label: "Request Form", sub: "borrow equipment", x: 260, y: 60, kind: "client", path: "src/pages/RequestForm.jsx" },
    { id: "dash", label: "Admin Dashboard", sub: "approve · issue · return", x: 720, y: 60, w: 180, kind: "client", path: "src/pages/AdminDashboard.jsx" },
    { id: "learn", label: "Tutorials & Quizzes", sub: "src/pages/Quizzes.jsx", x: 480, y: 60, w: 180, kind: "client", path: "src/pages/Quizzes.jsx" },
    { id: "three", label: "ThreeCanvas", sub: "r3f · Quest 3 .glb", x: 40, y: 220, kind: "code", path: "src/components/ThreeCanvas.jsx" },
    { id: "sdk", label: "firebaseConfig.js", sub: "Firebase client SDK", x: 370, y: 220, w: 180, kind: "code", path: "src/firebase/firebaseConfig.js" },
    { id: "cloud", label: "Cloudinary", sub: "PDF & image uploads", x: 720, y: 220, kind: "ext" },
    { id: "auth", label: "Firebase Auth", sub: "admin access", x: 160, y: 380, kind: "data", path: "firebase.json" },
    { id: "fs", label: "Cloud Firestore", sub: "inventory · requests", x: 390, y: 380, w: 180, kind: "data", path: "firestore.rules" },
    { id: "fn", label: "sendApprovalEmail", sub: "Cloud Function · Nodemailer", x: 640, y: 380, w: 190, kind: "server", path: "functions-backend/index.js" },
  ],
  groups: [
    { label: "React SPA · Vite on Vercel", ids: ["home", "req", "dash", "learn"] },
    { label: "Client modules", ids: ["three", "sdk"] },
    { label: "Firebase", ids: ["auth", "fs", "fn"] },
    { label: "External", ids: ["cloud"] },
  ],
  edges: [
    { from: "home", to: "three", label: "3D models" },
    { from: "req", to: "sdk", label: "submit request" },
    { from: "dash", to: "sdk", label: "status updates" },
    { from: "dash", to: "cloud", label: "uploads" },
    { from: "learn", to: "sdk", label: "quiz attempts" },
    { from: "sdk", to: "auth" },
    { from: "sdk", to: "fs", label: "real-time listeners" },
    { from: "sdk", to: "fn", label: "onCall" },
  ],
};

const mdc: Diagram = {
  repo: "MDC_official_demo",
  nodes: [
    { id: "contact", label: "Contact", sub: "src/pages/ContactUs.jsx", x: 40, y: 60, kind: "client", path: "src/pages/ContactUs.jsx" },
    { id: "home", label: "Home & About", sub: "team · domains · history", x: 220, y: 60, kind: "client", path: "src/pages/Home.jsx" },
    { id: "events", label: "Events", sub: "year filter · cards", x: 400, y: 60, kind: "client", path: "src/pages/Events.jsx" },
    { id: "login", label: "Admin Login", sub: "src/pages/AdminLogin.jsx", x: 580, y: 60, kind: "client", path: "src/pages/AdminLogin.jsx" },
    { id: "gmail", label: "Gmail compose", sub: "pre-filled draft", x: 40, y: 220, kind: "ext" },
    { id: "tenure", label: "tenureData.js", sub: "2022–26 team rosters", x: 220, y: 220, kind: "code", path: "src/data/tenureData.js" },
    { id: "ctx", label: "AuthContext", sub: "guards admin routes", x: 580, y: 220, kind: "code", path: "src/context/AuthContext.jsx" },
    { id: "dash", label: "Admin Dashboard", sub: "post & remove events", x: 770, y: 220, kind: "client", path: "src/pages/AdminDashboard.jsx" },
    { id: "fs", label: "Firestore", sub: "events + images", x: 400, y: 380, kind: "data", path: "src/firebase/firebase.js" },
    { id: "auth", label: "Firebase Auth", sub: "organizer accounts", x: 600, y: 380, kind: "data", path: "src/firebase/firebase.js" },
  ],
  groups: [
    { label: "React + Tailwind + Framer Motion · Vercel", ids: ["contact", "home", "events", "login"] },
    { label: "Data, auth state & admin", ids: ["tenure", "ctx", "dash"] },
    { label: "Firebase", ids: ["fs", "auth"] },
  ],
  edges: [
    { from: "contact", to: "gmail", label: "mailto" },
    { from: "home", to: "tenure", label: "team data" },
    { from: "events", to: "fs", label: "read events" },
    { from: "login", to: "ctx" },
    { from: "ctx", to: "auth" },
    { from: "ctx", to: "dash" },
    { from: "dash", to: "fs" },
  ],
};

const prodvis: Diagram = {
  repo: "ProdVis",
  nodes: [
    { id: "app", label: "App.jsx", sub: "paraphraser chat UI", x: 120, y: 60, kind: "client", path: "Frontend/src/App.jsx" },
    { id: "chat", label: "Chat.jsx", sub: "stream reader", x: 400, y: 60, kind: "client", path: "Frontend/src/Chat.jsx" },
    { id: "side", label: "Sidebar.jsx", sub: "skills manager", x: 680, y: 60, kind: "client", path: "Frontend/src/Sidebar.jsx" },
    { id: "ask", label: "POST /ask", sub: "chunked text response", x: 260, y: 220, kind: "server" },
    { id: "skills", label: "/skills API", sub: "list · upload · toggle", x: 600, y: 220, kind: "server" },
    { id: "llm", label: "Language model", sub: "paraphrase prompt", x: 260, y: 380, kind: "ext" },
    { id: "store", label: "Skill packages", sub: ".zip · enabled flag", x: 600, y: 380, kind: "data" },
  ],
  groups: [
    { label: "React 19 + Tailwind 4 · Vite", ids: ["app", "chat", "side"] },
    { label: "Backend API (VITE_API_URL)", ids: ["ask", "skills"] },
    { label: "Model & storage", ids: ["llm", "store"] },
  ],
  edges: [
    { from: "app", to: "ask", label: "prompt" },
    { from: "ask", to: "chat", label: "streamed tokens" },
    { from: "side", to: "skills", label: "upload .zip / toggle" },
    { from: "ask", to: "llm" },
    { from: "skills", to: "store" },
    { from: "store", to: "llm", label: "enabled skills" },
  ],
};

const shiftflow: Diagram = {
  repo: "Rooster-Generator",
  nodes: [
    { id: "in", label: "Schedule setup", sub: "dates · team · labels", x: 40, y: 60, kind: "client", path: "shift-scheduler.html" },
    { id: "gen", label: "generate()", sub: "rotation + off-days", x: 280, y: 60, kind: "code", path: "shift-scheduler.html" },
    { id: "render", label: "render()", sub: "roster grid", x: 520, y: 60, kind: "client", path: "shift-scheduler.html" },
    { id: "csv", label: "download()", sub: "roster.csv", x: 760, y: 60, kind: "data", path: "shift-scheduler.html" },
    { id: "val", label: "validate()", sub: "9 / day · 1 off / week", x: 280, y: 220, kind: "code", path: "shift-scheduler.html" },
    { id: "cycle", label: "cycle()", sub: "click a cell to edit", x: 520, y: 220, kind: "client", path: "shift-scheduler.html" },
  ],
  groups: [
    { label: "shift-scheduler.html · zero dependencies", ids: ["in", "gen", "render", "csv", "val", "cycle"] },
  ],
  edges: [
    { from: "in", to: "gen" },
    { from: "gen", to: "render" },
    { from: "render", to: "csv", label: "export" },
    { from: "gen", to: "val", label: "check coverage" },
    { from: "render", to: "cycle", label: "manual tweak" },
    { from: "cycle", to: "val", label: "re-check" },
  ],
};

const vitalVault: Diagram = {
  repo: "Vital-Vault",
  nodes: [
    { id: "reg", label: "Register", sub: "GITAM-only sign-up", x: 40, y: 60, kind: "client", path: "register.js" },
    { id: "login", label: "Login", sub: "login.js", x: 220, y: 60, kind: "client", path: "login.js" },
    { id: "home", label: "Home", sub: "pick a role", x: 400, y: 60, kind: "client", path: "index.js" },
    { id: "lend", label: "Lender portal", sub: "list & manage items", x: 580, y: 60, kind: "client", path: "lender.js" },
    { id: "rent", label: "Renter portal", sub: "browse & book", x: 760, y: 60, kind: "client", path: "renter.js" },
    { id: "guard", label: "auth.js", sub: "redirect if signed out", x: 400, y: 220, kind: "code", path: "auth.js" },
    { id: "user", label: "userDetails", sub: "localStorage", x: 130, y: 380, kind: "data", path: "register.js" },
    { id: "items", label: "items", sub: "localStorage", x: 540, y: 380, kind: "data", path: "lender.js" },
    { id: "notif", label: "rentalNotification", sub: "localStorage", x: 760, y: 380, w: 170, kind: "data", path: "renter.js" },
  ],
  groups: [
    { label: "Static pages · HTML / CSS / JS", ids: ["reg", "login", "home", "lend", "rent"] },
    { label: "Session guard", ids: ["guard"] },
    { label: "Browser storage", ids: ["user", "items", "notif"] },
  ],
  edges: [
    { from: "reg", to: "user", label: "save profile" },
    { from: "home", to: "guard" },
    { from: "guard", to: "user", label: "check" },
    { from: "lend", to: "items", label: "list item" },
    { from: "rent", to: "items", label: "rent" },
    { from: "rent", to: "notif", label: "notify lender" },
  ],
};

const grading: Diagram = {
  repo: "RelativeGradingTool",
  nodes: [
    { id: "csv", label: "Marks CSV", sub: "SampleSheet.csv", x: 40, y: 60, kind: "data", path: "SampleSheet.csv" },
    { id: "load", label: "loadFromCSV()", sub: "GradingSystem", x: 280, y: 60, kind: "code", path: "AdvancedGradingApp.java" },
    { id: "stats", label: "calculateStatistics()", sub: "class mean · std dev", x: 520, y: 60, w: 180, kind: "code", path: "AdvancedGradingApp.java" },
    { id: "assign", label: "assignGrades()", sub: "relative cut-offs", x: 760, y: 60, kind: "code", path: "AdvancedGradingApp.java" },
    { id: "model", label: "Person → Student", sub: "OOP model + interface", x: 280, y: 220, kind: "code", path: "AdvancedGradingApp.java" },
    { id: "viz", label: "GradeVisualizer", sub: "Swing chart · click a bar", x: 520, y: 220, w: 180, kind: "client", path: "AdvancedGradingApp.java" },
    { id: "out", label: "grades_output.csv", sub: "saveResultsToFile()", x: 760, y: 220, kind: "data", path: "AdvancedGradingApp.java" },
  ],
  groups: [
    { label: "AdvancedGradingApp.java · Java Swing", ids: ["load", "stats", "assign", "model", "viz", "out"] },
    { label: "Input", ids: ["csv"] },
  ],
  edges: [
    { from: "csv", to: "load" },
    { from: "load", to: "stats" },
    { from: "stats", to: "assign" },
    { from: "load", to: "model", label: "builds" },
    { from: "assign", to: "out", label: "save" },
    { from: "assign", to: "viz", label: "distribution" },
  ],
};

const ideasprint: Diagram = {
  repo: "mdcgitam/tmcg-ideasprint-portal",
  nodes: [
    { id: "public", label: "Public site", sub: "timeline · rounds · prizes", x: 40, y: 60, kind: "client", path: "src/app/(public)/page.tsx" },
    { id: "register", label: "Register wizard", sub: "guidelines → team → review", x: 220, y: 60, kind: "client", path: "src/app/(public)/register/page.tsx" },
    { id: "team", label: "Team dashboard", sub: "NOC · PPT · exit form", x: 400, y: 60, kind: "client", path: "src/app/dashboard/team" },
    { id: "spoc", label: "SPOC dashboard", sub: "own teams only", x: 580, y: 60, kind: "client", path: "src/app/dashboard/spoc" },
    { id: "admin", label: "Admin dashboard", sub: "13 admin modules", x: 760, y: 60, kind: "client", path: "src/app/dashboard/admin/page.tsx" },
    { id: "proxy", label: "proxy.ts", sub: "guards /dashboard", x: 40, y: 220, kind: "code", path: "src/proxy.ts" },
    { id: "regact", label: "Registration actions", sub: "zod · unique checks", x: 220, y: 220, kind: "server", path: "src/lib/registration/actions.ts" },
    { id: "teamact", label: "team-actions.ts", sub: "server actions", x: 400, y: 220, kind: "server", path: "src/lib/dashboard/team-actions.ts" },
    { id: "roles", label: "roles.ts", sub: "Super Admin · SPOC · Lead", x: 580, y: 220, kind: "code", path: "src/lib/auth/roles.ts" },
    { id: "adminact", label: "admin-actions.ts", sub: "approve · configure", x: 760, y: 220, kind: "server", path: "src/lib/dashboard/admin-actions.ts" },
    { id: "auth", label: "Supabase Auth", sub: "Google · GITAM domains", x: 40, y: 380, kind: "data", path: "src/app/auth/callback/route.ts" },
    { id: "db", label: "Postgres", sub: "11 migrations · teams", x: 400, y: 380, kind: "data", path: "supabase/migrations/0001_init_schema.sql" },
    { id: "storage", label: "Storage", sub: "NOCs · decks · documents", x: 760, y: 380, kind: "data", path: "supabase/migrations/0005_fix_noc_storage_spoc.sql" },
  ],
  groups: [
    { label: "Next.js 16 App Router · Vercel", ids: ["public", "register", "team", "spoc", "admin"] },
    { label: "Server", ids: ["proxy", "regact", "teamact", "roles", "adminact"] },
    { label: "Supabase", ids: ["auth", "db", "storage"] },
  ],
  edges: [
    { from: "proxy", to: "auth", label: "session" },
    { from: "register", to: "regact", label: "submit team" },
    { from: "team", to: "teamact" },
    { from: "spoc", to: "roles", label: "scope" },
    { from: "admin", to: "adminact" },
    { from: "regact", to: "db", label: "IDs like VSP1001" },
    { from: "teamact", to: "db" },
    { from: "teamact", to: "storage", label: "uploads" },
    { from: "adminact", to: "db", label: "approvals" },
  ],
};

export const diagrams = { ideasprint, attendance, cxr, mdc, prodvis, shiftflow, vitalVault, grading };

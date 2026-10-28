import type { IconComponent } from "./lib/types";
import { GithubMark } from "./components/ui";
import {
  Atom,
  Braces,
  Code2,
  Database,
  Palette,
  Server,
  Terminal,
  Triangle,
  Wind,
  Zap,
} from "lucide-react";

export const CONTACT = {
  email: "ekampreetsingh25111@gmail.com",
  phone: "+91 98035 22070",
  phoneRaw: "919803522070",
  location: "New Delhi, India",
  github: "https://github.com/ekampreetsingh-dev",
  taskSphereLive: "https://tasksphere-workspace-web.vercel.app/",
};

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "work", label: "Work" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export const ROLES = [
  "Full-stack developer",
  "UI/UX designer",
  "Python & AI automation",
  "Custom admin utilities",
];

export const RIBBON = [
  "UI/UX design",
  "Full-stack web",
  "React & Vite",
  "Tailwind CSS",
  "Python & FastAPI",
  "Supabase",
  "AI automation",
  "Design systems",
];

export const CHECKS = [
  {
    title: "UI/UX architecture",
    note: "Design systems, flows and component libraries that hold up past the mockup.",
  },
  {
    title: "Full-stack web development",
    note: "React and Vite on the surface, Supabase underneath — typed, responsive, deployed.",
  },
  {
    title: "Python & AI automation",
    note: "FastAPI services, speech recognition and LLM tooling wired to real hardware.",
  },
  {
    title: "Custom admin utilities",
    note: "Scheduling and internal tools for schools and coaching institutes.",
  },
];

export const CAPABILITIES = [
  {
    index: "// 01",
    title: "UI/UX design",
    body: "Interfaces that explain themselves: hierarchy first, motion second, decoration last. Built as systems, not one-off screens.",
    tags: ["Design systems", "Flows & wireframes", "Prototyping"],
  },
  {
    index: "// 02",
    title: "Front-end & full-stack",
    body: "React and TypeScript on the surface, Supabase and typed data underneath. Fast by default, responsive by construction.",
    tags: ["React + TS", "Tailwind CSS", "Supabase"],
  },
  {
    index: "// 03",
    title: "Python & AI systems",
    body: "Automation, voice and FastAPI services that connect to real machines — desktop control, speech, and LLM plumbing.",
    tags: ["FastAPI", "Speech & LLMs", "Hardware"],
  },
];

export type Tech = {
  name: string;
  icon: IconComponent;
  ring: 1 | 2;
  angle: number;
};

export const TECHS: Tech[] = [
  { name: "HTML5", icon: Code2, ring: 1, angle: 0 },
  { name: "Tailwind", icon: Wind, ring: 1, angle: 45 },
  { name: "React", icon: Atom, ring: 1, angle: 90 },
  { name: "Vite", icon: Zap, ring: 1, angle: 135 },
  { name: "Supabase", icon: Database, ring: 1, angle: 180 },
  { name: "Python", icon: Terminal, ring: 1, angle: 225 },
  { name: "GitHub", icon: GithubMark, ring: 1, angle: 270 },
  { name: "Vercel", icon: Triangle, ring: 1, angle: 315 },
  { name: "CSS3", icon: Palette, ring: 2, angle: 22 },
  { name: "JavaScript", icon: Braces, ring: 2, angle: 112 },
  { name: "FastAPI", icon: Server, ring: 2, angle: 202 },
  { name: "Framer Motion", icon: Zap, ring: 2, angle: 292 },
];

export const FALLBACK_REPOS = [
  {
    id: 1,
    name: "Tasksphere-Workspace-",
    description:
      "Gamified productivity workspace — quests, focus rooms, XP and a Supabase-backed ledger.",
    language: "TypeScript",
    stargazers_count: 0,
    updated_at: "2026-10-27T12:50:27Z",
    html_url: "https://github.com/ekampreetsingh-dev/Tasksphere-Workspace-",
    homepage: "https://tasksphere-workspace-web.vercel.app/",
  },
  {
    id: 2,
    name: "Portfolio-",
    description: "The portfolio you are reading — rebuilt in React, Vite and Tailwind.",
    language: "HTML",
    stargazers_count: 0,
    updated_at: "2026-10-27T10:00:00Z",
    html_url: "https://github.com/ekampreetsingh-dev/Portfolio-",
    homepage: "https://portfolio-website-1811.vercel.app/",
  },
  {
    id: 3,
    name: "Tasksphere-Workspace",
    description: "The original single-file TaskSphere build, kept for the archive.",
    language: "HTML",
    stargazers_count: 0,
    updated_at: "2026-08-14T10:00:00Z",
    html_url: "https://github.com/ekampreetsingh-dev/Tasksphere-Workspace",
    homepage: "",
  },
];

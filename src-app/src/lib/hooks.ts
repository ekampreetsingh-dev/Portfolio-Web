import { useCallback, useEffect, useRef, useState } from "react";
import { FALLBACK_REPOS } from "../data";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  homepage: string | null;
};

export type RepoStatus = "loading" | "ready" | "offline";

const HIDDEN_REPOS = new Set(["edutime-timetable-manager", "portfolio-"]);

export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const card = target?.closest?.(".spot") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

export function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];

    if (!deleting && text === word) {
      const hold = window.setTimeout(() => setDeleting(true), 2200);
      return () => window.clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((current) => (current + 1) % words.length);
      return;
    }

    const timer = window.setTimeout(
      () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
      deleting ? 22 : 52 + Math.random() * 46,
    );
    return () => window.clearTimeout(timer);
  }, [deleting, index, text, words]);

  return { text, typing: deleting || text !== words[index % words.length] };
}

export function useCountUp(target: number, active: boolean, duration = 1250) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, target]);

  return value;
}

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.15, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

export function useGithubRepos(user: string) {
  const [repos, setRepos] = useState<Repo[]>(FALLBACK_REPOS as Repo[]);
  const [status, setStatus] = useState<RepoStatus>("loading");
  const controller = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    controller.current?.abort();
    const next = new AbortController();
    controller.current = next;
    setStatus("loading");

    try {
      const response = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`,
        {
          signal: next.signal,
          headers: { Accept: "application/vnd.github+json" },
        },
      );
      if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
      const data = (await response.json()) as Repo[];
      const publicRepos = data
        .filter(
          (repo) =>
            repo &&
            !("fork" in repo && (repo as { fork?: boolean }).fork) &&
            !HIDDEN_REPOS.has(repo.name.toLowerCase()),
        )
        .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
      if (!publicRepos.length) throw new Error("No public repositories");
      setRepos(publicRepos);
      setStatus("ready");
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      setRepos(FALLBACK_REPOS as Repo[]);
      setStatus("offline");
    }
  }, [user]);

  useEffect(() => {
    void load();
    return () => controller.current?.abort();
  }, [load]);

  return { repos, status, reload: load };
}

export function formatRelative(iso: string) {
  const date = new Date(iso).getTime();
  if (Number.isNaN(date)) return "recently";
  const diff = Date.now() - date;
  const minutes = Math.round(diff / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572a5",
};

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Clock,
  RotateCcw,
  Star,
} from "lucide-react";
import { CONTACT } from "../data";
import type { Repo, RepoStatus } from "../lib/hooks";
import { formatRelative, LANG_COLORS } from "../lib/hooks";
import { GithubMark, Reveal } from "./ui";

export function GitHubLab({
  repos,
  status,
  onRetry,
}: {
  repos: Repo[];
  status: RepoStatus;
  onRetry: () => void;
}) {
  const [filter, setFilter] = useState("all");

  const languages = useMemo(
    () =>
      Array.from(
        new Set(repos.map((repo) => repo.language).filter((language): language is string => Boolean(language))),
      ),
    [repos],
  );

  const active = filter === "all" || languages.includes(filter) ? filter : "all";
  const visible = active === "all" ? repos : repos.filter((repo) => repo.language === active);

  return (
    <section className="section section-line" id="github">
      <div className="shell-max">
        <div className="lab-head">
          <Reveal>
            <span className="eyebrow">// 04 — GitHub lab</span>
            <h2 className="h2">
              Live GitHub <span className="serif">repositories</span>
            </h2>
            <p className="lede">
              Pulled straight from the GitHub API every time this page loads — no screenshots, no
              hand-picked list.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lab-side">
            <div className="filters" role="group" aria-label="Filter repositories by language">
              <button
                type="button"
                className={active === "all" ? "filter is-on" : "filter"}
                onClick={() => setFilter("all")}
                aria-pressed={active === "all"}
              >
                All <em>{repos.length}</em>
              </button>
              {languages.map((language) => {
                const count = repos.filter((repo) => repo.language === language).length;
                return (
                  <button
                    type="button"
                    key={language}
                    className={active === language ? "filter is-on" : "filter"}
                    onClick={() => setFilter(language)}
                    aria-pressed={active === language}
                  >
                    {language} <em>{count}</em>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {status === "offline" ? (
          <div className="lab-note" role="status">
            <GithubMark size={14} />
            GitHub is not answering this request — showing the last known snapshot.
            <button
              type="button"
              className="filter is-on"
              onClick={onRetry}
              style={{ marginLeft: "auto" }}
            >
              <RotateCcw size={11} /> Retry
            </button>
          </div>
        ) : null}

        <div className="repo-grid" aria-busy={status === "loading"}>
          {status === "loading"
            ? Array.from({ length: 6 }, (_, index) => (
                <div className="skeleton" key={index} aria-hidden="true" />
              ))
            : visible.map((repo, index) => (
                <Reveal delay={0.04 * index} key={repo.id}>
                  <a
                    className="repo glass spot"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="repo-top">
                      <GithubMark size={16} />
                      {repo.homepage ? (
                        <span className="case-badge case-badge--live">Live</span>
                      ) : (
                        <span className="mono">repo</span>
                      )}
                    </div>
                    <h3 className="repo-name">{repo.name}</h3>
                    <p className="repo-desc">
                      {repo.description ?? "No description yet — the commit history tells the story."}
                    </p>
                    <div className="repo-meta">
                      <span>
                        <i
                          className="lang-dot"
                          style={{ background: LANG_COLORS[repo.language ?? ""] ?? "#a3e635" }}
                          aria-hidden="true"
                        />
                        {repo.language ?? "Code"}
                      </span>
                      <span>
                        <Star size={11} aria-hidden="true" />
                        {repo.stargazers_count}
                      </span>
                      <span>
                        <Clock size={11} aria-hidden="true" />
                        {formatRelative(repo.updated_at)}
                      </span>
                      <span style={{ marginLeft: "auto", color: "var(--color-volt)" }}>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
        </div>

        <div className="lab-foot">
          <span>
            {status === "ready" ? "Live from api.github.com" : "Cached snapshot"} ·{" "}
            {visible.length} of {repos.length} repositories
          </span>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            Follow @ekampreetsingh-dev
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}

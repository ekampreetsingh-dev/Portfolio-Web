import type { ReactNode } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { CONTACT } from "../data";
import { GithubMark, Reveal, SectionHead } from "./ui";

function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="browser-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">
          <Lock size={9} aria-hidden="true" />
          {url}
        </span>
      </div>
      <div className="browser-view">
        {children}
        <span className="browser-glare" aria-hidden="true" />
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section className="section section-line work" id="work">
      <div className="shell-max">
        <SectionHead
          index="// 03"
          label="Selected work"
          lede="One product, taken from an idea to a live app: accounts, cloud sync, an offline queue, four visual skins and a gamification loop that keeps score."
          aside={
            <div className="filters" aria-hidden="true">
              <span className="filter is-on">01 flagship</span>
              <span className="filter">2026</span>
            </div>
          }
        >
          Featured <span className="serif">project</span>
        </SectionHead>

        <div className="case-list">
          <Reveal>
            <article className="case">
              <div className="case-media">
                <Browser url="tasksphere-workspace-web.vercel.app">
                  <img
                    src="/images/tasksphere.webp"
                    width={1280}
                    height={800}
                    alt="TaskSphere Workspace dashboard with campaign ledger, quest counts and focus metrics"
                    loading="lazy"
                    decoding="async"
                  />
                </Browser>
              </div>

              <div className="case-body glass">
                <div className="case-index">
                  <b>// 01</b>
                  Flagship
                  <span className="case-badge case-badge--live">Live</span>
                </div>
                <h3 className="case-title">TaskSphere Workspace</h3>
                <p className="case-pitch">
                  A gamified productivity workspace where progress is visible: quests, focus rooms,
                  streaks and a dragon that keeps score. Built as a real product — accounts, cloud
                  sync, an offline queue and four visual skins.
                </p>
                <ul className="case-highlights">
                  <li>Realtime sync</li>
                  <li>Offline queue</li>
                  <li>Four skins</li>
                </ul>
                <ul className="case-tags">
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>Supabase</li>
                  <li>Framer Motion</li>
                </ul>
                <div className="case-actions">
                  <a
                    className="case-link"
                    href={CONTACT.taskSphereLive}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Launch live app
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    className="case-ghost"
                    href="https://github.com/ekampreetsingh-dev/Tasksphere-Workspace-"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubMark size={13} />
                    Source
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

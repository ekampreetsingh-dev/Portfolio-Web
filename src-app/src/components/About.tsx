import { useRef } from "react";
import { useInView } from "motion/react";
import type { IconComponent } from "../lib/types";
import { ArrowUpRight, Check, Clock, Layers, Sparkles, Zap } from "lucide-react";
import { CHECKS, CONTACT } from "../data";
import { useCountUp } from "../lib/hooks";
import { GithubMark, Reveal, SectionHead } from "./ui";

type StatProps = {
  index: string;
  icon: IconComponent;
  value?: number;
  suffix?: string;
  display?: string;
  label: string;
};

function Stat({ index, icon: Icon, value = 0, suffix, display, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(value, inView);

  return (
    <div className="stat glass spot" ref={ref}>
      <div className="stat-top">
        <Icon size={17} aria-hidden="true" />
        <span className="mono">{index}</span>
      </div>
      <div>
        <div className="stat-value" aria-label={`${display ?? value}${suffix ?? ""} ${label}`}>
          {display ?? count}
          {suffix ? <em>{suffix}</em> : null}
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

export function About({ repoCount }: { repoCount: number }) {
  return (
    <section className="section" id="about">
      <div className="shell-max">
        <SectionHead
          index="// 01"
          label="About me"
          lede="I work the whole surface of a product: the visual system, the React that ships it, and the Python behind the parts you can't see."
        >
          Crafting digital <span className="serif">experiences</span> with precision
        </SectionHead>

        <div className="about-grid">
          <div className="about-copy">
            <Reveal>
              <p>
                I&apos;m Ekampreet — a developer and designer who likes the unglamorous part: making
                the thing actually work. Most of what I build starts as a utility someone needs, not
                a demo. TaskSphere is the clearest example: a workspace that keeps you on task, then
                grew accounts, cloud sync, an offline queue and a dragon that keeps score.
              </p>
              <p>
                Design is how those survive contact with real people; <strong>writing</strong> is how
                they explain themselves. Years of poetry and fiction taught me to control tone,
                pacing and story — so the interface says one clear thing instead of ten vague ones.
              </p>
            </Reveal>

            <div className="check-list">
              {CHECKS.map((check, index) => (
                <Reveal delay={0.05 * index} key={check.title}>
                  <div className="check-item">
                    <span className="check-mark" aria-hidden="true">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <div>
                      <b>{check.title}</b>
                      <span>{check.note}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="stat-col">
            <Reveal delay={0.08}>
              <div className="stat-grid">
                <Stat index="01" icon={Layers} value={15} suffix="+" label="Projects built" />
                <Stat index="02" icon={Sparkles} value={100} suffix="%" label="Client satisfaction" />
                <Stat index="03" icon={GithubMark} value={repoCount} label="Public repositories" />
                <Stat index="04" icon={Clock} display="24/7" label="Clean code & UI focus" />
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="now-card glass spot">
                <span className="now-dot" aria-hidden="true">
                  <Zap size={17} />
                </span>
                <p>
                  <strong>Now shipping — TaskSphere 3.0</strong>
                  A gamified workspace with quests, focus rooms and a synced ledger.
                </p>
                <a
                  href={CONTACT.taskSphereLive}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the TaskSphere live demo"
                >
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowDown, ArrowUpRight, Atom, Database, Hexagon, Sparkles, Wind } from "lucide-react";
import { ROLES } from "../data";
import { useTypewriter } from "../lib/hooks";
import { Asterisk, Reveal } from "./ui";

function TypedRole() {
  const { text, typing } = useTypewriter(ROLES);

  return (
    <p className="type-line" aria-live="off">
      <span className="prompt" aria-hidden="true">
        &rsaquo;
      </span>
      <span>
        {text}
        <span className={typing ? "caret is-typing" : "caret"} aria-hidden="true" />
      </span>
    </p>
  );
}

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="shell-max">
        <div className="hero-grid">
          <div>
            <Reveal>
              <span className="hero-badge">
                <b aria-hidden="true">E</b>
                Hello — I&apos;m Ekampreet Singh
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="hero-title">
                A designer &amp; builder who judges a product by its{" "}
                <span className="serif">architecture</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <TypedRole />
            </Reveal>

            <Reveal delay={0.18}>
              <p className="hero-bio">
                I build fast, systems-minded web products — where the interface, the data model and
                the small details agree with each other. React on the front, Python where it earns
                its place, and an unreasonable interest in how things work under the glass.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="hero-actions">
                <a className="btn btn-lime" href="#contact">
                  Start a project
                  <ArrowUpRight size={16} />
                </a>
                <a className="btn btn-glass" href="#work">
                  View featured work
                  <ArrowDown size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="hero-meta">
                <span>
                  <i aria-hidden="true" />
                  New Delhi, India
                </span>
                <span>
                  <i aria-hidden="true" />
                  Available for freelance
                </span>
                <span>
                  <i aria-hidden="true" />
                  Currently <b>TaskSphere 3.0</b>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal className="stage" delay={0.16} y={30}>
            <span className="stage-aura" aria-hidden="true" />
            <span className="stage-ring stage-ring--a" aria-hidden="true" />
            <span className="stage-ring stage-ring--b" aria-hidden="true" />
            <span className="stage-ring stage-ring--c" aria-hidden="true" />
            <Asterisk className="asterisk asterisk--a" />
            <Asterisk className="asterisk asterisk--b" />

            <figure className="stage-card">
              <div className="stage-media">
                <img
                  src="/images/portrait.jpg"
                  width={236}
                  height={354}
                  alt="Portrait of Ekampreet Singh"
                  fetchPriority="high"
                />
              </div>
              <figcaption className="stage-cap">
                <strong>Ekampreet Singh</strong>
                <span>
                  <i aria-hidden="true" />
                  Full-stack · UI/UX · New Delhi
                </span>
              </figcaption>
              <div className="stage-stack" aria-label="Core stack">
                <span>
                  <Atom size={12} aria-hidden="true" />
                  React
                </span>
                <span>
                  <Database size={12} aria-hidden="true" />
                  Supabase
                </span>
                <span>
                  <Hexagon size={12} aria-hidden="true" />
                  Node.js
                </span>
                <span>
                  <Wind size={12} aria-hidden="true" />
                  Tailwind CSS
                </span>
                <span>
                  <Sparkles size={12} aria-hidden="true" />
                  Framer Motion
                </span>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { Code2, Cpu, Palette } from "lucide-react";
import { CAPABILITIES, TECHS } from "../data";
import { Reveal, SectionHead } from "./ui";

const ICONS = [Palette, Code2, Cpu];
const OUTER = 40;
const INNER = 25;

const nodes = TECHS.map((tech) => {
  const radius = tech.ring === 1 ? OUTER : INNER;
  const angle = (tech.angle * Math.PI) / 180;
  return {
    ...tech,
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
});

function TechChip({ name, icon: Icon }: { name: string; icon: (typeof TECHS)[number]["icon"] }) {
  return (
    <span className="tech-chip">
      <Icon size={13} aria-hidden="true" />
      {name}
    </span>
  );
}

export function Capabilities() {
  return (
    <section className="section section-line" id="capabilities">
      <div className="shell-max">
        <SectionHead
          index="// 02"
          label="Capabilities"
          lede="Three things I do properly — design the interface, build the product around it, and automate the parts that shouldn't need a human."
          aside={
            <div className="nav-live">
              <i aria-hidden="true" />
              12 tools · one workflow
            </div>
          }
        >
          The stack, and how I <span className="serif">use</span> it
        </SectionHead>

        <div className="cap-grid">
          {CAPABILITIES.map((capability, index) => {
            const Icon = ICONS[index] ?? Palette;
            return (
              <Reveal delay={0.06 * index} key={capability.title}>
                <article className="cap glass spot">
                  <div className="cap-top">
                    <span className="cap-index">{capability.index}</span>
                    <span className="cap-icon" aria-hidden="true">
                      <Icon size={18} />
                    </span>
                  </div>
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                  <ul className="cap-tags">
                    {capability.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="constellation-wrap glass" delay={0.1}>
          <div className="constellation-head">
            <h3>Tech constellation</h3>
            <p>What I reach for · updated whenever something better shows up</p>
          </div>

          <div className="constellation">
            <svg
              className="constellation-lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {nodes.map((node) => {
                const dx = node.x - 50;
                const dy = node.y - 50;
                const length = Math.hypot(dx, dy) || 1;
                const cx = (50 + node.x) / 2 - (dy / length) * 6;
                const cy = (50 + node.y) / 2 + (dx / length) * 6;
                return (
                  <path key={node.name} d={`M50 50 Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${node.x.toFixed(2)} ${node.y.toFixed(2)}`} />
                );
              })}
            </svg>

            <span className="orbit-ring orbit-ring--1" aria-hidden="true" />
            <span className="orbit-ring orbit-ring--2" aria-hidden="true" />

            <div className="core">
              ES
              <span>core</span>
            </div>

            {nodes.map((node) => (
              <div
                className="tech-node"
                key={node.name}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <TechChip name={node.name} icon={node.icon} />
              </div>
            ))}
          </div>

          <div className="constellation-cloud">
            <span className="cloud-core">
              <b>ES</b>
              core stack
            </span>
            {TECHS.map((tech) => (
              <TechChip key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

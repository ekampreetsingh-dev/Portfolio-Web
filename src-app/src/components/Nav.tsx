import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT, NAV_LINKS } from "../data";
import { useActiveSection, useScrollLock } from "../lib/hooks";
import { GithubMark } from "./ui";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

const list = {
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 500, damping: 38 },
  },
};

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav className={stuck ? "nav is-stuck" : "nav"} aria-label="Primary">
        <motion.span className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
        <div className="shell-max">
          <div className="nav-inner">
            <a className="brand" href="#home" aria-label="Ekampreet Singh — home">
              <span className="monogram" aria-hidden="true">
                <svg className="monogram-ring" viewBox="0 0 48 48" fill="none">
                  <circle
                    cx="24"
                    cy="24"
                    r="22.2"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M24 1.8A22.2 22.2 0 0 1 46.2 24"
                    stroke="url(#monogram-arc)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="43.2" cy="13.6" r="2.7" fill="currentColor" className="monogram-spark" />
                  <defs>
                    <linearGradient
                      id="monogram-arc"
                      x1="24"
                      y1="2"
                      x2="46"
                      y2="24"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#c7f65a" />
                      <stop offset="0.55" stopColor="#a3e635" />
                      <stop offset="1" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
                <b>ES</b>
              </span>
              <span className="brand-word">
                <strong>Ekampreet Singh</strong>
                <span>Design × code</span>
              </span>
            </a>

            <span className="nav-live">
              <i aria-hidden="true" />
              Available now
            </span>

            <div className="nav-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={active === link.id ? "nav-link is-active" : "nav-link"}
                  aria-current={active === link.id ? "page" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="nav-actions">
              <a
                className="icon-btn"
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GithubMark size={16} />
              </a>
              <a className="btn btn-lime btn-sm" href="#contact">
                Start a project
                <ArrowUpRight size={15} />
              </a>
              <button
                className={open ? "nav-burger is-open" : "nav-burger"}
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="site-menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {createPortal(
        <>
          <AnimatePresence>
            {open ? (
              <motion.div
                className="menu-scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
            ) : null}
          </AnimatePresence>
          <AnimatePresence>
            {open ? (
              <motion.div
                className="mobile-menu"
                id="site-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                initial={{ opacity: 0, y: -14, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 440, damping: 36, mass: 0.9 }}
              >
                <motion.div
                  className="mobile-links"
                  variants={list}
                  initial="hidden"
                  animate="show"
                >
                  {NAV_LINKS.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={`#${link.id}`}
                      variants={item}
                      className={active === link.id ? "mobile-link is-active" : "mobile-link"}
                      onClick={() => setOpen(false)}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {link.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </motion.a>
                  ))}
                </motion.div>

                <motion.div
                  className="mobile-menu-foot"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.3 }}
                >
                  <a className="btn btn-lime mobile-cta" href="#contact" onClick={() => setOpen(false)}>
                    Start a project
                    <ArrowUpRight size={15} />
                  </a>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  <a href={`tel:+${CONTACT.phoneRaw}`}>{CONTACT.phone}</a>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>,
        document.body,
      )}
    </>
  );
}

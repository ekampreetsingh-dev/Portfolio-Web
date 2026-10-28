import { MotionConfig } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Ribbon } from "./components/Ribbon";
import { About } from "./components/About";
import { Capabilities } from "./components/Capabilities";
import { Work } from "./components/Work";
import { GitHubLab } from "./components/GitHubLab";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { useGithubRepos, useSpotlight } from "./lib/hooks";
import { CONTACT } from "./data";

export default function App() {
  useSpotlight();
  const { repos, status, reload } = useGithubRepos("ekampreetsingh-dev");

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="backdrop" aria-hidden="true">
        <div className="backdrop-grid" />
        <div className="backdrop-glow backdrop-glow--a" />
        <div className="backdrop-glow backdrop-glow--b" />
        <div className="backdrop-glow backdrop-glow--c" />
        <div className="backdrop-grain" />
      </div>

      <Nav />

      <div className="site">
        <main id="main">
          <Hero />
          <Ribbon />
          <About repoCount={repos.length} />
          <Capabilities />
          <Work />
          <GitHubLab repos={repos} status={status} onRetry={reload} />
          <Contact />
        </main>
        <Footer />
      </div>

      <a
        className="wa-float"
        href={`https://wa.me/${CONTACT.phoneRaw}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </MotionConfig>
  );
}

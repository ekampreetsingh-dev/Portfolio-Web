import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell-max">
        <div className="footer-bottom">
          <span>© 2026 Ekampreet Singh</span>
          <span>Designed &amp; built by hand — React · Vite · Tailwind</span>
          <a className="to-top" href="#home">
            <ArrowUp size={12} />
            Back to top
          </a>
        </div>
      </div>

      <div className="watermark" aria-hidden="true">
        <span>EKAMPREET</span>
      </div>
    </footer>
  );
}

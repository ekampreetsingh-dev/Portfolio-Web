import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { CONTACT } from "../data";
import { GithubMark, Reveal } from "./ui";

type Field = "name" | "email" | "subject" | "message";

const EMPTY: Record<Field, string> = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    setSent(null);
  }

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (values.name.trim().length < 2) next.name = "Tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "A valid email, so I can reply.";
    }
    if (values.message.trim().length < 10) {
      next.message = "A sentence or two about the project.";
    }
    return next;
  }

  function send(kind: "whatsapp" | "email") {
    const next = validate();
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    const name = values.name.trim();
    const subject = values.subject.trim() || `Project inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${values.email.trim()}\nSubject: ${subject}\n\nMessage:\n${values.message.trim()}`;

    if (kind === "email") {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(
        `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(body)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
    setSent(kind);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send("whatsapp");
  }

  return (
    <section className="section section-line" id="contact">
      <div className="shell-max">
        <div className="contact-grid">
          <div>
            <Reveal>
              <span className="eyebrow">// 05 — Contact</span>
              <h2 className="h2 h2--wide">
                Get in touch <span className="serif">today</span>
              </h2>
              <p className="lede contact-lede">
                Available for freelance web development, custom admin utilities and UI/UX work.
                Send what you are building — even a rough brief — and I will reply with a plan,
                usually within a day.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="contact-pills">
                <a className="contact-pill" href={`mailto:${CONTACT.email}`}>
                  <span className="contact-icon" aria-hidden="true">
                    <Mail size={15} />
                  </span>
                  {CONTACT.email}
                  <ArrowUpRight className="arrow" size={14} aria-hidden="true" />
                </a>

                <a
                  className="contact-pill"
                  href={`https://wa.me/${CONTACT.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-icon" aria-hidden="true">
                    <Phone size={15} />
                  </span>
                  {CONTACT.phone}
                  <ArrowUpRight className="arrow" size={14} aria-hidden="true" />
                </a>

                <a
                  className="contact-pill"
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-icon" aria-hidden="true">
                    <GithubMark size={15} />
                  </span>
                  GitHub
                  <ArrowUpRight className="arrow" size={14} aria-hidden="true" />
                </a>
              </div>

              <p className="contact-loc">
                <MapPin size={12} aria-hidden="true" />
                {CONTACT.location} · Mon–Sat, 10:00–19:00 IST
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form className="form-card glass" onSubmit={onSubmit} noValidate>
              <h3>Leave a message</h3>
              <p>Opens WhatsApp or your mail app with the details filled in — nothing is stored here.</p>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="field-name">Full name</label>
                  <input
                    id="field-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={(event) => update("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "error-name" : undefined}
                  />
                  {errors.name ? (
                    <span className="field-error" id="error-name">
                      {errors.name}
                    </span>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="field-email">Email address</label>
                  <input
                    id="field-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(event) => update("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "error-email" : undefined}
                  />
                  {errors.email ? (
                    <span className="field-error" id="error-email">
                      {errors.email}
                    </span>
                  ) : null}
                </div>

                <div className="field field--full">
                  <label htmlFor="field-subject">Subject</label>
                  <input
                    id="field-subject"
                    name="subject"
                    type="text"
                    placeholder="New site, redesign, admin tool…"
                    value={values.subject}
                    onChange={(event) => update("subject", event.target.value)}
                  />
                </div>

                <div className="field field--full">
                  <label htmlFor="field-message">Message</label>
                  <textarea
                    id="field-message"
                    name="message"
                    rows={4}
                    placeholder="What are you building, and what should it do?"
                    value={values.message}
                    onChange={(event) => update("message", event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "error-message" : undefined}
                  />
                  {errors.message ? (
                    <span className="field-error" id="error-message">
                      {errors.message}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="form-actions">
                <button className="btn btn-lime" type="submit">
                  Send message
                  <Send size={15} />
                </button>
                <button className="btn btn-glass" type="button" onClick={() => send("email")}>
                  <Mail size={15} />
                  Email instead
                </button>
              </div>

              <p className="form-note">
                Prefer a call? <b>{CONTACT.phone}</b> · Mon–Sat, 10:00–19:00 IST.
              </p>

              {sent ? (
                <p className="form-success" role="status">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  {sent === "whatsapp"
                    ? "Draft opened in WhatsApp — press send there to reach me."
                    : "Your mail app should be open with the message ready to send."}
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

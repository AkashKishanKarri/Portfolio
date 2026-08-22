import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const links = [
  { href: "/", label: "Home", idx: "01" },
  { href: "/work", label: "Work", idx: "02" },
  { href: "/experience", label: "Experience", idx: "03" },
  { href: "/contact", label: "Contact", idx: "04" },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const resumePath = "/projects/Akash_Resume.pdf";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/85 backdrop-blur-md border-b border-line">
      <nav className="wrap flex items-center justify-between h-16">
        <Link to="/" className="font-mono text-sm tracking-wide flex items-center gap-2">
          {/* <span className="w-[7px] h-[7px] rounded-full bg-accent inline-block animate-pulse" /> */}
          Akash.js
        </Link>

        <div
          className={`
            font-mono text-[12.5px] text-muted
            md:flex md:gap-7 md:static md:bg-transparent md:flex-row md:max-h-none md:border-0
            ${open ? "flex" : "hidden"}
            flex-col fixed top-16 left-0 right-0 bg-surface border-b border-line
          `}
        >
          {links.map((l) => {
            const active = location.pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`md:px-0 px-6 py-3.5 md:py-0 border-t md:border-0 border-line transition-colors hover:text-ink ${active ? "text-ink" : ""
                  }`}
              >
                <span className="text-accent mr-1.5">{l.idx}</span>
                {l.label}
              </Link>
            );
          })}
          <a
            href={resumePath}
            download
            onClick={() => setOpen(false)}
            className="md:px-0 px-6 py-3.5 md:py-0 border-t md:border-0 border-line transition-colors hover:text-ink"
          >
            <span className="text-accent mr-1.5">05</span>
            Resume
          </a>
        </div>

        <button
          className="md:hidden font-mono text-[13px]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>
    </header>
  );
}

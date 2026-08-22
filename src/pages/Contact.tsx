import { profile } from "@/lib/data";

export default function Contact() {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

  return (
    <div className="wrap py-24">
      <div className="border border-line bg-surface px-6 py-16 md:px-12 md:py-20 text-center relative">
        <div className="eyebrow justify-center">
          <span className="text-muted mr-1.5">04</span>Contact
        </div>
        <h1 className="font-disp font-semibold text-[clamp(1.9rem,5vw,2.8rem)] tracking-tight mb-5">
          Let&apos;s build something.
        </h1>
        <p className="text-muted max-w-md mx-auto mb-9">
          Open to internships, collaborations, and interesting problems reach out and
          I&apos;ll get back to you.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href={gmailComposeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Email me →
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            LinkedIn
          </a>
        </div>
        <div className="mt-9 font-mono text-xs text-muted flex gap-6 justify-center flex-wrap">
          <span>{profile.phone}</span>
          <span>{profile.email}</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </div>
  );
}

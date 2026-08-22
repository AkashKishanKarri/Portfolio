import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="wrap py-10 font-mono text-xs text-muted flex justify-between flex-wrap gap-3 border-t border-line mt-10">
      <span>© 2026 {profile.name}</span>
      <span>{profile.location}</span>
    </footer>
  );
}

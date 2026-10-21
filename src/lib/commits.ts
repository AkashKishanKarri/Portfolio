import { useEffect, useState } from "react";
import { ghRepo } from "@/lib/github";

export type Commit = { sha: string; date: string };

// Snapshot of each repo's latest commit (Oct 2026). The live GitHub API refreshes it in the
// browser; this is the fallback when the API is rate-limited or offline.
const SNAPSHOT: Record<string, Commit> = {
  DL_Backend: { sha: "b05781e", date: "2026-08-21" },
  CXRRRR: { sha: "ebcf82f", date: "2026-08-21" },
  MDC_official_demo: { sha: "900050e", date: "2026-03-31" },
  ProdVis: { sha: "bbe497e", date: "2026-05-10" },
  "Rooster-Generator": { sha: "6ae7d26", date: "2026-08-17" },
  "Vital-Vault": { sha: "08abda6", date: "2025-03-26" },
  RelativeGradingTool: { sha: "25906be", date: "2025-03-28" },
  "mdcgitam/tmcg-ideasprint-portal": { sha: "877ea14", date: "2026-10-05" },
};

const CACHE = "gh-latest-commits";

async function fetchLatest(repo: string): Promise<Commit> {
  const r = await fetch(`https://api.github.com/repos/${ghRepo(repo)}/commits?per_page=1`);
  if (!r.ok) throw new Error(String(r.status));
  const [c] = await r.json();
  return { sha: c.sha.slice(0, 7), date: c.commit.committer.date.slice(0, 10) };
}

export function useLatestCommits(repos: string[]) {
  const [commits, setCommits] = useState<Record<string, Commit>>(() => {
    try {
      return { ...SNAPSHOT, ...JSON.parse(sessionStorage.getItem(CACHE) ?? "{}") };
    } catch {
      return SNAPSHOT;
    }
  });

  useEffect(() => {
    let alive = true;
    try {
      if (sessionStorage.getItem(CACHE)) return;
    } catch {}
    Promise.allSettled(repos.map(fetchLatest)).then((res) => {
      if (!alive) return;
      const fresh: Record<string, Commit> = {};
      res.forEach((r, i) => r.status === "fulfilled" && (fresh[repos[i]] = r.value));
      if (!Object.keys(fresh).length) return;
      setCommits((c) => ({ ...c, ...fresh }));
      try {
        sessionStorage.setItem(CACHE, JSON.stringify(fresh));
      } catch {}
    });
    return () => {
      alive = false;
    };
  }, [repos.join()]);

  return commits;
}

export const formatDate = (d: string) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

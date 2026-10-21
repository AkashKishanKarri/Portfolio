// Mermaid diagrams in GitDiagram's format, one per project repo.
// `generated: true` means the file is GitDiagram's own output (pulled from gitdiagram.com);
// the rest were written by hand in the same format because GitDiagram could not generate them.
import DL_Backend from "./DL_Backend.mmd?raw";
import CXRRRR from "./CXRRRR.mmd?raw";
import MDC_official_demo from "./MDC_official_demo.mmd?raw";
import ProdVis from "./ProdVis.mmd?raw";
import Rooster from "./Rooster-Generator.mmd?raw";
import VitalVault from "./Vital-Vault.mmd?raw";
import Grading from "./RelativeGradingTool.mmd?raw";
import IdeaSprint from "./tmcg-ideasprint-portal.mmd?raw";

export type GitDiagram = { code: string; generated: boolean };

export const gitdiagrams: Record<string, GitDiagram> = {
  DL_Backend: { code: DL_Backend, generated: true },
  CXRRRR: { code: CXRRRR, generated: true },
  MDC_official_demo: { code: MDC_official_demo, generated: false },
  ProdVis: { code: ProdVis, generated: false },
  "Rooster-Generator": { code: Rooster, generated: false },
  "Vital-Vault": { code: VitalVault, generated: false },
  RelativeGradingTool: { code: Grading, generated: false },
  "mdcgitam/tmcg-ideasprint-portal": { code: IdeaSprint, generated: true },
};

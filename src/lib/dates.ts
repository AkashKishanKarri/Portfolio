// Parsing for the "May 2026 - Jul 2026" ranges used in data.ts, as fractional years.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const today = new Date();
export const NOW = today.getFullYear() + today.getMonth() / 12;

const parse = (s: string) => {
  const m = s.match(/([A-Z][a-z]{2})\s+(\d{4})/);
  return m ? +m[2] + MONTHS.indexOf(m[1]) / 12 : NOW;
};

export const span = (when: string) => {
  const [a, b] = when.split(/\s*-\s*/);
  return { start: parse(a), end: b ? parse(b) : NOW };
};

// "3 mos", "1 yr 4 mos"; both ends inclusive.
export const duration = (start: number, end: number) => {
  const months = Math.round((end - start) * 12) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
};

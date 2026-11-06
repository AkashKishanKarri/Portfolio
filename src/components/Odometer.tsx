// Digits roll up through 0-9 like a mechanical counter; anything that isn't a digit
// (".", "+", "K") is set as-is.
export default function Odometer({ value, run, delay = 0 }: { value: string; run: boolean; delay?: number }) {
  return (
    <span className="inline-flex tabular-nums" aria-label={value}>
      {[...value].map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} aria-hidden className="inline-block h-[1.1em] leading-[1.1em] align-bottom">
              {ch}
            </span>
          );
        }
        const d = +ch;
        return (
          <span key={i} aria-hidden className="relative inline-block h-[1.1em] overflow-hidden align-bottom">
            <span
              className="flex flex-col transition-transform duration-[1800ms] ease-expo"
              style={{ transform: `translateY(${run ? -(d + 10) * 1.1 : 0}em)`, transitionDelay: `${delay + i * 90}ms` }}
            >
              {/* two full turns of the wheel so every digit visibly spins */}
              {[...Array(20)].map((_, k) => (
                <span key={k} className="h-[1.1em] leading-[1.1em]">
                  {k % 10}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

import { useState } from "react";

export default function PhotoStack({ photos, alt }: { photos: string[]; alt: string }) {
  const [hovered, setHovered] = useState(false);

  // rotation/offset per card index for the fanned resting state
  const layout = [
    { rot: -6, x: -14, y: 6 },
    { rot: 3, x: 10, y: 2 },
    { rot: -1, x: 0, y: -4 },
  ];

  const spread = [
    { rot: -8, x: -90, y: 10 },
    { rot: 0, x: 0, y: -10 },
    { rot: 8, x: 90, y: 10 },
  ];

  return (
    <div
      className="relative h-56 md:h-64 flex items-center justify-center select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {photos.slice(0, 3).map((src, i) => {
        const rest = layout[i] ?? layout[layout.length - 1];
        const out = spread[i] ?? spread[spread.length - 1];
        const state = hovered ? out : rest;
        return (
          <img
            key={src + i}
            src={src}
            alt={`${alt} — screenshot ${i + 1}`}
            loading="lazy"
            className="absolute w-40 md:w-48 aspect-[7/5] object-cover border border-line bg-surface shadow-sm transition-all duration-300 ease-out"
            style={{
              transform: `translate(${state.x}px, ${state.y}px) rotate(${state.rot}deg)`,
              zIndex: hovered ? i : photos.length - i,
            }}
          />
        );
      })}
    </div>
  );
}

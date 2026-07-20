import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SWIPE_THRESHOLD = 60;

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

export function Carousel({ items }) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const desktop = useIsDesktop();

  const wrap = useCallback((i) => (i + count) % count, [count]);
  const go = useCallback((dir) => setActive((a) => wrap(a + dir)), [wrap]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const relative = (i) => {
    let offset = i - active;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  const step = desktop ? 300 : 165;
  const styleFor = (offset) => {
    const abs = Math.abs(offset);
    const dir = Math.sign(offset);
    const shift = abs === 1 ? step : step * 1.55;
    return {
      x: `calc(-50% + ${offset === 0 ? 0 : dir * shift}px)`,
      y: "-50%",
      rotateY: offset === 0 ? 0 : -dir * 34,
      scale: offset === 0 ? 1 : abs === 1 ? 0.82 : 0.66,
      opacity: abs === 0 ? 1 : abs === 1 ? 0.85 : 0.35,
      filter: offset === 0 ? "blur(0px)" : "blur(2px)",
      zIndex: 30 - abs,
    };
  };

  return (
    <div className="relative rounded-3xl overflow-hidden select-none">
      <motion.div
        className="relative mx-auto h-[380px] sm:h-[520px] cursor-grab active:cursor-grabbing"
        style={{ perspective: 1400 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={(_, info) => {
          if (info.offset.x < -SWIPE_THRESHOLD) go(1);
          else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
        }}
      >
        {items.map((item, i) => {
          const offset = relative(i);
          const isCenter = offset === 0;
          return (
            <motion.button
              type="button"
              key={item.src}
              onClick={() => !isCenter && setActive(i)}
              aria-label={item.title}
              aria-hidden={Math.abs(offset) > 2}
              tabIndex={isCenter ? 0 : -1}
              className="absolute left-1/2 top-1/2 w-[190px] sm:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
              initial={false}
              animate={styleFor(offset)}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={item.src}
                alt={item.title}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.button>
          );
        })}
      </motion.div>

      <div className="relative pb-8 sm:pb-10 text-center">
        <div className="flex flex-col items-center gap-1 text-black/40">
          <span className="text-[11px] tabular-nums tracking-widest">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <div className="h-6 w-4 rounded-full border border-black/25 flex justify-center pt-1.5">
            <motion.span
              className="h-1.5 w-0.5 rounded-full bg-black/50"
              animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </div>
          <ChevronDown size={12} className="opacity-50" />
        </div>
      </div>
    </div>
  );
}

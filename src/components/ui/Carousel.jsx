import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SWIPE_THRESHOLD = 60;

export function Carousel({ items }) {
  const count = items.length;
  const [index, setIndex] = useState(0);

  const wrap = useCallback((i) => (i + count) % count, [count]);
  const go = useCallback((dir) => setIndex((i) => wrap(i + dir)), [wrap]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl bg-black/5">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 34 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) go(1);
            else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
          }}
        >
          {items.map((item) => (
            <div key={item.src} className="relative min-w-full aspect-[16/10]">
              <img
                src={item.src}
                alt={item.title}
                draggable={false}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
                  {item.tag}
                </p>
                <h3 className="font-display text-base sm:text-xl font-semibold text-white mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Design sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-md transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Design berikutnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-md transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ke slide ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-black" : "w-1.5 bg-black/20 hover:bg-black/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

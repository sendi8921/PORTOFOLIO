import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

/* Ikon kursor default — bentuk panah/pointer khas, bisa diganti pakai prop `cursor` */
function DefaultCursorSVG() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 3L10.5 21L13 13L21 10.5L3 3Z"
        fill="#141414"
        stroke="white"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Konfigurasi spring default resmi dari smooth-cursor:
   damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 */
const defaultSpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

export function SmoothCursor({ cursor, springConfig = defaultSpringConfig }) {
  const [isTouch, setIsTouch] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const rotation = useSpring(0, springConfig);

  useEffect(() => {
    const touchDevice = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touchDevice);
    if (touchDevice) return;

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      // hitung sudut rotasi berdasar arah gerakan (velocity tracking)
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        rotation.set(angle);
      }

      x.set(e.clientX);
      y.set(e.clientY);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, rotation]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        x,
        y,
        rotate: rotation,
        translateX: "-10%",
        translateY: "-10%",
      }}
    >
      {cursor || <DefaultCursorSVG />}
    </motion.div>
  );
}

export default SmoothCursor;
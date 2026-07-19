import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothCursor } from "./ui/SmoothCursor";
import { Carousel } from "./ui/Carousel";
import {
  ArrowUpRight, MapPin, Mail
} from "lucide-react";

function BrandIcon({ path, size = 17, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={path} />
    </svg>
  );
}

const BRAND_PATHS = {
  gmail:
    "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
  instagram:
    "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
};

const PROFILE = {
  name: "Sendi Pratama",
  role: "Web Developer & Machine Learning",
  photo: "/hero-photo.jpg",
  tagline:
    "Mengubah ide dan data menjadi produk web serta model machine learning yang rapi, cepat, dan berdampak.",
  bio:
    "Didorong rasa penasaran terhadap data dan sistem, saya membangun aplikasi web dan model machine learning yang sederhana, fungsional, dan mudah dipahami. Sebagai mahasiswa, saya terus belajar dan mengeksplorasi ide baru.",
  location: "Banjarbaru, Indonesia",
  email: "sendipratama302@gmail.com",
};

// Ganti dengan link prototype/file Figma yang sudah dipublikasikan (Share → Anyone with the link).
const FIGMA_URL = "https://www.figma.com/@sendipratama";

const PROJECTS = [
  {
    title: "AL-FORIVER · Monitoring Kualitas Air",
    tag: "Web App · Laravel · Live",
    description:
      "Sistem monitoring kualitas air laut & sungai untuk Dinas Lingkungan Hidup Provinsi Kalimantan Selatan, sudah live dan bisa diakses publik.",
    image: "/projects/alforiver.jpg",
    href: "https://alforiver.kalselprov.go.id/",
    cta: "Kunjungi situs",
  },
  {
    title: "UI/UX Design · Figma",
    tag: "Product Design · Figma",
    description:
      "Rancangan antarmuka aplikasi & website yang dipublikasikan sebagai prototype Figma, jadi siapa pun bisa membuka dan mencobanya langsung.",
    image: "/projects/figma.jpg",
    href: FIGMA_URL,
    cta: "Buka di Figma",
  },
];

const DESIGN_SHOWCASE = [
  { src: "/designs/design-1.jpg", title: "Wellness App UI Kit", tag: "Mobile App" },
  { src: "/designs/design-3.jpg", title: "Water Quality Monitoring App", tag: "Mobile App" },
  { src: "/designs/design-2.jpg", title: "SaaS Landing Page", tag: "Web Design" },
  { src: "/designs/design-4.jpg", title: "Design System", tag: "Branding & UI" },
];

const SOCIALS = [
  { icon: "gmail", href: "mailto:sendipratama302@gmail.com", label: "Gmail" },
  { icon: "github", href: "https://github.com/", label: "GitHub" },
  { icon: "linkedin", href: "https://linkedin.com/in/", label: "LinkedIn" },
  { icon: "whatsapp", href: "https://wa.me/62xxxxxxxxxxx", label: "WhatsApp" },
  { icon: "instagram", href: "https://instagram.com/", label: "Instagram" },
];

const SKILL_GROUPS = [
  {
    num: "01",
    title: "Design & UI/UX",
    skills: ["UI/UX Design", "Wireframing", "Prototyping", "User Research"],
  },
  {
    num: "02",
    title: "Front-End",
    skills: ["HTML5", "CSS"],
  },
  {
    num: "03",
    title: "Machine Learning & Data",
    skills: ["Python", "Scikit-learn", "Streamlit"],
  },
  {
    num: "04",
    title: "Back-End & Database",
    skills: ["Laravel (PHP)", "MySQL", "PostgreSQL"],
  },
  {
    num: "05",
    title: "Tools & Workflow",
    skills: ["Git", "Figma"],
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SkillsList({ groups }) {
  return (
    <div>
      <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-black/40 mb-6">
        Keahlian
      </span>
      <div className="space-y-8">
      {groups.map((g, i) => (
        <Reveal key={g.num} delay={i * 60}>
          <div className="flex items-start gap-4">
            <span className="font-display text-3xl font-semibold text-lime-300 shrink-0 tabular-nums leading-none">
              {g.num}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-xl font-semibold">{g.title}</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {g.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-black/15 text-black/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
      </div>
    </div>
  );
}

function PinnedSkillsStack({ groups }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groups.length]);

  const active = groups[activeIndex];

  return (
    <div className="relative">
      <div className="sticky top-24">
        <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-black/40 mb-6">
          Keahlian
        </span>
        <div className="flex items-start gap-4 sm:gap-8">
          <div
            className="relative shrink-0 overflow-hidden font-display text-5xl sm:text-8xl font-semibold text-lime-300 tabular-nums"
            style={{ height: "1em", lineHeight: 1 }}
            aria-hidden="true"
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={active.num}
                className="block"
                style={{ height: "1em", lineHeight: 1 }}
                initial={{ y: "0.6em", opacity: 0 }}
                animate={{ y: "0em", opacity: 1 }}
                exit={{ y: "-0.6em", opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {active.num}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex-1 min-w-0 pt-1 sm:pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.num}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-semibold">
                  {active.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {active.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-black/15 text-black/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-2 mt-10 sm:mt-14">
          {groups.map((g, i) => (
            <span
              key={g.num}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-black" : "w-1.5 bg-black/15"
              }`}
            />
          ))}
        </div>
      </div>

      <div aria-hidden="true">
        {groups.map((g, i) => (
          <div
            key={g.num}
            data-index={i}
            ref={(el) => (itemRefs.current[i] = el)}
            className="h-[55vh]"
          />
        ))}
      </div>
    </div>
  );
}

const dockGlowVariants = {
  hidden: { opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
};
const dockRingVariants = {
  hidden: { opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

function SocialDock() {
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef(null);

  const handleEnter = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHovered(true);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setHovered(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  return (
    <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20">
      <style>{`
        @property --dock-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes dock-chase {
          to { --dock-angle: 360deg; }
        }
        .dock-chasing-bg {
          --dock-angle: 0deg;
          background: conic-gradient(
            from var(--dock-angle),
            rgba(255,70,130,1),
            rgba(255,150,70,1),
            rgba(130,70,210,1),
            rgba(90,90,220,1),
            rgba(255,70,130,1)
          );
          animation: dock-chase 2.6s linear infinite;
        }
        .dock-chasing-ring {
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>

      <div
        className="relative rounded-full"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="chasing-glow"
              variants={dockGlowVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="dock-chasing-bg absolute -inset-1.5 rounded-full blur-[20px] pointer-events-none"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hovered && (
            <motion.div
              key="chasing-ring"
              variants={dockRingVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="dock-chasing-bg dock-chasing-ring absolute -inset-[0px] rounded-full pointer-events-none"
              style={{ padding: "2px" }}
            />
          )}
        </AnimatePresence>

        <div className="relative flex items-center gap-0.5 sm:gap-1 bg-black/85 backdrop-blur-md rounded-full px-1.5 sm:px-2.5 py-1.5 sm:py-2 shadow-xl">
          {SOCIALS.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <BrandIcon path={BRAND_PATHS[icon]} size={16} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioMinimal() {
  return (
    <div
      className="min-h-screen w-full overflow-x-clip bg-[#F5F3EF] text-[#141414] font-sans"
      style={{ overflowX: "clip" }}
    >
      <SmoothCursor />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        @font-face {
          font-family: 'Cantry';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url('/fonts/Cantry.otf') format('opentype'),
               url('/fonts/Cantry.ttf') format('truetype');
        }

        .font-sans { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; }
        .font-display { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; letter-spacing: -0.01em; }
        .italic-display { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; font-style: italic; }
        .font-cantry { font-family: 'Cantry', 'Manrope', ui-sans-serif, system-ui, sans-serif; letter-spacing: -0.015em; }
        html { scroll-behavior: smooth; }
        @media (min-width: 768px) {
          * { cursor: none !important; }
          input, textarea, select { cursor: text !important; }
        }
      `}</style>

      <section
        id="top"
        className="relative w-full overflow-hidden bg-[#8B8B87]"
        style={{ height: "100svh", minHeight: "560px", maxHeight: "900px" }}
      >
        <SocialDock />
        <img
          src={PROFILE.photo}
          alt={PROFILE.name}
          className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-90"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-right max-w-[45%] sm:max-w-none">
          <p className="text-[10px] sm:text-sm font-medium tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            TECH ENTHUSIAST
          </p>
        </div>

        <div className="absolute bottom-25 left-5 right-5 sm:bottom-50 sm:left-10 sm:right-auto sm:max-w-xl">
          <div className="mb-3 sm:mb-4 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_10px_2px_rgba(190,242,100,0.7)]" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              Web Developer &amp; Machine Learning
            </span>
          </div>

          <h1 className="font-cantry text-white font-semibold leading-[1.1] text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] break-words">
            Saya Sendi Pratama merancang dan{" "}
            <span className="text-lime-300">membangun web</span> dari{" "}
            Banjarbaru, Indonesia.
          </h1>

          <p className="font-cantry mt-4 sm:mt-5 text-white/90 text-sm leading-relaxed max-w-sm drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            Ngoding{" "}
            <span className="font-medium text-white">aplikasi web</span> &amp;{" "}
            <span className="font-medium text-white">machine learning</span>.
            Kenali saya <span className="font-medium text-white">lebih dekat</span>.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-start">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-black/40 mb-4">
              Profil
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.05]">
              {PROFILE.name}
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full bg-lime-300 text-black">
              Full-Stack Developer &amp; UI/UX Designer
            </p>

            <p className="text-black/60 text-base leading-relaxed mt-6 max-w-md">
              Menjembatani{" "}
              <span className="text-black font-medium">keindahan desain visual</span>{" "}
              dengan{" "}
              <span className="text-black font-medium">fungsionalitas kode</span>.
              Merancang antarmuka yang intuitif, lalu mengimplementasikannya nyata
              ke sistem web berbasis Laravel maupun model machine learning berbasis
              Python — dengan fokus pada kode efisien, database optimal, dan
              pengalaman pengguna yang mulus dari hulu ke hilir.
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-black/50 mt-6">
              <MapPin size={15} /> {PROFILE.location}
            </div>
          </Reveal>

          <div className="lg:hidden">
            <SkillsList groups={SKILL_GROUPS} />
          </div>
          <div className="hidden lg:block">
            <PinnedSkillsStack groups={SKILL_GROUPS} />
          </div>
        </div>
      </section>

      <section id="portofolio" className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <Reveal>
          <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-black/40 mb-3">
            Portofolio
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-semibold">
            Project <span className="italic-display font-normal">terpilih</span>
          </h2>
          <p className="text-black/55 text-sm sm:text-base mt-3 max-w-lg">
            Beberapa web yang saya bangun dan rancang — dari aplikasi live sampai
            desain UI/UX yang bisa langsung dibuka dan dicoba siapa saja.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mt-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/5">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <h3 className="font-display font-medium text-base sm:text-lg">{p.title}</h3>
                  <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-black/60 group-hover:text-black transition-colors">
                    {p.cta} <ArrowUpRight size={13} />
                  </span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-500 mt-1">
                  {p.tag}
                </p>
                <p className="text-sm text-black/50 mt-2 leading-relaxed">{p.description}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 sm:mt-20">
          <div className="flex items-end justify-between gap-4 mb-5 sm:mb-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold">
                Galeri <span className="italic-display font-normal">design</span>
              </h3>
              <p className="text-sm text-black/50 mt-1">
                Geser untuk melihat karya desain lainnya.
              </p>
            </div>
            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-black/15 text-black/70 hover:border-black/40 hover:text-black transition-colors"
            >
              Lihat semua di Figma <ArrowUpRight size={13} />
            </a>
          </div>
          <Carousel items={DESIGN_SHOWCASE} />
        </Reveal>
      </section>

      <section id="about" className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14 border-t border-black/5">
        <Reveal className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <h2 className="font-display text-2xl sm:text-4xl font-semibold">
            Tentang <span className="italic-display font-normal">Saya</span>
          </h2>
          <div className="text-black/60 leading-relaxed space-y-4 text-sm sm:text-base">
            <p>
              Mahasiswa Teknik Informatika di UNISKA Banjarmasin, sedang
              menyelesaikan skripsi tentang sistem monitoring kualitas air
              laut berbasis web untuk Dinas Lingkungan Hidup Provinsi
              Kalimantan Selatan.
            </p>
            <p>
              Fokus utama saya ada di Laravel untuk web development, serta
              Python dan Streamlit untuk eksplorasi machine learning.
            </p>
          </div>
        </Reveal>
      </section>

      <section
        id="contact"
        className="relative w-full mt-4 mb-0 overflow-hidden bg-[#D9DCE6]"
        style={{
          clipPath: "polygon(0 0, 90% 0, 100% 6%, 100% 100%, 0 100%)",
        }}
      >
        <div className="relative px-5 sm:px-10 pt-8 sm:pt-10 pb-6 sm:pb-8 min-h-[420px] sm:min-h-[440px] flex flex-col">
          <Reveal className="max-w-[180px] sm:max-w-[240px]">
            <p className="text-sm sm:text-base font-semibold leading-snug text-black/80">
              Ini akhir dari halaman, tapi awal dari kolaborasi kita.
            </p>
          </Reveal>

          <svg
            viewBox="0 0 600 260"
            className="absolute top-6 left-0 w-full h-[45%] sm:h-[60%] pointer-events-none"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M 20 205 C 140 250, 240 235, 305 165 C 345 122, 380 95, 420 90 L 465 65"
              stroke="#141414"
              strokeWidth="2"
              strokeDasharray="1 9"
              strokeLinecap="round"
              className="draw-path"
            />
            <g transform="translate(465,65) rotate(-29.05)">
              <polygon points="13,0 -9,-6.5 -3.5,0 -9,6.5" fill="#141414" />
            </g>
          </svg>
          <style>{`
            .draw-path {
              stroke-dashoffset: 500;
              animation: draw 2.5s ease-out forwards;
            }
            @keyframes draw {
              to { stroke-dashoffset: 0; }
            }
            @media (prefers-reduced-motion: reduce) {
              .draw-path { animation: none; stroke-dashoffset: 0; }
            }
          `}</style>

          <div className="flex-1" />

          <Reveal delay={100} className="mb-6 sm:mb-10">
            <h2
              className="font-display font-semibold leading-[0.95] break-words"
              style={{ fontSize: "clamp(2.25rem, 12vw, 4.5rem)" }}
            >
              Yuk, <span className="italic-display font-normal">ngobrol</span>
            </h2>
          </Reveal>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-[11px] sm:text-xs text-black/50 order-2 sm:order-1">
              © {new Date().getFullYear()} — {PROFILE.name.toUpperCase()}
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="order-1 sm:order-2 inline-flex items-center gap-1.5 bg-lime-300 text-black text-[11px] sm:text-xs font-bold normal-case tracking-wide px-3 py-1.5 rounded-full border border-black/10 hover:bg-lime-200 transition-colors max-w-full"
            >
              <Mail size={12} className="shrink-0" />
              <span className="truncate">
                <span className="hidden sm:inline">EMAIL: </span>
                {PROFILE.email}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
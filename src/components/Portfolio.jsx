import React from "react";
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const PROFILE = {
  name: "Sendi Pratama",
  role: "IT Support & Web Developer",
  location: "Banjarbaru, Kalimantan Selatan",
  phone: "+62 878 1764 0992",
  email: "sendipratama302@gmail.com",
  summary:
    "Lulusan Teknik Informatika yang telah menyelesaikan sidang skripsi dan saat ini menunggu proses yudisium/wisuda. Memiliki pengetahuan dasar IT Support dan IT Helpdesk, pengembangan aplikasi web, pengelolaan data, serta administrasi. Memahami troubleshooting hardware/software, instalasi sistem, jaringan dasar, serta pengembangan website menggunakan Laravel, PHP, MySQL, dan React melalui pembelajaran dan proyek perkuliahan.",
  cvUrl: "/cv-sendi-pratama.pdf",
};

const CORE_COMPETENCIES = [
  "Pengembangan Web (Laravel, PHP, React)",
  "Instalasi & Konfigurasi Sistem Operasi",
  "Database & SQL (MySQL)",
  "Troubleshooting Hardware & Software",
  "Jaringan Komputer Dasar",
  "Input Data & Dokumentasi",
  "Dukungan Teknis untuk Pengguna Akhir",
  "Git/GitHub & Microsoft Office",
];

const SKILL_GROUPS = [
  { title: "Web Development", level: "Menengah", items: ["Laravel", "PHP", "React", "HTML", "CSS"] },
  { title: "IT Support & Hardware", level: "Menengah", items: ["Troubleshooting", "Instalasi OS", "Perawatan PC/Laptop"] },
  { title: "Jaringan Dasar", level: "Dasar", items: ["IP Addressing", "Routing Dasar", "Konfigurasi MikroTik/Cisco"] },
  { title: "Database", level: "Menengah", items: ["MySQL", "SQL Query", "Normalisasi Data"] },
  { title: "Dokumentasi", level: "Menengah", items: ["Laporan Teknis", "Dokumentasi Serah Terima", "Input Data"] },
  { title: "Tools", level: "Menengah", items: ["Git", "GitHub", "Figma", "Microsoft Office"] },
];

const EXPERIENCES = [
  {
    company: "Dinas Lingkungan Hidup Provinsi Kalimantan Selatan",
    role: "Fullstack Developer",
    period: "Sep 2025 - Nov 2025",
    points: [
      "Mengembangkan dan memelihara ALFO RIVER (alforiver.kalselprov.go.id) sebagai website layanan publik pemantauan kualitas air sungai.",
      "Membangun modul data pemantauan manual/otomatis serta grafik tren Indeks Kualitas Air (IKA) untuk memudahkan analisis petugas.",
      "Menyusun dokumentasi teknis dan laporan terstruktur untuk mendukung proses serah terima proyek ke instansi terkait.",
      "Berkoordinasi dengan tim instansi agar fitur yang dikembangkan memenuhi standar aksesibilitas dan kegunaan publik.",
    ],
  },
  {
    company: "Service Shop Welcomp Techno Computer",
    role: "IT Hardware & Software Support",
    period: "Apr 2021 - Mei 2021",
    points: [
      "Melakukan perakitan, instalasi, dan troubleshooting hardware komputer/laptop pelanggan harian.",
      "Menginstal serta mengonfigurasi sistem operasi dan software standar untuk kebutuhan pengguna walk-in.",
      "Mendiagnosis masalah perangkat pendukung (printer dan periferal) hingga perangkat kembali berfungsi normal.",
      "Memberikan dukungan langsung kepada pelanggan dengan penjelasan teknis yang mudah dipahami.",
    ],
  },
];

const EDUCATION = [
  {
    institution: "Universitas Islam Kalimantan (UNISKA) Muhammad Arsyad Al Banjari",
    major: "S1 Teknik Informatika",
    period: "Sep 2023 - Agu 2026",
  },
  {
    institution: "SMKN 2 Banjarbaru",
    major: "Teknik Komputer dan Jaringan",
    period: "Jul 2019 - Mei 2022",
  },
];

const CERTIFICATIONS = [
  "Sertifikat LSP (Lembaga Sertifikasi Profesi) – Skema Analisis Program (PHP/SQL/PHPUnit), UNISKA (2026)",
  "MTCNA (MikroTik Certified Network Associate) – MikroTik (2022)",
  "Sertifikat Kompetensi – Routing dalam Autonomous System (AS) pada perangkat Cisco, ITSME Indonesia (2022)",
  "Sertifikat Kompetensi BNSP – Jaringan Komputer: Konfigurasi Routing pada Perangkat Jaringan Komputer, LSP SMKN 2 Banjarbaru (2021)",
];

const PROJECTS = [
  {
    title: "ALFO RIVER",
    period: "2025",
    problem: "Instansi membutuhkan layanan publik berbasis web untuk pemantauan kualitas air sungai yang mudah diakses.",
    contribution: "Membangun dan memelihara fitur monitoring data, grafik IKA, modul edukasi, serta struktur data pendukung website.",
    result: "Website aktif digunakan untuk publikasi informasi kondisi air sungai dan mendukung kebutuhan pelaporan instansi.",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    links: [
      { label: "Demo", href: "https://alforiver.kalselprov.go.id/" },
    ],
  },
  {
    title: "One Stop - Website Toko Sepeda (UI/UX)",
    period: "2025",
    problem: "Membutuhkan rancangan website e-commerce sepeda dengan alur navigasi yang jelas dan visual kuat.",
    contribution: "Mendesain flow, wireframe, prototype interaktif, serta komponen UI konsisten untuk halaman Home, Bikes, Parts, Equipment, About, Contact.",
    result: "Prototype siap uji pengguna sebagai acuan implementasi front-end dan komunikasi desain dengan tim pengembang.",
    tech: ["Figma", "UI Design", "Prototyping", "Design System"],
    links: [
      {
        label: "Figma",
        href: "https://www.figma.com/proto/Inllw47xGLXlhjLDxrWTkY/One-Stop?node-id=0-1",
      },
    ],
  },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/sendi8921", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sendi-pratama/", icon: Linkedin },
  { label: "WhatsApp", href: "https://wa.me/6287817640992", icon: Phone },
];

function SectionTitle({ title }) {
  return (
    <div className="mb-6 border-b border-black/20 pb-2">
      <h2 className="text-xl sm:text-2xl font-bold tracking-wide uppercase">{title}</h2>
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#131313]">
      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <header className="text-center border-b border-black/20 pb-8 sm:pb-10">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{PROFILE.name}</h1>
          <p className="mt-2 text-base sm:text-lg font-semibold text-black/80">{PROFILE.role}</p>
          <p className="mt-4 text-sm sm:text-base text-black/70">
            {PROFILE.location} • {PROFILE.phone}
          </p>
          <p className="text-sm sm:text-base text-black/70">{PROFILE.email}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PROFILE.cvUrl}
              className="inline-flex items-center gap-2 rounded-md border border-black px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition-colors"
            >
              <Download size={16} /> Download CV (PDF)
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-md border border-black/20 px-4 py-2 text-sm font-semibold hover:bg-black/5 transition-colors"
            >
              <Mail size={16} /> Kontak Cepat
            </a>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-black/70 hover:text-black"
              >
                <Icon size={15} /> {label}
              </a>
            ))}
          </div>
        </header>

        <section className="pt-10 sm:pt-12">
          <SectionTitle title="Ringkasan" />
          <p className="text-black/80 leading-relaxed">{PROFILE.summary}</p>
        </section>

        <section className="pt-10 sm:pt-12">
          <SectionTitle title="Kompetensi Utama" />
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
            {CORE_COMPETENCIES.map((item) => (
              <p key={item} className="text-black/80">• {item}</p>
            ))}
          </div>
        </section>

        <section className="pt-10 sm:pt-12">
          <SectionTitle title="Keahlian Teknis" />
          <div className="grid md:grid-cols-2 gap-4">
            {SKILL_GROUPS.map((group) => (
              <article key={group.title} className="rounded-lg border border-black/10 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{group.title}</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-black text-white">{group.level}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-xs px-2.5 py-1 rounded border border-black/20 text-black/70">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-10 sm:pt-12">
          <SectionTitle title="Pengalaman Kerja" />
          <div className="space-y-7">
            {EXPERIENCES.map((experience) => (
              <article key={experience.company} className="rounded-lg border border-black/10 bg-white p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold uppercase">{experience.company}</h3>
                    <p className="text-base font-semibold italic">{experience.role}</p>
                  </div>
                  <p className="text-sm font-medium text-black/70">{experience.period}</p>
                </div>
                <ul className="mt-3 space-y-1.5 text-black/80 list-disc list-inside">
                  {experience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-10 sm:pt-12">
          <SectionTitle title="Pendidikan" />
          <div className="space-y-4">
            {EDUCATION.map((item) => (
              <article key={item.institution} className="rounded-lg border border-black/10 bg-white p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                  <div>
                    <h3 className="font-bold uppercase">{item.institution}</h3>
                    <p className="italic text-black/80">{item.major}</p>
                  </div>
                  <p className="text-sm font-medium text-black/70">{item.period}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-10 sm:pt-12">
          <SectionTitle title="Sertifikasi" />
          <ul className="space-y-2 text-black/80 list-disc list-inside">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </section>

        <section className="pt-10 sm:pt-12">
          <SectionTitle title="Proyek Pilihan" />
          <div className="space-y-5">
            {PROJECTS.map((project) => (
              <article key={project.title} className="rounded-lg border border-black/10 bg-white p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p className="text-sm font-medium text-black/70">{project.period}</p>
                </div>

                <div className="mt-3 space-y-2 text-black/80 text-sm sm:text-base">
                  <p>
                    <span className="font-semibold text-black">Masalah:</span> {project.problem}
                  </p>
                  <p>
                    <span className="font-semibold text-black">Kontribusi:</span> {project.contribution}
                  </p>
                  <p>
                    <span className="font-semibold text-black">Hasil:</span> {project.result}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded border border-black/20 text-black/70">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-2"
                    >
                      {link.label} <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="pt-12 pb-4 text-sm text-black/60 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {PROFILE.name}</p>
          <p className="inline-flex items-center gap-1.5">
            <MapPin size={14} /> {PROFILE.location}
          </p>
        </footer>
      </main>
    </div>
  );
}

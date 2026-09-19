"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";

const roles = ["illustrator", "character designer", "visual storyteller", "creative coder"];
const works = [
  { src: "/art/bubble-bloom.jpg", title: "Bubble Bloom", type: "Digital illustration", className: "md:col-span-7 md:row-span-2" },
  { src: "/art/starfall.png", title: "Starfall", type: "Character portrait", className: "md:col-span-5" },
  { src: "/art/violet-portrait.jpg", title: "Violet Signal", type: "Digital portrait", className: "md:col-span-5" },
  { src: "/art/kosumo.jpg", title: "Kosumo", type: "Character design sheet", className: "md:col-span-7" },
  { src: "/art/summer.jpg", title: "Summer", type: "Character design sheet", className: "md:col-span-5" },
  { src: "/art/haber-process.png", title: "The Haber Process", type: "Editorial design · PDF", href: "/art/haber-process.pdf", className: "md:col-span-7" },
];

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now(); let frame = 0;
    const run = (now: number) => { const next = Math.min(100, Math.round(((now - start) / 2200) * 100)); setCount(next); if (next < 100) frame = requestAnimationFrame(run); else window.setTimeout(onComplete, 300); };
    frame = requestAnimationFrame(run); return () => cancelAnimationFrame(frame);
  }, [onComplete]);
  const word = count < 34 ? "Design" : count < 67 ? "Create" : "Imagine";
  return <motion.div exit={{ opacity: 0 }} transition={{ duration: .55 }} className="loading-screen">
    <span className="loading-label">VALENZIA / PORTFOLIO</span>
    <AnimatePresence mode="wait"><motion.p key={word} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -18, opacity: 0 }} className="loading-word">{word}</motion.p></AnimatePresence>
    <span className="loading-count">{String(count).padStart(3, "0")}</span>
    <span className="loading-track"><span style={{ transform: `scaleX(${count / 100})` }} /></span>
  </motion.div>;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeWork, setActiveWork] = useState<(typeof works)[number] | null>(null);
  useEffect(() => { const timer = window.setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2200); return () => clearInterval(timer); }, []);
  useEffect(() => { if (!loading) gsap.fromTo(".hero-reveal", { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 1.15, stagger: .11, ease: "power3.out" }); }, [loading]);
  useEffect(() => { document.body.style.overflow = activeWork ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [activeWork]);
  useEffect(() => {
    if (!activeWork) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActiveWork(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeWork]);

  return <main>
    <AnimatePresence>{loading && <LoadingScreen onComplete={() => setLoading(false)} />}</AnimatePresence>
    <nav className="nav-shell" aria-label="Main navigation">
      <a href="#home" className="monogram" aria-label="Valenzia home"><span>V</span></a>
      <div className="nav-links"><a href="#home">Home</a><a href="#gallery">Gallery</a></div>
    </nav>
    <section id="home" className="hero">
      <div className="hero-glow" /><div className="hero-art" aria-hidden="true"><Image src="/art/starfall.png" alt="" fill priority sizes="(max-width: 768px) 70vw, 38vw" className="object-cover" /></div>
      <div className="hero-copy">
        <p className="hero-reveal eyebrow">COLLECTION / 2026</p><h1 className="hero-reveal">Valenzia<span>.</span></h1>
        <p className="hero-reveal role-line">An independent <AnimatePresence mode="wait"><motion.em key={roleIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{roles[roleIndex]}</motion.em></AnimatePresence><br />based in Toronto.</p>
        <div className="hero-reveal hero-actions"><a href="#gallery" className="button button-primary">Explore the gallery</a><a href="https://artisto-peach.vercel.app" target="_blank" rel="noreferrer" className="button button-ghost">Visit Artisto <span>↗</span></a><a href="https://filmfreeway.com/projects/3078012" target="_blank" rel="noreferrer" className="button button-ghost">Short Film Project <span>↗</span></a></div>
      </div>
      <a href="#gallery" className="scroll-cue"><span>SCROLL TO DISCOVER</span><i /></a>
    </section>
    <section id="gallery" className="gallery-section">
      <motion.header initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .8 }} className="gallery-header">
        <div><p className="eyebrow">SELECTED EXPLORATIONS</p><h2>Digital Art <em>Gallery.</em></h2></div>
      </motion.header>
      <div className="art-grid">{works.map((work, index) => <motion.article key={work.src} className={`art-card ${work.className}`} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .7, delay: (index % 2) * .08 }}>
        <button onClick={() => setActiveWork(work)} aria-label={`Open artwork ${index + 1}`}><Image src={work.src} alt={`Digital artwork ${index + 1} by Valenzia`} fill sizes="(max-width: 768px) 100vw, 60vw" className="art-image" /><span className="art-wash" /><span className="art-meta"><span><small>{String(index + 1).padStart(2, "0")} / {work.type}</small></span><i aria-hidden="true">↗</i></span></button>
      </motion.article>)}</div>
    </section>
    <section className="project-section artisto-section"><div className="project-orbit" aria-hidden="true" /><p className="eyebrow">A SIDE PROJECT</p><h2>Art meets <em>technology.</em></h2><p>Discover Artisto.</p><a href="https://artisto-peach.vercel.app" target="_blank" rel="noreferrer" className="button button-primary">Open Artisto <span>↗</span></a></section>
    <section className="project-section film-section"><div className="project-orbit film-orbit" aria-hidden="true" /><p className="eyebrow">SHORT FILM PROJECT</p><h2>Short <em>Film.</em></h2><p>Discover the short film project.</p><a href="https://filmfreeway.com/projects/3078012" target="_blank" rel="noreferrer" className="button button-primary">View Short Film <span>↗</span></a></section>
    <footer><span>© {new Date().getFullYear()} VALENZIA</span><a href="https://motionsites.ai/" target="_blank" rel="noreferrer">CREDIT: MOTIONSITES.AI FOR INSPO ↗</a><span>ILLUSTRATION · DESIGN · CODE</span><a href="#home">BACK TO TOP ↑</a></footer>
    <AnimatePresence>{activeWork && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={activeWork.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveWork(null)}>
      <button className="lightbox-close" onClick={() => setActiveWork(null)} aria-label="Close artwork">CLOSE ×</button><motion.figure className="lightbox-inner" initial={{ scale: .96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .97 }} onClick={e => e.stopPropagation()}><img src={activeWork.src} alt="Full-size digital artwork by Valenzia" className="fullsize-art" draggable={false} /><figcaption className="lightbox-caption"><span><small>{activeWork.type}</small></span><span className="lightbox-actions"><small>Scroll to explore full size</small>{activeWork.href && <a href={activeWork.href} target="_blank" rel="noreferrer">View original PDF ↗</a>}</span></figcaption></motion.figure>
    </motion.div>}</AnimatePresence>
  </main>;
}

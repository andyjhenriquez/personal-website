import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // fix for nav mobile dropdown
  const smoothNav = (e, id) => {
    e.preventDefault();
    setOpen(false);
    // wait for the dropdown to collapse, then scroll
    setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // close when clicking a link or outside the panel
  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      const a = e.target.closest("a");
      if (a?.getAttribute("href")?.startsWith("#")) setOpen(false);
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        const isBtn = e.target.closest("#nav-toggle");
        if (!isBtn) setOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 bg-neutral-950/80 border-b border-neutral-800">
      <nav className="mx-auto max-w-6xl px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-mono text-sm md:text-base tracking-tight hover:opacity-90">
          &lt;<span className="accent">andy</span>/&gt;
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5 text-sm">
          <a href="#about" className="opacity-80 hover:opacity-100">About</a>
          <a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
          <a href="#blender-projects" className="opacity-80 hover:opacity-100">Blender</a>
          <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
          <a
            href="/Andy_Henriquez_Resume_Oct2025.pdf"
            download
            target="_blank"
            rel="noopener"
            className="px-3 py-1.5 rounded-lg bg-white text-neutral-900 font-medium hover:opacity-90 shadow-soft"
          >
            Download Résumé
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          id="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 hover:border-neutral-600"
        >
          {/* 3 lines icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden border-t border-neutral-800"
          >
            <div ref={panelRef} className="px-4 py-3 space-y-2 bg-neutral-950">
              <a href="#about" onClick={(e)=>smoothNav(e, "#about")}  className="block px-2 py-2 rounded hover:bg-neutral-900">About</a>
              <a href="#projects" onClick={(e)=>smoothNav(e, "#projects")} className="block px-2 py-2 rounded hover:bg-neutral-900">Projects</a>
              <a href="#blender-projects" onClick={(e)=>smoothNav(e, "#blender-projects")} className="block px-2 py-2 rounded hover:bg-neutral-900">Blender</a>
              <a href="#contact" onClick={(e)=>smoothNav(e, "#contact")} className="block px-2 py-2 rounded hover:bg-neutral-900">Contact</a>
              <a
                href="/Andy_Henriquez_Resume_Oct2025.pdf"
                download
                target="_blank"
                rel="noopener"
                className="block mt-2 px-3 py-2 rounded-lg bg-white text-neutral-900 font-medium text-center hover:opacity-90 shadow-soft"
              >
                Download Résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

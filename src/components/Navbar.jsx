import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 bg-neutral-950/80 border-b border-neutral-800">
      <nav className="mx-auto max-w-6xl px-4 md:px-8 py-3 flex items-center justify-between">
        <a href="#" className="font-mono text-sm md:text-base tracking-tight hover:opacity-90">
          &lt;<span className="accent">andy</span>/&gt;
        </a>
        <ul className="flex gap-5 text-sm">
          <li><a href="#about" className="opacity-80 hover:opacity-100">About</a></li>
          <li><a href="#projects" className="opacity-80 hover:opacity-100">Projects</a></li>
          <li><a href="#blender-projects" className="opacity-80 hover:opacity-100">Models</a></li>
          <li><a href="#contact" className="opacity-80 hover:opacity-100">Contact</a></li>
          <li>
            <a
              href="/Andy_Henriquez_Resume_Oct2025.pdf"
              download
              target="_blank"
              rel="noopener"
              className="opacity-80 hover:opacity-100"
            >
              Download Résumé
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

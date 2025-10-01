import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import BlenderProjects from './components/BlenderProjects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // Smooth scroll for internal anchors
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      e.preventDefault()
      const el = document.querySelector(a.getAttribute('href'))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-100 selection:text-neutral-950">
      <div className="fixed inset-0 -z-10 bg-grid opacity-[0.18]" />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 md:px-8">
        <Hero />
        <Projects />
        <BlenderProjects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

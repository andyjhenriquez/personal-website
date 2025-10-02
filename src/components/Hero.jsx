import { motion } from 'framer-motion'
import face from '../assets/face.jpg'

export default function Hero() {
  return (
    <section id="about" className="pt-16 md:pt-24 pb-16">
      <div className="grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs uppercase tracking-widest opacity-60">Hello, I&apos;m</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-semibold leading-tight">
            Andy Henriquez
          </h1>
          <p className="mt-6 text-neutral-300 max-w-prose">
            I’m a Computer Science graduate (Magna Cum Laude, UCF) and currently pursuing my Master’s in Computer Science, with a focus on software development and emerging technologies. 
            I have built projects across a variety of modern development platforms and am passionate about creating immersive, interactive systems.
          </p>
          <div className="mt-6 text-sm text-neutral-400 font-mono">
            <span className="opacity-70">Languages:</span> <span>C# • C++ • C • python • java • javascript • html • css</span>
          </div>
          <div className="mt-3 text-sm text-neutral-400 font-mono">
            <span className="opacity-70">Tools:</span> <span>unity • blender • unreal • react • vite • tailwind • node • git</span>
          </div>
          <div className="mt-3 text-sm text-neutral-400 font-mono">
            <span className="opacity-70">Platforms:</span> <span>windows • linux • android • meta • vive • hololens • xreal</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="justify-self-center"
        >
          <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-soft border border-neutral-800">
            <img src={face} alt="Portrait" className="w-full h-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useState } from 'react'
import Modal from './Modal.jsx'
import p1 from '../assets/project-1.png'
import p1big from '../assets/project-1-big.png'
import p2 from '../assets/project-2.jpg'
import p2big from '../assets/project-2-big.png'
import p3 from '../assets/project-3.jpg'
import p3big from '../assets/project-3-big.png'
import p4 from '../assets/project-4.png'
import p4big from '../assets/project-4-big.jpg'
import p5 from '../assets/project-5.png'
import p5big from '../assets/project-5-big.png'

const projects = [
  {
    title: "'House of Nevermore' Dark Ride",
    img: p1,
    bigImg: p1big,
    desc: "A dark ride based on Edgar Allan Poe's 'The Raven' pitched to the Unviersal Creative team.",
    longDesc:
      `Guests are cursed and taken through the "House of Nevermore" aboard this chilling dark ride. Complete ride was designed from the ground up taking into account safety, budget, story, and more
       with the help of the Unviersal Creative team at the UCF Universal Creative Lab. Visualized and showcased with the Meta Quest 2 using the Unity Engine by creating a spline based tool for controlling the ride vehicle.
       Some props and the ride vehicle were modeled and textured using Blender`,
    link: "#"
  },
  {
    title: "Snowboard Simulator",
    img: p4,
    bigImg: p4big,
    desc: "A VR App where you can carve the slopes by controlling the virtual snowboard board with a real physical one.",
    longDesc:
      `The software was created using Unity and XR Interaction Toolkit and built for the Meta Quest 2. The physical board itself was done by using a CNC to cut the base, using rails and springs to attach a Freebord
      deck to the base, and sticking a VIVE tracker on top the deck. The VIVE tracker was being tracked by 2 VIVE Base Stations which would be sending the rotational and positional vectors of the
      board to the Unity app.`,
    link: "#"
  },
  {
    title: "NASA SEE",
    img: p2,
    bigImg: p2big,
    desc: "Led a software development team in creating a lunar simulation.",
    longDesc:
      `Sponsored by the Florida Space Institute for creating a simulation for the NASA Simulation Exploration Experience event. We simulated extracting ice from the bottom of a lunar 
      crater in the permanently shadowed region of the Moon. We created the simulations with NVIDIA PhysX and Omniverse using the HLA (High Level Architecture) standard for distributed simulations.`,
    link: "#"
  },
  {
    title: "Cleanroom Safety Training",
    img: p3,
    bigImg: p3big,
    desc: "AR safety training tour built for the UCF Cleanroom.",
    longDesc:
      `Designed for the XREAL Air 2 Ultra augmented reality glasses, this safety training assists cleanroom personnel by efficiently and quickly training new members with this safety tour of the cleanroom.
      Created using Unity, uses text-to-speech to auditorily inform users of the safety step they are on and then displays 3D arrows on the floor to guide users to the next step. Input is controlled via the
      XREAL Beam Pro phone shown on the right side above.`,
    link: "#" 
  },
  {
    title: "EyeTK",
    img: p5,
    bigImg: p5big,
    desc: "Eye tracking developmental tools to help other software developers.",
    longDesc:
      `Sponsored by Lockheed Martin, this project aimed to create eye tracking developmental tools. One of the bigger developmental tools created was a heatmap shader that could be
      placed on any 3D object or UI canvas and would show a heatmap based off of the user's eye gaze. Tested and developed for the HoloLens 2.`,
    link: "#"
  },
]

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">Projects</h2>
        <span className="text-xs font-mono opacity-60">scroll →</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-6 overflow-x-auto thin-scroll"
      >
        <div className="grid auto-cols-[85%] xs:auto-cols-[70%] sm:auto-cols-[55%] md:auto-cols-[45%] lg:auto-cols-[33%] grid-flow-col gap-6 md:gap-8 snap-x snap-mandatory pb-4">
          {projects.map((p, i) => (
            <button
              key={i}
              className="snap-start text-left bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 md:p-5 hover:border-neutral-600 transition-colors shadow-soft"
              onClick={() => setSelected(p)}
            >
              <div className="aspect-video rounded-xl overflow-hidden border border-neutral-800">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">{p.title}</h3>
                <p className="text-sm text-neutral-400 mt-1">{p.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Modal for selected project */}
      <Modal open={!!selected} onClose={() => setSelected(null)} ariaLabel="Project details">
        {selected && (
          <div>
            <div className="border-b border-neutral-800">
              <div className="aspect-[16/9] bg-neutral-900">
                <img
                  src={selected.bigImg}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold">{selected.title}</h3>
              <p className="mt-3 text-neutral-300">{selected.longDesc}</p>
              {selected.link && selected.link !== "#" && (
                <a
                  href={selected.link}
                  className="inline-block mt-5 px-4 py-2 rounded-xl bg-white text-neutral-900 font-medium hover:opacity-90 shadow-soft"
                  target="_blank" rel="noreferrer"
                >
                  Visit Project
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}

import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "./Modal.jsx";
import ThreeModelCard from "./ThreeModelCard.jsx";

const blenderProjects = [
  { title: "Computer Setup",        modelUrl: "/models/ControlStation.glb",     distance: 2.4, pitchDeg: 12 },
  { title: "Raven Ride Vehicle",    modelUrl: "/models/RavenRideVehicle.glb",   distance: 2.1, pitchDeg: 15 },
  { title: "Astronaut Game Jam",    modelUrl: "/models/PortalAstronaut.glb",    distance: 2.1, pitchDeg: 8 },
];

export default function BlenderProjects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="blender-projects" className="py-16 md:py-24">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">3D Models</h2>
        <span className="text-xs font-mono opacity-60">scroll →</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-6 overflow-x-auto thin-scroll"
      >
        <div className="grid auto-cols-[85%] xs:auto-cols-[70%] sm:auto-cols-[55%] md:auto-cols-[45%] lg:auto-cols-[33%] grid-flow-col gap-6 md:gap-8 snap-x snap-mandatory pb-4">
          {blenderProjects.map((p, i) => (
            <button
              key={i}
              className="snap-start text-left bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 md:p-5 hover:border-neutral-600 transition-colors shadow-soft w-full"
              onClick={() => setSelected(p)}
            >
              {/* Same small card presentation */}
              <div className="aspect-square rounded-xl border border-neutral-800 overflow-hidden">
                {/* Keep the spinning preview small by reusing ThreeModelCard internals */}
                <div className="pointer-events-none">
                  <ThreeModelCard
                    modelUrl={p.modelUrl}
                    title={p.title}
                    distance={p.distance}
                    pitchDeg={p.pitchDeg}
                  />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-center">{p.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} ariaLabel="Blender project">
        {selected && (
          <div>
            {/* Big square canvas on top */}
            <div className="border-b border-neutral-800 p-4 md:p-5">
              <div className="rounded-2xl border border-neutral-800 overflow-hidden">
                {/* Larger viewer: reuse ThreeModelCard but hide its built-in small title */}
                <ThreeModelCard
                  modelUrl={selected.modelUrl}
                  title={null}               // suppress small title under canvas
                  distance={selected.distance}
                  pitchDeg={selected.pitchDeg}
                />
              </div>
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold text-center">{selected.title}</h3>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

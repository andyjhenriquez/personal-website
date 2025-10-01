import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold">Contact Me</h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-8 flex justify-center gap-10"
      >
        {/* Email */}
        <a
          href="mailto:andyjhenriquez@outlook.com"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <FaEnvelope size={40} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/andy-henriquez"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <FaLinkedin size={40} />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/andyjhenriquez"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <FaGithub size={40} />
        </a>
      </motion.div>
    </section>
  );
}

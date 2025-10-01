export default function Footer() {
  return (
    <footer className="py-10 border-t border-neutral-800 mt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-8 text-center text-xs text-neutral-500 font-mono">
        © <span id="year">{new Date().getFullYear()}</span> Andy Henriquez
      </div>
    </footer>
  )
}

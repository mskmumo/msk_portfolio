export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/15 py-8 mt-16">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
        <p>© {new Date().getFullYear()} Mumo Mwangangi</p>
        <div className="flex items-center gap-4">
          <a className="hover:underline underline-offset-4" href="https://github.com/" target="_blank" rel="noreferrer noopener">GitHub</a>
          <a className="hover:underline underline-offset-4" href="https://www.linkedin.com/" target="_blank" rel="noreferrer noopener">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}



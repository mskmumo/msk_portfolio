export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">About</h2>
        <p className="mt-4 text-neutral max-w-3xl text-lg leading-relaxed">
          I’m Mumo Mwangangi, a Business Intelligence and software engineer focused on turning data into decisions.
          I build interactive dashboards, performant web apps, and polished user experiences.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            "Power BI",
            "Next.js",
            "TypeScript",
            "Tailwind",
            "Framer Motion",
            "DAX",
          ].map((t) => (
            <span key={t} className="text-sm rounded-full px-4 py-2 bg-primary/20 text-primary border border-primary/30 font-medium hover:bg-primary/30 transition-colors duration-200">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}



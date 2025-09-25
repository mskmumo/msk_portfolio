export function ServicesSection() {
  const services = [
    {
      title: "BI Dashboards",
      description: "Executive dashboards with DAX, data modeling, and stakeholder-ready visuals.",
    },
    {
      title: "Web Apps",
      description: "Next.js applications with motion, accessibility, and strong performance.",
    },
    {
      title: "Consulting",
      description: "Data storytelling, product analytics, and UX guidance.",
    },
  ];
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Services</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-black/10 dark:border-white/15 p-6 bg-white/70 dark:bg-white/5 backdrop-blur">
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



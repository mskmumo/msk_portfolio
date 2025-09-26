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
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="mx-auto max-w-6xl px-4 relative">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">Services</h2>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mb-8">
          Professional services to help you achieve your business goals with modern technology solutions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-border p-6 bg-card-bg backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50">
              <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-300">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



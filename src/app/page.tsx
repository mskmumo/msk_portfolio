import { Hero } from "@/components/Hero";
import { personJsonLd } from "@/lib/seo";
import { AboutSection } from "@/components/AboutSection";
import { Skills } from "@/components/Skills";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { ServicesSection } from "@/components/ServicesSection";
import { Testimonials } from "@/components/Testimonials";
import { ContactCTA } from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
      <Hero />
      <AboutSection />
      <Skills />
      <FeaturedProjects />
      <Experience />
      <Education />
      <ServicesSection />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
